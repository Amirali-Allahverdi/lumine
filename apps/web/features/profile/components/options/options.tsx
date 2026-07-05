import { ProfileHeaderLinkBoxProps } from "../header-link-box";
import {
  Lock,
  Person,
  PersonNutHex,
  ArrowRightFromSquare,
  CircleQuestion,
  ShieldCheck,
} from "@gravity-ui/icons";
import { OptionItem } from "./option-item";
import { Label, Surface } from "@heroui/react";

const profileOptions: ProfileHeaderLinkBoxProps[] = [
  { href: "/", icon: <Person className="size-5" />, label: "اطلاعات کاربری" },
  { href: "/", icon: <PersonNutHex className="size-5" />, label: "پشتیبانی" },
  {
    href: "/",
    icon: <ArrowRightFromSquare className="size-5" />,
    label: "خروج",
  },
];

const helpOptions: ProfileHeaderLinkBoxProps[] = [
  { href: "/", icon: <Lock className="size-5" />, label: "امنیت" },
  {
    href: "/",
    icon: <CircleQuestion />,
    label: "سوالات متداول",
  },
  {
    href: "/",
    icon: <ShieldCheck />,
    label: "حریم خصوصی",
  },
];

export const ProfileOptions = () => {
  return (
    <>
      <Surface variant="transparent" className="flex flex-col gap-4">
        <Label className="mr-2 text-xl">حساب</Label>
        <ul className="p-2 shadow-2xl border-border border bg-surface-primary-light dark:bg-surface-primary-dark rounded-4xl">
          {profileOptions.map((option, i) => (
            <OptionItem key={i} {...option} />
          ))}
        </ul>
      </Surface>
      <Surface variant="transparent" className="flex mb-36 flex-col gap-4">
        <Label className="mr-2 text-xl">کمک رسانی</Label>
        <ul className="p-2 shadow-2xl border-border border bg-surface-primary-light dark:bg-surface-primary-dark rounded-4xl">
          {helpOptions.map((option, i) => (
            <OptionItem key={i} {...option} />
          ))}
        </ul>
      </Surface>
    </>
  );
};
