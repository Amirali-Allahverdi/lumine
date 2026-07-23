import {
  BriefcaseFill,
  SparklesFill,
  LayoutHeaderCellsLargeFill,
} from "@gravity-ui/icons";
import { ProfileLinkProps } from "../../sidebar-item";
import { Surface } from "@heroui/react";
import { QuickAction } from "./quick-action";

const quickActions: ProfileLinkProps[] = [
  {
    href: "/projects",
    icon: <BriefcaseFill className="size-7" />,
    label: "پروژه های من",
  },
  {
    href: "/profile/portfolio",
    icon: <SparklesFill className="size-7" />,
    label: "پورتفولیو",
  },
  {
    href: "/",
    icon: <LayoutHeaderCellsLargeFill className="size-7" />,
    label: "آمار (به زودی)",
  },
];

export const QuickActions = () => {
  return (
    <section className=" w-full">
      <Surface variant="transparent" className="flex p-2 gap-2 w-full">
        {quickActions.map((action, i) => (
          <QuickAction key={i} {...action} />
        ))}
      </Surface>
    </section>
  );
};
