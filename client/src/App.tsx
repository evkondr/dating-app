import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
