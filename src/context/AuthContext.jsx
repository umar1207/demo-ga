import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Hard-coded credentials
const VALID_USERS = [
  { username: 'admin', password: 'admin123', name: 'Admin User' },
  { username: 'demo', password: 'demo2024', name: 'Demo User' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const found = VALID_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser({ username: found.username, name: found.name });
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password.' };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
