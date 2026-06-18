"use client";

import FormBuilder from "@/shared/components/form/form-builder";
import { Separator, Surface } from "@heroui/react";
import { auth_2FieldConfig } from "../configs/auth_2";
import { Auth_2BasicInfoType, auth_2SchemaBasicInfo } from "../schemas/auth_2";
import { useBasicInfo } from "../hooks/mutations/use-basic-info";

export const BasicInfoForm = () => {
  const { mutate, isPending } = useBasicInfo();

  const onSubmit = (data: Auth_2BasicInfoType) => {
    const formatCalendarDate = (dateObj: any): string => {
      const { year, month, day } = dateObj;
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    };

    mutate({
      first_name: data["first_name"],
      last_name: data["last_name"],
      birth_date: formatCalendarDate(data["birth_date"]),
      gender: data["gender"],
      national_code: data["national_code"],
      nationality: data["nationality"],
    });
  };

  return (
    <Surface variant="transparent" className="w-sm p-4 rounded-4xl">
      <h3 className="text-2xl font-bold my-4">اطلاعات پایه</h3>
      <Separator className="mb-4" />
      <FormBuilder
        fields={auth_2FieldConfig}
        onSubmit={onSubmit}
        schema={auth_2SchemaBasicInfo}
        submitButtonText="بعدی"
        twoColumns
      />
    </Surface>
  );
};
