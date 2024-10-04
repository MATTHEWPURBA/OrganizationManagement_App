// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemberList from './components/MemberList';
import AddMember from './components/AddMember';
import MemberDetail from './components/MemberDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MemberList />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/members/:memberId" element={<MemberDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
