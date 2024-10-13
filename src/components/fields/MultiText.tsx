import { Plus, Trash2 } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface IProps {
  name: string
  addBtnTitle: string
  label?: string
  description?: string
  required?: boolean
}

export default function MultiTextField({
  name,
  label,
  description,
  required,
  addBtnTitle,
}: IProps) {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ name, control })

  return (
    <div>
      {label && (
        <FormLabel>
          {`${label} `}
          {required && (
            <span className="text-red-500 dark:text-red-900">*</span>
          )}
        </FormLabel>
      )}
      <FormDescription>{description}</FormDescription>
      {fields.map((field, index) => (
        <FormField
          key={field.id}
          control={control}
          name={`${name}[${index}]`}
          render={({ field }) => (
            <FormItem className="mb-4">
              <div className="relative flex items-center">
                <FormControl className="w-full">
                  <Input {...field} />
                </FormControl>
                {fields.length >= 1 && (
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute right-2 text-red-500 p-1 bg-transparent hover:bg-transparent focus:bg-transparent">
                    <Trash2 className="size-5" />
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        variant="ghost"
        type="button"
        onClick={() => append("")}
        className="flex items-center">
        <Plus className="size-5 mr-2 text-blue-500 dark:text-white" />
        {addBtnTitle}
      </Button>
    </div>
  )
}
