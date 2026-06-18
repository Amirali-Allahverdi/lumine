import NextLink from "next/link";

type BaseItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

export const SidebarItem = ({
  icon,
  label,
  active,
  rightIcon,
  onClick,
  href,
}: BaseItemProps) => {
  const baseClass =
    "flex items-center cursor-pointer gap-2 px-1 py-1 rounded-2xl text-sm w-fit justify-between text-text-tertiary-light dark:text-text-tertiary-dark";

  const content = (
    <>
      <div className="flex scale-110 items-center gap-1">
        <span
          className={`
          ${active ? "text-base-dark dark:text-base-light" : ""}
          p-4 rounded-full flex items-center justify-center`}
        >
          {icon}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <NextLink
        href={href}
        className={`${baseClass} ${active ? "bg-surface-secondary-light dark:bg-surface-secondary-dark cursor-auto" : ""}`}
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
