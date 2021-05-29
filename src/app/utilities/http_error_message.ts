export const ERROR_MESSAGE = (message) => {
  switch (message) {
    case 'jwt expired':
      localStorage.clear();
      return 'Your token has expired.Plese login';

    default:
      return message;
  }
};
