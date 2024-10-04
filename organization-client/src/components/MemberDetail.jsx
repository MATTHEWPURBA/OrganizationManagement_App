// src/components/MemberDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for routing
import axios from 'axios';

const MemberDetail = () => {
  const { memberId } = useParams();
  const [member, setMember] = useState(null);

  const fetchMemberDetail = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5001/members/${memberId}`
      );
      setMember(response.data);
    } catch (error) {
      console.error('Error fetching member details:', error);
    }
  };

  useEffect(() => {
    fetchMemberDetail();
  }, [memberId]);

  if (!member) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{member.name}</h1>
      <p>Position: {member.position}</p>
      <p>Reports To: {member.reports_to}</p>
      <img src={`http://127.0.0.1:5001/${member.picture}`} alt="Profile" />
    </div>
  );
};

export default MemberDetail;
