import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      {/* Website Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">MyOrganized</h1>
      </div>

      <ul>
        <li>
          <Link to="/create" className="hover:text-blue-400">
            Add Member
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;