import Link from "next/link";
import { ProfileLinkProps } from "../../sidebar-item";

export const QuickAction = ({ href, icon, label }: ProfileLinkProps) => {
  return (
    <Link
      href={href}
      className="flex shadow-2xl bg-card rounded-3xl sm:rounded-4xl flex-col w-full justify-center p-3 text-xl items-center"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-primary">{icon}</span>
        <h6 className="text-sm sm:text-xl">{label}</h6>
      </div>
    </Link>
  );
};
