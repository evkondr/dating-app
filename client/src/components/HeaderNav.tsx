import { LogOut, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuth';
interface IProps {
  isAuth?: boolean
  isMobile?: boolean,
  clickHandler?: () => void
}
const HeaderNav= ({
  isAuth = false,
  isMobile = false,
  clickHandler,
}: IProps) => {
  const { logout } = useAuthStore();
  if(isAuth) {
    return (
      <>
        <Link
          to='/profile'
          className={
            isMobile ? 'block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
              :
              'px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
          }
          onClick={clickHandler}
        >
          {!isMobile && <User className='mr-2' size={16} />}
            Profile
        </Link>
        <button
          onClick={logout}
          className={
            isMobile ? 'block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
              :
              'w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
          }
        >
          {!isMobile && <LogOut className='mr-2' size={16} />}
          Logout
        </button>
      </>
    );
  }
  return (
    <>
      <Link to='/auth' className={
        isMobile? 'block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
          :
          'text-white hover:text-pink-200 transition duration-150 ease-in-out'
      }
      onClick={ isMobile ? clickHandler : undefined}  
      >
        Login
      </Link>
      <Link
        to='/auth'
        className={
          isMobile ? 'block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700' : 'bg-white text-pink-600 px-4 py-2 rounded-full font-medium hover:bg-pink-100 transition duration-150 ease-in-out'
        }
        onClick={ isMobile ? clickHandler : undefined}  
      >
          Sign Up
      </Link>
    </>
  );
};

export default HeaderNav;