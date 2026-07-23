// features/projects/components/project-details.tsx
import { Button } from "@heroui/react";
import type { Project } from "../types/project";
import { ProjectStatusBadge } from "./project-status-badge";
import { formatBudget } from "../utils/format";
import {
  Calendar,
  Clock,
  ClockFill,
  LocationArrowFill,
  MapPin,
  Person,
  PersonFill,
  Signal,
  StarFill,
  Tag,
} from "@gravity-ui/icons";
import { WalletIcon } from "lucide-react";
import { BodyPortal } from "@/shared/components/body-portal";

interface ProjectDetailsProps {
  project: Project;
}

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <article className="mx-auto flex mt-16 mb-24 w-full max-w-3xl flex-col px-4">
      <h1 className="mb-8 mt-4 text-3xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        {project.name}
      </h1>

      <div className="flex flex-col">
        <PropertyRow icon={<Signal />} label="وضعیت">
          <ProjectStatusBadge status={project.status} />
        </PropertyRow>

        <PropertyRow icon={<Person />} label="کارفرما">
          <span className="flex items-center gap-2">
            <span className="text-sm text-zinc-800 dark:text-zinc-200">
              {project.employer.fullName}
            </span>
          </span>
        </PropertyRow>

        {project.model && (
          <PropertyRow icon={<Person />} label="مدل">
            <span className="flex items-center gap-2">
              <span className="text-sm text-zinc-800 dark:text-zinc-200">
                {project.model.fullName}
              </span>
            </span>
          </PropertyRow>
        )}

        <PropertyRow icon={<WalletIcon />} label="بودجه">
          <span className="text-sm text-zinc-800 dark:text-zinc-200">
            {formatBudget(project.budget)}{" "}
            <span className="text-zinc-400">تومان</span>
          </span>
        </PropertyRow>

        <PropertyRow icon={<Tag />} label="دسته‌بندی">
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {project.category.name}
          </span>
        </PropertyRow>

        <PropertyRow icon={<MapPin />} label="استان">
          <span className="text-sm text-zinc-800 dark:text-zinc-200">
            {project.province.name}
          </span>
        </PropertyRow>

        <PropertyRow icon={<Calendar />} label="بازه زمانی">
          <span className="text-sm text-zinc-800 dark:text-zinc-200">
            {project.startDate} <span className="text-zinc-400">تا</span>{" "}
            {project.endDate}
          </span>
        </PropertyRow>

        <PropertyRow icon={<Clock />} label="تاریخ ایجاد">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {project.created}
          </span>
        </PropertyRow>
      </div>

      <hr className="my-8 border-zinc-200 dark:border-zinc-800" />

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          شرح پروژه
        </h2>
        <p className="whitespace-pre-line text-[15px] leading-8 text-zinc-700 dark:text-zinc-300">
          {project.description}
        </p>
      </section>

      <BodyPortal>
        <div className="fixed bottom-24 sm:bottom-4 left-1/2 z-50 shadow-2xl -translate-x-1/2">
          <div className="rounded-full p-2 backdrop-blur-3xl">
            <Button size="lg" className="font-bold">
              <LocationArrowFill />
              ارسال درخواست همکاری
            </Button>
          </div>
        </div>
      </BodyPortal>
    </article>
  );
};

interface PropertyRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

const PropertyRow = ({ icon, label, children }: PropertyRowProps) => (
  <div className="group flex min-h-10 items-center gap-1 rounded-md px-1 py-1.5 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
    <div className="flex w-36 shrink-0 items-center gap-2 text-zinc-400 dark:text-zinc-500">
      <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
    <div className="flex min-w-0 flex-1 items-center">{children}</div>
  </div>
);

const MiniAvatar = ({ user }: { user: Project["employer"] }) => {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.fullName}
        className="h-5 w-5 rounded-full object-cover"
      />
    );
  }
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-200">
      {user.fullName.charAt(0)}
    </span>
  );
};
