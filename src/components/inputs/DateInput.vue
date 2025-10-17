<template>
  <div class="form-field animate-fade-in" :class="layoutClass">
    <label :for="field.name" class="block text-sm font-medium text-gray-700 mb-2">
      {{ field.display.label }}
      <span v-if="isRequired" class="text-red-500">*</span>
    </label>
    <VueDatePicker
      :id="field.name"
      v-model="dateValue"
      @update:model-value="handleChange"
      @blur="handleBlur"
      :placeholder="field.display.placeholder || 'Select date...'"
      :enable-time-picker="false"
      format="yyyy-MM-dd"
      auto-apply
      :teleport="true"
      :input-class-name="inputClasses"
    />
    <p v-if="field.display.description" class="mt-1 text-sm text-gray-500">
      {{ field.display.description }}
    </p>
    <p v-if="shouldShowError" class="mt-1 text-sm text-red-500 animate-slide-in">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useFormStore } from '../../stores/formStore'
import type { FormField } from '../../types/schema'

const props = defineProps<{
  field: FormField
  modelValue: string
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const formStore = useFormStore()
const isRequired = computed(() => props.field.rule?.includes('required'))

// Convert string to Date object for the date picker
const dateValue = ref<Date | null>(props.modelValue ? new Date(props.modelValue) : null)

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  dateValue.value = newValue ? new Date(newValue) : null
})

// Layout classes based on field.layout
const layoutClass = computed(() => {
  switch (props.field.layout) {
    case 'Wide':
      return 'max-w-full'
    case 'Narrow':
      return 'max-w-md'
    case 'Normal':
    default:
      return 'max-w-2xl'
  }
})

// Only show error if form has been submitted OR field has been touched
const shouldShowError = computed(() => {
  return !!(props.error && (
    formStore.submitted || 
    formStore.touchedFields.has(props.field.name)
  ))
})

// Dynamic input classes based on error state
const inputClasses = computed(() => {
  return shouldShowError.value 
    ? 'border-red-500 focus:ring-red-500' 
    : 'border-gray-300 focus:ring-blue-500'
})

function handleChange(value: Date | null) {
  if (value) {
    // Format date as YYYY-MM-DD
    const year = value.getFullYear()
    const month = String(value.getMonth() + 1).padStart(2, '0')
    const day = String(value.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    emit('update:modelValue', formattedDate)
  } else {
    emit('update:modelValue', '')
  }
  
  // Clear error when user makes a selection
  if (formStore.errors[props.field.name]) {
    formStore.clearError(props.field.name)
  }
}

function handleBlur() {
  formStore.touchField(props.field.name)
}
</script>

<style scoped>
.form-field {
  margin-bottom: 1.5rem;
}

/* Override VueDatePicker styles to match our design */
:deep(.dp__input_wrap) {
  width: 100%;
}

:deep(.dp__input) {
  padding: 0.5rem 2.5rem 0.5rem 3rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
  width: 100%;
}

:deep(.dp__input_icon) {
  left: 0.75rem;
  right: auto;
}

:deep(.dp__clear_icon) {
  right: 0.75rem;
}

:deep(.dp__input:focus) {
  outline: none;
  border-color: transparent;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

:deep(.dp__input.border-red-500) {
  border-color: #ef4444 !important;
}

:deep(.dp__input.border-red-500:focus) {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.5) !important;
}
</style>