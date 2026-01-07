import express from "express";

const app = express();

app.get("/health", (_, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});
