<template>
  <div class="form-renderer max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">{{ schema.label }}</h1>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <template v-for="field in fieldsArray" :key="field.name">
        <div v-show="isFieldVisible(field)" class="transition-all duration-300">
          <component
            :is="getInputComponent(field.type)"
            :field="field"
            :model-value="formData[field.name] ?? ''"
            @update:model-value="(value: string) => updateFieldValue(field.name, value)"
            :error="errors[field.name]"
          />
        </div>
      </template>
      
      <div v-if="fieldsArray.length === 0" class="text-center py-12 text-gray-400">
        <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-lg">No form fields available</p>
      </div>
      
      <div v-if="fieldsArray.length > 0" class="pt-6 border-t">
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Submit</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        </button>
      </div>
    </form>
    
    <!-- Success Modal -->
    <Transition name="modal">
      <div
        v-if="showSuccess"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="showSuccess = false"
      >
        <div class="bg-white rounded-lg p-8 max-w-md animate-bounce-subtle" @click.stop>
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Form Submitted Successfully!</h3>
            <p class="text-sm text-gray-500 mb-4">Your form has been submitted.</p>
            <pre class="text-left bg-gray-50 p-4 rounded text-xs overflow-auto max-h-64">{{ JSON.stringify(submittedData, null, 2) }}</pre>
            <button
              @click="showSuccess = false"
              class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useFormStore } from '../stores/formStore'
import { isFieldVisible as checkVisibility, getVisibleFields } from '../utils/visibility'
import { validateForm } from '../utils/validation'
import type { FormSchema, FormField } from '../types/schema'

import TextInput from './inputs/TextInput.vue'
import NumberInput from './inputs/NumberInput.vue'
import RadioInput from './inputs/RadioInput.vue'
import SelectInput from './inputs/SelectInput.vue'
import DateInput from './inputs/DateInput.vue'

const props = defineProps<{
  schema: FormSchema
}>()

const formStore = useFormStore()
// Use storeToRefs to properly destructure reactive state
const { formData, errors } = storeToRefs(formStore)

const isSubmitting = ref(false)
const showSuccess = ref(false)
const submittedData = ref({})

// Initialize form data when component mounts
onMounted(() => {
  console.log('FormRenderer mounted, resetting form state')
  formStore.setSchema(props.schema)
})

// Also initialize when schema changes
watch(() => props.schema, (newSchema) => {
  console.log('Schema changed, resetting form state')
  formStore.setSchema(newSchema)
})

const fieldsArray = computed(() => {
  return Object.values(props.schema.items || {})
})

function isFieldVisible(field: FormField): boolean {
  return checkVisibility(field, formData.value)
}

function getInputComponent(type: FormField['type']) {
  switch (type) {
    case 'Text':
      return TextInput
    case 'Number':
      return NumberInput
    case 'Radio':
      return RadioInput
    case 'Select':
      return SelectInput
    case 'Date':
      return DateInput
    default:
      return TextInput
  }
}

function updateFieldValue(fieldName: string, value: string) {
  formData.value[fieldName] = value
}

async function handleSubmit() {
  formStore.setSubmitted(true)
  formStore.clearErrors()
  
  const visibleFields = getVisibleFields(fieldsArray.value, formData.value)
  const validationErrors = validateForm(fieldsArray.value, formData.value, visibleFields)
  
  console.log('Validation errors:', validationErrors)
  console.log('Form data:', formData.value)
  console.log('Submitted state:', formStore.submitted)
  
  if (validationErrors.length > 0) {
    validationErrors.forEach(error => {
      formStore.setError(error.field, error.message)
      console.log('Setting error for field:', error.field, error.message)
    })
    
    console.log('Errors in store:', formStore.errors)
    
    // Scroll to first error
    const firstErrorField = document.getElementById(validationErrors[0].field)
    firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }
  
  // Simulate submission
  isSubmitting.value = true
  
  setTimeout(() => {
    // Filter out non-visible fields from submitted data
    const dataToSubmit: Record<string, any> = {}
    visibleFields.forEach(fieldName => {
      dataToSubmit[fieldName] = formData.value[fieldName]
    })
    
    submittedData.value = dataToSubmit
    isSubmitting.value = false
    showSuccess.value = true
    
    // Reset form state after successful submission
    formStore.resetForm()
    
    console.log('Form submitted:', dataToSubmit)
  }, 1000)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

