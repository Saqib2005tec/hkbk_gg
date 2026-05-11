import { network } from "hardhat";

const { ethers } = await network.create();

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label} failed: expected "${expected}", got "${actual}"`);
  }
}

async function main() {
  console.log("Deploying EmployeeLedger test contract...");
  const ledger = await ethers.deployContract("EmployeeLedger");
  await ledger.waitForDeployment();

  const address = await ledger.getAddress();
  console.log("Contract deployed at:", address);

  console.log("Testing employee profile...");
  await (await ledger.setEmployee(1, "Amit Sharma", "HR Manager", "Active")).wait();
  const employee = await ledger.getEmployee(1);
  assertEqual(employee[0], "Amit Sharma", "employee name");
  assertEqual(employee[1], "HR Manager", "employee role");
  assertEqual(employee[2], "Active", "employee status");

  console.log("Testing onboarding...");
  await (await ledger.setOnboarding(1, "Document Verification", "Completed")).wait();
  const onboarding = await ledger.getOnboarding(1);
  assertEqual(onboarding[0], "Document Verification", "onboarding stage");
  assertEqual(onboarding[1], "Completed", "onboarding status");

  console.log("Testing attendance...");
  await (await ledger.markAttendance(1, "2026-05-11", "Present")).wait();
  const attendance = await ledger.getAttendance(1, "2026-05-11");
  assertEqual(attendance[0], "2026-05-11", "attendance date");
  assertEqual(attendance[1], "Present", "attendance status");

  console.log("Testing payroll...");
  await (await ledger.setPayroll(1, "2026-05", 50000, "INR", "Paid")).wait();
  const payroll = await ledger.getPayroll(1, "2026-05");
  assertEqual(payroll[0], "2026-05", "payroll month");
  assertEqual(payroll[1].toString(), "50000", "payroll amount");
  assertEqual(payroll[2], "INR", "payroll currency");
  assertEqual(payroll[3], "Paid", "payroll status");

  console.log("All blockchain tests passed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
