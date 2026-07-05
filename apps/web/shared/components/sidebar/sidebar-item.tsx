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
    "flex items-center cursor-pointer gap-2 rounded-xl text-sm w-full justify-between text-text-tertiary-light dark:text-text-tertiary-dark";

  const content = (
    <>
      <div className="flex scale-110 items-center gap-1">
        <span
          className={`flex gap-3 px-4 py-2
          ${active ? "text-base-light" : ""}
           rounded-xl flex items-center justify-center`}
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
        className={`${baseClass} ${active ? "bg-primary w-full cursor-auto" : ""}`}
      >
        {content}
      </NextLink>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`pl-4 ${baseClass} ${active ? "bg-primary w-full  text-foreground" : ""}`}
    >
      {content}
      {rightIcon}
    </button>
  );
};
