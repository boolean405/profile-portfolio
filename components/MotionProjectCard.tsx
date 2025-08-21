"use client";
import { motion } from "framer-motion";
import { gridItem } from "@/components/AnimatedGrid";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/types";

export default function MotionProjectCard({
  project,
  compact = true,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <motion.div variants={gridItem} className="h-full">
      <ProjectCard project={project} compact={compact} />
    </motion.div>
  );
}
