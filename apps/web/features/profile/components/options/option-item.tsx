import Link from "next/link";
import { ProfileLinkProps } from "../sidebar-item";
import { ChevronLeft } from "@gravity-ui/icons";

export const OptionItem = ({ href, icon, label }: ProfileLinkProps) => {
  return (
    <Link
      href={href}
      className="flex w-full justify-between p-3 gap-4 text-xl items-center"
    >
      <div className="flex items-center gap-4">
        <span className="text-primary">{icon}</span>
        <h6>{label}</h6>
      </div>

      <ChevronLeft />
    </Link>
  );
};
