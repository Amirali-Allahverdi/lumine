"use client";

import { Controller, useWatch, Control } from "react-hook-form";
import { Select, Label, ListBox, FieldError } from "@heroui/react";
import { DynamicFieldVisibility } from "@/shared/types/form/form-builder";

export type SelectOption = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

export type SelectDynamicIdentifier = {
  dependsOn: string;
  defaultDisabled?: boolean;
  defaultOptions?: SelectOption[];
  map: Record<string, { options: SelectOption[]; disabled?: boolean }>;
};

export type SelectFieldSchema = {
  name: string;
  label?: string;
  placeholder?: string;
  variant?: "primary" | "secondary";
  required?: boolean;
  options?: SelectOption[];
  dynamicIdentifier?: SelectDynamicIdentifier;
  dynamicVisibility?: DynamicFieldVisibility;
};

export type Props = {
  field: SelectFieldSchema;
  control: Control<any>;
};

export function SelectField({ field, control }: Props) {
  let options = field.options;
  let disabled = false;
  let visible = true;

  if (field.dynamicVisibility) {
    const dependsValue = useWatch({
      control,
      name: field.dynamicVisibility.dependsOn,
    });

    const config = field.dynamicVisibility.map[String(dependsValue)];
    if (config) visible = config.visible;
  }

  if (!visible) return null;

  if (field.dynamicIdentifier) {
    const dependsValue = useWatch({
      control,
      name: field.dynamicIdentifier.dependsOn,
    });

    if (!dependsValue) {
      options = field.dynamicIdentifier.defaultOptions ?? [];
      disabled = field.dynamicIdentifier.defaultDisabled ?? true;
    } else {
      const config = field.dynamicIdentifier.map[String(dependsValue)];
      if (config) {
        options = config.options ?? options;
        disabled = config.disabled ?? false;
      }
    }
  }

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhf, fieldState }) => (
        <Select
          placeholder={field.placeholder}
          selectedKey={rhf.value}
          onSelectionChange={(key) => rhf.onChange(key)}
          variant={field.variant}
          isDisabled={disabled}
        >
          {field.label && <Label>{field.label}</Label>}

          <Select.Trigger>
            <Select.Value className={`text-right`} />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {options?.map((opt) => (
                <ListBox.Item
                  key={opt.value}
                  id={String(opt.value)}
                  textValue={opt.label}
                >
                  <div className="flex justify-start gap-2 items-center">
                    {opt.icon}
                    {opt.label}
                  </div>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>

          <FieldError>{fieldState.error?.message}</FieldError>
        </Select>
      )}
    />
  );
}
