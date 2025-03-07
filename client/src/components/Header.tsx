import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import useAuthStore from '../store/useAuth';
import { Link } from 'react-router-dom';
import { Flame, LogOut, Menu, User } from 'lucide-react';

const Header = () => {
  const {authUser, logout} = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<null | HTMLDivElement>(null);
  
  const handleClickOutside = (e:MouseEvent) => {
    if(dropdownRef.current && !dropdownRef.current.contains(e.target as HTMLDivElement)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);
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
                    alt='User image'
                  />
                  <span className="text-white font-medium">{authUser.name}</span>
                </button>
                {dropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10'>
                    <Link
                      to='/profile'
                      className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className='mr-2' size={16} />
											Profile
                    </Link>
                    <button
                      onClick={logout}
                      className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
                    >
                      <LogOut className='mr-2' size={16} />
											Logout
                    </button>
                  </div>
                )}
              </div>
            ):(
              <>
                <Link
                  to='/auth'
                  className='text-white hover:text-pink-200 transition duration-150 ease-in-out'
                >
                Login
                </Link>
                <Link
                  to='/auth'
                  className='bg-white text-pink-600 px-4 py-2 rounded-full font-medium
                 hover:bg-pink-100 transition duration-150 ease-in-out'
                >
                Sign Up
                </Link>
              </>
            )}
          </div>
          <div className='md:hidden'>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='text-white focus:outline-none'
            >
              <Menu className='size-6' />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;