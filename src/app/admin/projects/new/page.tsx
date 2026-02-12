import { ProjectForm } from "@/components/admin/ProjectForm";
import { isAuthenticated } from "@/lib/actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export default async function NewProjectPage() {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      <Navbar />
      <div className="container py-8 max-w-3xl">
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold tracking-tight text-foreground-heading">
            New Project
          </h1>
        </div>

        <div className="bg-card border border-border rounded-lg shadow-sm p-6 sm:p-8">
          <ProjectForm />
        </div>
      </div>
    </div>
  );
}
