import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { capitalizeWords } from './utils';


const Breadcrumbs = () => {
  const location = useLocation();
  const { memberId } = useParams(); // Get memberId from the URL parameters
  const [memberName, setMemberName] = useState('');
  const paths = location.pathname.split('/').filter((path) => path);

  // Custom labels for specific routes
  const pathNames = {
    create: 'Add New Member', // Custom label for the /create path
    // Add more custom path labels here if needed
  };

  // Fetch the member's name if we're on a member detail page
  useEffect(() => {
    const fetchMemberName = async () => {
      if (memberId) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:5001/members/${memberId}`
          );
          setMemberName(response.data.name);
        } catch (err) {
          console.error('Failed to fetch member details', err);
        }
      }
    };
    fetchMemberName();
  }, [memberId]);

  return (
    <nav className="flex py-3 text-white" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {/* Home Link - Check if the current path is "/" */}
        <li className="inline-flex items-center">
          {location.pathname === '/' ? (
            <span className="text-lg font-medium text-white">Home</span>
          ) : (
            <Link
              to="/"
              className="text-lg font-medium text-gray-300 hover:text-white"
            >
              Home
            </Link>
          )}
        </li>

        {/* Loop through each path and display the breadcrumb */}
        {paths.map((path, index) => {
          let label = pathNames[path] || path; // Use custom label if it exists
          const url = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;

          // Handle "members" to redirect to home
          if (path === 'members') {
            label = 'Members';
            return (
              <li key={index} className="inline-flex items-center">
                <span className="mx-1 text-gray-300">{'>'}</span>
                <Link
                  to="/"
                  className="ml-1 text-lg font-medium text-gray-300 hover:text-white md:ml-2"
                >
                  {label}
                </Link>
              </li>
            );
          }

          // Use member name for the last breadcrumb in the member detail page
          if (path === memberId) {
            label = memberName || 'Member Detail'; // Fallback if name not loaded yet
          }

          return (
            <li key={index} className="inline-flex items-center">
              {/* Separator ">" */}
              <span className="mx-1 text-gray-300">{'>'}</span>

              {isLast ? (
                // Current page: white color
                <span className="ml-1 text-lg font-medium text-white md:ml-2">
                  {capitalizeWords(label)}
                </span>
              ) : (
                // Previous pages: grey color, hover to white
                <Link
                  to={url}
                  className="ml-1 text-lg font-medium text-gray-300 hover:text-white md:ml-2"
                >
                  {capitalizeWords(label)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
