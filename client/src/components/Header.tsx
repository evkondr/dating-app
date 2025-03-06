import React, { useRef, useState } from 'react';
import useAuthStore from '../store/useAuth';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react'

const Header = () => {
  const {authUser, logout} = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  return (
    <header className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 show-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Flame className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold text-white hidden sm:inline">Swipe</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {authUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <img
                    src={authUser.image || '/avatar-thumbnail.png'}
                    className="h-10 w-10 object-cover rounded-full border-2 border-white"
                  />
                </button>
              </div>
            ):(<div></div>)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;