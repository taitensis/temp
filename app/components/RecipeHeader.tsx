import Image from "next/image";
import { Serving, Tag, Time } from "../lib/types";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

const TIME_KEYS = [
  "prepTime",
  "cookTime",
  "restTime",
  "marinateTime",
  "chillTime",
  "risingTime",
  "totalTime",
] as const;

const LABELS: Record<(typeof TIME_KEYS)[number], string> = {
  prepTime: "Prep",
  cookTime: "Cook",
  restTime: "Rest",
  marinateTime: "Marinate",
  chillTime: "Chill",
  risingTime: "Rising",
  totalTime: "Total",
};

function formatMinutes(min?: number) {
  if (min == null) return null;
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

interface RecipeHeaderProps {
  title: string;
  imgUrl: string;
  serving: Serving;
  time?: Time;
  tags?: Tag[];
  description?: string;
}

export default function RecipeHeader({
  title,
  imgUrl,
  serving,
  time,
  tags,
  description,
}: RecipeHeaderProps) {
  return (
    <section
      id="RecipeHeader"
      className="flex flex-col gap-6 text-center items-center"
    >
      <div className="flex gap-2 justify-center flex-wrap">
        {tags && tags.length > 0 ? (
          <div className="flex gap-2 justify-center flex-wrap">
            {tags.map((tag) => (
              <Badge key={tag.slug}>{tag.name}</Badge>
            ))}
          </div>
        ) : null}
      </div>

      <Typography variant="h1" className="max-w-3xl">
        {title}
      </Typography>

      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
      )}

      <Typography variant="body">{serving.amount} servings</Typography>

      <div className="flex flex-wrap gap-6 justify-center items-center text-sm font-medium border-y py-4 w-full max-w-2xl">
        <span className="flex items-center gap-1">
          {serving.amount} servings
        </span>
        {time ? (
          <div aria-label="timings">
            {TIME_KEYS.map((key) => {
              const value = time[key];
              const formatted = formatMinutes(value);
              if (!formatted) return null;
              return (
                <span key={key} style={{ marginRight: 12 }}>
                  <span>{LABELS[key]}:</span> {formatted}
                </span>
              );
            })}
          </div>
        ) : null}

        <div className="w-full max-w-4xl mt-6">
          <Image
            src={imgUrl}
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-2xl shadow-md aspect-video"
            alt={title}
            priority
          />
        </div>
      </div>
    </section>
  );
}
