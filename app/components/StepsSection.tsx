import type { Step } from "../lib/types";
import { Typography } from "@/components/ui/typography";

interface StepsSectionProps {
  steps: Step[];
}

export default function StepsSection({ steps }: StepsSectionProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="space-y-8">
      <Typography variant="h2" className="mb-6">
        Steps
      </Typography>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="group flex gap-4 md:gap-6">
            <div className="flex-shrink-0 flex flex-col items-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {index + 1}
              </span>
              {index !== steps.length - 1 && (
                <div className="w-px h-full bg-border my-2" />
              )}
            </div>

            <div className="pb-4 pt-1">
              <Typography
                variant="body"
                className="text-lg leading-relaxed text-foreground/90"
              >
                {step.instruction}
              </Typography>
              {step.note && (
                <div className="mt-3 p-3 bg-muted/30 rounded-lg border-1-2 border-primary/50 text-sm text-muted-foreground italic">
                  NOTE: {step.note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
