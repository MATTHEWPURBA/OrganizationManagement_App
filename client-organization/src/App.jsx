// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MemberList from './components/MemberList';
import Layout from './components/Layout';
import MemberDetail from './components/MemberDetail';
import AddMember from './components/AddMember';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <MemberList />
            </Layout>
          }
        />
        <Route
          path="/create"
          element={
            <Layout>
              <AddMember />
            </Layout>
          }
        />
        <Route
          path="/members/:memberId"
          element={
            <Layout>
              <MemberDetail />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
