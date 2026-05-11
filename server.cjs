const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const EmployeeLedgerArtifact = require("./artifacts/contracts/EmployeeLedger.sol/EmployeeLedger.json");

const app = express();
const PORT = 3000;

const RPC_URL = "http://127.0.0.1:8545";
const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Hardhat local account #0. Demo-only key, safe for localhost hackathon use.
const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const ledger = new ethers.Contract(
  CONTRACT_ADDRESS,
  EmployeeLedgerArtifact.abi,
  wallet,
);

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "EmployeeLedger blockchain bridge",
    contractAddress: CONTRACT_ADDRESS,
  });
});

app.post("/api/employee", async (req, res) => {
  try {
    const { id, name, role, status } = req.body;

    if (id === undefined || !name || !role || !status) {
      return res.status(400).json({
        ok: false,
        error: "Required fields: id, name, role, status",
      });
    }

    const tx = await ledger.setEmployee(id, name, role, status);
    const receipt = await tx.wait();

    res.json({
      ok: true,
      message: "Employee written to blockchain",
      id,
      txHash: receipt.hash,
      contractAddress: CONTRACT_ADDRESS,
    });
  } catch (error) {
    console.error("POST /api/employee failed:", error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

app.get("/api/employee/:id", async (req, res) => {
  try {
    const employee = await ledger.getEmployee(req.params.id);

    res.json({
      ok: true,
      id: req.params.id,
      name: employee[0],
      role: employee[1],
      status: employee[2],
      contractAddress: CONTRACT_ADDRESS,
    });
  } catch (error) {
    console.error("GET /api/employee/:id failed:", error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Blockchain API bridge running at http://127.0.0.1:${PORT}`);
  console.log(`Using EmployeeLedger at ${CONTRACT_ADDRESS}`);
});
