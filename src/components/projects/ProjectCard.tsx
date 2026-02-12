"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Autoplay blocked", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <Card
        className="overflow-hidden border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover h-full flex flex-col"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-video overflow-hidden">
          {/* Image Thumbnail - Always visible initially, fades out on hover if video plays */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${isHovered && project.demoVideo ? "opacity-0" : "opacity-100"}`}
          >
            <div className="absolute inset-0 bg-muted/20" />{" "}
            {/* Placeholder background */}
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          {/* Video Player */}
          {project.demoVideo && (
            <video
              ref={videoRef}
              src={project.demoVideo}
              muted
              loop
              playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>

        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium tracking-tight text-foreground-heading">
              {project.title}
            </CardTitle>
            <Link
              href={`/projects/${project.slug}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">View Details</span>
            </Link>
          </div>
          <CardDescription className="line-clamp-2 mt-1 text-sm text-muted-foreground">
            {project.shortDescription}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow p-4 pt-0">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs font-normal border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-0.5 rounded-sm"
              >
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs font-normal border-border text-muted-foreground px-2 py-0.5 rounded-sm"
              >
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between p-4 pt-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href={`/projects/${project.slug}`}>More details</Link>
          </Button>
          <div className="flex space-x-1">
            {project.githubUrl && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
