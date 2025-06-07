import React, { useState } from "react";
import AppRouter from "../routes/AppRouter";
import Sitebar from "../components/sitebar/Sitebar";
import MainHeader from "../components/header/MainHeader";
import { GiHamburgerMenu } from "react-icons/gi";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-screen h-screen flex overflow-x-hidden">
      <Sitebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="ml-0 w-full md:ml-[13%] md:w-[87%] h-full flex flex-col bg-gray-100">
        <div className="md:hidden p-3">
          <button onClick={() => setSidebarOpen(true)}>
            <GiHamburgerMenu size={24} />
          </button>
        </div>

        <MainHeader />

        <section className="h-full overflow-y-auto p-4 bg-gray-50">
          <AppRouter />
        </section>
      </main>
    </div>
  );
};

export default Layout;
