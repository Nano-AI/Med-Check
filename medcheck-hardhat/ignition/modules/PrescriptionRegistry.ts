import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("PrescriptionRegistryModule", (m) => {
  const prescriptionRegistry = m.contract("PrescriptionBlockchain");

  return { prescriptionRegistry };
});
