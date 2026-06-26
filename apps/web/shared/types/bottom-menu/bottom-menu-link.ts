import React from "react";

export type BottomMenuSubItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export type BottomMenuLinkProps = {
  label: string;
  icon: React.ReactNode;
  href: string;
  subItems?: BottomMenuSubItem[];
};
