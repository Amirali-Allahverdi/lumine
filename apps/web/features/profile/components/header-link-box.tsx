import Link from "next/link";

export type ProfileHeaderLinkBoxProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

export const ProfileHeaderLinkBox = ({
  icon,
  label,
  href,
}: ProfileHeaderLinkBoxProps) => {
  return (
    <Link
      href={href}
      className="shadow-2xl bg-surface-primary-light gap-1 py-2 border border-border dark:bg-surface-primary-dark transition-all duration-200 hover:opacity-75 hover:scale-95 w-[120px] h-[70px] sm:w-[150px] sm:h-[90px] rounded-3xl sm:rounded-4xl flex justify-center items-center flex-col"
    >
      {icon}
      <h5 className="text-md sm:text-xl">{label}</h5>
    </Link>
  );
};
