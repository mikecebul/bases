import type { DefaultValues } from '../DynamicForm/use-dynamic-form-opts'
import type { DynamicFormType } from '../DynamicForm/use-dynamic-form'
import { RenderFields } from './render-fields-with-validation'

import type { ArrayFormField } from '@/payload-types'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardDescriptionDiv,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'

import { motion, AnimatePresence } from 'motion/react'
import { Plus, Trash2 } from 'lucide-react'
import { ReactNode } from 'react'

export const ArrayFieldComponent = ({
  defaultValues,
  field: { fields: arrayFields, description, name: arrayFieldName, label, title, maxRows, minRows },
  form,
}: {
  defaultValues: DefaultValues
  field: ArrayFormField
  form: DynamicFormType
}) => {
  return (
    <div className="@container col-span-2">
      {(title || description) && (
        <CardHeader className="px-0">
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="grid grid-cols-1 gap-4 @md:grid-cols-2 auto-cols-fr px-0">
        {/* Array Field Context */}
        <form.AppField name={arrayFieldName} mode="array">
          {(field) => {
            const arrayFieldValue = Array.isArray(field.state.value) ? field.state.value : []
            return (
              <div className="col-span-2">
                <AnimatePresence initial={false} mode="sync">
                  {arrayFieldValue?.map((_, i) => (
                    // Map through each array item
                    <MotionWrapper key={i}>
                      <Card
                        className={cn('col-span-2', {
                          'p-0 shadow-none border-none': arrayFields.length < 2,
                        })}
                      >
                        {arrayFields.length > 1 && (
                          <CardHeader>
                            <CardDescriptionDiv className="flex items-center justify-between">
                              {label} {i + 1}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className={cn(
                                  'size-7 rounded-full transition-opacity hover:bg-red-100',
                                  {
                                    'pointer-events-none opacity-0':
                                      arrayFieldValue.length <= minRows,
                                    'opacity-100': arrayFieldValue.length > minRows,
                                  },
                                )}
                                onClick={() => field.removeValue(i)}
                              >
                                <Trash2 className="text-red-700 size-4 hover:text-red-900" />
                              </Button>
                            </CardDescriptionDiv>
                          </CardHeader>
                        )}
                        <CardContent
                          className={cn('space-y-3', {
                            'p-0 pb-2': arrayFields.length < 2,
                          })}
                        >
                          {arrayFields?.map((subField, index) => {
                            const newSubField = {
                              ...subField,
                              name: `${arrayFieldName}[${i}].${subField.name}`,
                              label:
                                arrayFields.length < 2
                                  ? `${subField.label} ${i + 1}`
                                  : subField.label,
                            }
                            return (
                              <div key={subField.id || index}>
                                {arrayFields.length !== 1 ? (
                                  <RenderFields
                                    field={newSubField}
                                    defaultValues={defaultValues}
                                    form={form}
                                  />
                                ) : (
                                  <div className="flex items-center" key={subField.id}>
                                    <RenderFields
                                      field={newSubField}
                                      defaultValues={defaultValues}
                                      form={form}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className={cn(
                                        'size-7 rounded-full transition-opacity hover:bg-red-100 ml-4',
                                        {
                                          'pointer-events-none opacity-0':
                                            arrayFieldValue.length <= minRows,
                                          'opacity-100': arrayFieldValue.length > minRows,
                                        },
                                      )}
                                      onClick={() => field.removeValue(i)}
                                    >
                                      <Trash2 className="text-red-700 size-4 hover:text-red-900" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </CardContent>
                      </Card>
                    </MotionWrapper>
                  ))}
                </AnimatePresence>

                <Button
                  onClick={() =>
                    field.pushValue(
                      Array.isArray(defaultValues[arrayFieldName])
                        ? defaultValues[arrayFieldName][0]
                        : {},
                    )
                  }
                  type="button"
                  size="icon"
                  className={cn('size-7 rounded-full transition-opacity duration-300', {
                    'pointer-events-none opacity-0 h-0': arrayFieldValue.length >= maxRows,
                    'opacity-100': arrayFieldValue.length < maxRows,
                  })}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )
          }}
        </form.AppField>
      </CardContent>
    </div>
  )
}

const MotionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ marginBottom: 0 }}
      animate={{ marginBottom: 16 }}
      exit={{ marginBottom: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, height: 0, padding: 0 }}
        animate={{
          opacity: 1,
          height: 'auto',
        }}
        exit={{
          opacity: 0,
          height: 0,
          transition: { duration: 0.2 },
        }}
        transition={{
          opacity: { duration: 0.05, delay: 0.15 },
          height: { duration: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
