import type { UserResponse } from "../types/userTypes";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getAll = async (token: string): Promise<UserResponse[]> => {
  const USERS_URL = `${API_BASE_URL}/users/`;
  console.log(`Mengambil semua pengguna dari: ${USERS_URL}`);

  try {
    const response = await fetch(USERS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengambil data pengguna.");
    }

    return data.data.data as UserResponse[];
  } catch (error: any) {
    console.error("Gagal mengambil data pengguna:", error.message);
    throw error;
  }
};
