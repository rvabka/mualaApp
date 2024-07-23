// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode ? JSON.parse(savedMode) : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="absolute z-10 flex rounded-full top-[4.5rem] left-4 bg-navColor text-white shadow-lg duration-200 hover:text-main hover:shadow-main hover:scale-110">
      <button type="button" className="p-3" onClick={toggleTheme}>
        <span>
          {isDarkMode ? (
            <MdOutlineDarkMode size={30} />
          ) : (
            <MdDarkMode size={30} />
          )}
        </span>
      </button>
    </div>
  );
}
