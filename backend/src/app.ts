import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./utils/logger";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Routes
app.use("/api", routes);

// Global error handler — must be last
app.use(errorHandler);

app
  .listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error(err);
  });

export default app;
