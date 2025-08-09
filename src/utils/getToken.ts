export const getToken = (): string | null => {
  const token = localStorage.getItem("authToken");
  console.log("Memeriksa token di localStorage:", token);

  if (token) {
    console.log("Token ditemukan di localStorage, set state pengguna.");
  } else {
    console.warn("Token tidak ditemukan di localStorage.");
  }

  return token;
};
