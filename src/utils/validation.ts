import type { FormField, FormData, ValidationError } from '../types/schema'

/**
 * Validates a single field based on its rules
 */
export function validateField(field: FormField, value: any): string | null {
  if (!field.rule) return null

  const rules = field.rule.split('|')

  for (const rule of rules) {
    if (rule === 'required') {
      if (value === null || value === undefined || value === '') {
        return `${field.display.label} is required`
      }
    }

    if (rule.startsWith('max:')) {
      const max = parseInt(rule.split(':')[1])
      if (typeof value === 'string' && value.length > max) {
        return `${field.display.label} must not exceed ${max} characters`
      }
      if (typeof value === 'number' && value > max) {
        return `${field.display.label} must not exceed ${max}`
      }
    }

    if (rule.startsWith('min:')) {
      const min = parseInt(rule.split(':')[1])
      if (typeof value === 'string' && value.length < min) {
        return `${field.display.label} must be at least ${min} characters`
      }
      if (typeof value === 'number' && value < min) {
        return `${field.display.label} must be at least ${min}`
      }
    }
  }

  // Check value constraints for numbers
  if (field.type === 'Number' && field.value_constraints) {
    const numValue = Number(value)
    
    if (field.value_constraints.maximum && numValue > field.value_constraints.maximum) {
      return `${field.display.label} must not exceed ${field.value_constraints.maximum}`
    }
    
    if (field.value_constraints.minimum && numValue < field.value_constraints.minimum) {
      return `${field.display.label} must be at least ${field.value_constraints.minimum}`
    }
    
    if (field.value_constraints.allow_decimal === 0 && !Number.isInteger(numValue)) {
      return `${field.display.label} must be a whole number`
    }
  }

  // Check maxlength for text fields
  if (field.props?.maxlength && typeof value === 'string' && value.length > field.props.maxlength) {
    return `${field.display.label} must not exceed ${field.props.maxlength} characters`
  }

  return null
}

/**
 * Validates all form data against schema
 */
export function validateForm(fields: FormField[], formData: FormData, visibleFields: Set<string>): ValidationError[] {
  const errors: ValidationError[] = []

  fields.forEach((field) => {
    // Only validate visible fields
    if (!visibleFields.has(field.name)) return

    const error = validateField(field, formData[field.name])
    if (error) {
      errors.push({
        field: field.name,
        message: error,
      })
    }
  })

  return errors
}

