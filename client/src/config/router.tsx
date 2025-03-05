import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import ProfilePage from '../pages/ProfilePage';
import ChatPage from '../pages/ChatPage';
import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, element: <HomePage />
      },
      {
        path: '/auth',
        element: <AuthPage />
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
]);
export default router;