import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './config/router';
import useAuthStore from './store/useAuth';


function App() {
  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
