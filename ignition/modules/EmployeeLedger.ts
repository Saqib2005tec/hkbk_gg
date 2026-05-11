import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("EmployeeLedgerModule", (m) => {
  const employeeLedger = m.contract("EmployeeLedger");

  return { employeeLedger };
});
