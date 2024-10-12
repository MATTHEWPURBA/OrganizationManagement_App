import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      {/* Website Title */}
      <div className="mb-6 mt-2">
        <h1 className="text-2xl font-bold">MyOrganized</h1>
      </div>
      {/* Separator */}
      <hr className="border-gray-600 mb-6" /> {/* Gray separator line */}
      <ul>
        <li className="mb-8">
          <Link to="/" className="hover:text-blue-400 pl-4">
            {' '}
            {/* Added padding-left */}
            Member List
          </Link>
        </li>
        <li className="mb-8">
          <Link to="/create" className="hover:text-blue-400 pl-4">
            {' '}
            {/* Added padding-left */}
            Add Member
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
