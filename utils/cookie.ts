export const setAuthCookie = (token: string) => {
  document.cookie = `token=${token}; path=/;`;
};

export const removeAuthCookie = () => {
  document.cookie = "token=; path=/; max-age=0";
};
