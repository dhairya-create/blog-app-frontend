import { createContext, useEffect, useState, type ReactNode } from "react";
import { getProfile } from "../api/auth.api";

type User = {
  id: string;
  username: string;
  fullName: string;
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  loading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((res) => {
        setUser({
          id: res.data._id || res.data.id,
          username: res.data.username,
          fullName: res.data.fullName,
        });
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
