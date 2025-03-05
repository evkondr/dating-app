import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/useAuth';
import { useNavigate } from 'react-router-dom';

function App() {
  const { checkAuth, checkingAuth, authUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    if(!authUser) {
      navigate('/auth');
    }
  }, [authUser]);
  if(checkingAuth) {
    return (<div>Loading...</div>);
  }
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white">
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
