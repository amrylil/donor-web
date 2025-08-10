import {
  ArrowUpRight,
  BarChart3,
  Droplets,
  Users,
  CalendarClock,
  MapPin,
  AlertCircle,
  Activity,
} from "lucide-react";

// Komponen StatCard yang lebih modern dengan gradient dan animasi
const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  gradient,
  iconColor,
}: any) => (
  <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 hover:scale-105">
    <div className={`absolute inset-0 opacity-5 ${gradient}`}></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${gradient} shadow-md`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-600">{title}</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <div className="flex items-center gap-1 text-sm">
          <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          <span className="font-medium text-emerald-600">{change}</span>
        </div>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header dengan gradient */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Dashboard Donor Darah
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  Pantau aktivitas dan statistik donor darah secara real-time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Statistik dengan gradient yang berbeda */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Pendonor"
            value="1,250"
            change="+24 bulan ini"
            icon={Users}
            gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
            iconColor="text-white"
          />
          <StatCard
            title="Kantong Terkumpul"
            value="82"
            change="+12 bulan ini"
            icon={Droplets}
            gradient="bg-gradient-to-br from-red-500 to-pink-500"
            iconColor="text-white"
          />
          <StatCard
            title="Acara Mendatang"
            value="3"
            change="+1 bulan ini"
            icon={CalendarClock}
            gradient="bg-gradient-to-br from-orange-500 to-yellow-500"
            iconColor="text-white"
          />
          <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 hover:scale-105">
            <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-purple-500 to-indigo-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-md">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">
                    Permintaan Darurat
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gray-900">2</p>
                <p className="text-sm text-gray-500 font-medium">
                  Golongan O- dan A+
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid konten utama */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analitik Donasi - Lebih modern */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Analitik Donasi (7 Hari Terakhir)
              </h3>
            </div>
            <div className="mt-6 flex h-40 items-end gap-3">
              {[60, 80, 90, 75, 50, 40, 85].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 hover:scale-110 ${
                      index === 2 || index === 6
                        ? "bg-gradient-to-t from-emerald-500 to-emerald-400 shadow-lg"
                        : "bg-gradient-to-t from-gray-300 to-gray-200"
                    }`}
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">
                    {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stok Darah Kritis */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Stok Darah Kritis
              </h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  type: "O-",
                  count: 2,
                  color: "from-red-500 to-red-400",
                  urgency: "Sangat Kritis",
                },
                {
                  type: "A+",
                  count: 5,
                  color: "from-orange-500 to-orange-400",
                  urgency: "Kritis",
                },
                {
                  type: "B-",
                  count: 8,
                  color: "from-yellow-500 to-yellow-400",
                  urgency: "Perhatian",
                },
              ].map((blood, index) => (
                <div
                  key={index}
                  className="group p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-white hover:to-gray-50 transition-all duration-300 border border-gray-100/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-r ${blood.color} shadow-md`}
                      >
                        <Droplets className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{blood.type}</p>
                        <p className="text-sm text-gray-500">{blood.urgency}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        {blood.count}
                      </p>
                      <p className="text-sm text-gray-500">Kantong</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Baris kedua */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pengingat Acara - Redesign */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                <CalendarClock className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Acara Terdekat
              </h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                <p className="font-bold text-lg text-gray-900 mb-2">
                  Donor Darah di Kantor Gubernur
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Waktu:</span> 10:00 - 14:00 WITA
                </p>
                <button className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>

          {/* Aktivitas Pendonor */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Aktivitas Terbaru
              </h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "Alexandra Deff",
                  action: "Mendonorkan darah (A+)",
                  time: "2 jam lalu",
                  avatar: "alex",
                },
                {
                  name: "Edwin Adenike",
                  action: "Registrasi acara donor",
                  time: "5 jam lalu",
                  avatar: "edwin",
                },
                {
                  name: "Isaac Oluwat",
                  action: "Mendonorkan darah (O-)",
                  time: "Kemarin",
                  avatar: "isaac",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={`https://i.pravatar.cc/40?u=${activity.avatar}`}
                      className="h-12 w-12 rounded-full ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-300"
                      alt={activity.name}
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {activity.name}
                    </p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Jadwal Mobile Unit */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Mobile Unit</h3>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    Mall Panakkukang
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Besok:</span> 13:00 - 17:00
                    WITA
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-red-500 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-gray-600 font-medium">
                  12 donor terdaftar
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifikasi Floating */}
        <div className="fixed bottom-6 right-6 max-w-sm">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg animate-pulse">
                <Droplets className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Donasi Berhasil!
                </p>
                <p className="text-xs text-gray-600">
                  5 kantong darah baru terkumpul
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
