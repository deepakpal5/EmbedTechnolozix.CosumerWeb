import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("embedtechnolozix_user"));
  });

  // Optional: sync with localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem("embedtechnolozix_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("embedtechnolozix_user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
