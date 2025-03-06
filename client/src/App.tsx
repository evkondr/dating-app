import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/useAuth';

function App() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white">
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
