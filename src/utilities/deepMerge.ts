/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: unknown): item is Record<string, unknown> {
  return Boolean(item) && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export default function deepMerge<T extends Record<string, unknown>, R extends Record<string, unknown>>(
  target: T,
  source: R,
): T & R {
  const output: Record<string, unknown> = { ...target }
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key]
      const targetValue = target[key]

      if (isObject(sourceValue)) {
        if (!(key in target) || !isObject(targetValue)) {
          Object.assign(output, { [key]: sourceValue })
        } else {
          output[key] = deepMerge(targetValue, sourceValue)
        }
      } else {
        Object.assign(output, { [key]: sourceValue })
      }
    })
  }

  return output as T & R
}
