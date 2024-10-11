import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMember = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [reportsTo, setReportsTo] = useState('');
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();  // To redirect the user to the homepage

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('reports_to', reportsTo);
    formData.append('picture', picture);

    try {
      const response = await axios.post('http://127.0.0.1:5001/members', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        setSuccess('Member added successfully');
        setError('');

        // Redirect to homepage after 1 second and refresh the page to update data
        setTimeout(() => {
          navigate('/'); // Redirect to the homepage
          window.location.reload(); // Force the homepage to reload
        }, 1000);
      }
    } catch (err) {
      setError('Error adding member');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Member</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="reports_to">Reports To</label>
          <input
            type="text"
            id="reports_to"
            value={reportsTo}
            onChange={(e) => setReportsTo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="picture">Picture</label>
          <input
            type="file"
            id="picture"
            onChange={(e) => setPicture(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMember;