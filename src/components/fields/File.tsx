import { ReactNode } from "react"
import { X as CloseIcon, FileText, Music } from "lucide-react"
import { FileUploader } from "react-drag-drop-files"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import calculateFileSize from "@/lib/calculateFileSize"
import normalizeFileUrl from "@/lib/normalizeFileUrl"

interface IProps {
  name: string
  label?: ReactNode
  required?: boolean
  isFileUpload?: boolean
}

export default function FileField({
  name,
  label,
  required,
  isFileUpload,
}: IProps) {
  const { control } = useFormContext()

  const acceptedTypes = isFileUpload
    ? ['PDF', 'MP3', 'WAV', 'M4A']
    : ['PNG', 'JPG', 'JPEG']

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500 dark:text-red-900">*</span>}
            </FormLabel>
          )}
          <FormControl>
            {value ? (
              <div className="relative p-2 border rounded-md max-w-fit">
                {value.type?.includes('pdf') ? (
                  <div className="flex items-center gap-2">
                    <FileText className="w-6 h-6 stroke-1" />
                    <span className="truncate text-sm">{value.name}</span>
                    <span className="text-sm">
                      {calculateFileSize(value.size)}
                    </span>
                  </div>
                ) : value.type?.includes('audio') ? (
                  <div className="flex w-96 items-center gap-2">
                    <Music className="w-6 h-6 stroke-1" />
                    <span className="truncate text-sm">{value.name}</span>
                    <span className="text-sm">
                      {calculateFileSize(value.size)}
                    </span>
                    <audio
                      controls
                      src={URL.createObjectURL(value)}
                      className="mt-2 w-full"
                    />
                  </div>
                ) : (
                  <div className="max-w-96">
                    {typeof value === 'string' && value.includes('audios') ? (
                      <audio
                        controls
                        src={normalizeFileUrl(value)}
                        className="w-96"
                      />
                    ) : typeof value === 'string' && value.includes('files') ? (
                      <a
                        href={normalizeFileUrl(value)}
                        target="_blank"
                        className="underline text-blue-500"
                      >
                        {value}
                      </a>
                    ) : (
                      <img
                        src={
                          typeof value === 'string' ||
                          typeof value.url === 'string'
                            ? normalizeFileUrl(value)
                            : URL.createObjectURL(value)
                        }
                        alt="preview"
                        className="min-w-28 max-h-48 object-cover"
                      />
                    )}
                  </div>
                )}
                <button
                  type="button"
                  className="absolute top-2 right-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                  onClick={() => onChange(null)}
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <FileUploader
                handleChange={onChange}
                name="file"
                types={acceptedTypes}
                multiple={false}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
