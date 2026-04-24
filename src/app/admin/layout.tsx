import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Globe,
  Layout as LayoutIcon,
  MapPin,
  PackageSearch,
  Inbox,
  BadgeDollarSign,
  Users,
  Truck,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto z-50">
        <div className="p-6">
          <div className="relative w-32 h-10 mb-8">
             <span className="text-2xl font-bold text-white">LUGVIA</span>
          </div>
          
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/pages"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <LayoutIcon className="h-5 w-5" />
              Pages
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <FileText className="h-5 w-5" />
              Blog Posts
            </Link>
            <Link
              href="/admin/media"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ImageIcon className="h-5 w-5" />
              Media Gallery
            </Link>
            <div className="mt-6 pt-6 border-t border-slate-800">
              <div className="px-4 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Moving
              </div>
              <Link
                href="/admin/moving/cities"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <MapPin className="h-5 w-5" />
                Cities
              </Link>
              <Link
                href="/admin/moving/services"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <PackageSearch className="h-5 w-5" />
                Services
              </Link>
              <Link
                href="/admin/moving/leads"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Inbox className="h-5 w-5" />
                Leads
              </Link>
              <Link
                href="/admin/moving/pricing"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <BadgeDollarSign className="h-5 w-5" />
                Pricing
              </Link>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-800">
              <div className="px-4 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Team
              </div>
              <Link
                href="/admin/team/drivers"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Users className="h-5 w-5" />
                Driver Registrations
              </Link>
              <Link
                href="/admin/team/vehicles"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Truck className="h-5 w-5" />
                Vehicle Registrations
              </Link>
            </div>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors mt-8 border-t border-slate-700"
            >
              <Globe className="h-5 w-5" />
              View Site
            </Link>
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              {session.user.name?.[0] || "A"}
            </div>
            <div>
              <p className="text-sm font-medium">{session.user.name}</p>
              <p className="text-xs text-slate-400">Admin</p>
            </div>
          </div>
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 pt-24">
        {children}
      </main>
    </div>
  );
}
