"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BarChart3, Code, FolderOpen, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header  */}
      <header className="w-full border-b px-6 md:px-10 py-4 flex justify-between items-center bg-background/50 backdrop-blur">
        <div className="flex items-center gap-2">
          <img src="/assets/ghostend.png" className="h-8" alt="GhostEnd" />
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/create-api">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Main  */}
      <main className="flex-1 flex flex-col items-center mt-20 px-6 text-center">
        {/* Hero Section  */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl">
          Generate Mock APIs <span className="text-primary">in Seconds</span>
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl mt-4">
          Create mock API endpoints with realistic fake data instantly. No
          backend needed. Built for developers.
        </p>

        {/* cta button  */}
        <div className="mt-8 flex gap-4 flex-col sm:flex-row">
          <Link href="/create-api">
            <Button size="lg" className="gap-2">
              <Sparkles className="h-5 w-5" />
              Create API
            </Button>
          </Link>

          <Link href="/documentation">
            <Button variant="outline" size="lg">
              Documentation
            </Button>
          </Link>
        </div>

        {/* features section  */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mt-24 w-full px-2">
          <Card className="shadow-sm hover:shadow-md transition">
            <CardHeader>
              <BarChart3 className="h-6 w-6 text-primary" />
              <CardTitle className="mt-3 text-lg">Mock Everything</CardTitle>
              <CardDescription>
                Any entity, any dataset. Customize fields, counts, and schemas.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition">
            <CardHeader>
              <FolderOpen className="h-6 w-6 text-primary" />
              <CardTitle className="mt-3 text-lg">Save Endpoints</CardTitle>
              <CardDescription>
                Create reusable API endpoints for your dev workflow.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition">
            <CardHeader>
              <Code className="h-6 w-6 text-primary" />
              <CardTitle className="mt-3 text-lg">Developer Friendly</CardTitle>
              <CardDescription>
                Simple REST calls, JSON output. Works with any frontend.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>

      {/* footer  */}
      <footer className="px-6 py-6 border-t text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} Ghost End. All rights reserved.
      </footer>
    </div>
  );
}
