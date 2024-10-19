import { ReactNode } from "react"
import { SelectProps } from "@radix-ui/react-select"
import { useFormContext } from "react-hook-form"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectContentProps,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface IOption {
  label: string
  value: string
  disabled?: boolean
}

interface IProps {
  name: string
  placeholder?: string
  data: IOption[]
  label?: ReactNode
  required?: boolean
  clearable?: boolean
  selectProps?: Omit<SelectProps, 'value' | 'onValueChange' | 'defaultValue' | 'name'>
  contentProps?: SelectContentProps
}

export const SelectField = ({
  name,
  data,
  placeholder,
  label,
  required,
  clearable,
  selectProps = {},
  contentProps = {},
}: IProps) => {
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500 dark:text-red-900">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) =>
                field.onChange({
                  target: {
                    value,
                  },
                })
              }
              {...selectProps}
            >
              <SelectTrigger
                clearable={clearable && !!field.value}
                onClear={() => field.onChange({ target: { value: '' } })}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent {...contentProps}>
                {data.map((item) => (
                  <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
