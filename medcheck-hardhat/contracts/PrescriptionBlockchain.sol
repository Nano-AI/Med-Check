// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PrescriptionBlockchain {
    struct Prescription {
        string medicineName;
        string dosage; // Changed from uint256 to string
        uint256 timestamp;
        address addedBy;
        bool exists;
        string provider; // Renamed from company to provider
    }

    mapping(bytes32 => Prescription) public prescriptions;

    event PrescriptionAdded(bytes32 indexed prescriptionHash, address indexed addedBy, uint256 timestamp);

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addPrescription(
        bytes32 prescriptionHash,
        string memory medicineName,
        string memory dosage, // Changed from uint256 to string
        string memory provider // Added provider argument
    ) public onlyOwner {
        require(!prescriptions[prescriptionHash].exists, "Prescription already exists");

        prescriptions[prescriptionHash] = Prescription({
            medicineName: medicineName,
            dosage: dosage,
            timestamp: block.timestamp,
            addedBy: msg.sender,
            exists: true,
            provider: provider // Set provider from argument
        });

        emit PrescriptionAdded(prescriptionHash, msg.sender, block.timestamp);
    }

    function getPrescription(bytes32 prescriptionHash) public view returns (
        string memory medicineName,
        string memory dosage, // Changed from uint256 to string
        uint256 timestamp,
        address addedBy,
        bool exists,
        string memory provider
    ) {
        Prescription memory pres = prescriptions[prescriptionHash];
        return (
            pres.medicineName,
            pres.dosage,
            pres.timestamp,
            pres.addedBy,
            pres.exists,
            pres.provider
        );
    }

    function verifyPrescription(bytes32 prescriptionHash) public view returns (bool) {
        return prescriptions[prescriptionHash].exists;
    }
}