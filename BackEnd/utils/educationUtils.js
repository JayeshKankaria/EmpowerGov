// Function to calculate the average grade of a student
const calculateAverageGrade = (grades) => {
    if (!Array.isArray(grades) || grades.length === 0) {
      return null;
    }
  
    const sum = grades.reduce((acc, grade) => acc + grade, 0);
    const average = sum / grades.length;
  
    return average.toFixed(2);
  };
  
  // Function to convert a grade to a letter grade
  const convertToLetterGrade = (grade) => {
    if (grade >= 90) {
      return 'A';
    } else if (grade >= 80) {
      return 'B';
    } else if (grade >= 70) {
      return 'C';
    } else if (grade >= 60) {
      return 'D';
    } else {
      return 'F';
    }
  };
  
  module.exports = {
    calculateAverageGrade,
    convertToLetterGrade,
  };