import type { SelectField } from '@payloadcms/plugin-form-builder/types';
import React from 'react';
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Error } from '../Error';
import { Width } from '../Width';

export const Select: React.FC<
  SelectField & {
    control: Control<FieldValues, any>;
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
  }
> = ({ name, control, errors, label, options, required, width }) => (
  <Width width={width}>
    <Label htmlFor={name}>{label}</Label>
    <Controller
      control={control}
      defaultValue=''
      name={name}
      rules={{ required }}
      render={({ field: { onChange, value } }) => {
        const controlledValue = options.find((t) => t.value === value);

        return (
          <SelectComponent value={controlledValue?.value} onValueChange={(val) => onChange(val)}>
            <SelectTrigger className='' id={name}>
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              {options.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectComponent>
        );
      }}
    />
    {required && errors[name] && <Error />}
  </Width>
);
