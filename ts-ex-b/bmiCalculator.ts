const calculateBmi = (height: number, weight: number): String => {
  const heightInMetres = height / 100;
  const bmi = weight / Math.pow(heightInMetres, 2);
  let message = "";
  if (bmi < 18.5) {
    message = "Underweight";
  } else if (bmi > 24.9) {
    message = "Overweight";
  } else {
    message = "Normal";
  }

  return message;
};

console.log(calculateBmi(180, 74));
