import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs'; // Import Breadcrumbs

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-between items-center">
        {/* Breadcrumbs on the left */}
        <div className="flex">
          <Breadcrumbs />
        </div>

        {/* Sign Out button on the right */}
        <div className="text-xl">
          <Link to="/signout" className="ml-6">
            Sign Out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;