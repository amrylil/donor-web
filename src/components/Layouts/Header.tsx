import { Search, Plus, Upload, Mail, Bell, ChevronDown } from "lucide-react";
import type { ProfileResponse } from "../../types/userTypes";
import type React from "react";

interface HeaderProps {
  data: ProfileResponse;
}
const Header: React.FC<HeaderProps> = ({ data }) => {
  return (
    <header className="bg-red-50 px-6 py-2 shadow-sm my-3 mr-3 rounded-lg">
      <div className="flex items-center justify-between">
        {/* Search Section */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search projects, tasks, or users..."
              className="h-11 w-80 rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-3">
          {/* Action Buttons */}
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
            <Upload className="h-4 w-4" />
            Import Data
          </button>

          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:from-blue-700 hover:to-blue-800 shadow-sm transition-all">
            <Plus className="h-4 w-4" />
            Add Project
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* Notification Icons */}
          <div className="flex items-center space-x-1">
            <button className="relative rounded-lg p-2.5 hover:bg-gray-100 transition-colors">
              <Mail className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs font-medium text-white flex items-center justify-center">
                3
              </span>
            </button>

            <button className="relative rounded-lg p-2.5 hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-orange-400"></span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* User Profile */}
          <button className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors group">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/40?u=tmichael"
                alt="User Avatar"
                className="h-9 w-9 rounded-full ring-2 ring-gray-100"
              />
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">
                {data.user.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {data.user.role}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
