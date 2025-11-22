"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light-spring"
      themes={[
        "light-spring",
        "light-summer",
        "light-autumn",
        "light-winter",
        "dark-spring",
        "dark-summer",
        "dark-autumn",
        "dark-winter",
      ]}
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
