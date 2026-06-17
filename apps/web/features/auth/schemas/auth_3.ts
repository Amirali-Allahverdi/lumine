import z from "zod";

export const auth_3SchemaTechnicalInfo = z

  .object({
    role: z.enum(["model", "instructor", "employer"], {
      error: "انتخاب نقش الزامی است",
    }),

    category: z.string(),
  })

  .superRefine((data, ctx) => {
    const role = data["role"];

    const category = data["category"];

    const roleCategories = {
      model: ["business", "promo"],

      instructor: ["lang", "art"],

      employer: ["full", "contract"],
    };

    if (!roleCategories[role].includes(category)) {
      ctx.addIssue({
        code: "custom",

        message: "دسته‌بندی انتخاب‌شده با نقش سازگار نیست",

        path: ["technical-info_role-category"],
      });
    }
  });

export type Auth_3TechnicalInfoType = z.infer<typeof auth_3SchemaTechnicalInfo>;
