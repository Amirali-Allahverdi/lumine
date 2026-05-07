import { GraduationCap, Briefcase, Person } from "@gravity-ui/icons";
import { FieldConfig } from "@/shared/types/form/form-builder";

export const auth_3FieldConfig: FieldConfig[] = [
  {
    name: "technical-info_set-role",
    type: "select",
    variant: "secondary",
    label: "نقش خود را انتخاب کنید",
    options: [
      { label: "مدل", value: "model", icon: <Person /> },
      { label: "مدرس", value: "instructor", icon: <GraduationCap /> },
      { label: "کارفرما", value: "employer", icon: <Briefcase /> },
    ],
    placeholder: "نقش شما",
    required: true,
  },

  {
    name: "technical-info_role-category",
    type: "select",
    variant: "secondary",
    label: "دسته بندی خود را انتخاب کنید",
    placeholder: "دسته بندی",
    dynamicIdentifier: {
      dependsOn: "technical-info_set-role",

      defaultDisabled: true,
      defaultOptions: [],

      map: {
        model: {
          options: [
            { label: "مدل تجاری", value: "business" },
            { label: "مدل تبلیغاتی", value: "promo" },
          ],
        },

        instructor: {
          options: [
            { label: "مدرس زبان", value: "lang" },
            { label: "مدرس هنری", value: "art" },
          ],
        },

        employer: {
          options: [
            { label: "استخدام تمام‌وقت", value: "full" },
            { label: "قراردادی", value: "contract" },
          ],
        },
      },
    },
  },
];
