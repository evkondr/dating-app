import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider} from 'react-router-dom';
import router from './components/routes/router';
import Loader from './components/Loader';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<Loader />} />
  </StrictMode>,
);
