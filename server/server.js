import express from "express";
import { NODE_ENV, PORT } from "./config/env.js";
import connectDatabase from "./config/mongodb.js";
import authRoute from "./routes/auth.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cors from "cors";
import transactionRouter from "./routes/transactions.route.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
const AllowedOrigin = ["http://localhost:5173", process.env.CLIENT_URL];

app.use(
  cors({
    origin: AllowedOrigin,
    methods: ["POST", "GET", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server Live");
});

app.use("/auth/v2", authRoute);
app.use("/finances/v2", transactionRouter);

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
};

startServer();
