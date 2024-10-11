import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5001/members', {
        params: { search, page },
      });
      setMembers(response.data.members);
      setTotalPages(response.data.total_pages);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Failed to fetch members');
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [page, search]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
        Member List
      </h1>

      {/* Search Input */}
      <input
        type="text"
        className="border p-3 mb-6 w-full rounded-md shadow-sm"
        placeholder="Search members..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Member List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            {/* Member Image */}
            <img
              src={member.picture}
              alt={`${member.name}'s profile`}
              className="w-full h-56 object-cover"
            />
            {/* Member Details */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-900">
                {member.name}
              </h2>
              <h3 className="text-md text-gray-700 mb-4">
                Position: {member.position}
              </h3>
              <p className="text-sm text-gray-500">
                Reports To: {member.reports_to}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <button
          className={`px-4 py-2 bg-blue-600 text-white rounded ${
            page === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          {page} / {totalPages}
        </span>
        <button
          className={`px-4 py-2 bg-blue-600 text-white rounded ${
            page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MemberList;
