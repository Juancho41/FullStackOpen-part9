import express from "express";

import { parseArguments } from './bmiCalculator';

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const propertyValues: string[] = Object.values(req.query) as string[];
  try {
    let values = parseArguments(propertyValues);
    res.send(values);
  } catch {
    res.send({
      error: "malformatted parameters"
    })
  }


});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
