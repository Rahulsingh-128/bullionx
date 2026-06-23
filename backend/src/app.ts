import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
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
