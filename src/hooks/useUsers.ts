import { useCallback, useState } from "react";
import type { UserResponse } from "../types/userTypes";
import { getAll } from "../services/apiUsers";
import { getToken } from "../utils/getToken";

export const useUsers = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    const token = getToken();
    if (!token) {
      setError("Token tidak ditemukan. Harap login kembali.");
      setLoading(false);
      return;
    }

    try {
      const userData = await getAll(token);
      setUsers(userData);
    } catch (err: any) {
      setError(
        err.message || "Terjadi kesalahan saat mengambil data pengguna."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
};
