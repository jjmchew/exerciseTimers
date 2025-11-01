import express from "express";
import cors from "cors";
import { readFile } from "fs/promises";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3003;

async function loadJson() {
  try {
    const filePath = new URL("./db.json", import.meta.url);
    const contents = await readFile(filePath, { encoding: "utf8" });
    return JSON.parse(contents);
  } catch (error) {
    console.error("Error loading db.json", error);
    return null;
  }
}

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/workouts", async (_req, res) => {
  const data = await loadJson();
  if (data) res.send(data.workouts);
  else res.send({});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
