<template>
  <div class="form-field animate-fade-in" :class="layoutClass">
    <label :for="field.name" class="block text-sm font-medium text-gray-700 mb-2">
      {{ field.display.label }}
      <span v-if="isRequired" class="text-red-500">*</span>
    </label>
    <input
    :id="field.name"
    type="date"
    :value="modelValue"
    @change="handleChange"
    @blur="handleBlur"
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      :class="{
        'border-red-500': shouldShowError,
        'border-gray-300': !shouldShowError
      }"
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
import { computed } from 'vue'
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
function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', value)
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
</style>