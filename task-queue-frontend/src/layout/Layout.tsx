import React from "react";
import AppRouter from "../routes/AppRouter";
import Sitebar from "../components/sitebar/Sitebar";
import MainHeader from "../components/header/MainHeader";

const Layout: React.FC = () => {
  return (
    <div className="w-screen h-screen flex overflow-x-hidden">
      {/* Sidebar */}
      <Sitebar />

      {/* Main Content Area */}
      <main className="ml-[13%] w-[88%] h-full flex flex-col bg-gray-100">
        {/* Header */}
        <MainHeader />

        {/* Content */}
        <section className="h-full overflow-y-auto p-4 bg-gray-50">
          <div className="h-auto">
            <AppRouter />
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default Layout;
