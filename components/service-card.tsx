"use client";

import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ServiceProps {
  service: {
    title: string;
    description: string;
    icon: ReactNode;
  };
}

export function ServiceCard({ service }: ServiceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full overflow-hidden border-none bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-zinc-800">
        <CardContent className="flex h-full flex-col items-center p-6 text-center">
          <div className="mb-4 rounded-full bg-gradient-to-br from-red-500/10 to-purple-500/10 p-3 text-red-500 dark:text-red-400">
            {service.icon}
          </div>
          <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
          <p className="text-muted-foreground">{service.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
