const hre = require("hardhat");

async function main() {
  const Ledger = await hre.ethers.getContractFactory("EmployeeLedger");
  const ledger = await Ledger.deploy();
  await ledger.waitForDeployment();
  console.log("Database officially deployed to:", await ledger.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

