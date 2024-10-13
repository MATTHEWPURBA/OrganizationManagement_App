// src/components/MemberDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MemberDetail = () => {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);
  const [error, setError] = useState(null);

  const fetchMemberDetail = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5001/members/${memberId}`
      );
      setMember(response.data);
    } catch (err) {
      console.error('Failed to fetch member details', err);
      setError('Error fetching member details');
    }
  };

  useEffect(() => {
    fetchMemberDetail();
  }, [memberId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!member) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-4 flex p-4">
      <div className="flex flex-col w-full items-start text-left">
        {/* Profile Picture */}
        <img
          src={member.picture}
          alt={`${member.name}'s profile`}
          className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
        />

        {/* Member Name and Position */}
        <div>
          <h1 className="text-3xl font-semibold mb-4">{member.name}</h1>
          <p className="text-lg text-gray-700">{member.position}</p>
        </div>

        {/* Wider Separator */}
        <hr className="w-full border-t-2 border-gray-200 mt-4" />

        {/* Informasi Pribadi Section */}
        <div className="w-full mt-8"> {/* Increased margin-top */}
          <h2 className="text-2xl font-semibold mb-4">Informasi Pribadi</h2>

          <div className="mt-6 pl-4">
            <div className="mt-4 flex items-center">
              <span className="w-60 font-medium">Nama</span>
              <span className="ml-8 font-light">{member.name || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Wider Separator */}
        <hr className="w-full border-t-2 border-gray-200 mt-8" /> {/* Increased margin-top */}

        {/* Informasi Pekerjaan Section */}
        <div className="w-full mt-8"> {/* Increased margin-top */}
          <h2 className="text-2xl font-semibold mb-4">Informasi Pekerjaan</h2>

          <div className="mt-6 pl-4">
            <div className="mt-4 flex items-center">
              <span className="w-60 font-medium">Role</span>
              <span className="ml-8 font-light">
                {member.position || 'N/A'}
              </span>
            </div>
            <div className="mt-4 flex items-center">
              <span className="w-60 font-medium">Report To</span>
              <span className="ml-8 font-light">
                {member.reports_to || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;