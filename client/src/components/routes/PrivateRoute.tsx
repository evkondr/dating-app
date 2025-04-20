import React, { useEffect } from 'react';
import useAuthStore from '../../store/useAuth';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({children}: {children: React.ReactNode}) => {
  const { authUser, checkAuth, checkingAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if(checkingAuth) {
    return null;
  }
  if(!authUser) {
    return <Navigate to='/auth' replace />;
  }
  return children;
};

export default PrivateRoute;