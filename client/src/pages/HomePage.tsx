
import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import useMatchStore from '../store/useMatch';

const HomePage = () => {
  const { getProfiles, profiles, loadingProfiles } = useMatchStore();
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  console.log('profiles ', profiles);
  if(loadingProfiles) {
    return (<div>Loading...</div>);
  }
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100
		 overflow-hidden">
      <Sidebar />
    </div>
  );
};

export default HomePage;