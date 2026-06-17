"use client";

import FormBuilder from "@/shared/components/form/form-builder";
import { Separator, Surface } from "@heroui/react";
import { auth_3FieldConfig } from "../configs/auth_3";
import { auth_3SchemaTechnicalInfo } from "../schemas/auth_3";
import { useTechnicalInfo } from "../hooks/queries/use-technical-info";

export const TechnicalInfoForm = () => {
  const { onSubmit } = useTechnicalInfo();

  return (
    <Surface variant="transparent" className="w-sm p-4">
      <h3 className="text-2xl font-bold my-4">اطلاعات فنی</h3>
      <Separator className="mb-4" />
      <FormBuilder
        fields={auth_3FieldConfig}
        onSubmit={onSubmit}
        schema={auth_3SchemaTechnicalInfo}
        submitButtonText="ثبت و ادامه"
        twoColumns
      />
    </Surface>
  );
};
