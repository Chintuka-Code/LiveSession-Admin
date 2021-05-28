export const ERROR_MESSAGE = (message) => {
  switch (message) {
    case 'jwt expired':
      return 'Your token has expired.Plese login';

    default:
      return message;
  }
};
