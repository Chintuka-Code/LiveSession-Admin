export const Filter_Code = (data: any[]) => {
  try {
    let questions = [];
    data.forEach((question) => {
      switch (question.type) {
        case '0':
          if (radioValidation(question)) {
            questions.push({
              question_name: question.question_name,
              type: 'radio',
              point: question.point,
              option: question.option.split(','),
              multiple_answer: [],
              right_answer: question.right_answer,
            });
          } else {
            throw new Error(
              `All Fields Are Required "${question.question_name}"`
            );
          }
          break;
        case '1':
          if (checkboxValidation(question)) {
            questions.push({
              question_name: question.question_name,
              type: 'checkbox',
              point: question.point,
              option: question.option.split(','),
              multiple_answer: question.multiple_answer.split(','),
              right_answer: '',
            });
          } else {
            throw new Error(
              `All Fields Are Required "${question.question_name}"`
            );
          }
          break;
        case '2':
          if (inputValidation(question)) {
            questions.push({
              question_name: question.question_name,
              type: 'singleInput',
              point: question.point,
              option: [],
              multiple_answer: [],
              right_answer: question.right_answer,
            });
          } else {
            throw new Error(
              `All Fields Are Required "${question.question_name}"`
            );
          }
          break;
        case '3':
          if (multipleInputValidation(question)) {
            questions.push({
              question_name: question.question_name,
              type: 'multipleInput',
              point: question.point,
              option: [],
              multiple_answer: question.multiple_answer.split(','),
              right_answer: '',
            });
          } else {
            throw new Error(
              `All Fields Are Required "${question.question_name}"`
            );
          }
          break;
        default:
          console.log('');
      }
    });

    return questions;
  } catch (error) {
    console.log(error);
  }
};

const radioValidation = (data) => {
  if (
    data.question_name &&
    data.type &&
    data.point &&
    data.option &&
    data.right_answer
  ) {
    return true;
  } else {
    return false;
  }
};

const checkboxValidation = (data) => {
  if (
    data.question_name &&
    data.type &&
    data.point &&
    data.option &&
    data.multiple_answer
  ) {
    return true;
  } else {
    return false;
  }
};

const inputValidation = (data) => {
  if (data.question_name && data.type && data.point && data.right_answer) {
    return true;
  } else {
    return false;
  }
};

const multipleInputValidation = (data) => {
  if (data.question_name && data.type && data.point && data.multiple_answer) {
    return true;
  } else {
    return false;
  }
};
