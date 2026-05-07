"use client";

import { Controller, useWatch, Control } from "react-hook-form";
import {
  TextField,
  Label,
  Input,
  FieldError,
  Description,
} from "@heroui/react";
import { DynamicFieldVisibility } from "@/shared/types/form/form-builder";

export type DynamicMapConfig = {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
};

export type DynamicIdentifier = {
  dependsOn: string;
  defaultLabel?: string;
  defaultPlaceholder?: string;
  defaultDisabled?: boolean;
  map: Record<string, DynamicMapConfig>;
};

export type TextFieldSchema = {
  name: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  numericOnly?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  description?: string;
  dynamicIdentifier?: DynamicIdentifier;
  dynamicVisibility?: DynamicFieldVisibility;
};

export type Props = {
  field: TextFieldSchema;
  control: Control<any>;
};

export function TextFieldInput({ field, control }: Props) {
  let label = field.label;
  let placeholder = field.placeholder;
  let maxLength = field.maxLength;
  let disabled = field.disabled;

  let visible = true;

  if (field.dynamicVisibility) {
    const dependsValue = useWatch({
      control,
      name: field.dynamicVisibility.dependsOn,
    });

    const config = field.dynamicVisibility.map[String(dependsValue)];
    if (config) {
      visible = config.visible;
    }
  }

  if (!visible) return null;

  if (field.dynamicIdentifier) {
    const dependsValue = useWatch({
      control,
      name: field.dynamicIdentifier.dependsOn,
    });

    if (!dependsValue) {
      label = field.dynamicIdentifier.defaultLabel ?? label;
      placeholder = field.dynamicIdentifier.defaultPlaceholder ?? placeholder;
      disabled = field.dynamicIdentifier.defaultDisabled ?? true;
    } else {
      const config = field.dynamicIdentifier.map[String(dependsValue)];
      if (config) {
        label = config.label ?? label;
        placeholder = config.placeholder ?? placeholder;
        maxLength = config.maxLength ?? maxLength;
        disabled = config.disabled ?? false;
      }
    }
  }

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhf, fieldState }) => (
        <TextField
          fullWidth
          isRequired={field.required}
          isInvalid={!!fieldState.error}
        >
          {label && <Label className="text-start">{label}</Label>}

          <Input
            {...rhf}
            type="text"
            value={rhf.value ?? ""}
            placeholder={placeholder}
            disabled={disabled}
            fullWidth
            variant={field.variant ? field.variant : "secondary"}
            className={field.className}
            maxLength={maxLength}
            onChange={(e) => {
              let value = e.target.value;
              if (field.numericOnly) value = value.replace(/\D/g, "");
              rhf.onChange(value);
            }}
          />

          {field.description && <Description>{field.description}</Description>}
          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  );
}
