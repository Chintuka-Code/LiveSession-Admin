export const ERROR_MESSAGE = (message, err) => {
  switch (message) {
    case 'jwt expired':
      localStorage.clear();
      window.location.reload();
      return 'Your token has expired.Plese login';

    case `E11000 duplicate key error collection: liveSession.categories index: category_name_1 dup key: { category_name: "Academics Team" }`:
      return 'Category Already Found';

    default:
      return message;
  }
};
