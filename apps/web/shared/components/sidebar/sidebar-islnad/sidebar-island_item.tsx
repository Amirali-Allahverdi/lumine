import NextLink from "next/link";

type BaseItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  count?: number;
};

export const SidebarIslandItem = ({
  icon,
  label,
  active,
  rightIcon,
  onClick,
  href,
}: BaseItemProps) => {
  const baseClass =
    "flex items-center w-full cursor-pointer gap-2 rounded-full text-sm w-fit justify-between text-text-tertiary-light dark:text-text-tertiary-dark";

  const content = (
    <>
      <div className="flex items-center gap-1">
        <span
          className={`
          ${active ? "text-base-dark flex gap-2 dark:text-base-light" : ""}
          p-2 flex items-center justify-center gap-2`}
        >
          {icon}
          {label}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <NextLink
        href={href}
        className={`${baseClass} ${active ? "bg-surface-primary-light dark:bg-surface-primary-dark cursor-auto" : ""}`}
      >
        {content}
      </NextLink>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${active ? "bg-primary" : ""}`}
    >
      {content}
    </button>
  );
};
