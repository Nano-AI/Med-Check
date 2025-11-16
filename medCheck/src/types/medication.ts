// Types for medication data - structured for future blockchain integration
export interface SupplyChainEvent {
  eventId: string;
  timestamp: string;
  location: string;
  organization: string;
  eventType: "manufactured" | "shipped" | "received" | "distributed";
  description: string;
}

export interface MedicationData {
  hash: string;
  prescriptionName: string;
  strengthAmount: string;
  manufacturerDate: string;
  productionLocation: string;
  provider: string;
  registeredDate: string;
  expirationDate: string;
  supplyChainEvents: SupplyChainEvent[];
  batchNumber?: string;
  dosageForm?: string;
  activeIngredients?: string[];
}
