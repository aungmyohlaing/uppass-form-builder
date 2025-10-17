<template>
  <div class="form-field animate-fade-in" :class="layoutClass">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ field.display.label }}
      <span v-if="isRequired" class="text-red-500">*</span>
    </label>
    
    <div class="space-y-2">
      <div
        v-for="option in field.enum"
        :key="option.value"
        class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50"
        :class="{
          'border-blue-500 bg-blue-50': modelValue === option.value,
          'border-gray-300': modelValue !== option.value
        }"
        @click="selectOption(option.value)"
      >
        <input
          :id="`${field.name}-${option.value}`"
          type="radio"
          :name="field.name"
          :value="option.value"
          :checked="modelValue === option.value"
          class="w-4 h-4 text-blue-600 focus:ring-blue-500"
          @change="selectOption(option.value)"
        />
        <label
          :for="`${field.name}-${option.value}`"
          class="ml-3 text-sm font-medium text-gray-700 cursor-pointer flex-1"
        >
          {{ option.label }}
        </label>
      </div>
    </div>
    
    <p v-if="field.display.description" class="mt-2 text-sm text-gray-500">
      {{ field.display.description }}
    </p>
    
    <p v-if="field.display.placeholder" class="mt-1 text-sm text-gray-400 italic">
      {{ field.display.placeholder }}
    </p>
    
    <p v-if="shouldShowError" class="mt-2 text-sm text-red-500 animate-slide-in">
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
  modelValue: string | number
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
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

function selectOption(value: string | number) {
  emit('update:modelValue', value)
  formStore.touchField(props.field.name)
  // Clear error when user makes a selection
  if (formStore.errors[props.field.name]) {
    formStore.clearError(props.field.name)
  }
}
</script>

<style scoped>
.form-field {
  margin-bottom: 1.5rem;
}
</style>

