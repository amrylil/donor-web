import React, { useState, useEffect, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth"; // Pastikan path ini benar
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom"; // Uncomment jika menggunakan React Router

// Komponen Ikon Google (SVG)
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.319-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.24 44 30.023 44 24c0-1.341-.138-2.65-.389-3.917z"
    ></path>
  </svg>
);

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, loginWithGoogle, loading, error, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Login berhasil, mengarahkan ke dashboard...");
      navigate("/");
    }
  }, [user, navigate]);

  // 2. Fungsi untuk menangani submit formulir
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email dan password tidak boleh kosong!");
      return;
    }
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <img
        src="/images/stacked.svg"
        alt="Background"
        className="fixed w-screen h-screen object-cover"
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/1920x1080/f1f5f9/334155?text=Background+Error";
        }}
      />
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Panel Kiri - Bagian Selamat Datang */}
          <div className="relative lg:w-1/2 p-0 flex flex-col justify-center text-white overflow-hidden">
            <img
              src="/images/layered.svg"
              alt="Welcome Background"
              className="w-full h-full object-cover absolute"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/800x600/ef4444/ffffff?text=Image+Error";
              }}
            />
            <div className="p-12 h-full flex flex-col justify-between py-24">
              <div className="flex items-center mb-12 relative z-10">
                <div className="w-8 h-8 bg-white rounded-full mr-3"></div>
                <div>
                  <div className="text-lg font-bold">YOUR</div>
                  <div className="text-sm font-medium opacity-90">LOGO</div>
                </div>
              </div>
              <div className="relative z-10">
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Hello,
                  <br />
                  welcome!
                </h1>
                <p className="text-lg opacity-90 max-w-md leading-relaxed">
                  Setiap tetes darah yang kamu donorkan berarti harapan baru
                  bagi seseorang. Bergabunglah dan jadi pahlawan hari ini!
                </p>
              </div>
            </div>
          </div>

          {/* Panel Kanan - Formulir Login */}
          <div className="lg:w-1/2 p-12 flex flex-col justify-center bg-red-50">
            <div className="max-w-md mx-auto w-full">
              {/* Pesan Error akan ditampilkan di sini */}
              {error && (
                <div
                  className="bg-red-200 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md"
                  role="alert"
                >
                  <p className="font-bold">Gagal Login</p>
                  <p>{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@mail.com"
                    className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                    disabled={loading} // Nonaktifkan input saat loading
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400 pr-12"
                      disabled={loading} // Nonaktifkan input saat loading
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-red-600 border-2 border-red-200 rounded focus:ring-red-500 focus:ring-2"
                      disabled={loading}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-red-600 hover:text-red-800 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:bg-red-400 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Login"}
                </button>
              </form>
              <div className="relative flex items-center py-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-xs text-gray-400 font-medium">
                  ATAU LANJUTKAN DENGAN
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <button
                onClick={loginWithGoogle}
                className="w-full flex items-center justify-center bg-white text-gray-700 py-3 px-6 rounded-lg font-semibold border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 shadow-sm disabled:bg-gray-200"
                disabled={loading}
              >
                <GoogleIcon />
                <span className="ml-3">Masuk dengan Google</span>
              </button>
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Belum punya akun?{" "}
                  <a
                    href="#"
                    className="font-semibold text-red-600 hover:text-red-800 transition-colors"
                  >
                    Daftar di sini
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
