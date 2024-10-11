import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Navbar at the top-right of the screen */}
        <Navbar />
        
        {/* Main content area */}
        <div className="p-4 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;