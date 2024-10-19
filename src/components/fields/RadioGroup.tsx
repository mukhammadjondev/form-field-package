import { ReactNode } from "react"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface IProps {
  name: string
  label?: ReactNode
  data: { label: string; value: string }[]
  required?: boolean
}

export default function RadioGroupField({
  name,
  data,
  label,
  required,
}: IProps) {
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
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1">
              {data.map((item) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={item.value}>
                  <FormControl>
                    <RadioGroupItem value={item.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
