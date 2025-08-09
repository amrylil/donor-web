import type {
  AuthResponse,
  ProfileResponse,
  UserResponse,
} from "../types/userTypes";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const LOGIN_URL = `${API_BASE_URL}/auth/login`;
  console.log(`Mengirim permintaan login ke: ${LOGIN_URL}`);

  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Terjadi kesalahan saat login.");
    }

    console.log("Login API berhasil!", data);
    return data as AuthResponse;
  } catch (error: any) {
    console.error("Login API gagal:", error.message);
    throw error;
  }
};

/**
 * Mengambil detail profil pengguna dari API menggunakan token.
 * @param {string} token - JWT token milik pengguna.
 * @returns {Promise<ProfileResponse>} Promise yang resolve dengan data profil pengguna.
 */
export const getProfile = async (token: string): Promise<ProfileResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/profile/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const apiResponse = await response.json();

    if (!response.ok || !apiResponse.success) {
      throw new Error(apiResponse.message || "Gagal mengambil data profil.");
    }

    console.log("Profil berhasil diambil:", apiResponse.data);
    return apiResponse.data as ProfileResponse;
  } catch (error: any) {
    console.error("Gagal mengambil profil:", error.message);
    throw error;
  }
};

/**
 * Mensimulasikan login dengan Google (OAuth).
 */
export const loginWithGoogle = (): Promise<AuthResponse> => {
  console.log("Mencoba login dengan Google (simulasi)...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Login Google berhasil!");
      const mockUser: AuthResponse = {
        token: "fake-google-oauth-token",
        user: {
          id: "2",
          name: "Google User",
          email: "google.user@example.com",
        },
      };
      resolve(mockUser);
    }, 1500);
  });
};

export const registerAdmin = async (
  email: string,
  password: string,
  name: string
): Promise<UserResponse> => {
  const URL = `${API_BASE_URL}/auth/register/admin`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Terjadi kesalahan saat register.");
    }

    return data as UserResponse;
  } catch (error: any) {
    console.error("Register API gagal:", error.message);
    throw error;
  }
};

/**
 * Mensimulasikan proses logout.
 */
export const logout = (): Promise<void> => {
  console.log("Logout (simulasi)...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Logout berhasil.");
      resolve();
    }, 500);
  });
};
