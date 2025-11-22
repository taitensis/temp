"use client";

import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { ClassNameValue } from "tailwind-merge";
import { Season } from "@/app/lib/types";
import { cn } from "@/lib/utils";

interface SeasonSelectorProps {
  className?: ClassNameValue;
}

export function SeasonSelector({ className }: SeasonSelectorProps) {
  const { theme, setTheme } = useTheme();

  const currentTheme = theme ?? "light-spring";
  const parts = currentTheme.split("-");
  const season = parts[1] ?? "spring";

  function changeSeason(newSeason: string) {
    const currentTheme = theme ?? "light-spring";
    const parts = currentTheme.split("-");
    const mode = parts[0] ?? "light";

    const newTheme = `${mode}-${newSeason}`;
    setTheme(newTheme);
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Select value={season} onValueChange={changeSeason}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select season" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="spring">🌸 Haru - 春</SelectItem>
            <SelectItem value="summer">☀️ Natsu - 夏</SelectItem>
            <SelectItem value="autumn">🍂 Aki - 秋</SelectItem>
            <SelectItem value="winter">❄️ Fuyu - 冬</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
