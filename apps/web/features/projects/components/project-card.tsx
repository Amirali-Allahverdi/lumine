import Link from "next/link";
import type { Project } from "../types/project";
import { ProjectStatusBadge } from "./project-status-badge";
import { formatBudget } from "../utils/format";
import { Calendar, MapPin, Tag } from "@gravity-ui/icons";
import { Avatar } from "@heroui/react";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      href={`/projects/${project.id}`}
      aria-label={`مشاهده جزئیات پروژه ${project.name}`}
      className="group flex flex-col gap-4 rounded-4xl bg-card p-4 shadow-2xl"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <Tag className="h-3.5 w-3.5" />
          {project.category.name}
        </span>
        <ProjectStatusBadge status={project.status} />
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="line-clamp-1 text-base font-semibold  transition">
          {project.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          {project.description}
        </p>
      </div>

      {/* متادیتا */}
      <div className="mt-auto flex flex-col gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
        <div className="flex items-center gap-2">
          {/* <Wallet className="h-4 w-4 text-zinc-400" /> */}
          <span className="font-medium">{formatBudget(project.budget)}</span>
          <span className="text-zinc-400">تومان</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {project.province.name}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {project.startDate} تا {project.endDate}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <span className="text-xs text-zinc-600 dark:text-zinc-300">
          {project.employer.fullName}
        </span>
      </div>
    </Link>
  );
};

// const Avatar = ({ user }: { user: Project["employer"] }) => {
//   if (user.avatar) {
//     // eslint-disable-next-line @next/next/no-img-element
//     return (
//       <img
//         src={user.avatar}
//         alt={user.fullName}
//         className="h-7 w-7 rounded-full object-cover"
//       />
//     );
//   }
//   return (
//     <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-200">
//       {user.fullName.charAt(0)}
//     </span>
//   );
// };
