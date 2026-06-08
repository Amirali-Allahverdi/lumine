export type SiteConfig = typeof siteConfig;
import { NavMenuItem } from "@/shared/types/site";
import {
  XCircle,
  UserIcon,
  Component,
  Activity,
  Clock,
  CheckCircle,
  BellDot,
} from "lucide-react";
import {
  House,
  Briefcase,
  Bell,
  Comment,
  Gear,
  HouseFill,
  BriefcaseFill,
  BellFill,
  CommentFill,
} from "@gravity-ui/icons";

export const siteConfig = {
  name: "لومینه",
  description: "رویای دیده شدنت رو به واقعیت تبدیل کن",

  navItems: [
    {
      label: "خانه",
      href: "/",
      icon: <HouseFill className="scale-150" />,
      type: "link",
    },
    {
      label: "پروژه ها",
      icon: <BriefcaseFill className="scale-150" />,
      type: "link",
      href: "/projects",
      items: [
        {
          label: "همه",
          href: "/projects",
          icon: <Component />,
        },
        {
          label: "جاری",
          href: "/projects/1",
          icon: <Activity />,
        },
        {
          label: "در انتظار",
          href: "/projects/2",
          icon: <Clock />,
        },
        {
          label: "انجام شده",
          href: "/projects/3",
          icon: <CheckCircle />,
        },
        {
          label: "لغو شده",
          href: "/projects/4",
          icon: <XCircle />,
        },
      ],
    },
    {
      label: "اعلانات",
      icon: <BellFill className="scale-150" />,
      type: "link",
      href: "/notifications",
      items: [
        {
          label: "همه",
          href: "/notifications",
          icon: <Component />,
        },
        {
          label: "خوانده نشده",
          href: "/notifications/1",
          icon: <BellDot />,
        },
        {
          label: "خوانده شده",
          href: "/notifications/2",
          icon: <CheckCircle />,
        },
      ],
    },
    {
      label: "پیام ها",
      href: "/messages",
      icon: <CommentFill className="scale-150" />,
      type: "link",
    },
  ] as NavMenuItem[],

  navMenuItems: [
    {
      type: "dropdown",
      label: "پروفایل",
      items: [
        { label: "مشاهده پروفایل", href: "/profile" },
        { label: "پرتفولیو", href: "/portfolio" },
        { label: "خروج از حساب", href: "/logout" },
      ],
      icon: <UserIcon />,
    },
    {
      type: "modal",
      label: "تنظیمات",
      modalId: "settings",
      icon: <Gear className="scale-150" />,
    },
    {
      type: "link",
      label: "اعلانات",
      href: "/notifications",
      icon: <Bell />,
    },
  ] as NavMenuItem[],

  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
  },
};
