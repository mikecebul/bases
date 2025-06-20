import { DefaultValues } from '../hooks/use-form-opts'
import { RenderFields } from './RenderFieldsWithValidation'

import type { GroupFormField } from '@/payload-types'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { DynamicFormType } from '../hooks/use-dynamic-form'

export const GroupFieldComponent = ({
  defaultValues,
  field: { fields: groupFields, description, name: parentName, title },
  form,
}: {
  defaultValues: DefaultValues
  field: GroupFormField
  form: DynamicFormType
}) => {
  return (
    <div className="@container col-span-2">
      <Card className="border-none shadow-none">
        {(title || description) && (
          <CardHeader className="px-0">
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className="grid grid-cols-1 gap-4 @md:grid-cols-2 auto-cols-fr px-0">
          {/* Array Field Context */}
          {groupFields?.map((subField) => {
            const newSubField = {
              ...subField,
              name: `${parentName}.${subField.name}`,
            }
            return (
              <RenderFields
                key={subField.id}
                field={newSubField}
                defaultValues={defaultValues}
                form={form}
              />
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
