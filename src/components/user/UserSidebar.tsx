"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  LogOut, 
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const sidebarItems = [
  {
    title: "Overview",
    href: "/profile",
    icon: LayoutDashboard,
  },
  {
    title: "My Bookings",
    href: "/profile/bookings",
    icon: Calendar,
  },
  {
    title: "Profile Settings",
    href: "/profile/settings",
    icon: Settings,
  },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">LUGVIA</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <div className="px-4 mb-4">
          <div className="flex items-center gap-3 rounded-lg bg-slate-100 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
              <User className="h-5 w-5 text-slate-500" />
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium">My Account</p>
              <p className="truncate text-xs text-muted-foreground">Manage your trips</p>
            </div>
          </div>
        </div>
        
        <nav className="grid items-start px-4 text-sm font-medium">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-slate-100",
                pathname === item.href
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-slate-500"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-slate-500 hover:bg-red-50 hover:text-red-600"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
