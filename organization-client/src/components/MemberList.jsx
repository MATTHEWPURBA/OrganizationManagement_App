// src/components/MemberList.jsx
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
      const response = await axios.get(`http://127.0.0.1:5001/members`, {
        params: { search, page },
      });
      console.log(response, 'ini response');
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
    <div>
      <h1>Member List</h1>
      <input
        type="text"
        placeholder="Search members..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {error && <p>{error}</p>}
      <ul>
        {members.map((member) => (
          <li key={member._id}>
            {member.name} - {member.position}
          </li>
        ))}
      </ul>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
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
