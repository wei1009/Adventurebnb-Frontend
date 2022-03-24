export const returnHomePageWithDelay = (time = 2000) => {
  setTimeout(() => {
    window.location.href = "/";
  }, time);
};

