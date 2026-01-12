import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-white px-6 shadow-sm">
          <h1 className="text-lg font-semibold md:text-xl">Admin Dashboard</h1>
          <div className="ml-auto flex items-center gap-4">
            {/* Add user menu or notifications here if needed */}
            <span className="text-sm text-muted-foreground">admin@lugvia.com</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
