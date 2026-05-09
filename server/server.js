import express from "express";
import { PORT } from "./config/env.js";
import connectDatabase from "./config/mongodb.js";
import authRoute from "./routes/auth.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Live");
});

app.use("/auth/v2", authRoute);

app.listen(PORT, async () => {
  console.log(`http://localhost:${PORT}`);
  await connectDatabase();
});

app.use(errorMiddleware);
