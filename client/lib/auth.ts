export const setToken = (token: string) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  document.cookie = `token=${token}; path=/; expires=${expires.toUTCString()}; samesite=strict`;
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
  return match ? match[2] : null;
};

export const removeToken = () => {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
