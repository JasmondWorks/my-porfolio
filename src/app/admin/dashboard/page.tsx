import { getProjects } from "@/lib/projects";
import { isAuthenticated, logout } from "@/lib/actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, LogOut, LayoutGrid, FolderOpen } from "lucide-react";
import { AdminProjectList } from "@/components/admin/AdminProjectList";

export default async function AdminDashboard() {
  const isAuth = await isAuthenticated();
  if (!isAuth) redirect("/admin");

  const projects = await getProjects();

  return (
    <div className="min-h-screen">
      <div className="container py-8 max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
              <LayoutGrid className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground-heading">
                Projects
              </h1>
              <p className="text-xs text-muted-foreground">
                {projects.length} project{projects.length !== 1 ? "s" : ""} in
                your portfolio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <form action={logout}>
              <Button
                variant="ghost"
                size="sm"
                type="submit"
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                <LogOut className="mr-2 h-3.5 w-3.5" /> Sign out
              </Button>
            </form>
            <Button
              asChild
              size="sm"
              className="bg-primary text-white shadow-sm hover:scale-[1.02] hover:opacity-90 transition-all text-xs"
            >
              <Link href="/admin/projects/new">
                <Plus className="mr-1.5 h-3.5 w-3.5" /> New Project
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Projects", value: projects.length },
            {
              label: "Featured",
              value: projects.filter((p) => p.featured).length,
            },
            {
              label: "Categories",
              value: new Set(projects.map((p) => p.category)).size,
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card p-4 text-center shadow-sm"
            >
              <p className="text-2xl font-bold text-foreground-heading">
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Project list */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-muted/20">
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              All Projects
            </span>
          </div>
          <AdminProjectList projects={projects} />
        </div>
      </div>
    </div>
  );
}
