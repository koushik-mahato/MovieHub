import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedList, setSavedList] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);

  const getSavedKey = () => (user ? `savedList_${user.email}` : null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setAuthLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      const key = getSavedKey();
      const saved = JSON.parse(localStorage.getItem(key)) || [];
      setSavedList(saved);
    } else {
      setSavedList([]);
    }
  }, [user]);

  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email)) return false;

    const newUser = { email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existing = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!existing) return false;

    setUser(existing);
    localStorage.setItem("user", JSON.stringify(existing));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setSavedList([]);
  };

  const toggleSave = (item) => {
    if (!user) return;
    const key = getSavedKey();
    const already = savedList.find((i) => i.id === item.id);
    const updated = already
      ? savedList.filter((i) => i.id !== item.id)
      : [...savedList, item];
    setSavedList(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const isSaved = (id) => savedList.some((i) => i.id === id);

  const isLoggedIn = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        authLoading,
        signup,
        login,
        logout,
        savedList,
        toggleSave,
        isSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
