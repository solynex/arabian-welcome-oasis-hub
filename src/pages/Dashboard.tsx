
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ImporterDashboard from '@/components/dashboard/ImporterDashboard';
import ExporterDashboard from '@/components/dashboard/ExporterDashboard';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {user.userType === 'importer' ? <ImporterDashboard /> : <ExporterDashboard />}
    </>
  );
};

export default Dashboard;
