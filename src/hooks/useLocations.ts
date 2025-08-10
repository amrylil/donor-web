import { useState, useCallback } from "react";
import {
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../services/apiLocations";
import type {   Location, LocationPayload } from "../types/locationTypes";
import { useAuth } from "./useAuth";

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  // Fungsi untuk mengambil semua data, dibungkus useCallback
  const fetchAllLocations = useCallback(async () => {
    if (!token) {
      setError("Otentikasi dibutuhkan.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getAllLocations(token);
      setLocations(data);
    } catch (err: any) {
      setError(err.message || "Gagal memuat data lokasi.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fungsi untuk menambah lokasi baru
  const addNewLocation = useCallback(
    async (locationData: LocationPayload) => {
      if (!token) {
        setError("Otentikasi dibutuhkan.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        await createLocation(locationData, token);
        // Setelah berhasil, langsung muat ulang data agar tabel terupdate
        await fetchAllLocations();
      } catch (err: any) {
        setError(err.message || "Gagal menambah lokasi baru.");
        // Lempar ulang error agar bisa ditangkap di form jika perlu
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchAllLocations]
  );

  // Fungsi untuk memperbarui lokasi
  const updateExistingLocation = useCallback(
    async (id: number, locationData: Partial<LocationPayload>) => {
      if (!token) {
        setError("Otentikasi dibutuhkan.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        await updateLocation(id, locationData, token);
        // Muat ulang data setelah berhasil update
        await fetchAllLocations();
      } catch (err: any) {
        setError(err.message || "Gagal memperbarui lokasi.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchAllLocations]
  );

  // Fungsi untuk menghapus lokasi
  const deleteExistingLocation = useCallback(
    async (id: number) => {
      if (!token) {
        setError("Otentikasi dibutuhkan.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        await deleteLocation(id, token);
        // Muat ulang data setelah berhasil hapus
        await fetchAllLocations();
      } catch (err: any) {
        setError(err.message || "Gagal menghapus lokasi.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchAllLocations]
  );

  return {
    locations,
    loading,
    error,
    fetchAllLocations,
    addNewLocation,
    updateExistingLocation,
    deleteExistingLocation,
  };
};
