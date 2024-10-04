// src/components/AddMember.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddMember = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [reportsTo, setReportsTo] = useState('');
  const [picture, setPicture] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('reports_to', reportsTo);
    formData.append('picture', picture);

    try {
      const response = await axios.post(
        'http://127.0.0.1:5001/members',
        formData
      );
      setMessage(`Member added: ${response.data.member_id}`);
    } catch (error) {
      setMessage(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h1>Add Member</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reports To:</label>
          <input
            type="text"
            value={reportsTo}
            onChange={(e) => setReportsTo(e.target.value)}
          />
        </div>
        <div>
          <label>Picture:</label>
          <input
            type="file"
            onChange={(e) => setPicture(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Add Member</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddMember;
