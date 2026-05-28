import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { apiRequest } from "../auth/api.js";

export function ProfilePage() {
  const { user: authUser, logout } = useAuth();
  const [profile, setProfile] = useState(authUser);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      setLoading(true);
      try {
        const data = await apiRequest("/api/profile");
        if (active) {
          setProfile(data.user);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="profile-shell">
      <section className="profile-card">
        <p className="eyebrow">Protected route</p>
        <h1>Your Profile</h1>
        <p className="subtle">The backend validates the JWT before this data is returned.</p>

        {loading ? <p className="screen-state">Loading profile...</p> : null}
        {error ? <p className="error-banner">{error}</p> : null}

        {profile ? (
          <div className="profile-grid">
            <div>
              <span>Name</span>
              <strong>{profile.name}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>
            {profile.createdAt ? (
              <div>
                <span>Created</span>
                <strong>{new Date(profile.createdAt).toLocaleString()}</strong>
              </div>
            ) : null}
          </div>
        ) : null}

        <button className="secondary-button" type="button" onClick={logout}>
          Logout
        </button>
      </section>
    </main>
  );
}
