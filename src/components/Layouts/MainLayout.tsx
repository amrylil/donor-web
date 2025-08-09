import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import HeaderSkeleton from "./HeaderSkeleton"; // 1. Impor komponen skeleton
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { profile, getProfile, loading, error, user, isAuthReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthReady && !user) {
      navigate("/login");
    }

    if (user && !profile) {
      getProfile();
    }
  }, [user, profile, isAuthReady, getProfile, navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthReady) {
    return null;
  }

  if (error) {
    return <div>Error: {error} - Coba refresh halaman.</div>;
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {loading || !profile ? <HeaderSkeleton /> : <Header data={profile} />}
        <main className="flex-1 overflow-y-auto p-8 bg-red-50 mb-3 rounded-lg mr-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
