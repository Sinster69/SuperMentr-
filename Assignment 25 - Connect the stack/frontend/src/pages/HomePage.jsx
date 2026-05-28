import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export function HomePage() {
  const { user, token, logout } = useAuth();

  return (
    <main className="home-shell">
      <section className="hero">
        <p className="eyebrow">Backend connected</p>
        <h1>React frontend, Express API, JWT auth, one clean flow.</h1>
        <p className="subtle">
          This app registers users, logs them in, stores the token, and protects profile access
          through a backend check.
        </p>

        <div className="button-row">
          {token ? (
            <>
              <Link className="primary-link" to="/profile">
                Go to profile
              </Link>
              <button className="secondary-button" type="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="primary-link" to="/login">
                Login
              </Link>
              <Link className="secondary-button" to="/register">
                Register
              </Link>
            </>
          )}
        </div>

        <div className="status-panel">
          <span>Status</span>
          <strong>{token ? `Signed in as ${user?.name || "user"}` : "Signed out"}</strong>
        </div>
      </section>
    </main>
  );
}
