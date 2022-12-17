interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}



// const parseArgs = (args: string[]): number[] => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   args.splice(0, 2);
//   let numList: number[] = [];
//   for (let item of args) {
//     if (!isNaN(Number(item))) {
//       let numItem: number = Number(item);
//       numList.push(numItem);
//     } else {
//       throw new Error("Provided values were not numbers!");
//       break;
//     }
//   }
//   return numList;
// };

// const calculateExercises = (lista: number[]): Result => {
//   const target: number = Number(lista.splice(0, 1));
//   const exHours: number[] = lista;
//   const periodLength = exHours.length;
//   const trainingDays = exHours.filter((hour) => hour > 0).length;
//   const successDays = exHours.filter((hour) => hour >= target).length;

//   let success;
//   if (periodLength === successDays) {
//     success = true;
//   } else {
//     success = false;
//   }

//   let rating;
//   let ratingDescription;
//   if (successDays > periodLength * 0.8) {
//     rating = 3;
//     ratingDescription = "good week!";
//   } else if (
//     successDays >= periodLength * 0.5 &&
//     successDays < periodLength * 0.8
//   ) {
//     rating = 2;
//     ratingDescription = "not too bad but could be better";
//   } else {
//     console.log(periodLength * 0.8);
//     console.log(successDays);
//     rating = 1;
//     ratingDescription = "this has been a bad week";
//   }

//   const average =
//     exHours.reduce((acc, current) => acc + current, 0) / periodLength;
//   return {
//     periodLength: periodLength,
//     trainingDays: trainingDays,
//     success: success,
//     rating: rating,
//     ratingDescription: ratingDescription,
//     target: target,
//     average: average,
//   };
// };




const calculateExercises2 = (target: number, lista: number[]): Result => {


  const exHours: number[] = lista;
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
  } else if (
    successDays >= periodLength * 0.5 &&
    successDays < periodLength * 0.8
  ) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
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

// try {
//   const pruebaLista = parseArgs(process.argv);
//   console.log(calculateExercises(pruebaLista));
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }


export { calculateExercises2 };