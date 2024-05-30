import { useState, createContext } from "react";

type IntialUserState = {
  user: any;
  setUser: Function;
};

const initialState = {
  user: {},
  setUser: () => {},
};

type AuthProps = {
  children: React.ReactElement;
};

export const AuthContext = createContext<IntialUserState>(initialState);

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState(() => {
    // getting stored value
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    return currentUser;
  });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
