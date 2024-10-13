import { AlertDialogProps } from '@radix-ui/react-alert-dialog'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog as AlertDialogRoot,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ReactNode } from 'react'

interface IProps extends AlertDialogProps {
  alertTitle: ReactNode
  alertDescription?: ReactNode
  alertCancelTitle: ReactNode
  alertCancelFunction?: () => void
  alertActionTitle: ReactNode
  alertActionFunction: () => void
  open: boolean
  onOpenChange: () => void
}

export const AlertDialog = ({
  alertTitle, alertDescription, alertCancelTitle, alertCancelFunction, alertActionTitle, alertActionFunction, open, onOpenChange,
}: IProps) => {
  return (
    <AlertDialogRoot open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {alertTitle}
          </AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
              onClick={() => {
              onOpenChange()
              if (alertCancelFunction) {
                alertCancelFunction()
              }
            }}
          >
            {alertCancelTitle}
          </AlertDialogCancel>
          <AlertDialogAction onClick={alertActionFunction}>
            {alertActionTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}