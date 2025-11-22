"use client";

import { type } from "os";
import { useState, useEffect, createContext, useContext } from "react";

type ThemeContextType = {
  mode: string;
  season: string;
  toggleMode: () => void;
  changeSeason: (newSeason?: string) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mode") || "light";
    }
    return "light";
  });

  const [season, setSeason] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("season") || "spring";
    }
    return "spring";
  });

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("season")) {
      changeSeason();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("season", season);
  }, [season]);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  function toggleMode() {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    // setMode(mode === 'light' ? 'dark' : 'light');
  }

  function changeSeason(newSeason?) {
    if (newSeason) {
      setSeason(newSeason);
    } else {
      const today = new Date();
      const month = today.getMonth();
      switch (month) {
        case 0:
        case 1:
        case 11:
          setSeason("winter");
          break;
        case 2:
        case 3:
        case 4:
          setSeason("spring");
          break;
        case 5:
        case 6:
        case 7:
          setSeason("summer");
          break;
        case 8:
        case 9:
        case 10:
          setSeason("autumn");
          break;
      }
    }
  }

  function applyTheme(currentMode: string, currentSeason: string) {}

  return (
    <ThemeContext.Provider value={{ mode, season, toggleMode, changeSeason }}>
      {/* value={{ mode: mode, season: season, toggleMode: toggleMode, changeSeason: changeSeason }} = explicit syntax */}
      {children}
    </ThemeContext.Provider>
  );
}
