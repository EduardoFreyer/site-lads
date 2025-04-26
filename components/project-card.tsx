"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

interface ProjectProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    demoUrl?: string;
    githubUrl?: string;
    featured?: boolean;
  };
}

export function ProjectCard({ project }: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: project.id * 0.1 }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group h-full overflow-hidden border-0 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-zinc-800">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {project.featured && (
            <div className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-3 py-1 text-xs font-medium text-white">
              Destaque
            </div>
          )}
        </div>
        <CardContent className="flex h-full flex-col p-5">
          <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
          <p className="mb-4 flex-grow text-muted-foreground">
            {project.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-zinc-100 dark:bg-zinc-700"
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            {project.demoUrl && (
              <Button asChild variant="default" size="sm" className="gap-1">
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-1 h-4 w-4" /> Ver Demo
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" size="sm" className="gap-1">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-1 h-4 w-4" /> Código
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
