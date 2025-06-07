import React from 'react';
import logo from '../../../public/logo.png';
import Navbar from './Navbar';

interface SitebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sitebar: React.FC<SitebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      ></div>

      <aside
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
          fixed z-30 top-0 left-0 h-full w-[70%] md:w-[13%]
          bg-white text-black border-r border-gray-300
          transition-transform duration-300 ease-in-out
        `}
      >
        <div className="w-full flex space-x-1 items-center px-3 h-13 border-b border-gray-300">
          <img src={logo} className="h-[60%]" />
          <span className="text-lg font-medium uppercase">Task Queue</span>
        </div>
        <Navbar />
      </aside>
    </>
  );
};

export default Sitebar;
