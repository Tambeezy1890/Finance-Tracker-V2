import { Router } from "express";
import upload from "../middleware/files.middleware.js";
import {
  exportTransactions,
  importTransactions,
} from "../controllers/files.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const files = Router();

files.post("/import", protect, upload.single("file"), importTransactions);
files.get("/export", protect, exportTransactions);

export default files;
