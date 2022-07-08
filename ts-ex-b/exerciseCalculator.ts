interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  dailyEx: Array<number>;
}

const parseArgumentsA = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (!isNaN(Number(args[2]))) {
    const target = Number(args[2]);
    const  dailyEx: Array<number> = [];
    for (let argIndex = 3; argIndex < args.length; argIndex++) {
      if (!isNaN(Number(args[argIndex]))) {
        dailyEx[argIndex - 3] = Number(args[argIndex]);
      } else {
        throw new Error("Provided values were not numbers!");
      }
    }
    return {
      target,
      dailyEx,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const sum = (nums: Array<number>): number => {
  let sum = 0;
  for (const n of nums) {
    sum = sum + n;
  }
  return sum;
};

export const calculateExercise = (
  dailyEx: Array<number>,
  target: number
): ExerciseResult => {
  const periodLength = dailyEx.length;
  const trainingDays = dailyEx.filter((d) => d > 0).length;
  const average = sum(dailyEx) / periodLength;
  const success: boolean = average >= target;
  let rating = 1;
  let ratingDescription = "terrible";
  if (success) {
    rating = 2;
    ratingDescription = "amazing you did it!";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, dailyEx } = parseArgumentsA(process.argv);
  console.log(calculateExercise(dailyEx, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
