import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea, TextareaProps } from '@/components/ui/textarea'

interface IProps extends TextareaProps {
  name: string
  label?: ReactNode
  required?: boolean
}

export default function TextAreaField({
  required,
  name,
  label,
  ...props
}: IProps) {
  const { control } = useFormContext()

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
            <Textarea {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}