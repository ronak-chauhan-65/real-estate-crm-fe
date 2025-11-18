let navigateFn = null;

export const setNavigator = (navigate) => {
  navigateFn = navigate;
};

export const navigateTo = (path) => {
  if (navigateFn) {
    navigateFn(path);
  }
};
