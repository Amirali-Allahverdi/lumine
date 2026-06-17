import { z } from "zod";

export const auth_2SchemaBasicInfo = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(2, "نام باید حداقل 2 کاراکتر باشد")
      .regex(
        /^[آابپتثجچحخدذرزسشصضطظعغفقکگلمنوهیa-zA-Z\s]+$/,
        "نام فقط باید شامل حروف باشد",
      ),

    last_name: z
      .string()
      .trim()
      .min(2, "نام خانوادگی باید حداقل 2 کاراکتر باشد")
      .regex(
        /^[آابپتثجچحخدذرزسشصضطظعغفقکگلمنوهیa-zA-Z\s]+$/,
        "نام خانوادگی فقط باید شامل حروف باشد",
      ),

    gender: z.enum(["male", "female"], {
      error: "انتخاب جنسیت الزامی است",
    }),

    birth_date: z
      .any()
      .refine((v) => v !== undefined && v !== null, "تاریخ تولد الزامی است"),

    nationality: z.enum(["IR", "FR"], {
      error: "انتخاب ملیت الزامی است",
    }),

    national_code: z.string().regex(/^\d+$/, "فقط عدد مجاز است"),
  })
  .superRefine((data, ctx) => {
    const national = data["nationality"];
    const identifier = data["national_code"];

    if (national === "IR") {
      if (!/^\d{10}$/.test(identifier)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["basic-info_identifier"],
          message: "کد ملی باید ۱۰ رقم باشد",
        });
      }
    }

    if (national === "FR") {
      if (!/^\d{12}$/.test(identifier)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["basic-info_identifier"],
          message: "کد فراگیر اتباع باید ۱۲ رقم باشد",
        });
      }
    }
  });

export type Auth_2BasicInfoType = z.infer<typeof auth_2SchemaBasicInfo>;
