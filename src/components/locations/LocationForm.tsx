import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce"; // Impor hook yang baru dibuat
import { MapPin, Loader, Search } from "lucide-react";

// Definisikan tipe data untuk hasil dari Nominatim
interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  name?: string; // Kadang disebut 'name' atau 'display_name'
  address: {
    city?: string;
    town?: string;
    village?: string;
    suburb?: string;
    road?: string;
    postcode?: string;
    country?: string;
  };
}

// Definisikan tipe data yang akan dikirim ke API Anda
interface LocationPayload {
  location_name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
}

const LocationForm = ({ onClose }: { onClose: () => void }) => {
  // State untuk form utama yang akan dikirim ke API Anda
  const [locationData, setLocationData] = useState<Partial<LocationPayload>>(
    {}
  );

  // State untuk fitur pencarian
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Gunakan hook debounce untuk query pencarian
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // useEffect ini akan berjalan ketika pengguna berhenti mengetik
  useEffect(() => {
    if (debouncedSearchQuery.length < 3) {
      setSearchResults([]);
      return;
    }

    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          q: debouncedSearchQuery,
          format: "jsonv2",
          addressdetails: "1",
        });
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?${params.toString()}`
        );
        const data: NominatimResult[] = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Gagal mengambil data dari Nominatim:", error);
        // Anda bisa menambahkan state untuk menampilkan pesan error di UI
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, [debouncedSearchQuery]);

  // Fungsi ini dipanggil saat admin memilih salah satu hasil pencarian
  const handleSelectLocation = (result: NominatimResult) => {
    setLocationData({
      location_name: result.name || result.display_name.split(",")[0],
      address: result.display_name,
      city:
        result.address.city ||
        result.address.town ||
        result.address.village ||
        "",
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
    });
    // Kosongkan hasil pencarian setelah dipilih
    setSearchQuery(result.display_name);
    setSearchResults([]);
  };

  // Fungsi untuk submit ke API Anda
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationData.latitude || !locationData.longitude) {
      alert("Silakan cari dan pilih lokasi terlebih dahulu.");
      return;
    }
    try {
      // Ganti URL dengan endpoint API Anda
      const response = await fetch("/api/locations", {
        // Contoh endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer YOUR_TOKEN' // Jika butuh otentikasi
        },
        body: JSON.stringify(locationData),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan data ke server.");
      }

      alert("Lokasi berhasil disimpan!");
      onClose(); // Tutup modal atau form
    } catch (error) {
      console.error("Error saat submit:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700"
        >
          Cari Alamat atau Nama Tempat
        </label>
        <div className="relative mt-1">
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Contoh: Menara Phinisi, Makassar"
            className="w-full rounded-md border-gray-300 pl-10 shadow-sm sm:text-sm"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {isLoading ? (
              <Loader className="h-5 w-5 animate-spin text-gray-400" />
            ) : (
              <Search className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* --- DAFTAR HASIL PENCARIAN --- */}
        {searchResults.length > 0 && (
          <div className="mt-2 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white">
            <ul className="divide-y divide-gray-200">
              {searchResults.map((result) => (
                <li key={result.place_id}>
                  <button
                    type="button"
                    onClick={() => handleSelectLocation(result)}
                    className="flex w-full items-start gap-3 p-3 text-left hover:bg-gray-50"
                  >
                    <MapPin className="h-5 w-5 flex-shrink-0 text-gray-400 mt-1" />
                    <span className="text-sm text-gray-800">
                      {result.display_name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <hr />

      {/* --- PREVIEW DATA YANG AKAN DIKIRIM --- */}
      <div className="space-y-4 rounded-md bg-gray-50 p-4">
        <h3 className="font-medium text-gray-900">Data yang Akan Disimpan</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs text-gray-500">Nama Lokasi</label>
            <input
              type="text"
              readOnly
              value={locationData.location_name || ""}
              className="mt-1 w-full rounded-md border-gray-300 bg-gray-200 sm:text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Kota</label>
            <input
              type="text"
              readOnly
              value={locationData.city || ""}
              className="mt-1 w-full rounded-md border-gray-300 bg-gray-200 sm:text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-gray-500">Alamat Lengkap</label>
            <input
              type="text"
              readOnly
              value={locationData.address || ""}
              className="mt-1 w-full rounded-md border-gray-300 bg-gray-200 sm:text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Latitude</label>
            <input
              type="number"
              readOnly
              value={locationData.latitude || ""}
              className="mt-1 w-full rounded-md border-gray-300 bg-gray-200 sm:text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Longitude</label>
            <input
              type="number"
              readOnly
              value={locationData.longitude || ""}
              className="mt-1 w-full rounded-md border-gray-300 bg-gray-200 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          type="submit"
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Simpan Lokasi
        </button>
      </div>
    </form>
  );
};

export default LocationForm;
