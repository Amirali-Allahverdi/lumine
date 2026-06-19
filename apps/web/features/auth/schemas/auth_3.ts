import z from "zod";

export const auth_3SchemaTechnicalInfo = z.object({
  role: z.enum(["model", "instructor", "employer"], {
    error: "انتخاب نقش الزامی است",
  }),

  category: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
});

export type Auth_3TechnicalInfoType = z.infer<typeof auth_3SchemaTechnicalInfo>;
