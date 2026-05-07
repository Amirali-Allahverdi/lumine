import z from "zod";

export const auth_3SchemaTechnicalInfo = z

  .object({
    "technical-info_set-role": z.enum(["model", "instructor", "employer"], {
      error: "انتخاب نقش الزامی است",
    }),

    "technical-info_role-category": z.string(),
  })

  .superRefine((data, ctx) => {
    const role = data["technical-info_set-role"];

    const category = data["technical-info_role-category"];

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
