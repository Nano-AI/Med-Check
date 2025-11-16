// src/lib/prescriptionUtils.ts
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "bytes32", "name": "prescriptionHash", "type": "bytes32" },
      { "internalType": "string", "name": "medicineName", "type": "string" },
      { "internalType": "string", "name": "dosage", "type": "string" },
      { "internalType": "string", "name": "provider", "type": "string" }
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
      { "internalType": "bool", "name": "exists", "type": "bool" },
      { "internalType": "string", "name": "provider", "type": "string" }
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

const PUBLIC_RPC = "http://localhost:8545";

export class PrescriptionUtils {
  provider: ethers.JsonRpcProvider;
  contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(PUBLIC_RPC);
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.provider);
  }

  async getPrescription(hash: string) {
    return await this.contract.getPrescription(hash);
  }

  async verifyPrescription(hash: string) {
    return await this.contract.verifyPrescription(hash);
  }

  async addPrescription(hash: string, medicineName: string, dosage: string, provider: string) {
    // For demo, use first account as signer
    const signer = await this.provider.getSigner(0);
    const contractWithSigner = this.contract.connect(signer);
    return await contractWithSigner.addPrescription(hash, medicineName, dosage, provider);
  }

  static createPrescriptionHash(medicineName: string, dosage: string, provider: string = "", patientId: string = "patient123") {
    const prescriptionData = {
      medicineName,
      dosage,
      provider,
      timestamp: Math.floor(Date.now() / 1000),
      patientId
    };
    const serializedData = JSON.stringify(prescriptionData, Object.keys(prescriptionData).sort());
    return ethers.keccak256(ethers.toUtf8Bytes(serializedData));
  }
}