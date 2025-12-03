import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllApiData } from "@/feature/myApi/queries/getAllApiData";
import { handleCopy } from "@/feature/templates/components/template-card";
import clsx from "clsx";
import { FolderOpen, Plus } from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";
import ClientSideButton from "./client-side-button";
import ClientSideDeleteButton from "./ client-side-delete-button";

export default async function ApiSection({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page: string }>;
}) {
  const searchQuery = (await searchParams).q || "";
  const pageNumber = (await searchParams).page;

  if (!pageNumber) {
    // ensure consistent URL like /my-api?page=1
    redirect("/my-api?page=1");
  }

  const ghostApiData = await getAllApiData(Number(pageNumber));

  return (
    <div className="space-y-6">
      {ghostApiData
        .filter((api) =>
          api.endPointName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((api) => {
          return (
            <Card key={api.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="">
                    <div className="space-y-2 min-w-160  ">
                      <h3 className="font-semibold">/{api.endPointName}</h3>
                      <p className="text-md text-muted-foreground">
                        {process.env.NEXT_PUBLIC_BASE_URL}/api/v1/{api.apiKey}/
                        {api.endPointName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Created: {api.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Badge
                      className={clsx(
                        "text-xs font-medium",
                        api.apiMethod === "GET" &&
                          "bg-green-100 text-green-800",
                        api.apiMethod === "POST" && "bg-blue-100 text-blue-800",
                        api.apiMethod === "PUT" &&
                          "bg-yellow-100 text-yellow-800",
                        api.apiMethod === "DELETE" && "bg-red-100 text-red-800"
                      )}
                    >
                      {api.apiMethod}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="font-medium">{api.apiCalls}</p>
                      <p className="text-sm text-muted-foreground">calls</p>
                    </div>
                    <Badge
                      className=""
                      variant={api.isActive ? "default" : "secondary"}
                    >
                      active
                    </Badge>

                    <ClientSideButton
                      url={`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${api.apiKey}/${api.endPointName}`}
                    />
                    <ClientSideDeleteButton id={api.id} />

                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

      {ghostApiData.filter((api) =>
        api.endPointName.toLowerCase().includes(searchQuery.toLowerCase())
      ).length === 0 && (
        <Card>
          <CardContent className="p-12 text-center flex flex-col items-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No APIs found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "No APIs match your search criteria."
                : "You haven't created any APIs yet."}
            </p>
            <div>
              <Link
                href="/create-api"
                className="bg-primary/90 hover:bg-primary/100  flex text-sm py-2 w-50 rounded-md justify-center items-center text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First API
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
