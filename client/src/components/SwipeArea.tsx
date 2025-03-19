import React from 'react';
import useMatchStore from '../store/useMatch';
import ProfileCard from './ProfileCard';

const SwipeArea = () => {
  const { profiles } = useMatchStore();
  return (
    <div className='relative w-full max-w-sm h-[28rem]'>
      {profiles.map((user) => (
        <ProfileCard
         
          key={user.id}
        >
          <div className='card bg-white w-96 h-[28rem] select-none rounded-lg overflow-hidden border border-gray-200'>
            <figure className='px-4 pt-4 h-3/4'>
              <img
                src={user.image || '/avatar-thumbnail.png'}
                alt={user.name}
                className='rounded-lg object-cover h-full pointer-events-none'
              />
            </figure>
            <div className='card-body bg-gradient-to-b from-white to-pink-50'>
              <h2 className='card-title text-2xl text-gray-800'>
                {user.name}, {user.age}
              </h2>
              <p className='text-gray-600'>{user.bio}</p>
            </div>
          </div>
        </ProfileCard>))}
    </div>
  );
};

export default SwipeArea;