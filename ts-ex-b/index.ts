import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, _res) => {
  _res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, _res) => {
  const weight = _req.query.weight;
  const height = _req.query.height;
  if (!weight || isNaN(Number(weight)) || !height || isNaN(Number(height))) {
    return _res.send({ error: "malformatted paramters" }).status(400);
  }
  const bmiM: string = calculateBmi(Number(height), Number(weight));
  return _res.json({
    weight: Number(weight),
    height: Number(height),
    bmi: bmiM,
  });
});

app.post("/exercises", (_req, _res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = _req.body;
  if (!target || !daily_exercises) {
    return _res.send({ error: 'missing params'}).status(400);
  }
  if (isNaN(Number(target))) {
    return _res.send({ error: 'malformatted paramaters'}).status(400);
  }
  if (!Array.isArray(daily_exercises) || !isNumArray(daily_exercises)) {
    return _res.send({ error: 'malformatted paramaters'}).status(400);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const ex = calculateExercise(daily_exercises, target);
  return _res.json(ex);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNumArray = (numbers: Array<any>): boolean => {
  for (const num of numbers) {
    if (isNaN(Number(num))) {
      return false;
    }
    }
    return true;
};

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
