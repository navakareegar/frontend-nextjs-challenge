'use client';

import {
  useForm,
  FieldValues,
  DefaultValues,
  Resolver,
  FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingOutlined, CheckOutlined } from '@ant-design/icons';
import { z } from 'zod';
import { IFormConfig, IFieldConfig } from './types';

interface IDynamicFormProps<T extends FieldValues> {
  config: IFormConfig<T>;
  schema: z.ZodType<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

function getNestedError(
  errors: FieldErrors,
  path: string
): { message?: string } | undefined {
  const parts = path.split('.');
  let current: unknown = errors;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return current as { message?: string } | undefined;
}

export default function DynamicForm<T extends FieldValues>(
  props: IDynamicFormProps<T>
) {
  const {
    config,
    schema,
    defaultValues,
    onSubmit,
    onCancel,
    isLoading = false,
    isEditMode = false,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as Resolver<T, any>,
    defaultValues: defaultValues,
  });

  const inputBaseClass =
    'w-full bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed';

  const renderField = (field: IFieldConfig<T>) => {
    if (field.hidden) return null;

    const fieldProps = register(field.name);

    const commonProps = {
      ...fieldProps,
      placeholder: field.placeholder,
      disabled: field.disabled,
      readOnly: field.readonly,
      className: inputBaseClass,
      style: { padding: '0.5rem 1rem' },
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={field.rows || 3}
            maxLength={field.maxLength}
            style={{ padding: '0.5rem 1rem', minHeight: '80px' }}
          />
        );

      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            {...commonProps}
            type="number"
            min={field.min}
            max={field.max}
            step={field.step}
          />
        );

      case 'email':
        return (
          <input {...commonProps} type="email" maxLength={field.maxLength} />
        );

      case 'tel':
        return (
          <input {...commonProps} type="tel" maxLength={field.maxLength} />
        );

      case 'password':
        return (
          <input {...commonProps} type="password" maxLength={field.maxLength} />
        );

      case 'date':
        return <input {...commonProps} type="date" />;

      case 'checkbox':
        return (
          <input
            {...fieldProps}
            type="checkbox"
            disabled={field.disabled}
            className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
          />
        );

      default:
        return (
          <input
            {...commonProps}
            type="text"
            maxLength={field.maxLength}
            minLength={field.minLength}
            pattern={field.pattern}
          />
        );
    }
  };

  const onFormSubmit = (data: T) => {
    onSubmit(data);
  };

  const {
    submitLabel = 'Create',
    updateLabel = 'Update',
    cancelLabel = 'Cancel',
    loadingLabel = 'Saving...',
  } = config;

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {(config.title || config.description) && (
        <div className="mb-6">
          {config.title && (
            <h2 className="text-xl font-bold text-white">{config.title}</h2>
          )}
          {config.description && (
            <p className="text-slate-400 mt-1">{config.description}</p>
          )}
        </div>
      )}

      {config.sections.map((section) => (
        <div key={section.id} className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              {section.icon}
              {section.title}
            </h3>
            {section.description && (
              <p className="text-sm text-slate-500 mt-1">
                {section.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.fields.map((field) => {
              if (field.hidden) return null;

              const error = getNestedError(errors, field.name as string);
              const colSpanClass = field.colSpan === 2 ? 'sm:col-span-2' : '';

              if (field.type === 'checkbox') {
                return (
                  <div
                    key={field.name as string}
                    className={`flex items-center gap-3 ${colSpanClass}`}
                  >
                    {renderField(field)}
                    <label className="text-sm font-medium text-slate-300">
                      {field.label}
                      {field.required && (
                        <span className="text-red-400 ml-1">*</span>
                      )}
                    </label>
                  </div>
                );
              }

              return (
                <div key={field.name as string} className={colSpanClass}>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    {field.label}
                    {field.required && (
                      <span className="text-red-400 ml-1">*</span>
                    )}
                  </label>
                  {renderField(field)}
                  {error?.message && (
                    <p className="mt-1 text-sm text-red-400">{error.message}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div
        className="flex items-center justify-end gap-3 border-t border-slate-700"
        style={{ paddingTop: '1rem' }}
      >
        <button
          type="button"
          onClick={onCancel}
          className="text-slate-400 hover:text-white transition-colors"
          style={{ padding: '0.5rem 1rem' }}
        >
          {cancelLabel}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-emerald-500/25 hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          style={{ padding: '0.5rem 1.5rem' }}
        >
          {isLoading ? (
            <>
              <LoadingOutlined spin />
              {loadingLabel}
            </>
          ) : (
            <>
              <CheckOutlined />
              {isEditMode ? updateLabel : submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
