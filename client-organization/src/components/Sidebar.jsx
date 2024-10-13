import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiUsers, FiUserPlus } from 'react-icons/fi'; // Import icons

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      {/* Website Title */}
      <div className="mb-6 mt-2">
        <h1 className="text-2xl font-bold">MyOrganized</h1>
      </div>

      {/* Separator */}
      <hr className="border-gray-600 mb-6" />

      <ul>
        <li className="mb-8">
          <Link
            to="/"
            className={`flex items-center pl-4 pr-4 py-2 rounded-lg hover:text-blue-400 ${
              location.pathname === '/' ? 'bg-blue-600 w-full' : ''
            }`}
          >
            <FiUsers className="mr-3" /> {/* Icon for Member List */}
            Member List
          </Link>
        </li>
        <li className="mb-8">
          <Link
            to="/create"
            className={`flex items-center pl-4 pr-4 py-2 rounded-lg hover:text-blue-400 ${
              location.pathname === '/create' ? 'bg-blue-600 w-full' : ''
            }`}
          >
            <FiUserPlus className="mr-3" /> {/* Icon for Add Member */}
            Add Member
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;