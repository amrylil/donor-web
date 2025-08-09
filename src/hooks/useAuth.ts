// hooks/useAuth.ts

import { useState, useEffect } from "react";
import {
  loginWithEmailAndPassword as apiLoginWithEmail,
  loginWithGoogle as apiLoginWithGoogle,
  logout as apiLogout,
  getProfile as apiGetProfile,
  registerAdmin as apiRegisterAdmin,
} from "../services/authService";
import type { AuthResponse, ProfileResponse } from "../types/userTypes";

/**
 * Custom hook untuk mengelola state dan logika otentikasi.
 * @returns {object} Objek yang berisi state otentikasi dan fungsi.
 */
export const useAuth = () => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Memeriksa token di localStorage:", token);
    if (token) {
      console.log("Token ditemukan di localStorage, set state pengguna.");
      setUser({ token });
    }
    setIsAuthReady(true);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const userData = await apiLoginWithEmail(email, password);
      localStorage.setItem("authToken", userData.data.token);
      setUser(userData);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  const registerAdmin = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiRegisterAdmin(email, password, name);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat registrasi admin.");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const userData = await apiLoginWithGoogle();
      // Simpan token ke localStorage
      localStorage.setItem("authToken", userData.data.token);
      setUser(userData);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat login dengan Google.");
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async (): Promise<void> => {
    if (!user || !user.token) {
      setError("Pengguna tidak terautentikasi.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const profileData = await apiGetProfile(user.token);
      setProfile(profileData);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat mengambil profil.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    localStorage.removeItem("authToken");
    await apiLogout();
    setUser(null);
    setLoading(false);
  };

  return {
    user,
    loading,
    error,
    isAuthReady,
    profile,
    login,
    loginWithGoogle,
    logout,
    getProfile,
    apiRegisterAdmin,
    registerAdmin,
  };
};
