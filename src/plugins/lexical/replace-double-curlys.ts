import { jsonToHtmlTable } from "./json-to-html-table" 

type FormData = Record<string, any>

export const replaceDoubleCurlys = (str: string, formData?: FormData): string => {
  const regex = /\{\{(.+?)\}\}/g

  const resolveVariable = (path: string, data: any): string => {
    const keys = path.split('.')
    let value = data

    for (const key of keys) {
      if (Array.isArray(value)) {
        // Convert array of objects to a readable string
        return value
          .map((item) => (typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)))
          .join(', ')
      }
      if (value && typeof value === 'object' && key in value) {
        value = value[key]
      } else {
        return `{{${path}}}` // Return as-is if not found
      }
    }
    return typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)
  }

  if (str && formData) {
    return str.replace(regex, (_, variable: string) => {
      if (variable === '*') {
        return Object.entries(formData)
          .map(([key, value]) => `${key} : ${JSON.stringify(value, null, 2)}`)
          .join(' <br /> ')
      } else if (variable === '*:table') {
        return jsonToHtmlTable(formData)
      } else {
        return resolveVariable(variable, formData)
      }
    })
  }

  return str
}
