"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Necessário para evitar problemas de hidratação
  useEffect(() => {
    setMounted(true);
  }, []);

  // Função para alternar entre temas
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
        <Sun className="h-4 w-4" />
        <span className="sr-only">Alternar tema</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 rounded-full"
      onClick={toggleTheme}
      aria-label="Alternar tema"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">
        {theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      </span>
    </Button>
  );
}
