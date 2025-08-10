import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  MapPin,
  Building,
  User,
  Phone,
  LayoutGrid,
  List,
  CalendarDays, // Ikon baru untuk event
  Edit,
  Trash2,
} from "lucide-react";

// 1. Definisikan tipe data untuk Lokasi dan Event
interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  status: "Aktif" | "Tutup Sementara";
  pic: string;
  contact: string;
}

interface Event {
  id: number;
  name: string;
  locationId: number; // Kunci untuk menghubungkan ke Lokasi
  date: string; // Format YYYY-MM-DD
}

// Menambah properti 'upcomingEvent' pada Tipe Lokasi yang akan diproses
interface LocationWithEvent extends Location {
  upcomingEvent?: Event;
}

// --- DATA DUMMY ---

const dummyLocations: Location[] = [
  {
    id: 1,
    name: "Unit Donor Darah Toddopuli",
    address: "Jl. Toddopuli Raya No. 1A",
    city: "Makassar",
    status: "Aktif",
    pic: "Andi Pratama",
    contact: "081234567890",
  },
  {
    id: 2,
    name: "Kantor Cabang Panakkukang",
    address: "Jl. Boulevard, Ruko Jasper No. 5",
    city: "Makassar",
    status: "Aktif",
    pic: "Siti Aminah",
    contact: "081234567891",
  },
  {
    id: 3,
    name: "Gerai Donor Mall Ratu Indah",
    address: "Mall Ratu Indah, Lantai 2",
    city: "Makassar",
    status: "Tutup Sementara",
    pic: "Budi Santoso",
    contact: "081234567892",
  },
  {
    id: 4,
    name: "Unit Donor Darah BTP",
    address: "Jl. Tamalanrea Raya, Blok M",
    city: "Makassar",
    status: "Aktif",
    pic: "Dewi Lestari",
    contact: "081234567893",
  },
];

// Data dummy untuk event, perhatikan tanggalnya
const dummyEvents: Event[] = [
  // Event yang akan datang untuk lokasi ID 1
  {
    id: 101,
    name: "Donor Darah Kemerdekaan",
    locationId: 1,
    date: "2025-08-17",
  },
  // Event yang sudah lewat untuk lokasi ID 2
  { id: 102, name: "Aksi Sehat Bersama", locationId: 2, date: "2025-07-20" },
  // Event yang akan datang untuk lokasi ID 4
  { id: 103, name: "Event Hari Pahlawan", locationId: 4, date: "2025-11-10" },
];

// --- FUNGSI HELPER ---
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// --- KOMPONEN-KOMPONEN TAMPILAN ---

const LocationCard = ({ location }: { location: LocationWithEvent }) => {
  const isAktif = location.status === "Aktif";
  const hasUpcomingEvent = !!location.upcomingEvent;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 flex flex-col ${
        hasUpcomingEvent ? "border-amber-400" : "border-gray-200"
      }`}
    >
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <Building className="text-red-600" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-800 leading-tight">
                {location.name}
              </h3>
              <p className="text-xs text-gray-500">{location.city}</p>
            </div>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              isAktif
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {location.status}
          </span>
        </div>
        <div className="space-y-3 text-sm mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin size={14} className="mr-3 flex-shrink-0 text-gray-400" />
            <span>{location.address}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <User size={14} className="mr-3 flex-shrink-0 text-gray-400" />
            <span>{location.pic} (PIC)</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone size={14} className="mr-3 flex-shrink-0 text-gray-400" />
            <span>{location.contact}</span>
          </div>
        </div>

        {/* --- BAGIAN EVENT (HANYA TAMPIL JIKA ADA) --- */}
        {hasUpcomingEvent && (
          <>
            <hr className="my-3 border-gray-200" />
            <div className="bg-amber-50 p-3 rounded-lg">
              <p className="text-xs font-bold text-amber-800 mb-1">
                Event Terdekat:
              </p>
              <div className="flex items-center text-amber-900">
                <CalendarDays size={14} className="mr-3 flex-shrink-0" />
                <div className="text-sm">
                  {/* <p className="font-semibold">{location.upcomingEvent.name}</p> */}
                  <p className="text-xs">
                    {/* {formatDate(location.upcomingEvent.date)} */}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="bg-gray-50 px-5 py-3 flex justify-end items-center gap-3 border-t border-gray-100">
        <button className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
          Edit
        </button>
        <button className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
          Hapus
        </button>
      </div>
    </div>
  );
};

const LocationListItem = ({ location }: { location: LocationWithEvent }) => {
  const isAktif = location.status === "Aktif";
  const hasUpcomingEvent = !!location.upcomingEvent;
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors ${
        hasUpcomingEvent ? "border-amber-400" : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="bg-red-100 p-3 rounded-lg hidden sm:block">
          <Building className="text-red-600" size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-800">{location.name}</h3>
            {hasUpcomingEvent && (
              <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CalendarDays size={12} /> Event
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {location.address}, {location.city}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6 w-full md:w-auto">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full w-full text-center md:w-auto ${
            isAktif
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {location.status}
        </span>
        <div className="flex items-center gap-4 ml-auto">
          <button aria-label="Edit">
            <Edit size={18} className="text-gray-500 hover:text-blue-600" />
          </button>
          <button aria-label="Hapus">
            <Trash2 size={18} className="text-gray-500 hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN HALAMAN UTAMA ---
const LocationTenantPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Menggabungkan data lokasi dengan event yang akan datang
  const locationsWithEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalisasi ke awal hari

    return dummyLocations.map((location) => {
      const upcomingEvent = dummyEvents.find(
        (event) =>
          event.locationId === location.id && new Date(event.date) >= today
      );
      return { ...location, upcomingEvent }; // Tambahkan properti upcomingEvent
    });
  }, []);

  const filteredLocations = useMemo(() => {
    return locationsWithEvents
      .filter((location) => {
        if (statusFilter === "Semua") return true;
        return location.status === statusFilter;
      })
      .filter(
        (location) =>
          location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, statusFilter, locationsWithEvents]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-gray-200 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Lokasi Anda
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Kelola semua lokasi dan lihat jadwal event terdekat.
            </p>
          </div>
          <button className="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
            <Plus size={18} />
            <span>Lokasi Baru</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari lokasi..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500 transition bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Semua</option>
              <option>Aktif</option>
              <option>Tutup Sementara</option>
            </select>
            <div className="flex items-center bg-gray-200 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md ${
                  viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"
                }`}
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md ${
                  viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {filteredLocations.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLocations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLocations.map((location) => (
                <LocationListItem key={location.id} location={location} />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-lg border border-dashed">
            <h3 className="text-xl font-semibold text-gray-700">
              Lokasi Tidak Ditemukan
            </h3>
            <p className="text-gray-500 mt-2">
              Coba ubah kata kunci pencarian atau filter Anda.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LocationTenantPage;
