"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Évite les erreurs d'hydratation (le thème n'est connu que côté client)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder invisible de la taille exacte pour éviter le saut de mise en page (CLS)
    return (
      <div className="w-[62px] h-[34px] m-2 inline-block" aria-hidden="true" />
    );
  }

  // Détermine si on est en mode sombre (basé sur le nom du thème ou le système)
  const isDark = theme?.includes("dark") || resolvedTheme === "dark";

  const toggleTheme = () => {
    // Logique intelligente : conserve la saison mais inverse la luminosité
    // Ex: 'light-spring' devient 'dark-spring', 'dark-autumn' devient 'light-autumn'
    if (isDark) {
      const newTheme = theme?.replace("dark", "light") || "light";
      setTheme(newTheme);
    } else {
      const newTheme = theme?.replace("light", "dark") || "dark";
      setTheme(newTheme);
    }
  };

  return (
    <SwitchPrimitives.Root
      checked={isDark}
      onCheckedChange={toggleTheme}
      aria-label="Toggle dark mode"
      className={cn(
        "peer inline-flex h-[34px] w-[62px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 m-2",
        // COULEUR DE LA PISTE (TRACK)
        // On utilise 'bg-muted' pour rester neutre et laisser le bouton (thumb) ressortir
        "bg-muted hover:bg-muted/80"
      )}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-[30px] w-[30px] rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[28px] data-[state=unchecked]:translate-x-0 flex items-center justify-center",
          // COULEUR DU BOUTON (THUMB)
          // Dark (Checked) : Prend la couleur primaire de la saison (ex: Rouge Momiji, Indigo)
          // Light (Unchecked) : Reste blanc/crème pour simuler le soleil
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-background"
        )}
      >
        {isDark ? (
          // ICÔNE LUNE (Visible quand Dark)
          // Couleur : Blanc sur fond coloré (primary-foreground)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-primary-foreground"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        ) : (
          // ICÔNE SOLEIL (Visible quand Light)
          // Couleur : Prend la couleur primaire de la saison (ex: Rouge Momiji sur fond blanc)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-primary"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
}
