import React, { useEffect, useRef, useState } from 'react';
import useAuthStore from '../store/useAuth';
import { Link } from 'react-router-dom';
import { Flame, Menu} from 'lucide-react';
import HeaderNav from './HeaderNav';

const Header = () => {
  const {authUser } = useAuthStore();
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
    };
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
                    src={authUser.image ? `http://localhost:5000/${authUser.image}` : '/avatar-thumbnail.png'}
                    className="h-10 w-10 object-cover rounded-full border-2 border-white"
                    alt='User image'
                  />
                  <span className="text-white font-medium">{authUser.name}</span>
                </button>
                {dropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10'>
                    <HeaderNav isAuth clickHandler={() => setDropdownOpen(false)}/>
                  </div>
                )}
              </div>
            ):(
              <HeaderNav />
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
      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className='md:hidden bg-pink-600'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {authUser ? (
              <HeaderNav isAuth isMobile clickHandler={() => setMobileMenuOpen(false)}/>
            ) : (
              <HeaderNav isMobile clickHandler={() => setMobileMenuOpen(false)}/>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;