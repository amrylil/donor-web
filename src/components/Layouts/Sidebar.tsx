import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  Locate,
  LocationEditIcon,
  BlindsIcon,
  LogOut,
} from "lucide-react";
import SidebarLink from "./SidebarLink";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  toggle?: () => void;
};

const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside
      className={` flex  flex-col overflow-y-auto bg-red-50 px-5 transition-all rounded-lg duration-300 py-3 ${
        isOpen ? "w-64 m-3" : "w-20 m-3 mr-6"
      }`}
    >
      <button
        onClick={toggle}
        // Logika posisi diubah di sini
        className={`absolute top-9 z-10 flex h-6 w-6 items-center justify-center   transform transition-all duration-200 ${
          isOpen ? "left-56" : "left-20 bg-gray-300 shadow-md"
        }`}
      >
        <ChevronLeft
          className={`h-4 w-4 transition-transform duration-300 ${
            !isOpen && "rotate-180"
          }`}
        />
      </button>

      <div className="text-2xl font-bold text-sky-600">
        <div className="flex transition-all duration-200">
          <img
            src="/images/logo.png"
            alt=""
            className={`${isOpen ? "h-16 w-16" : "h-16 w-16 object-cover"}`}
          />
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col transition-all duration-200 justify-center items-start -space-y-1 -translate-x-2 text-slate-900`}
          >
            <h1 className="text-base">DARAH SIPATUO</h1>
            <h3 className="text-sm font-light">HIDUP BERSAMA</h3>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-2">
          <SidebarLink
            icon={LayoutDashboard}
            text="Dashboard"
            to="/"
            isOpen={isOpen}
            end
          />
          <SidebarLink
            icon={BlindsIcon}
            text="Donations"
            to="/donations"
            isOpen={isOpen}
          />
          <SidebarLink
            icon={LocationEditIcon}
            text="Locations"
            to="/locations"
            isOpen={isOpen}
          />
          <SidebarLink
            icon={Users}
            text="Users Management"
            to="/users"
            isOpen={isOpen}
          />
        </nav>
        <div className="-mx-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-700"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            <span
              className={`mx-2 text-sm font-medium transition-opacity duration-200 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
