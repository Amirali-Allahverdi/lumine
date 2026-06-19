"use client";

import { useRef } from "react";
import { Controller, useWatch, Control } from "react-hook-form";
import {
  TextField,
  Label,
  Input,
  FieldError,
  Description,
} from "@heroui/react";
import { DynamicFieldVisibility } from "@/shared/types/form/form-builder";

export type FileDynamicMapConfig = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export type FileDynamicIdentifier = {
  dependsOn: string;
  defaultLabel?: string;
  defaultPlaceholder?: string;
  defaultDisabled?: boolean;
  map: Record<string, FileDynamicMapConfig>;
};

export type FileFieldSchema = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  variant?: "primary" | "secondary";
  className?: string;
  description?: string;
  dynamicIdentifier?: FileDynamicIdentifier;
  dynamicVisibility?: DynamicFieldVisibility;
};

export type Props = {
  field: FileFieldSchema;
  control: Control<any>;
};

function formatFileName(
  files: FileList | File | File[] | null | undefined,
): string {
  if (!files) return "";

  if (files instanceof File) return files.name;

  if (Array.isArray(files)) {
    if (files.length === 0) return "";
    if (files.length === 1) return files[0]?.name ?? "";
    return `${files.length} فایل انتخاب شده`;
  }

  if (files instanceof FileList) {
    if (files.length === 0) return "";
    if (files.length === 1) return files[0]?.name ?? "";
    return `${files.length} فایل انتخاب شده`;
  }

  return "";
}

export function FileFieldInput({ field, control }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const visibilityDependsValue = useWatch({
    control,
    name: field.dynamicVisibility?.dependsOn ?? field.name,
  });

  const identifierDependsValue = useWatch({
    control,
    name: field.dynamicIdentifier?.dependsOn ?? field.name,
  });

  let label = field.label;
  let placeholder = field.placeholder ?? "انتخاب فایل...";
  let disabled = field.disabled ?? false;
  let visible = true;

  if (field.dynamicVisibility) {
    const config = field.dynamicVisibility.map[String(visibilityDependsValue)];

    if (config) {
      visible = config.visible;
    }
  }

  if (field.dynamicIdentifier) {
    const hasDependsValue =
      identifierDependsValue !== null &&
      identifierDependsValue !== undefined &&
      identifierDependsValue !== "";

    if (!hasDependsValue) {
      label = field.dynamicIdentifier.defaultLabel ?? label;
      placeholder = field.dynamicIdentifier.defaultPlaceholder ?? placeholder;
      disabled = field.dynamicIdentifier.defaultDisabled ?? disabled;
    } else {
      const config =
        field.dynamicIdentifier.map[String(identifierDependsValue)];

      if (config) {
        label = config.label ?? label;
        placeholder = config.placeholder ?? placeholder;
        disabled = config.disabled ?? disabled;
      }
    }
  }

  if (!visible) return null;

  return (
    <Controller
      name={field.name}
      control={control}
      rules={{
        required: field.required ? "انتخاب فایل الزامی است" : false,
      }}
      render={({ field: rhf, fieldState }) => {
        const displayValue = formatFileName(
          rhf.value as FileList | File | File[] | null,
        );

        const handleClick = () => {
          if (!disabled) inputRef.current?.click();
        };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;

          if (!files || files.length === 0) {
            rhf.onChange(null);
            return;
          }

          const selectedFiles = Array.from(files);

          if (field.maxSize) {
            const hasOversizedFile = selectedFiles.some(
              (file) => file.size > field.maxSize!,
            );

            if (hasOversizedFile) {
              rhf.onChange(null);
              e.target.value = "";
              return;
            }
          }

          rhf.onChange(
            field.multiple ? selectedFiles : (selectedFiles[0] ?? null),
          );
        };

        return (
          <TextField
            fullWidth
            isRequired={field.required}
            isInvalid={!!fieldState.error}
          >
            {label && <Label className="text-start">{label}</Label>}

            <Input
              type="text"
              readOnly
              value={displayValue}
              placeholder={placeholder}
              disabled={disabled}
              fullWidth
              variant={field.variant ?? "secondary"}
              className={`cursor-pointer ${field.className ?? ""}`}
              onClick={handleClick}
              onBlur={rhf.onBlur}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !disabled) {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
            />

            <input
              ref={(el) => {
                inputRef.current = el;

                if (typeof rhf.ref === "function") {
                  rhf.ref(el);
                }
              }}
              type="file"
              accept={field.accept}
              multiple={field.multiple}
              disabled={disabled}
              className="hidden"
              aria-hidden="true"
              tabIndex={-1}
              onChange={handleFileChange}
              onClick={(e) => {
                e.currentTarget.value = "";
              }}
            />

            {field.description && (
              <Description>{field.description}</Description>
            )}

            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        );
      }}
    />
  );
}
