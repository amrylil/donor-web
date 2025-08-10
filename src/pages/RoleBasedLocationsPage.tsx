import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import LocationTenantPage from "./LocationTenantPage";
import LocationsPage from "./LocationsPage";

const RoleBasedLocationsPage = () => {
  const { profile, getProfile, loading, isAuthReady, user } = useAuth();

  useEffect(() => {
    if (isAuthReady && user && !profile) {
      getProfile();
    }
  }, [isAuthReady, user, profile, getProfile]);

  if (loading || !isAuthReady || !profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const userRole = profile?.user.role;

  if (userRole === "admin") {
    return <LocationTenantPage />;
  } else if (userRole === "superadmin") {
    return <LocationsPage />;
  } else {
    return <div>Anda tidak memiliki akses ke halaman ini.</div>;
  }
};

export default RoleBasedLocationsPage;
