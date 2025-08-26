import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true); 

  const toggleTheme = () => setDarkMode(prev => !prev);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#000000" : "#ffffff";
    document.body.style.color = darkMode ? "#ffffff" : "#000000"; 
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
