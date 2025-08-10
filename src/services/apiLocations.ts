import type { Location, LocationPayload } from "../types/locationTypes";

const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Mengambil semua lokasi dari server.
 * @param token - JWT Token untuk otorisasi.
 * @returns {Promise<Location[]>} Array dari semua lokasi.
 */
export const getAllLocations = async (token: string): Promise<Location[]> => {
  const response = await fetch(`${API_BASE_URL}/locations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data semua lokasi.");
  }
  return response.json();
};

/**
 * Mengambil lokasi terdekat berdasarkan latitude dan longitude.
 * @param lat - Latitude pengguna.
 * @param lon - Longitude pengguna.
 * @param token - JWT Token untuk otorisasi.
 * @returns {Promise<Location[]>} Array dari lokasi terdekat.
 */
export const getNearbyLocations = async (
  lat: number,
  lon: number,
  token: string
): Promise<Location[]> => {
  const response = await fetch(
    `${API_BASE_URL}/locations/nearby?latitude=${lat}&longitude=${lon}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data lokasi terdekat.");
  }
  return response.json();
};

/**
 * Mengambil satu lokasi berdasarkan ID-nya.
 * @param id - ID dari lokasi yang akan diambil.
 * @param token - JWT Token untuk otorisasi.
 * @returns {Promise<Location>} Objek lokasi yang ditemukan.
 */
export const getLocationById = async (
  id: number,
  token: string
): Promise<Location> => {
  const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Gagal mengambil data lokasi dengan ID: ${id}`);
  }
  return response.json();
};

/**
 * Membuat lokasi baru.
 * @param locationData - Data lokasi baru yang akan dibuat.
 * @param token - JWT Token untuk otorisasi.
 * @returns {Promise<Location>} Objek lokasi yang baru saja dibuat.
 */
export const createLocation = async (
  locationData: LocationPayload,
  token: string
): Promise<Location> => {
  const response = await fetch(`${API_BASE_URL}/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(locationData),
  });

  if (!response.ok) {
    // Coba baca pesan error dari body jika ada
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Gagal membuat lokasi baru.");
  }
  return response.json();
};

/**
 * Memperbarui lokasi yang sudah ada.
 * @param id - ID dari lokasi yang akan diperbarui.
 * @param locationData - Data baru untuk lokasi tersebut. Bisa juga Partial<LocationPayload>.
 * @param token - JWT Token untuk otorisasi.
 * @returns {Promise<Location>} Objek lokasi yang telah diperbarui.
 */
export const updateLocation = async (
  id: number,
  locationData: Partial<LocationPayload>,
  token: string
): Promise<Location> => {
  const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(locationData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `Gagal memperbarui lokasi dengan ID: ${id}`
    );
  }
  return response.json();
};

/**
 * Menghapus sebuah lokasi.
 * @param id - ID dari lokasi yang akan dihapus.
 * @param token - JWT Token untuk otorisasi.
 * @returns {Promise<void>} Tidak mengembalikan apa-apa jika berhasil.
 */
export const deleteLocation = async (
  id: number,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Gagal menghapus lokasi dengan ID: ${id}`);
  }
  // Metode DELETE biasanya tidak mengembalikan body, jadi kita tidak perlu .json()
};
