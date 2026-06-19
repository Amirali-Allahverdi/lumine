import { z } from "zod";

// ─── Model ───────────────────────────────────────────────────────────────────

export const technicalInfoModelSchema = z.object({
  height_cm: z
    .string()
    .regex(/^\d+$/, "فقط عدد مجاز است")
    .refine(
      (v) => Number(v) >= 100 && Number(v) <= 230,
      "قد باید بین ۱۰۰ تا ۲۳۰ سانتی‌متر باشد",
    ),

  weight_kg: z
    .string()
    .regex(/^\d+$/, "فقط عدد مجاز است")
    .refine(
      (v) => Number(v) >= 30 && Number(v) <= 200,
      "وزن باید بین ۳۰ تا ۲۰۰ کیلوگرم باشد",
    ),

  skin_color: z.string().trim().min(2, "رنگ پوست الزامی است"),
  eye_color: z.string().trim().min(2, "رنگ چشم الزامی است"),
  hair_color: z.string().trim().min(2, "رنگ مو الزامی است"),
});

export type TechnicalInfoModelType = z.infer<typeof technicalInfoModelSchema>;

// ─── Employer ────────────────────────────────────────────────────────────────

export const technicalInfoEmployerSchema = z.object({
  company_type: z.enum(["individual", "company", "agency"], {
    error: "انتخاب نوع فعالیت الزامی است",
  }),

  company_name: z.string().trim().min(2, "نام شرکت باید حداقل ۲ کاراکتر باشد"),

  email: z.string().email("ایمیل معتبر وارد کنید"),

  website: z
    .string()
    .url("آدرس وبسایت معتبر نیست")
    .optional()
    .or(z.literal("")),

  instagram: z
    .string()
    .url("آدرس اینستاگرام معتبر نیست")
    .optional()
    .or(z.literal("")),

  city: z.string().trim().min(2, "نام شهر الزامی است"),

  address: z.string().trim().min(5, "آدرس باید حداقل ۵ کاراکتر باشد"),

  description: z.string().optional().or(z.literal("")),
});

export type TechnicalInfoEmployerType = z.infer<
  typeof technicalInfoEmployerSchema
>;

// ─── Instructor ──────────────────────────────────────────────────────────────

export const technicalInfoInstructorSchema = z.object({
  years_of_experience: z
    .string()
    .regex(/^\d+$/, "فقط عدد مجاز است")
    .refine(
      (v) => Number(v) >= 0 && Number(v) <= 30,
      "تجربه باید بین ۰ تا ۳۰ سال باشد",
    ),

  certifications: z.enum(["diploma", "bachelor", "master", "PhD"], {
    error: "انتخاب مدرک تحصیلی الزامی است",
  }),

  workshop_types: z.enum(["online", "in_person", "private"], {
    error: "انتخاب نوع تدریس الزامی است",
  }),

  email: z.string().email("ایمیل معتبر وارد کنید"),

  website: z
    .string()
    .url("آدرس وبسایت معتبر نیست")
    .optional()
    .or(z.literal("")),

  instagram: z
    .string()
    .url("آدرس اینستاگرام معتبر نیست")
    .optional()
    .or(z.literal("")),

  city: z.string().trim().min(2, "نام شهر الزامی است"),

  description: z.string().optional().or(z.literal("")),
});

export type TechnicalInfoInstructorType = z.infer<
  typeof technicalInfoInstructorSchema
>;

// ─── Union type برای استفاده عمومی ──────────────────────────────────────────

export type TechnicalInfoFormType =
  | TechnicalInfoModelType
  | TechnicalInfoEmployerType
  | TechnicalInfoInstructorType;

// ─── Map نقش به schema ───────────────────────────────────────────────────────

export const roleSchemaMap = {
  model: technicalInfoModelSchema,
  employer: technicalInfoEmployerSchema,
  instructor: technicalInfoInstructorSchema,
} as const;
