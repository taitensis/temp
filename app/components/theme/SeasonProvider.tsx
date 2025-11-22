"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Season = "spring" | "summer" | "autumn" | "winter";

export function isSeason(value: unknown): value is Season {
  return (
    value === "spring" ||
    value === "summer" ||
    value === "autumn" ||
    value === "winter"
  );
}

type SeasonContextType = {
  season: Season;
  changeSeason: (newSeason?: Season) => void;
};

const SeasonContext = createContext<SeasonContextType | null>(null);

export function useSeason() {
  const ctx = useContext(SeasonContext);
  if (!ctx) throw new Error("useSeason must be used within SeasonProvider");
  return ctx;
}

export function SeasonProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeason] = useState<Season>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("season");
      return (isSeason(stored) ? stored : "spring") as Season;
    }
    return "spring";
  });

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("season")) {
      changeSeason();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("season", season);
    } catch (e) {}
  }, [season]);

  function changeSeason(newSeason?: Season) {
    if (newSeason) {
      setSeason(newSeason);
      return;
    }

    const month = new Date().getMonth(); // 0-11
    if ([11, 0, 1].includes(month)) setSeason("winter");
    else if ([2, 3, 4].includes(month)) setSeason("spring");
    else if ([5, 6, 7].includes(month)) setSeason("summer");
    else setSeason("autumn");
  }

  return (
    <SeasonContext.Provider value={{ season, changeSeason }}>
      {children}
    </SeasonContext.Provider>
  );
}
