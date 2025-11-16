import React, { useState } from "react";
import { ethers } from "ethers";
import { PrescriptionUtils } from "@/lib/prescriptionUtils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Building } from "lucide-react";

const prescriptionUtils = new PrescriptionUtils();

const Admin: React.FC = () => {
  const [wallet, setWallet] = useState<string>("");
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [company, setCompany] = useState("");
  const [hash, setHash] = useState("");
  const [message, setMessage] = useState("");
  const [txHash, setTxHash] = useState("");
  const [recentHistory, setRecentHistory] = useState<Array<{ hash: string; company: string; txHash: string; medicineName: string; dosage: string }>>([]);

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const ethSigner = await ethProvider.getSigner();
      setProvider(ethProvider);
      setSigner(ethSigner);
      setWallet(await ethSigner.getAddress());
      setMessage("Wallet connected: " + await ethSigner.getAddress());
    } else {
      setMessage("Please install MetaMask or another Ethereum wallet.");
    }
  };

  // Create hash
  const handleCreateHash = () => {
    const prescriptionHash = PrescriptionUtils.createPrescriptionHash(
      medicineName,
      dosage,
      company
    );
    setHash(prescriptionHash);
  };

  // Insert prescription
  const handleInsert = async () => {
    if (!signer) {
      setMessage("Connect your wallet first.");
      return;
    }
    if (!medicineName || !dosage || !company) {
      setMessage("Fill all fields.");
      return;
    }
    try {
      const contractWithSigner = prescriptionUtils.contract.connect(signer);
      const tx = await (contractWithSigner as any).addPrescription(
        hash,
        medicineName,
        dosage,
        company // Pass company as provider
      );
      await tx.wait();
      setTxHash(tx.hash);
      setMessage("Prescription inserted!");
      // Append to recent history (array)
      setRecentHistory(prev => [
        ...prev,
        {
          hash,
          company,
          txHash: tx.hash,
          medicineName,
          dosage
        }
      ]);
    } catch (err: any) {
      setMessage("Insert failed: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card className="p-8 mb-8 shadow-md">
        <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
        <div className="mb-4">
          {wallet ? (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Connected: {wallet}
            </Badge>
          ) : (
            <Button onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Medicine Name"
            value={medicineName}
            onChange={e => setMedicineName(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Dosage (e.g., 500mg or 1g)"
            value={dosage}
            onChange={e => setDosage(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={e => setCompany(e.target.value)}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <Button onClick={handleCreateHash} variant="outline" className="mr-2">Generate Hash</Button>
          <input
            type="text"
            placeholder="Prescription Hash (auto-generated)"
            value={hash}
            readOnly
            className="border rounded px-4 py-2 w-full bg-muted"
          />
        </div>
        <Button onClick={handleInsert} className="w-full mb-2">Insert Prescription</Button>
        {txHash && (
          <div className="mt-2 text-green-600">Tx Hash: {txHash}</div>
        )}
        {message && (
          <div className="mt-2 text-red-600">{message}</div>
        )}
      </Card>
      <Card className="p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" /> Recent Actions
        </h3>
        {recentHistory.length > 0 ? (
          recentHistory.map((item, idx) => (
            <div key={item.txHash + idx} className="flex gap-3 items-center">
              <Building className="w-6 h-6 text-primary" />
              <div>
                <div className="font-semibold">Hash: {item.hash}</div>
                <div className="text-muted-foreground">Company: {item.company}</div>
                <div className="text-muted-foreground">Tx: {item.txHash}</div>
                <div className="text-muted-foreground">Medicine: {item.medicineName}</div>
                <div className="text-muted-foreground">Dosage: {item.dosage}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex gap-3 items-center text-muted-foreground">
            <AlertTriangle className="w-6 h-6" />
            No recent actions.
          </div>
        )}
      </Card>
    </div>
  );
};

export default Admin;
