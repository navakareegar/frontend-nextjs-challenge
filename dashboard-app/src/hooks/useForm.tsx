'use client';

import DynamicForm from '@/components/form/DynamicForm';
import { IFormConfig } from '@/components/form/types';
import { FieldValues, DefaultValues } from 'react-hook-form';
import { z } from 'zod';

interface IUseFormProps<T extends FieldValues> {
  config: IFormConfig<T>;
  schema: z.ZodType<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

export default function useForm<T extends FieldValues>({
  config,
  schema,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
  isEditMode = false,
}: IUseFormProps<T>) {
  const FormElement = (
    <DynamicForm<T>
      config={config}
      schema={schema}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={isLoading}
      isEditMode={isEditMode}
    />
  );

  return {
    Form: FormElement,
  };
}
