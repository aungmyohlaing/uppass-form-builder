import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FormSchema, FormData, FormField } from '../types/schema'
import { createDefaultSchema, schemaToFieldsArray } from '../utils/schema'

export const useFormStore = defineStore('form', () => {
  // State
  const schema = ref<FormSchema>(createDefaultSchema())
  const formData = ref<FormData>({})
  const errors = ref<Record<string, string>>({})
  const touchedFields = ref<Set<string>>(new Set())
  const submitted = ref(false)

  // Computed
  const fields = computed(() => schemaToFieldsArray(schema.value))
  
  const fieldsArray = computed(() => {
    return Object.keys(schema.value.items || {}).map(key => schema.value.items[key])
  })

  // Actions
  function setSchema(newSchema: FormSchema) {
    schema.value = newSchema
    initializeFormData()
    // Reset validation state when schema changes
    clearErrors()
    touchedFields.value.clear()
    submitted.value = false
  }

  function updateSchema(newSchema: FormSchema) {
    schema.value = { ...newSchema }
  }

  function addField(field: FormField) {
    schema.value.items[field.name] = field
  }

  function updateField(fieldName: string, updatedField: FormField) {
    if (schema.value.items[fieldName]) {
      // If name changed, remove old and add new
      if (fieldName !== updatedField.name) {
        delete schema.value.items[fieldName]
        schema.value.items[updatedField.name] = updatedField
      } else {
        schema.value.items[fieldName] = updatedField
      }
    }
  }

  function removeField(fieldName: string) {
    delete schema.value.items[fieldName]
    delete formData.value[fieldName]
  }

  function reorderFields(fromIndex: number, toIndex: number) {
    const keys = Object.keys(schema.value.items)
    const [removed] = keys.splice(fromIndex, 1)
    keys.splice(toIndex, 0, removed)
    
    const newItems: Record<string, FormField> = {}
    keys.forEach(key => {
      newItems[key] = schema.value.items[key]
    })
    schema.value.items = newItems
  }

  function setFormValue(fieldName: string, value: any) {
    formData.value[fieldName] = value
    // Clear error when value changes
    if (errors.value[fieldName]) {
      delete errors.value[fieldName]
    }
  }

  function setError(fieldName: string, message: string) {
    errors.value = { ...errors.value, [fieldName]: message }
  }

  function clearError(fieldName: string) {
    const newErrors = { ...errors.value }
    delete newErrors[fieldName]
    errors.value = newErrors
  }

  function clearErrors() {
    errors.value = {}
  }

  function touchField(fieldName: string) {
    touchedFields.value.add(fieldName)
  }

  function setSubmitted(value: boolean) {
    submitted.value = value
  }

  function initializeFormData() {
    const newFormData: FormData = {}
    
    Object.values(schema.value.items || {}).forEach((field) => {
      if (field.prefill?.value !== undefined) {
        newFormData[field.name] = field.prefill.value
      } else {
        newFormData[field.name] = ''
      }
    })
    
    formData.value = newFormData
  }

  function resetForm() {
    initializeFormData()
    clearErrors()
    touchedFields.value.clear()
    submitted.value = false
  }

  return {
    // State
    schema,
    formData,
    errors,
    touchedFields,
    submitted,
    
    // Computed
    fields,
    fieldsArray,
    
    // Actions
    setSchema,
    updateSchema,
    addField,
    updateField,
    removeField,
    reorderFields,
    setFormValue,
    setError,
    clearError,
    clearErrors,
    touchField,
    setSubmitted,
    initializeFormData,
    resetForm,
  }
})

