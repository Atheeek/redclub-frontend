import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// This component checks if a user is an authenticated staff member or admin
const ProtectedRoute = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // While the auth status is being checked from the context, show a loading message
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Verifying access...</div>;
  }

  // Check for authentication and the correct role after loading is complete
  const isAuthorized = isAuthenticated && (user?.role === 'Staff' || user?.role === 'Admin');

  // If authorized, render the component for the route (e.g., AdminDashboard).
  // The <Outlet /> component is a placeholder for the actual page component.
  if (isAuthorized) {
    return <Outlet />;
  }

  // If not authorized, redirect the user to the login page.
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;