import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import AuthPage from '../../pages/AuthPage';
import ProfilePage from '../../pages/ProfilePage';
import ChatPage from '../../pages/ChatPage';
import App from '../../App';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute>
      <App />
    </PrivateRoute>,
    children: [
      {
        index: true, element: <HomePage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/chat/:id',
        element: <ChatPage />
      },
    ]
  },
  {
    path: '/auth',
    element: <AuthPage />
  },
]);
export default router;