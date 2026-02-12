"use client";

import { useTransition, useState } from "react";
import { Project, ProjectCategory } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addProjectAction, updateProjectAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface ProjectFormProps {
  initialData?: Project;
  isEditing?: boolean;
}

const CATEGORIES: ProjectCategory[] = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Mobile",
];

export function ProjectForm({
  initialData,
  isEditing = false,
}: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [techStackInput, setTechStackInput] = useState(
    initialData?.techStack.join(", ") || "",
  );

  const handleSubmit = async (formData: FormData) => {
    const rawData = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      category: formData.get("category") as ProjectCategory,
      shortDescription: formData.get("shortDescription") as string,
      longDescription: formData.get("longDescription") as string,
      coverImage: formData.get("coverImage") as string,
      demoVideo: formData.get("demoVideo") as string,
      liveUrl: formData.get("liveUrl") as string,
      githubUrl: formData.get("githubUrl") as string,
      dateStr: formData.get("dateStr") as string,
    };

    const techStack = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const project: Project = {
      id: isEditing && initialData ? initialData.id : crypto.randomUUID(),
      ...rawData,
      techStack,
      architecture: initialData?.architecture || { description: "" },
      engineeringDecisions: initialData?.engineeringDecisions || [],
      metrics: initialData?.metrics || [],
    };

    startTransition(async () => {
      try {
        if (isEditing && initialData) {
          await updateProjectAction(initialData.id, project);
        } else {
          await addProjectAction(project);
        }
      } catch (error) {
        console.error("Failed to save project", error);
        alert("Failed to save project. Check console.");
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-8">
      {/* Basic Info Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Info
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={initialData?.title}
              required
              placeholder="Project Name"
              className="bg-background"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={initialData?.slug}
              required
              placeholder="project-slug"
              className="font-mono text-sm bg-background"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <div className="relative">
            <select
              id="category"
              name="category"
              defaultValue={initialData?.category || "Fullstack"}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {/* Custom arrow could go here */}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="shortDescription">Short Description</Label>
          <Input
            id="shortDescription"
            name="shortDescription"
            defaultValue={initialData?.shortDescription}
            required
            placeholder="Brief overview for cards"
            className="bg-background"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="techStack">Tech Stack</Label>
          <Input
            id="techStack"
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            placeholder="React, Next.js, TypeScript (comma separated)"
            className="bg-background"
          />
        </div>
      </div>

      <div className="w-full h-px bg-border/50" />

      {/* Content Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Content
        </h3>

        <div className="grid gap-2">
          <Label htmlFor="longDescription">Detailed Description</Label>
          <Textarea
            id="longDescription"
            name="longDescription"
            defaultValue={initialData?.longDescription}
            required
            className="h-32 bg-background"
            placeholder="Markdown supported..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="coverImage">Cover Image</Label>
            <Input
              id="coverImage"
              name="coverImage"
              defaultValue={initialData?.coverImage}
              placeholder="/images/project-cover.jpg"
              className="bg-background font-mono text-sm"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="demoVideo">Demo Video</Label>
            <Input
              id="demoVideo"
              name="demoVideo"
              defaultValue={initialData?.demoVideo}
              placeholder="/videos/demo.mp4"
              className="bg-background font-mono text-sm"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-border/50" />

      {/* Links Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Links & Meta
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              id="liveUrl"
              name="liveUrl"
              defaultValue={initialData?.liveUrl}
              placeholder="https://..."
              className="bg-background font-mono text-sm"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              defaultValue={initialData?.githubUrl}
              placeholder="https://github.com/..."
              className="bg-background font-mono text-sm"
            />
          </div>
        </div>

        <div className="grid gap-2 max-w-[200px]">
          <Label htmlFor="dateStr">Project Date</Label>
          <Input
            id="dateStr"
            name="dateStr"
            type="date"
            defaultValue={initialData?.dateStr}
            className="bg-background"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4">
        <Button asChild variant="ghost">
          <Link href="/admin/dashboard">Cancel</Link>
        </Button>
        <Button type="submit" disabled={isPending} className="min-w-[120px]">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
            </>
          ) : isEditing ? (
            "Update Project"
          ) : (
            "Create Project"
          )}
        </Button>
      </div>
    </form>
  );
}
