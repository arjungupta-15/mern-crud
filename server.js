import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routers from "./routes/routes.js";
import dbCon from "./utlis/db.js";
import path from "path";
import { fileURLToPath } from "url";

// Resolving ES module paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("Current directory:", __dirname);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
dbCon();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", routers);

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, "client", "dist")));

// Catch-all handler to serve index.html for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"), (err) => {
    if (err) {
      res.status(500).send("Error loading the application");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
