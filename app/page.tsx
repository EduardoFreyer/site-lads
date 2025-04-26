"use client";

import { ServiceCard } from "@/components/service-card";
import { ContactForm } from "@/components/contact-form";
import { ProjectsSection } from "@/components/projects-section";
import { Navbar } from "@/components/navbar";
import { TeamCarousel } from "@/components/team-carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight, Code, Users, Zap, MessageSquare } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const members = [
    {
      id: 1,
      name: "Sandir Campos",
      role: "CEO",
      image: "/Participantes/Sandir.png",
      skills: ["MySQL", "Postgree", "Power BI", "JavaScript"],
    },
    {
      id: 2,
      name: "Kevin Garza",
      role: "Líder Geral",
      image: "/Participantes/Kevin.png",
      skills: ["TypeScript", "Python", "React Native"],
    },
    {
      id: 3,
      name: "Veronica Granich",
      role: "Líder de Negócios",
      image: "/Participantes/Veronica.png",
      skills: ["JavaScript", "Python", "C#"],
    },
    {
      id: 4,
      name: "Cauê Machado",
      role: "Líder de Backend",
      image: "/Participantes/Cauê Machado.png",
      skills: ["JavaScript", "Python", "Node.js", "MySQL"],
    },
    {
      id: 5,
      name: "Eduardo Freyer",
      role: "Líder de Desenvolvimento",
      image: "/Participantes/Eduardo.png",
      skills: ["JavaScript", "React Native", "React.js", "Next.js"],
    },
    {
      id: 6,
      name: "Halbert Nascimento",
      role: "Equipe de desenvolvimento",
      image: "/Participantes/Halbert.png",
      skills: ["Python", "C++", "JavaScript"],
    },
    {
      id: 7,
      name: "Christopher Yohan",
      role: "Equipe de negócios",
      image: "/Participantes/Christopher.png",
      skills: ["Python", "JavaScript", "C#"],
    },
    {
      id: 8,
      name: "Cristiano Marques",
      role: "Equipe de desenvolvimento",
      image: "/Participantes/Cristiano.png",
      skills: ["Python", "JavaScript", "PHP"],
    },
    {
      id: 9,
      name: "Vinícius Sant’Iago",
      role: "Equipe de desenvolvimento",
      image: "/Participantes/Vinicius.png",
      skills: ["TypeScript", "C#", "GO"],
    },
    {
      id: 10,
      name: "Kaic Marçal",
      role: "Equipe de negócios",
      image: "/Participantes/Kaic.png",
      skills: ["JavaScript", "Python", "C++"],
    },
    {
      id: 11,
      name: "Santhiago Lirio",
      role: "Equipe de negócios",
      image: "/Participantes/Santhiago.png",
      skills: ["JavaScript", "Python", "React Native"],
    },
    {
      id: 12,
      name: "Cauê Saad",
      role: "Equipe de negócios",
      image: "/Participantes/Cauê Saad.png",
      skills: ["JavaScript", "Python", "C#"],
    },
  ];

  const services = [
    {
      title: "Desenvolvimento Web",
      description:
        "Criamos sites e aplicações web modernas e responsivas com as melhores tecnologias do mercado.",
      icon: <Code className="h-10 w-10" />,
    },
    {
      title: "Mentoria em Programação",
      description:
        "Compartilhamos conhecimento e experiência para ajudar outros estudantes a evoluírem na carreira.",
      icon: <Users className="h-10 w-10" />,
    },
    {
      title: "Soluções Tecnológicas",
      description:
        "Desenvolvemos soluções personalizadas para resolver problemas específicos do seu negócio.",
      icon: <Zap className="h-10 w-10" />,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section
          id="home"
          className="relative flex flex-col items-center justify-center overflow-hidden dark:bg-black py-32 pt-40 dark:text-white h-screen"
        >
          <div className="container relative z-10 mx-auto px-4 text-center">
            <Image
              src={`${theme === "dark" ? "/aBranco.png" : "/aPreto.png"}`}
              width={100}
              height={100}
              alt="LADS Logo"
              className="min-w-96 mx-auto mb-6 max-h-xl"
            />
            <p className="mx-auto mb-8 max-w-2xl text-xl dark:text-zinc-300 md:text-2xl">
              Um grupo de estudantes de programação unindo forças para aprender
              e criar soluções tecnológicas inovadoras.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-purple-600 text-white hover:from-red-600 hover:to-purple-700"
              >
                Nossos Serviços <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-300 bg-transparent hover:bg-gray-100 dark:border-zinc-300 dark:text-white dark:hover:bg-zinc-800"
              >
                Conheça o Time
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                Quem Somos
              </h2>
              <p className="mb-10 text-lg text-muted-foreground">
                LADS é um grupo formado por estudantes de programação que se
                uniram para criar um ambiente de aprendizado mútuo e
                colaborativo. Acreditamos que juntos podemos ir mais longe,
                compartilhando conhecimento e experiências para crescer
                profissionalmente enquanto oferecemos soluções tecnológicas de
                qualidade.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-zinc-50 py-20 dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Nossos Serviços
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectsSection />
        </section>

        {/* Team Section */}
        <section id="team" className="bg-zinc-50 py-20 dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Nosso Time
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-muted-foreground">
              Conheça os talentosos profissionais que fazem parte do nosso time,
              cada um com habilidades únicas e paixão por tecnologia.
            </p>
            <TeamCarousel members={members} />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-black py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                  Entre em Contato
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-zinc-300">
                  Interessado em nossos serviços ou quer saber mais sobre o
                  LADS? Entre em contato conosco!
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col justify-center space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-11 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-purple-600">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">
                        Envie uma mensagem
                      </h3>
                      <p className="text-zinc-400">
                        Preencha o formulário e entraremos em contato em breve.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-purple-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Email</h3>
                      <p className="text-zinc-400">lads@iesgo.edu.br</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-purple-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0L6.343 16.657A8 8 0 1120 10a8 8 0 01-2.343 6.657z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Localização</h3>
                      <p className="text-zinc-400">Formosa, GO - Brasil</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LADS. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
