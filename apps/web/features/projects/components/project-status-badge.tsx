import {
  PROJECT_STATUS_LABELS,
  PROJECT_STATUS_STYLES,
} from "../constants/project";
import type { ProjectStatus } from "../types/project";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export const ProjectStatusBadge = ({
  status,
  className = "",
}: ProjectStatusBadgeProps) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${PROJECT_STATUS_STYLES[status]} ${className}`}
  >
    {PROJECT_STATUS_LABELS[status]}
  </span>
);
