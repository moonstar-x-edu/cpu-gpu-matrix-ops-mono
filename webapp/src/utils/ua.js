export const getUA = () => {
  if (!navigator) {
    return null;
  }

  return navigator.userAgent;
};
