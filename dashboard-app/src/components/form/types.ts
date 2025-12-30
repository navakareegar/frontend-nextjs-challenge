import { Path, FieldValues } from "react-hook-form";
import React from "react";

export type TFieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "password"
  | "textarea"
  | "select"
  | "checkbox"
  | "date";

export interface ISelectOption {
  value: string;
  label: string;
}

export interface IFieldConfig<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label: string;
  type?: TFieldType;
  placeholder?: string;
  colSpan?: 1 | 2;
  disabled?: boolean;
  readonly?: boolean;
  hidden?: boolean;
  required?: boolean;
  options?: ISelectOption[];
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export interface ISectionConfig<T extends FieldValues = FieldValues> {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  fields: IFieldConfig<T>[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface IFormConfig<T extends FieldValues = FieldValues> {
  id: string;
  title?: string;
  description?: string;
  sections: ISectionConfig<T>[];
  submitLabel?: string;
  updateLabel?: string;
  cancelLabel?: string;
  loadingLabel?: string;
}
