import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './config/router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
