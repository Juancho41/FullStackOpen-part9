import express from "express";

import { parseArguments } from './bmiCalculator';
import { calculateExercises2 } from './exerciseCalculator';

const app = express();

app.use(express.json())

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


app.post("/excalculator", (req, res) => {
  // const asdf = req.body
  // console.log(asdf.title)
  // res.send(asdf)

  const target: number = req.body.target;
  const lista: number[] = req.body.daily_exercises;


  try {
    let values = calculateExercises2(target, lista);
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
