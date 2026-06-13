import express from "express";
import { PORT } from "./config/env.js";
import connectDatabase from "./config/mongodb.js";
import authRoute from "./routes/auth.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cors from "cors";
import transactionRouter from "./routes/transactions.route.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
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

app.listen(PORT, async () => {
  console.log(`http://localhost:${PORT}`);
  await connectDatabase();
});
