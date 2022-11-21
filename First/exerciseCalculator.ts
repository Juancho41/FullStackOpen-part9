interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exHours: number[], target: number): Result => {
  const periodLength = exHours.length;
  const trainingDays = exHours.filter((hour) => hour > 0).length;
  const successDays = exHours.filter((hour) => hour >= target).length;

  let success;
  if (periodLength === successDays) {
    success = true;
  } else {
    success = false;
  }

  let rating;
  let ratingDescription;
  if (successDays > periodLength * 0.8) {
    rating = 3;
    ratingDescription = "good week!";
  } else if (successDays >= periodLength * 0.5 && successDays < periodLength * 0.8) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    console.log(periodLength * 0.8);
    console.log(successDays);
    rating = 1;
    ratingDescription = "this has been a bad week";
  }

  const average =
    exHours.reduce((acc, current) => acc + current, 0) / periodLength;
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
