"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createProject,
  deleteProject,
  updateProject,
  getProjects,
} from "./projects";
import { Project } from "@/types/project";
import { revalidatePath } from "next/cache";

const ADMIN_PIN = "123456"; // Hardcoded PIN as requested
const SESSION_COOKIE = "admin_session";

export async function login(formData: FormData) {
  const pin = formData.get("pin") as string;

  if (pin === ADMIN_PIN) {
    (await cookies()).set(SESSION_COOKIE, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    redirect("/admin/dashboard");
  } else {
    return { error: "Invalid PIN" };
  }
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin");
}

export async function isAuthenticated() {
  const session = (await cookies()).get(SESSION_COOKIE);
  return !!session?.value;
}

// Project Actions
export async function addProjectAction(project: Project) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await createProject(project);
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function updateProjectAction(id: string, project: Project) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await updateProject(id, project);
  revalidatePath("/");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function deleteProjectAction(id: string) {
  const isAuth = await isAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await deleteProject(id);
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}
