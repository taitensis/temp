"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        aria-label="Toggle theme"
        className="px-3 py-1 rounded"
      >
        <LightModeIcon />
      </Button>
    );
  }

  const current = resolvedTheme ?? theme ?? "light-spring";
  const isDark = current.startsWith("dark"); // Check if it starts with "dark"

  function toggle() {
    const currentTheme = theme ?? "light-spring";
    console.log("Current theme:", currentTheme);

    const parts = currentTheme.split("-");
    const currentMode = parts[0] ?? "light";
    const season = parts[1] ?? "spring"; // Fallback to spring if missing

    const newMode = currentMode === "light" ? "dark" : "light";
    const newTheme = `${newMode}-${season}`;

    console.log("New theme:", newTheme);
    setTheme(newTheme);
  }

  return (
    <Button
      variant="ghost"
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={isDark}
    >
      {isDark ? <LightModeIcon /> : <DarkModeIcon />}
    </Button>
  );
}
