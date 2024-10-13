import * as React from "react"

import * as LabelPrimitive from "@radix-ui/react-label"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

interface IProps extends VariantProps<typeof labelVariants> {
  extraLabel?: React.ReactNode
}

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & IProps
>(({ className, extraLabel, ...props }, ref) => (
  <div className="flex items-center justify-between">
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
    { extraLabel && <div className="text-sm">{extraLabel}</div> }
  </div>
));
Label.displayName = LabelPrimitive.Root.displayName

export { Label }