import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((path) => path);

  // Custom labels for specific routes
  const pathNames = {
    create: 'Add New Member', // Custom label for the /create path
    // Add more custom path labels here if needed
  };

  return (
    <nav className="flex py-3 text-white" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {/* Home Link - Check if the current path is "/" */}
        <li className="inline-flex items-center">
          {location.pathname === '/' ? (
            <span className="text-base font-medium text-white">Home</span>
          ) : (
            <Link to="/" className="text-base font-medium text-gray-300 hover:text-white">
              Home
            </Link>
          )}
        </li>

        {/* Loop through each path and display the breadcrumb */}
        {paths.map((path, index) => {
          const url = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;
          const label = pathNames[path] || path; // Use custom label if it exists

          return (
            <li key={index} className="inline-flex items-center">
              {/* Separator ">" */}
              <span className="mx-1 text-gray-300">{'>'}</span>

              {isLast ? (
                // Current page: white color
                <span className="ml-1 text-base font-medium text-white md:ml-2">
                  {label}
                </span>
              ) : (
                // Previous pages: grey color, hover to white
                <Link
                  to={url}
                  className="ml-1 text-base font-medium text-gray-300 hover:text-white md:ml-2"
                >
                  {label}
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