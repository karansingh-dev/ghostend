import { TemplateCard } from "@/feature/templates/components/template-card";
import { schemaPresets } from "@/helpers/schema-presets";

const templateMeta: Record<
  keyof typeof schemaPresets,
  { description: string; endpoints: number }
> = {
  user: {
    description: "Simulated user accounts with profile details.",
    endpoints: 1,
  },
  blogPost: {
    description: "Blog posts with author, content, and metadata.",
    endpoints: 1,
  },
  ecommerce: {
    description: "E-commerce products with price, category, and stock info.",
    endpoints: 1,
  },
  socialPost: {
    description: "Social media posts with user, content, and likes.",
    endpoints: 1,
  },
  analytics: {
    description: "Analytics events with user activity tracking.",
    endpoints: 1,
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-10">
      {/* header section */}
      <div id="heading" className="space-y-2">
        <h2 className="font-semibold text-2xl">Templates</h2>
        <div className="text-md text-foreground/50 flex justify-between">
          <span>Pre-built API templates to get you started quickly</span>
        </div>
      </div>

      {/* templates grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(schemaPresets).map(([key]) => {
          const meta = templateMeta[key as keyof typeof schemaPresets];
          const url = ` ${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/presets/${key}`;
          return (
            <TemplateCard
              key={key}
              name={key}
              description={meta.description}
              url={url}
            />
          );
        })}
      </div>
    </div>
  );
}
