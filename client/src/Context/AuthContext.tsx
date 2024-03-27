import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { isLoggedIn } from "../auth";

interface AuthContextType {
  user: any;
  login: (id: number, username: string, name: string) => {};
  logout: () => {};
}

interface User {
  id: number;
  username: string;
  name: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await isLoggedIn();
      if (isAuthenticated) {
        setUser({ id: 5, username: "matt", name: "matt" });
      }
    };

    checkAuth();
  }, []);

  const login = async (id: number, username: string, name: string) => {
    setUser({ id, username, name });
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
