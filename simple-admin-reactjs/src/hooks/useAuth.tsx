import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { IAuthValue, Iprops } from "../@types";

const defaultState: IAuthValue = {
  user: {},
  token: ''
}
const AuthContext = createContext<IAuthValue>(defaultState);

export const AuthProvider: React.FC<Iprops> = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage('user', userData);
  const [token, setToken] = useLocalStorage('token', '');

  // call this function when you want to authenticate the user
  const login = (user: object, token: string) => {
    setUser(user);
    setToken(token);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    login,
    logout
  }),
    [user]
  );
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};