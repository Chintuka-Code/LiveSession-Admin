export const Filter_Code = (data: any[]) => {
  let questions = [];

  data.forEach((question) => {
    switch (question.type) {
      case 'Multiple choice choose one( radio)':
        console.log('Multiple choice choose one( radio)');
        break;
      case 'Multiple choice choose many':
        console.log('Multiple choice choose many');
        break;
      case 'True / False(radio)':
        console.log('True / False(radio)');
        break;
      case 'Fill in the blank single input':
        console.log('Fill in the blank single input');
        break;
      case 'Fill in the blank multiple choice':
        console.log('Fill in the blank multiple choice');
        break;
      default:
        console.log('');
    }
  });
};

const radio = (data) => {
  console.log('radio');
};

const checkbox = (data) => {
  console.log('checkbox');
};

const input = (data) => {
  console.log('input');
};

const input_with_multiple_answer = (data) => {
  console.log('multiple answer');
};
