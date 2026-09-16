require("dotenv").config();

console.log("MONGO_URL:", process.env.MONGO_URL);
console.log("PORT:", process.env.PORT);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const requirementRouter = require("./routes/requirements");

const app = express();

app.use(cors());
app.use(express.json());

// Testing
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// health endpoint
app.get("/", (req, res) => {
  console.log("Health endpoint reached");

  res.json({ status: "ok", service: "GoPratle requirements API" });
});

app.use("/api/requirements", requirementRouter);

const PORT = process.env.PORT || 3001;

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connection successfull");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
