import React from 'react';
import logo from '../../../public/logo2.png'
import Navbar from './Navbar';

const Sitebar: React.FC = () => {
  return (
    <aside className="w-[13%] text-black h-full flex border-1 border-gray-300 flex-col fixed z-10">
    <div className="w-full flex space-x-1 items-center px-3 h-13  border-b-1 border-gray-300">
        <img src={logo} className='h-[60%]' />
        <span className='text-lg font-medium uppercase'>Task Queue</span>
    </div>
      <Navbar />
    </aside>
  );
};

export default Sitebar;
