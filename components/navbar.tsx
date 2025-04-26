"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detecta o scroll para mudar o estilo da navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha o menu mobile quando a tela é redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Projetos", href: "#projects" },
    { name: "Time", href: "#team" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 py-3 shadow backdrop-blur-md dark:bg-zinc-900/80"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              LADS
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="ml-4 flex items-center gap-2">
            <ModeToggle />
            <Button
              size="sm"
              className="ml-2 bg-gradient-to-r from-red-500 to-purple-600 text-white hover:from-red-600 hover:to-purple-700"
            >
              Contato
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto overflow-hidden bg-background px-4 md:hidden"
          >
            <ul className="flex flex-col space-y-1 py-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-red-500 to-purple-600 text-white hover:from-red-600 hover:to-purple-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contato
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
