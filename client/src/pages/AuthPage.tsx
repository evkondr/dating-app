import React, { useState } from 'react'

const AuthPage = () => {
  const [isLogin, setIslogin] = useState<boolean>(true);
  return (
    <div className='min-h-screen
    flex items-center
    justify-center bg-gradient-to-br
    from-red-500 to-pink-500 p-4'>
      <h2 className="text-center text-3xl font-extrabold text-white mb-8">
        {isLogin ? 'Sign in to Swipe' : 'Create a Swipe account'}
      </h2>
    </div>
  )
}

export default AuthPage