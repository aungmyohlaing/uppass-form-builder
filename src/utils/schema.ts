import type { FormSchema, FormField } from '../types/schema'

/**
 * Encodes schema to base64 to prevent easy inspection
 */
export function encodeSchema(schema: FormSchema): string {
  const jsonString = JSON.stringify(schema)
  return btoa(unescape(encodeURIComponent(jsonString)))
}

/**
 * Decodes base64 encoded schema
 */
export function decodeSchema(encoded: string): FormSchema {
  const jsonString = decodeURIComponent(escape(atob(encoded)))
  return JSON.parse(jsonString)
}

/**
 * Converts schema items object to array of fields
 */
export function schemaToFieldsArray(schema: FormSchema): FormField[] {
  return Object.values(schema.items || {})
}

/**
 * Creates a default schema structure
 */
export function createDefaultSchema(): FormSchema {
  return {
    name: 'form',
    label: 'New Form',
    items: {},
  }
}

/**
 * Creates a default field
 */
export function createDefaultField(type: FormField['type']): FormField {
  const baseField: FormField = {
    name: `field_${Date.now()}`,
    display: {
      label: 'New Field',
    },
    builder: {
      type: 'simple_input',
    },
    layout: 'Normal',
    type,
  }

  if (type === 'Radio' || type === 'Select') {
    baseField.builder.type = 'simple_choice'
    baseField.enum = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ]
  }

  if (type === 'Number') {
    baseField.value_constraints = {
      allow_decimal: 0,
    }
  }

  if (type === 'Text') {
    baseField.props = {
      maxlength: 280,
    }
  }

  return baseField
}

