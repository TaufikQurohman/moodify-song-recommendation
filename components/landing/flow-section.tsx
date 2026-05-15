import { Brain, FileText, ListMusic } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { flowSteps } from "@/constants/content";

const icons = [FileText, Brain, ListMusic];

export function FlowSection() {
  return (
    <section id="flow" className="px-4 py-20">
      <div className="container max-w-5xl">
        <SectionHeading
          eyebrow="How it works"
          title="Simple flow, real semantic matching."
          description="The frontend stays minimal. The backend handles embeddings, similarity scoring, and Top-10 retrieval."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {flowSteps.map((step, index) => {
            const Icon = icons[index];
            return (
              <div key={step.title} className="rounded-lg border border-foreground/10 bg-[#172033] p-5">
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
