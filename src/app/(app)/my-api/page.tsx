import SearchBar from "@/components/atoms/search-bar";

import { Button } from "@/components/ui/button";

import ApiSection from "@/feature/myApi/components/api-section";
import PageButtons from "@/feature/myApi/components/page-buttons";

import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page: string }>;
}) {
  const pageNumber = (await searchParams).page;

  if (!pageNumber) {
    // ensure consistent URL like /my-api?page=1
    redirect("/my-api?page=1");
  }

  return (
    <div className="min-h-screen bg-background p-8 space-y-10">
      {/* header section  */}
      <div id="heading" className="space-y-2">
        <h2 className="font-semibold text-2xl">My API&apos;s</h2>
        <div>
          <div className="text-md text-foreground/50 flex justify-between">
            <span> Manage your existing mock APIs</span>
            <Link href={"/create-api"}>
              <Button variant="default">
                <Plus /> Create New Api
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-15 w-full flex justify-between ">
          <SearchBar />
          <PageButtons />
        </div>
      </div>

      {/* apis section  */}
      <ApiSection searchParams={searchParams} />
    </div>
  );
}
