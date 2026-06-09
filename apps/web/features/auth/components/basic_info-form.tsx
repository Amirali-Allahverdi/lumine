"use client";

import FormBuilder from "@/shared/components/form/form-builder";
import { Separator, Surface } from "@heroui/react";
import { auth_2FieldConfig } from "../configs/auth_2";
import { Auth_2BasicInfoType, auth_2SchemaBasicInfo } from "../schemas/auth_2";
import { useBasicInfo } from "../hooks/mutations/use-basic-info";

export const BasicInfoForm = () => {
  const { mutate, isPending } = useBasicInfo();

  const onSubmit = (data: Auth_2BasicInfoType) => {
    mutate({
      "basic-info_firstname": data["basic-info_firstname"],
      "basic-info_lastname": data["basic-info_lastname"],
      "basic-info_birth-day": data["basic-info_birth-day"],
      "basic-info_gender": data["basic-info_gender"],
      "basic-info_identifier": data["basic-info_identifier"],
      "basic-info_national": data["basic-info_national"],
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
