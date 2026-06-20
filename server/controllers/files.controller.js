import fs from "fs";
import csv from "csv-parser";
import Transaction from "../models/transactions.model.js";
import { asyncHandler } from "../services/fetch.js";
import { Parser } from "json2csv";
export const importTransactions = asyncHandler(async (req, res, next) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(
      csv({
        mapHeaders: ({ header }) => header.trim(),
        mapValues: ({ value }) => value.trim(),
      })
    )
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      console.log("CSV first row:", results[0]);
      console.log("CSV keys:", Object.keys(results[0] || {}));
      const formatted = results.map((t) => ({
        title: t.title,
        description: t.description || "",
        category: t.category,
        type: t.type,
        amount: Number(t.amount),
        date: new Date(t.date),
        user: req.user.id,
      }));

      console.log(formatted[0]); // check first row

      await Transaction.insertMany(formatted);

      fs.unlinkSync(req.file.path);

      res.json({
        success: true,
        inserted: formatted.length,
      });
    });
});

export const exportTransactions = asyncHandler(async (req, res, next) => {
  const transactions = await Transaction.find({ user: req.user.id });

  const fields = ["title", "description", "category", "type", "amount", "date"];
  const parser = new Parser({ fields });

  const csv = parser.parse(transactions);

  res.header("Content-Type", "text/csv");
  res.attachment("transactions.csv");

  return res.send(csv);
});
