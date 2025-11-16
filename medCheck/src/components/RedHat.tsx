import React, { useState } from 'react';
import { ethers } from 'ethers';

// --- 1. COPY-PASTE these from your Hardhat project ---

// The address of your deployed contract
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// The ABI (Application Binary Interface) of your contract
// Found in: artifacts/contracts/YourContractName.sol/YourContractName.json
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "bytes32", "name": "prescriptionHash", "type": "bytes32" },
      { "internalType": "string", "name": "medicineName", "type": "string" },
      { "internalType": "string", "name": "dosage", "type": "string" }
    ],
    "name": "addPrescription",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "prescriptionHash", "type": "bytes32" }
    ],
    "name": "getPrescription",
    "outputs": [
      { "internalType": "string", "name": "medicineName", "type": "string" },
      { "internalType": "string", "name": "dosage", "type": "string" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "internalType": "address", "name": "addedBy", "type": "address" },
      { "internalType": "bool", "name": "exists", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "prescriptionHash", "type": "bytes32" }
    ],
    "name": "verifyPrescription",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "bytes32", "name": "prescriptionHash", "type": "bytes32" },
      { "indexed": true, "internalType": "address", "name": "addedBy", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "PrescriptionAdded",
    "type": "event"
  }
];
// --- END OF COPY-PASTE AREA ---


// Type declaration for the Ethereum provider (MetaMask)
declare global {
  interface Window {
    ethereum?: any;
  }
}

/**
 * A simple React component to connect to MetaMask and interact with a smart contract.
 */
const RedHat: React.FC = () => {
  const [prescriptionHash, setPrescriptionHash] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState(""); // Now a string, e.g. "500mg" or "1g"
  const [prescription, setPrescription] = useState<any | null>(null);
  const [message, setMessage] = useState("");

  // Use public RPC for read/write (demo: local hardhat, change for mainnet/testnet)
  const PUBLIC_RPC = "http://localhost:8545";
  const provider = new ethers.JsonRpcProvider(PUBLIC_RPC);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

  // Helper to create prescription hash from form data
  const createPrescriptionHash = () => {
    const prescriptionData = {
      medicineName,
      dosage, // string, e.g. "500mg" or "1g"
      timestamp: Math.floor(Date.now() / 1000),
      patientId: "patient123" // You can make this dynamic if needed
    };
    // Sort keys for determinism
    const serializedData = JSON.stringify(prescriptionData, Object.keys(prescriptionData).sort());
    return ethers.keccak256(ethers.toUtf8Bytes(serializedData));
  };

  // Read prescription by hash
  const handleRead = async () => {
    if (!prescriptionHash) {
      setMessage("Please enter a prescription hash.");
      return;
    }
    try {
      const result = await contract.getPrescription(prescriptionHash);
      setPrescription(result);
      setMessage("");
    } catch (err: any) {
      setMessage("Not found or error: " + err.message);
      setPrescription(null);
    }
  };

  // Insert prescription (owner only, demo: use first account)
  const handleInsert = async () => {
    if (!medicineName || !dosage) {
      setMessage("Fill all fields.");
      return;
    }
    try {
      const hash = createPrescriptionHash();
      setPrescriptionHash(hash); // Show hash in input for user
      const signer = await provider.getSigner(0);
      const contractWithSigner = contract.connect(signer);
      await (contractWithSigner as any).addPrescription(
        hash,
        medicineName,
        dosage // pass as string
      );
      setMessage("Prescription inserted!");
    } catch (err: any) {
      setMessage("Insert failed: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Prescription Blockchain Demo</h2>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Prescription Hash (bytes32)"
          value={prescriptionHash}
          onChange={e => setPrescriptionHash(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <button onClick={handleRead} style={{ marginRight: 10 }}>Read Prescription</button>
      </div>
      {prescription && (
        <div style={{ background: "#f4f4f4", padding: 10, borderRadius: 8 }}>
          <div><b>Medicine:</b> {prescription[0]}</div>
          <div><b>Dosage:</b> {prescription[1].toString()}</div>
          <div><b>Timestamp:</b> {prescription[2].toString()}</div>
          <div><b>Added By:</b> {prescription[3]}</div>
          <div><b>Exists:</b> {prescription[4] ? "Yes" : "No"}</div>
        </div>
      )}
      <hr style={{ margin: "20px 0" }} />
      <div>
        <input
          type="text"
          placeholder="Prescription Hash (auto-generated)"
          value={prescriptionHash}
          readOnly
          style={{ width: "100%", marginBottom: 8, background: "#eee" }}
        />
        <input
          type="text"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={e => setMedicineName(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <input
          type="text"
          placeholder="Dosage (e.g., 500mg or 1g)"
          value={dosage}
          onChange={e => setDosage(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <button onClick={handleInsert}>Insert Prescription</button>
      </div>
      {message && <div style={{ marginTop: 20, color: "#c00" }}>{message}</div>}
    </div>
  );
};

export default RedHat;
