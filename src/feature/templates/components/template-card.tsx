"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

type TemplateCardProps = {
  name: string;
  description: string;
  url: string;
};

export function TemplateCard({ name, description, url }: TemplateCardProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy");
    }
  };

  return (
    <Card className="cursor-pointer min-w-40 hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg capitalize">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-2">
          <Input readOnly value={url} />
          <Button size="sm" onClick={handleCopy}>
            Copy Url
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
