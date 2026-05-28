import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "./api.js";

const AuthContext = createContext(null);

function getInitialAuthState() {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  let parsedUser = null;

  try {
    parsedUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    parsedUser = null;
  }

  return {
    token: storedToken,
    user: parsedUser,
    loading: Boolean(storedToken)
  };
}

export function AuthProvider({ children }) {
  const [state, setState] = useState(getInitialAuthState);

  useEffect(() => {
    if (!state.token) {
      setState((currentState) => ({ ...currentState, loading: false }));
      return;
    }

    let active = true;

    async function loadProfile() {
      try {
        const data = await apiRequest("/api/profile");
        if (!active) {
          return;
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        setState({
          token: localStorage.getItem("token"),
          user: data.user,
          loading: false
        });
      } catch (error) {
        if (!active) {
          return;
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setState({ token: null, user: null, loading: false });
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, [state.token]);

  async function register(payload) {
    const data = await apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
      auth: false
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setState({ token: data.token, user: data.user, loading: false });
    return data;
  }

  async function login(payload) {
    const data = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
      auth: false
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setState({ token: data.token, user: data.user, loading: false });
    return data;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setState({ token: null, user: null, loading: false });
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        loading: state.loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
