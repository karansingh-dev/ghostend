"use client";

import { Button } from "@/components/ui/button";
import { handleCopy } from "@/feature/templates/components/template-card";

export default function ClientSideButton({ url }: { url: string }) {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={async () => {
        await handleCopy(url);
      }}
    >
      Copy Url
    </Button>
  );
}
