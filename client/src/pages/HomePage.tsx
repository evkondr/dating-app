
import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import useMatchStore from '../store/useMatch';
import Header from '../components/Header';

import NoMoreProfiles from '../components/NoMoreProfiles';
import Loader from '../components/Loader';
import SwipeArea from '../components/SwipeArea';
import SwipeFeedback from '../components/SwipeFeedback';
import useAuthStore from '../store/useAuth';

const HomePage = () => {
  const { getProfiles, profiles, loadingProfiles, subscribeToNewMatches, unsubscribeFromNewMatches } = useMatchStore();
  const { authUser } = useAuthStore();
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  useEffect(() => {
    authUser && subscribeToNewMatches();
    return () => {
      unsubscribeFromNewMatches();
    };
  }, [authUser, subscribeToNewMatches, unsubscribeFromNewMatches]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100
		 overflow-hidden">
      <Sidebar />
      <div className='flex-grow flex flex-col overflow-hidden'>
        <Header />
        <main className='flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden'>
          {profiles.length > 0 && !loadingProfiles && (
            <>
              <SwipeArea />
              <SwipeFeedback />
            </>
          )}
          {profiles.length === 0 && !loadingProfiles && <NoMoreProfiles />}

          {loadingProfiles && <Loader />}
        </main>
      </div>
    </div>
  );
};

export default HomePage;