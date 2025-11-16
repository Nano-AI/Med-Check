import { MedicationData } from "@/types/medication";

// Mock data for demonstration - will be replaced with blockchain queries
export const mockMedicationDatabase: Record<string, MedicationData> = {
  "a3f5c9d2e8b1f4a7": {
    hash: "a3f5c9d2e8b1f4a7",
    prescriptionName: "Amoxicillin",
    strengthAmount: "500mg",
    manufacturerDate: "2024-08-15",
    productionLocation: "PharmaCorp Manufacturing Facility, New Jersey, USA",
    provider: "PharmaCorp Industries",
    registeredDate: "2024-08-16",
    expirationDate: "2026-08-15",
    batchNumber: "AMX-2024-08-1547",
    dosageForm: "Capsule",
    activeIngredients: ["Amoxicillin Trihydrate"],
    supplyChainEvents: [
      {
        eventId: "evt_001",
        timestamp: "2024-08-15T09:30:00Z",
        location: "PharmaCorp Manufacturing, NJ",
        organization: "PharmaCorp Industries",
        eventType: "manufactured",
        description: "Manufactured and quality tested"
      },
      {
        eventId: "evt_002",
        timestamp: "2024-08-16T14:20:00Z",
        location: "PharmaCorp Distribution Center, NJ",
        organization: "PharmaCorp Industries",
        eventType: "shipped",
        description: "Shipped to regional distributor"
      },
      {
        eventId: "evt_003",
        timestamp: "2024-08-18T10:15:00Z",
        location: "MedSupply Regional Hub, NY",
        organization: "MedSupply Distribution",
        eventType: "received",
        description: "Received at distribution center"
      },
      {
        eventId: "evt_004",
        timestamp: "2024-08-20T16:45:00Z",
        location: "HealthFirst Pharmacy, NY",
        organization: "HealthFirst Pharmacy Network",
        eventType: "distributed",
        description: "Delivered to retail pharmacy"
      }
    ]
  },
  "b7d4e9f2a5c8d1b3": {
    hash: "b7d4e9f2a5c8d1b3",
    prescriptionName: "Lisinopril",
    strengthAmount: "10mg",
    manufacturerDate: "2024-09-10",
    productionLocation: "GlobalMed Pharmaceuticals, California, USA",
    provider: "GlobalMed Pharmaceuticals",
    registeredDate: "2024-09-11",
    expirationDate: "2027-09-10",
    batchNumber: "LIS-2024-09-1089",
    dosageForm: "Tablet",
    activeIngredients: ["Lisinopril Dihydrate"],
    supplyChainEvents: [
      {
        eventId: "evt_005",
        timestamp: "2024-09-10T08:00:00Z",
        location: "GlobalMed Manufacturing, CA",
        organization: "GlobalMed Pharmaceuticals",
        eventType: "manufactured",
        description: "Manufactured and certified"
      },
      {
        eventId: "evt_006",
        timestamp: "2024-09-11T12:30:00Z",
        location: "GlobalMed Warehouse, CA",
        organization: "GlobalMed Pharmaceuticals",
        eventType: "shipped",
        description: "Shipped to national distributor"
      },
      {
        eventId: "evt_007",
        timestamp: "2024-09-13T09:20:00Z",
        location: "NationalRx Distribution, TX",
        organization: "NationalRx Distribution",
        eventType: "received",
        description: "Received and stored"
      }
    ]
  }
};
