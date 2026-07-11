import { ArrowRight, Box, Compass, MapPin, Wrench } from "lucide-react";

export interface ExploreCardData {
  title: string;
  description: string;
  type: "tool" | "product" | "place" | "resource";
  actionText?: string;
}

interface ExploreCardProps {
  data: ExploreCardData;
}

export function ExploreCard({ data }: ExploreCardProps) {
  const Icon = () => {
    switch (data.type) {
      case "tool":
        return <Wrench className="h-5 w-5 text-[#7b61ff]" />;
      case "product":
        return <Box className="h-5 w-5 text-[#7b61ff]" />;
      case "place":
        return <MapPin className="h-5 w-5 text-[#7b61ff]" />;
      case "resource":
      default:
        return <Compass className="h-5 w-5 text-[#7b61ff]" />;
    }
  };

  return (
    <div className="group relative mt-3 flex cursor-pointer flex-col overflow-hidden rounded-none border border-border/60 bg-bg-base/80 p-4 transition-all duration-300 hover:border-[#7b61ff]/40 hover:bg-bg-subtle hover:shadow-[0_0_20px_rgba(123,97,255,0.05)]">
      {/* Decorative architectural accents */}
      <div className="absolute left-0 top-0 h-1.5 w-1.5 border-l border-t border-text-muted/40 transition-colors group-hover:border-[#7b61ff]/60" />
      <div className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-text-muted/40 transition-colors group-hover:border-[#7b61ff]/60" />

      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-none bg-[#7b61ff]/10">
          <Icon />
        </div>
        <h4 className="hero-display text-base tracking-tight text-text-primary">
          {data.title}
        </h4>
      </div>

      <p className="mono-copy mb-4 text-xs leading-relaxed text-text-secondary">
        {data.description}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-dashed border-border/80 pt-3">
        <span className="mono-copy text-[10px] uppercase tracking-widest text-text-muted">
          Explore {data.type}
        </span>
        <div className="flex items-center gap-1 text-xs font-medium text-[#7b61ff] transition-transform duration-300 group-hover:translate-x-1">
          {data.actionText || "View Details"}
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}
