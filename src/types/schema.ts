// Enhanced Schema Types for Form Builder

export type FieldType = 'Text' | 'Number' | 'Radio' | 'Select' | 'Date' | 'Checkbox'

export type BuilderType = 'simple_input' | 'simple_choice' | 'date_picker' | 'checkbox'

export type LayoutType = 'Normal' | 'Wide' | 'Narrow'

export interface EnumOption {
  label: string
  value: string | number
}

export interface Display {
  label: string
  placeholder?: string
  description?: string
}

export interface Builder {
  type: BuilderType
}

export interface ValueConstraints {
  maximum?: number
  minimum?: number
  allow_decimal?: number
}

export interface Prefill {
  value: string | number | boolean
}

export interface VisibilityRule {
  [key: string]: string // e.g., "required|is:full"
}

export interface FieldProps {
  maxlength?: number
  minlength?: number
  [key: string]: any
}

export interface FormField {
  name: string
  display: Display
  builder: Builder
  layout: LayoutType
  type: FieldType
  rule?: string
  enum?: EnumOption[]
  props?: FieldProps
  prefill?: Prefill
  value_constraints?: ValueConstraints
  visible?: VisibilityRule
}

export interface FormSchema {
  name: string
  label: string
  items: {
    [key: string]: FormField
  }
  [key: string]: any
}

export interface FormData {
  [key: string]: any
}

export interface ValidationError {
  field: string
  message: string
}

