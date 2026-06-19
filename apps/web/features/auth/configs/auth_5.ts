import { FieldConfig } from "@/shared/types/form/form-builder";

export const portfolioFieldConfig: FieldConfig[] = [
  {
    name: "full_body_url",
    label: "عکس تمام‌قد",
    type: "file",
    accept: "image/*",
    required: true,
    variant: "secondary",
    description: "یک عکس تمام‌قد واضح آپلود کنید",
  },
  {
    name: "full_shot_url",
    label: "عکس نیم‌تنه",
    type: "file",
    accept: "image/*",
    required: true,
    variant: "secondary",
    description: "یک عکس نیم‌تنه واضح آپلود کنید",
  },
];
