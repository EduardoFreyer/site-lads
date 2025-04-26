"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface MemberProps {
  member: {
    id: number;
    name: string;
    role: string;
    image: string;
    skills: string[];
  };
}

export function MemberCard({ member }: MemberProps) {
  const [isHovered, setIsHovered] = useState(false);

  const skillVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: member.id * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-zinc-800/30">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <CardContent className="p-5">
          <motion.div
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="mb-1 text-xl font-bold"
              animate={{
                color: isHovered ? "var(--blue-500)" : "currentColor",
              }}
              transition={{ duration: 0.3 }}
            >
              {member.name}
            </motion.h3>
            <p className="mb-4 text-muted-foreground">{member.role}</p>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  custom={index}
                  variants={skillVariants}
                  initial="hidden"
                  animate={isHovered ? "visible" : "hidden"}
                >
                  <Badge
                    variant="secondary"
                    className="bg-zinc-100 dark:bg-zinc-800 transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
