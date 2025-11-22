import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const typographyVariants = cva("text-foreground antialiased", {
  variants: {
    variant: {
      // Ajout de tracking-tight pour les titres (plus moderne)
      logo: "text-4xl font-bold tracking-tight",
      h1: "text-3xl md:text-4xl font-bold tracking-tight", // Responsive font size
      h2: "text-xl md:text-2xl font-semibold tracking-tight",
      h3: "text-lg font-semibold tracking-tight",
      h4: "text-base font-semibold uppercase tracking-wider",

      "body-lg": "text-lg font-normal leading-relaxed",
      body: "text-base font-normal leading-relaxed", // leading-relaxed aide la lecture

      label: "text-sm font-medium leading-none", // medium souvent mieux que semibold pour label

      muted: "text-sm text-muted-foreground",
      "body-muted": "text-base text-muted-foreground",

      "table-header": "text-sm font-medium text-muted-foreground",
      "table-cell": "text-sm font-normal",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const defaultElementMap: Record<string, React.ElementType> = {
  logo: "h1", // Logo est sémantiquement souvent un h1 sur la home
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  "body-lg": "p",
  body: "p",
  label: "span",
  muted: "p",
  "body-muted": "p",
  "table-header": "th",
  "table-cell": "td",
};

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant, as, className, ...props }, ref) => {
    const Component = as || defaultElementMap[variant || "body"] || "p";

    return (
      <Component
        ref={ref as any} // Petit hack TS pour le polymorphisme simple
        className={cn(typographyVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
