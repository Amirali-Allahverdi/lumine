import Link from "next/link";
import { ProfileHeaderLinkBoxProps } from "../header-link-box";
import { ChevronLeft } from "@gravity-ui/icons";

export const OptionItem = ({
  href,
  icon,
  label,
}: ProfileHeaderLinkBoxProps) => {
  return (
    <Link
      href={href}
      className="flex w-full justify-between p-3 gap-4 text-xl items-center"
    >
      <div className="flex items-center gap-4">
        <span className="bg-primary p-2 rounded-xl text-base-light">
          {icon}
        </span>
        <h6>{label}</h6>
      </div>

      <ChevronLeft />
    </Link>
  );
};
