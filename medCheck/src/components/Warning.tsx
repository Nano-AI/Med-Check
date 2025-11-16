import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const BACKEND_URL = "http://localhost:3001";

const severityMap = {
  1: { label: "High", color: "bg-destructive text-destructive-foreground" },
  2: { label: "Medium", color: "bg-orange-500 text-white" },
  3: { label: "Low", color: "bg-primary text-primary-foreground" }
};

const Warning = () => {
  const [warnings, setWarnings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [wallet, setWallet] = useState<string>("");
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({
    companyHash: wallet || "",
    dose: "",
    productionLocation: "",
    provider: "",
    manufactureDateStart: "",
    manufactureDateEnd: "",
    title: "",
    severity: "",
    description: "",
    medicine: "" // <-- add medicine field
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Connect wallet on mount if available
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      ethProvider.getSigner().then(ethSigner => {
        ethSigner.getAddress().then(addr => {
          setProvider(ethProvider);
          setSigner(ethSigner);
          setWallet(addr);
          setForm(form => ({ ...form, companyHash: addr }));
        });
      });
    }
  }, []);

  useEffect(() => {
    // Update companyHash when wallet changes
    setForm(form => ({ ...form, companyHash: wallet }));
    // Only fetch if wallet is connected
    if (!wallet) {
      return;
    }
    // If medicine is set, filter by medicine, else by provider
    const queryParam = `companyHash=${wallet}`;
    fetch(`${BACKEND_URL}/warnings?${queryParam}`)
      .then(res => res.json())
      .then(data => setWarnings(data));
  }, [wallet, form.medicine]);

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const ethSigner = await ethProvider.getSigner();
      const addr = await ethSigner.getAddress();
      setProvider(ethProvider);
      setSigner(ethSigner);
      setWallet(addr);
    } else {
      alert("Please install MetaMask or another Ethereum wallet.");
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.companyHash || !form.title || !form.severity || !form.description) {
      toast.error("Please fill all required fields.");
      return;
    }
    // Remove empty fields or set them to null
    const filteredForm = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, value === "" ? null : value])
    );
    // Optionally, omit fields that are null
    Object.keys(filteredForm).forEach(key => {
      if (filteredForm[key] === null) {
        delete filteredForm[key];
      }
    });
    const res = await fetch(`${BACKEND_URL}/warnings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filteredForm)
    });
    if (res.ok) {
      toast.success("Warning added!");
      setShowDialog(false);
      setForm({
        companyHash: wallet || "",
        dose: "",
        productionLocation: "",
        provider: "",
        manufactureDateStart: "",
        manufactureDateEnd: "",
        title: "",
        severity: "",
        description: "",
        medicine: ""
      });
    } else {
      toast.error("Failed to add warning.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Side Panel */}
      <div className="w-full md:w-80 bg-secondary/10 border-r border-border p-4 space-y-2">
        <h2 className="text-lg font-bold mb-4">Your Warnings</h2>
        {!wallet && (
          <Button className="mb-4 w-full" onClick={handleConnectWallet}>
            Connect Wallet
          </Button>
        )}
        {wallet && (
          <>
            <div className="mb-4 text-xs text-muted-foreground break-all">Wallet: {wallet}</div>
            <Button className="mb-4 w-full" variant="secondary" onClick={() => setShowDialog(true)}>Add New Warning</Button>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Warning</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input name="companyHash" value={form.companyHash} readOnly className="bg-muted" placeholder="Company Hash (required)" required />
                  <Input name="dose" value={form.dose} onChange={handleInputChange} placeholder="Dose (mg)" />
                  <Input name="productionLocation" value={form.productionLocation} onChange={handleInputChange} placeholder="Production Location" />
                  <Input name="provider" value={form.provider} onChange={handleInputChange} placeholder="Provider" />
                  <Input name="manufactureDateStart" value={form.manufactureDateStart} onChange={handleInputChange} placeholder="Manufacture Date Start (YYYY-MM-DD)" />
                  <Input name="manufactureDateEnd" value={form.manufactureDateEnd} onChange={handleInputChange} placeholder="Manufacture Date End (YYYY-MM-DD)" />
                  <Input name="medicine" value={form.medicine} onChange={handleInputChange} placeholder="Medicine Name" />
                  <Input name="title" value={form.title} onChange={handleInputChange} placeholder="Title (required)" required />
                  <Input name="severity" value={form.severity} onChange={handleInputChange} placeholder="Severity (1=High, 2=Medium, 3=Low) (required)" required />
                  <Input name="description" value={form.description} onChange={handleInputChange} placeholder="Description (required)" required />
                  <DialogFooter>
                    <Button type="submit" className="w-full">Submit Warning</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </>
        )}
        {warnings.length === 0 && wallet && <div className="text-muted-foreground">No warnings found.</div>}
        {wallet && warnings.map((w, idx) => (
          <Button
            key={idx}
            variant={selected === idx ? "default" : "outline"}
            className="w-full flex justify-between items-center mb-2"
            onClick={() => setSelected(idx)}
          >
            <span className="truncate">{w.title}</span>
            <Badge className={severityMap[w.severity]?.color || "bg-muted"}>
              {severityMap[w.severity]?.label || w.severity}
            </Badge>
          </Button>
        ))}
      </div>
      {/* Details Panel */}
      <div className="flex-1 p-4 flex items-center justify-center">
        {selected !== null && wallet && warnings[selected] ? (
          <Card className="max-w-xl w-full p-6 space-y-4">
            <h3 className="text-2xl font-bold mb-2 break-words">{warnings[selected].title}</h3>
            <Badge className={severityMap[warnings[selected].severity]?.color || "bg-muted"}>
              {severityMap[warnings[selected].severity]?.label || warnings[selected].severity}
            </Badge>
            <div className="text-muted-foreground text-sm">{warnings[selected].description}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <span className="font-semibold">Company Hash:</span>
                <div className="break-all">{warnings[selected].companyHash}</div>
              </div>
              <div>
                <span className="font-semibold">Dose (mg):</span>
                <div>{warnings[selected].dose}</div>
              </div>
              <div>
                <span className="font-semibold">Production Location:</span>
                <div>{warnings[selected].productionLocation}</div>
              </div>
              <div>
                <span className="font-semibold">Provider:</span>
                <div className="break-all">{warnings[selected].provider}</div>
              </div>
              <div>
                <span className="font-semibold">Manufacture Date Range:</span>
                <div>{warnings[selected].manufactureDateStart} - {warnings[selected].manufactureDateEnd}</div>
              </div>
              <div>
                <span className="font-semibold">Medicine:</span>
                <div>{warnings[selected].medicine}</div>
              </div>
            </div>
          </Card>
        ) : (
          <div className="text-muted-foreground">{wallet ? "Select a warning to view details." : "Connect your wallet to view warnings."}</div>
        )}
      </div>
    </div>
  );
};

export default Warning;
