interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

const sum = (nums: Array<number>): number => {
  let sum = 0;
  for (let n of nums) {
    sum = sum + n;
  }
  return sum;
};

const calculateExercise = (
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

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));
