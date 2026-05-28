import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:4000';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/admin/users`);
        setUsers(res.data.users);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load users');
      }
    };

    loadUsers();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Admin Panel</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
