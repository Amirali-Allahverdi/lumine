import { z } from "zod";

const fileSchema = z
  .any()
  .refine((v) => v instanceof File, "انتخاب فایل الزامی است")
  .refine(
    (v) => !(v instanceof File) || v.size <= 5 * 1024 * 1024,
    "حجم فایل نباید بیشتر از ۵ مگابایت باشد",
  )
  .refine(
    (v) => !(v instanceof File) || v.type.startsWith("image/"),
    "فقط فایل تصویری مجاز است",
  );

export const portfolioSchema = z.object({
  full_body_url: fileSchema,
  full_shot_url: fileSchema,
});

export type PortfolioFormType = z.infer<typeof portfolioSchema>;
