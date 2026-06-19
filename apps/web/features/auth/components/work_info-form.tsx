"use client";

import FormBuilder from "@/shared/components/form/form-builder";
import { Separator, Surface } from "@heroui/react";
import { roleFieldConfigMap, roleTitleMap } from "../configs/auth_4";
import { roleSchemaMap, TechnicalInfoFormType } from "../schemas/auth_4";
import { useWorkInfo } from "../hooks/mutations/use-work-info";
import { useRoleStore } from "../store/setting-role";
import { WorkInfoPayload } from "../types/auth_4";

export const WorkInfoForm = () => {
  const role = useRoleStore((s) => s.role);

  const { mutate, isPending } = useWorkInfo(role);

  if (!role || !roleFieldConfigMap[role]) {
    return (
      <Surface variant="transparent" className="w-sm p-4 rounded-4xl">
        <p className="text-center text-danger">
          نقش کاربر مشخص نیست. لطفاً دوباره وارد شوید.
        </p>
      </Surface>
    );
  }

  const fields = roleFieldConfigMap[role];
  const schema = roleSchemaMap[role as keyof typeof roleSchemaMap];
  const title = roleTitleMap[role];

  const onSubmit = (data: TechnicalInfoFormType) => {
    let payload: WorkInfoPayload;

    if (role === "model") {
      const modelData = data as any;
      payload = {
        ...modelData,
        height_cm: Number(modelData.height_cm),
        weight_kg: Number(modelData.weight_kg),
      };
    } else if (role === "instructor") {
      // تبدیل string به number برای مدرس
      const instructorData = data as any;
      payload = {
        ...instructorData,
        years_of_experience: Number(instructorData.years_of_experience),
      };
    } else {
      payload = data as WorkInfoPayload;
    }

    mutate(payload);
  };

  return (
    <Surface variant="transparent" className="w-sm p-4 rounded-4xl">
      <h3 className="text-2xl font-bold my-4">{title}</h3>
      <Separator className="mb-4" />
      <FormBuilder
        fields={fields}
        onSubmit={onSubmit}
        schema={schema}
        submitButtonText="بعدی"
        twoColumns
      />
    </Surface>
  );
};
