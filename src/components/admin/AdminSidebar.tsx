"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Calendar, 
  LogOut, 
  Globe,
  Map
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: Calendar,
  },
  {
    title: "Blog Posts",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Destinations",
    href: "/admin/destinations",
    icon: Map,
  },
  {
    title: "SEO Pages",
    href: "/admin/seo",
    icon: Globe,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-slate-950 text-slate-50">
      <div className="flex h-14 items-center border-b border-slate-800 px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">LUGVIA</span> Admin
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-slate-400 hover:bg-slate-800"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-slate-800 p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-slate-400 hover:bg-slate-800 hover:text-white"
          onClick={() => signOut({ callbackUrl: "/admin-login" })}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
