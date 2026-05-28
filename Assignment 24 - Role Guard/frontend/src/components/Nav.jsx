import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Nav() {
  const { user, logout } = useAuth();
  return (
    <nav style={{ display: 'flex', gap: 12, padding: 16, borderBottom: '1px solid #ddd' }}>
      <Link to="/">Home</Link>
      {user ? (
        <>
          {user.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
