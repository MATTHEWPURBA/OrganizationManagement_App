import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { capitalizeWords } from './utils';
import { useNavigate } from 'react-router-dom';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedMembers = [...members].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleRowClick = (memberId) => {
    navigate(`/members/${memberId}`);
  };

  return (
    <div className="max-w-12xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-2 text-left text-black-700">
        Daftar Karyawan
      </h1>
      <h2 className="text-lg text-gray-600 text-left mb-4">
        Total {members.length} Karyawan
      </h2>

      {/* Search Input */}
      <input
        type="text"
        className="border p-3 mb-6 w-full rounded-md shadow-sm"
        placeholder="Search members..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-left">{error}</p>}

      {/* Member Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th
                className="px-6 py-3 border-b cursor-pointer text-left"
                onClick={() => handleSort('name')}
              >
                Name{' '}
                {sortConfig.key === 'name'
                  ? sortConfig.direction === 'asc'
                    ? '↑'
                    : '↓'
                  : ''}
              </th>
              <th
                className="px-6 py-3 border-b cursor-pointer text-left"
                onClick={() => handleSort('position')}
              >
                Position{' '}
                {sortConfig.key === 'position'
                  ? sortConfig.direction === 'asc'
                    ? '↑'
                    : '↓'
                  : ''}
              </th>
              <th className="px-6 py-3 border-b text-left">Reports To</th>
            </tr>
          </thead>
          <tbody>
            {sortedMembers.map((member) => (
              <tr
                key={member._id}
                className="hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => handleRowClick(member._id)} // Row is clickable
              >
                <td className="px-6 py-4 border-b text-left flex items-center">
                  {/* Member Picture */}
                  <img
                    src={member.picture}
                    alt={`${member.name}'s profile`}
                    className="w-10 h-10 rounded-full mr-4 object-cover"
                  />
                  {/* Member Name */}
                  {capitalizeWords(member.name)}
                </td>
                <td className="px-6 py-4 border-b text-left">
                  {capitalizeWords(member.position)}
                </td>
                <td className="px-6 py-4 border-b text-left">
                  {capitalizeWords(member.reports_to)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
