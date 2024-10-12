import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-200 "> {/* Grayish background with padding */}
      <div className="flex min-h-screen">
        {/* Sidebar on the left */}
        <Sidebar />

        <div className="flex-1 flex flex-col"> 
          {/* Navbar at the top-right of the screen */}
          <Navbar />

          {/* Main content area */}
          <div className="flex-1 bg-white shadow-md p-6 mt-5 ml-5 mx-0  mr-5 rounded-lg"> {/* White background with space around it */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;