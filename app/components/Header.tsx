"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme/ThemeToggle";
import HamburgerMenu from "./header/HamburgerMenu";
import { SeasonSelector } from "./theme/SeasonSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@/components/ui/typography";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Typography variant="logo">SITE NAME</Typography>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="I feel like..."
              className="w-full pr-10"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full w-10 hover:bg-transparent text-muted-foreground"
            >
              <SearchIcon fontSize="small" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SeasonSelector className="hidden md:block" />
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
}
