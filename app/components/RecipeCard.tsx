import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface RecipeCardProps {
  title: string;
  slug: string;
  imgUrl: string;
  description?: string;
}

export default function RecipeCard({
  title,
  slug,
  imgUrl,
  description,
}: RecipeCardProps) {
  return (
    <Link href={`/recipes/${slug}`} className="group h-full block">
      <Card className="h-full pt-0 overflow-hidden transition-all duration-300 hover:shadow-lg border-transparent hover:border-border/50 bg-card/50 hover:bg-card">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {description}
          </p>
        </CardContent>

        <CardFooter className="pt-0">
          <span className="text-sm font-medium text-primary group-hover:underline underline-offset-4 flex items-center gap-1">
            View Recipe
            <ArrowForwardIcon
              fontSize="small"
              aria-hidden="true"
              className="text-sm transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
