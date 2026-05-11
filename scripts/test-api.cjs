const BASE_URL = process.env.API_URL || "http://127.0.0.1:3000";

async function request(path, options) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const body = await response.json();

  if (!response.ok || body.ok === false) {
    throw new Error(`${path} failed: ${JSON.stringify(body)}`);
  }

  return body;
}

async function main() {
  console.log("Checking API bridge...");
  console.log(await request("/"));

  console.log("Testing employee API...");
  console.log(
    await request("/api/employee", {
      method: "POST",
      body: JSON.stringify({
        id: 1,
        name: "Amit Sharma",
        role: "HR Manager",
        status: "Active",
      }),
    }),
  );
  console.log(await request("/api/employee/1"));

  console.log("Testing onboarding API...");
  console.log(
    await request("/api/onboarding", {
      method: "POST",
      body: JSON.stringify({
        id: 1,
        stage: "Document Verification",
        status: "Completed",
      }),
    }),
  );
  console.log(await request("/api/onboarding/1"));

  console.log("Testing attendance API...");
  console.log(
    await request("/api/attendance", {
      method: "POST",
      body: JSON.stringify({
        id: 1,
        date: "2026-05-11",
        status: "Present",
      }),
    }),
  );
  console.log(await request("/api/attendance/1/2026-05-11"));

  console.log("Testing payroll API...");
  console.log(
    await request("/api/payroll", {
      method: "POST",
      body: JSON.stringify({
        id: 1,
        month: "2026-05",
        amount: 50000,
        currency: "INR",
        status: "Paid",
      }),
    }),
  );
  console.log(await request("/api/payroll/1/2026-05"));

  console.log("All API tests passed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
