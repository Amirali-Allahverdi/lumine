import { FieldConfig } from "@/shared/types/form/form-builder";

export const auth_2FieldConfig: FieldConfig[] = [
  {
    name: "first_name",
    label: "نام",
    type: "text",
    placeholder: "هستی",
    required: true,
    variant: "secondary",
  },
  {
    name: "last_name",
    label: "نام خانوادگی",
    type: "text",
    placeholder: "اثنی عشری",
    required: true,
    variant: "secondary",
  },
  {
    name: "gender",
    label: "جنسیت",
    type: "radio",
    options: [
      { label: "مرد", value: "male" },
      { label: "زن", value: "female" },
    ],
    required: true,
    variant: "secondary",
  },
  {
    name: "birth_date",
    type: "date",
    label: "تاریخ تولد",
    required: true,
    variant: "secondary",
  },
  {
    name: "nationality",
    label: "ملیت",
    type: "radio",
    options: [
      { label: "ایرانی", value: "IR" },
      { label: "اتباع", value: "FR" },
    ],
    required: true,
    variant: "secondary",
  },
  {
    name: "national_code",
    type: "text",
    label: "شناسه",
    numericOnly: true,

    dynamicIdentifier: {
      dependsOn: "nationality",

      defaultLabel: "کد ملی / کد فراگیر",
      defaultPlaceholder: "ابتدا ملیت را انتخاب کنید",

      map: {
        IR: {
          label: "کد ملی",
          placeholder: "0123456789",
          maxLength: 10,
        },
        FR: {
          label: "کد فراگیر",
          placeholder: "123456789012",
          maxLength: 12,
        },
      },
    },
    required: true,
    variant: "secondary",
  },
];
