import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import MultiSelectFormField from '@/components/ui/multi-select';

interface IProps {
  name: string;
  label?: ReactNode;
  placeholder: string;
  required?: string;
  data: { label: string; value: string }[];
}

export default function MultiSelect({
  data,
  name,
  label,
  placeholder,
  required,
}: IProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500 dark:text-red-900">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <MultiSelectFormField
              options={data}
              defaultValue={field.value}
              onValueChange={field.onChange}
              placeholder={placeholder}
              variant="inverted"
              animation={2}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
