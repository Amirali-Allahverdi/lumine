import type { Project } from "../types/project";
import { ProjectCard } from "./project-card";

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-700">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          پروژه‌ای یافت نشد
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          فیلترها را تغییر دهید یا بعداً دوباره سر بزنید
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
};
