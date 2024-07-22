import React, { createContext, useContext, useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useUpdateTheme() {
  return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
  const [themeValue, setThemeValue] = useState('light'); 
  const userdetails = useSelector((state) => state.login.user);
  const { theme } = userdetails || {};
  const [firstTimeCheck, setFirstTimeCheck] = useState(true);

  useEffect(() => {
    if (theme && firstTimeCheck)
    {
      changeTheme(theme); 
      setFirstTimeCheck(false);
    }
    else
    changeTheme(themeValue); 
  }, [themeValue,theme]); 

  const changeTheme = (newTheme) => {
    setThemeValue(newTheme);
    return newTheme;
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <ThemeUpdateContext.Provider value={changeTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
