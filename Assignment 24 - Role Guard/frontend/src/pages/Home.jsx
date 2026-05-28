import React from 'react';
import { useAuth } from '../auth/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <div style={{ padding: 16 }}>
      <h2>Home</h2>
      {user ? (
        <div>
          <p>Signed in as: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>You are not signed in.</p>
      )}
    </div>
  );
}
