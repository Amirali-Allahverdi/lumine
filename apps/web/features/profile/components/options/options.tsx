import { ProfileLinkProps } from "../sidebar-item";
import {
  Lock,
  Person,
  PersonNutHex,
  ArrowRightFromSquare,
  CircleQuestion,
  ShieldCheck,
  PersonFill,
  LockFill,
  CircleQuestionFill,
  Sliders,
} from "@gravity-ui/icons";
import { OptionItem } from "./option-item";
import { Label, Surface } from "@heroui/react";
import { QuickActions } from "./quick-actions/quick-actions";

const profileOptions: ProfileLinkProps[] = [
  {
    href: "/profile/user",
    icon: <PersonFill className="size-7" />,
    label: "اطلاعات کاربری",
  },
  { href: "/", icon: <LockFill className="size-7" />, label: "امنیت" },
];

const helpOptions: ProfileLinkProps[] = [
  { href: "/", icon: <Sliders className="size-7" />, label: "پشتیبانی" },
  {
    href: "/",
    icon: <CircleQuestionFill className="size-7" />,
    label: "سوالات متداول",
  },
];

export const ProfileOptions = () => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <header>
        <QuickActions />
      </header>
      <Surface
        variant="transparent"
        className="flex p-2 shadow-2xl bg-card rounded-4xl flex-col w-full"
      >
        <Label className="mt-2 mr-4 text-text-placeholder-light dark:text-text-placeholder-dark text-medium">
          حساب
        </Label>
        <ul className="">
          {profileOptions.map((option, i) => (
            <OptionItem key={i} {...option} />
          ))}
        </ul>
      </Surface>
      <Surface
        variant="transparent"
        className="flex p-2 shadow-2xl bg-card rounded-4xl flex-col w-full"
      >
        <Label className="mt-2 mr-4 text-text-placeholder-light dark:text-text-placeholder-dark text-medium">
          کمک رسانی
        </Label>
        <ul className="">
          {helpOptions.map((option, i) => (
            <OptionItem key={i} {...option} />
          ))}
        </ul>
      </Surface>
    </section>
  );
};
