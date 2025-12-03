"use client";
import clsx from "clsx";
import {
  BarChart3,
  BookOpen,
  Code,
  FolderOpen,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  const sidebarItems = [
    { key: "dashboard", name: "Dashboard", icon: BarChart3, to: "/dashboard" },
    { key: "create", name: "Create API", icon: Plus, to: "/create-api" },
    { key: "apis", name: "My APIs", icon: FolderOpen, to: "/my-api" },
    { key: "templates", name: "Templates", icon: Code, to: "/templates" },
    {
      key: "docs",
      name: "Documentation",
      icon: BookOpen,
      to: "/documentation",
    },
    // { key: "settings", name: "Settings", icon: Settings, to: "/settings" },
  ];
  return (
    <div className="w-54 bg-background text-foreground min-h-screen border-r flex flex-col gap-2 shadow-md">
      {/* Header */}
      <div className="flex  h-14 items-center px-6 mb-2">
        <div className="flex items-center ">
          <img src={"/assets/ghostend.png"} alt="ghostend logo" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2">
        <div className="space-y-1">
          {sidebarItems.map(({ key, name, to, icon: Icon }) => (
            <Link
              key={key}
              href={to}
              className={clsx(
                "flex items-center gap-3  rounded-md px-4 py-2 text-sm font-medium transition-colors",
                pathname === to
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-foreground/10 hover:text-accent-foreground text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
