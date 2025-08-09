import {
  ArrowUpRight,
  BarChart3,
  Droplets,
  Users,
  CalendarClock,
  MapPin,
} from "lucide-react";

// Komponen kecil untuk kartu statistik di bagian atas
const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="rounded-lg border bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">{title}</p>
      <Icon className={`h-5 w-5 ${color}`} />
    </div>
    <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
    <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
      <ArrowUpRight className="h-4 w-4" /> {change}
    </p>
  </div>
);

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-1 text-gray-500">
          Ringkasan aktivitas dan statistik donor darah.
        </p>
      </div>

      {/* Grid Utama */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Kartu Statistik */}
        <StatCard
          title="Total Pendonor"
          value="1,250"
          change="+24 dari bulan lalu"
          icon={Users}
          color="text-sky-600"
        />
        <StatCard
          title="Kantong Terkumpul (Bulan Ini)"
          value="82"
          change="+12 dari bulan lalu"
          icon={Droplets}
          color="text-red-500"
        />
        <StatCard
          title="Acara Mendatang"
          value="3"
          change="+1 dari bulan lalu"
          icon={CalendarClock}
          color="text-orange-500"
        />
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Permintaan Darurat</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">2</p>
          <p className="mt-1 text-xs text-gray-500">Golongan O- dan A+</p>
        </div>

        {/* Analitik Donasi & Pengingat Acara (mengambil 2 kolom) */}
        <div className="lg:col-span-2 rounded-lg border bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800">
            Analitik Donasi (7 Hari Terakhir)
          </h3>
          <div className="mt-4 flex h-32 items-end gap-4">
            {/* Placeholder untuk bar chart */}
            <div className="w-full h-full flex items-end justify-around">
              <div
                className="w-8 bg-gray-200 rounded-t-md"
                style={{ height: "60%" }}
              ></div>
              <div
                className="w-8 bg-gray-200 rounded-t-md"
                style={{ height: "80%" }}
              ></div>
              <div
                className="w-8 bg-green-500 rounded-t-md"
                style={{ height: "90%" }}
              ></div>
              <div
                className="w-8 bg-gray-200 rounded-t-md"
                style={{ height: "75%" }}
              ></div>
              <div
                className="w-8 bg-gray-200 rounded-t-md"
                style={{ height: "50%" }}
              ></div>
              <div
                className="w-8 bg-gray-200 rounded-t-md"
                style={{ height: "40%" }}
              ></div>
              <div
                className="w-8 bg-gray-200 rounded-t-md"
                style={{ height: "65%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-lg border bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800">
            Pengingat Acara Terdekat
          </h3>
          <div className="mt-3">
            <p className="font-medium text-lg text-gray-800">
              Donor Darah di Kantor Gubernur
            </p>
            <p className="text-sm text-gray-500">Waktu: 10:00 - 14:00 WITA</p>
            <button className="mt-4 w-full rounded-md bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700">
              Lihat Detail
            </button>
          </div>
        </div>

        {/* Aktivitas Pendonor (mengambil 2 kolom) */}
        <div className="lg:col-span-2 rounded-lg border bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800">
            Aktivitas Pendonor Terbaru
          </h3>
          <ul className="mt-3 space-y-4">
            <li className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40?u=alex"
                className="h-9 w-9 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Alexandra Deff</p>
                <p className="text-xs text-gray-500">Mendonorkan darah (A+)</p>
              </div>
              <span className="text-xs text-gray-400">2 jam lalu</span>
            </li>
            <li className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40?u=edwin"
                className="h-9 w-9 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Edwin Adenike</p>
                <p className="text-xs text-gray-500">Registrasi acara donor</p>
              </div>
              <span className="text-xs text-gray-400">5 jam lalu</span>
            </li>
            <li className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40?u=isaac"
                className="h-9 w-9 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Isaac Oluwat</p>
                <p className="text-xs text-gray-500">Mendonorkan darah (O-)</p>
              </div>
              <span className="text-xs text-gray-400">Kemarin</span>
            </li>
          </ul>
        </div>

        {/* Stok Darah & Jadwal Mobile Unit */}
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800">Stok Darah Kritis</h3>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <Droplets className="h-4 w-4 text-red-500" /> O- (2 Kantong)
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Droplets className="h-4 w-4 text-red-500" /> A+ (5 Kantong)
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Droplets className="h-4 w-4 text-orange-400" /> B- (8 Kantong)
            </li>
          </ul>
        </div>
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800">Jadwal Mobile Unit</h3>
          <div className="mt-3">
            <p className="flex items-center gap-2 font-medium text-gray-800">
              <MapPin className="h-4 w-4 text-sky-600" /> Mall Panakkukang
            </p>
            <p className="text-sm text-gray-500">Besok, 13:00 - 17:00 WITA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
