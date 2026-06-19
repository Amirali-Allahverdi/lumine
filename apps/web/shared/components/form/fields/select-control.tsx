"use client";

import { Controller, useWatch, Control } from "react-hook-form";
import { Select, Label, ListBox, FieldError } from "@heroui/react";
import { DynamicFieldVisibility } from "@/shared/types/form/form-builder";
import { useEffect, useState } from "react";

export type SelectOption = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

export type SelectDynamicIdentifier = {
  dependsOn: string;
  defaultDisabled?: boolean;
  defaultOptions?: SelectOption[];
  map?: Record<string, { options: SelectOption[]; disabled?: boolean }>;
  queryFn?: (dependsValue: string) => Promise<SelectOption[]>;
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

  const [dynamicOptions, setDynamicOptions] = useState<SelectOption[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  if (field.dynamicVisibility) {
    const dependsValue = useWatch({
      control,
      name: field.dynamicVisibility.dependsOn,
    });
    const config = field.dynamicVisibility.map[String(dependsValue)];
    if (config) visible = config.visible;
  }

  if (!visible) return null;

  const dependsValue = field.dynamicIdentifier
    ? useWatch({ control, name: field.dynamicIdentifier.dependsOn })
    : null;

  useEffect(() => {
    if (!field.dynamicIdentifier?.queryFn || !dependsValue) {
      setDynamicOptions([]);
      return;
    }

    setIsFetching(true);
    field.dynamicIdentifier
      .queryFn(String(dependsValue))
      .then(setDynamicOptions)
      .catch(() => setDynamicOptions([]))
      .finally(() => setIsFetching(false));
  }, [dependsValue]);

  if (field.dynamicIdentifier) {
    if (!dependsValue) {
      options = field.dynamicIdentifier.defaultOptions ?? [];
      disabled = field.dynamicIdentifier.defaultDisabled ?? true;
    } else if (field.dynamicIdentifier.queryFn) {
      options = dynamicOptions;
      disabled = isFetching;
    } else if (field.dynamicIdentifier.map) {
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
          placeholder={isFetching ? "در حال بارگذاری..." : field.placeholder}
          selectedKey={rhf.value}
          onSelectionChange={(key) => rhf.onChange(key)}
          variant={field.variant}
          isDisabled={disabled}
        >
          {field.label && <Label>{field.label}</Label>}
          <Select.Trigger dir="ltr">
            <Select.Value className={`text-end`} />
            <Select.Indicator className="absolute left-2" />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {options?.map((opt) => (
                <ListBox.Item
                  key={opt.value}
                  id={String(opt.value)}
                  textValue={opt.label}
                >
                  <div className="flex justify-end w-full gap-2 items-center">
                    {opt.label}
                    {opt.icon}
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
