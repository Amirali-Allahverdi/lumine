"use client";

import { Controller } from "react-hook-form";
import {
  TextField,
  Label,
  TextArea,
  FieldError,
  Description,
} from "@heroui/react";

export function TextAreaField({ field, control }: any) {
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhf, fieldState }) => (
        <TextField
          variant="secondary"
          isRequired={field.required}
          isInvalid={!!fieldState.error}
        >
          <Label className="text-start">{field.label}</Label>

          <TextArea
            {...rhf}
            placeholder={field.placeholder}
            disabled={field.disabled}
          />

          {field.description && <Description>{field.description}</Description>}

          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  );
}
