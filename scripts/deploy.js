import { network } from "hardhat";

const { ethers } = await network.create();

async function main() {
  const ledger = await ethers.deployContract("EmployeeLedger");
  await ledger.waitForDeployment();

  console.log("EmployeeLedger deployed to:", await ledger.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
