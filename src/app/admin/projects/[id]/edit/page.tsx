import { ProjectForm } from "@/components/admin/ProjectForm";
import { isAuthenticated } from "@/lib/actions";
import { getProjects } from "@/lib/projects";
import { redirect, notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({ params }: Props) {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    redirect("/admin");
  }

  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container py-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
      <ProjectForm initialData={project} isEditing />
    </div>
  );
}
