import { getProjects } from "@/lib/projects";
import { isAuthenticated, logout } from "@/lib/actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, LogOut, LayoutGrid } from "lucide-react";
import { AdminProjectList } from "@/components/admin/AdminProjectList";
import { Navbar } from "@/components/layout/Navbar";

export default async function AdminDashboard() {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    redirect("/admin");
  }

  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />{" "}
      {/* Reuse minimal navbar or create admin specific one? Reusing is fine for now. */}
      <div className="container py-8 max-w-5xl space-y-8">
        {/* Header - Linear Settings Style */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground-heading">
              Projects
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your portfolio content and case studies.
            </p>
          </div>
          <div className="flex gap-3">
            <form action={logout}>
              <Button
                variant="ghost"
                size="sm"
                type="submit"
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </Button>
            </form>
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            >
              <Link href="/admin/projects/new">
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Link>
            </Button>
          </div>
        </div>

        {/* Project List Container */}
        <div className="bg-card rounded-lg border border-border shadow-sm">
          <AdminProjectList projects={projects} />
        </div>
      </div>
    </div>
  );
}
