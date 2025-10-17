import type { FormField, FormData } from '../types/schema'

/**
 * Checks if a field should be visible based on its visibility rules
 */
export function isFieldVisible(field: FormField, formData: FormData): boolean {
  if (!field.visible) return true

  for (const [targetField, ruleString] of Object.entries(field.visible)) {
    const rules = ruleString.split('|')
    const targetValue = formData[targetField]

    for (const rule of rules) {
      if (rule === 'required') {
        if (!targetValue || targetValue === '') {
          return false
        }
      }

      if (rule.startsWith('is:')) {
        const expectedValue = rule.split(':')[1]
        if (targetValue !== expectedValue) {
          return false
        }
      }

      if (rule.startsWith('not:')) {
        const unexpectedValue = rule.split(':')[1]
        if (targetValue === unexpectedValue) {
          return false
        }
      }

      if (rule.startsWith('in:')) {
        const values = rule.split(':')[1].split(',')
        if (!values.includes(String(targetValue))) {
          return false
        }
      }
    }
  }

  return true
}

/**
 * Gets all visible field names based on current form data
 */
export function getVisibleFields(fields: FormField[], formData: FormData): Set<string> {
  const visibleFields = new Set<string>()

  fields.forEach((field) => {
    if (isFieldVisible(field, formData)) {
      visibleFields.add(field.name)
    }
  })

  return visibleFields
}

