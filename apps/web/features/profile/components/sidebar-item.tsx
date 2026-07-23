import Link from "next/link";

export type ProfileLinkProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

export interface ProfileSidebarItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export const ProfileSidebarItem = ({
  icon,
  title,
  value,
}: ProfileSidebarItemProps) => {
  return (
    <li className="flex gap-4 items-center">
      <span className="mr-4 text-primary">{icon}</span>
      <div>
        <h4 className="text-text-tertiary-light dark:text-text-tertiary-dark text-sm">
          {title}
        </h4>
        <p>{value}</p>
      </div>
    </li>
  );
};
