import React from "react";

export interface FieldOption {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "textarea"
  | "otp"
  | "select"
  | "number"
  | "checkbox"
  | "radio"
  | "file"
  | "date";

export interface FieldConfig {
  name: string;
  label?: string;
  type: FieldType;
  [key: string]: any;

  placeholder?: string;
  description?: string;

  defaultValue?: any;
  options?: FieldOption[];

  required?: boolean;
  disabled?: boolean;

  className?: string;

  maxLength?: number;
  pattern?: string;

  onComplete?: (value: string) => void;

  onResend?: (value: string) => void;
  timerSeconds?: number;
}

export type DynamicFieldVisibility = {
  dependsOn: string;
  map: Record<string, { visible: boolean }>;
};
