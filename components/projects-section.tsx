"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: string | string[];
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all");

  const projects: Project[] = [
    {
      id: 1,
      title: "CRUD para Banco de Dados",
      description:
        "CRUD feito para cadastro de atividades extensionistas relacionadas a uma instituição de ensino.",
      image: "/projetos/crud.png",
      technologies: ["Python", "Django", "Bootstrap"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      category: "web",
    },
    {
      id: 2,
      title: "Sistema de Fisioterapia",
      description:
        "Aplicativo feito para os coordernadores, professores e estágiarios da instituição controlarem os horário dos pacientes e seus dados.",
      image: "/projetos/fisio-home.png",
      technologies: ["React Native", "Next.js", "Express", "TypeScript"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      category: ["mobile", "web"],
    },
    {
      id: 3,
      title: "Sistema de Farmácia",
      description:
        "Sistema de farmácia para controle de estoque, vendas e relatórios.",
      image: "/projetos/farma-home.png",
      technologies: ["Vue.js", "Express", "PostgreSQL", "D3.js"],
      demoUrl: "#",
      githubUrl: "#",
      category: "mobile",
    },
    {
      id: 4,
      title: "Sites Institucional",
      description:
        "Site institucional para uma empresa de tecnologia, com informações sobre serviços e contato.",
      image: "/projetos/lads-home.png",
      technologies: ["Next.js", "TypeScript"],
      githubUrl: "#",
      category: "web",
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category.includes(activeTab));

  const categories = [
    { id: "all", label: "Todos" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Nossos Projetos
          </h2>
          <p className="text-lg text-muted-foreground">
            Conheça alguns dos projetos desenvolvidos pelo nosso time, aplicando
            as melhores tecnologias e práticas de desenvolvimento.
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/*<div className="mt-12 text-center">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700">
            Ver Todos os Projetos
          </Button>
        </div>*/}
      </div>
    </section>
  );
}
