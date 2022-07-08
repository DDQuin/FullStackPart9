import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, _res) => {
  _res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, _res) => {
  const weight = _req.query.weight;
  const height = _req.query.height;
  if (!weight || isNaN(Number(weight)) || !height || isNaN(Number(height))) {
    return _res.send({ error: "malformatted paramters" }).status(400);
  }
  const bmiM: String = calculateBmi(Number(height), Number(weight));
  return _res.json({
    weight: Number(weight),
    height: Number(height),
    bmi: bmiM,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
