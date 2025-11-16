// SPDX-License-Identifier: MIT
/*
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "./PrescriptionRegistry.sol";

contract PrescriptionRegistryTest is Test {
    PrescriptionRegistry registry;
    address testPatient = address(0x123);
    bytes32 testId = keccak256(abi.encodePacked("test-id"));

    function setUp() public {
        registry = new PrescriptionRegistry();
    }

    function testCreateAndGetPrescription() public {
        // Grant provider role if needed (deployer has it)
        registry.createPrescription(testId, testPatient, "ipfs://test", 100, "mg", "MED123", keccak256("integrity"), block.timestamp + 365 days);

        // Simulate as patient to get (due to restrictions)
        vm.prank(testPatient);
        (bytes32 id, , , , uint16 doseMg, , , , , , ) = registry.getPrescription(testId);
        assertEq(id, testId);
        assertEq(doseMg, 100);
    }

    function testRevokePrescription() public {
        registry.createPrescription(testId, testPatient, "ipfs://test", 100, "mg", "MED123", keccak256("integrity"), block.timestamp + 365 days);
        registry.revokePrescription(testId);

        // Should revert on get if revoked (adjust based on your logic)
        vm.expectRevert("revoked");
        vm.prank(testPatient);
        registry.getPrescription(testId);
    }
}
}
*/