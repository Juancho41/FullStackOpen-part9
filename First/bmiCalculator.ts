const calculateBmi = (height: number, mass: number): string => {
    const mHeight = height/100;
    const bmi = mass/(mHeight*mHeight);
    if (bmi < 18.5){
        return 'Underweight (low weight)';
    } if ( bmi >= 18.5 && bmi < 24.9) {
        return 'Normal (healthy weight)';
    } else {
        return 'Overweight (high weight)';
    }
}

console.log(calculateBmi(180, 74));