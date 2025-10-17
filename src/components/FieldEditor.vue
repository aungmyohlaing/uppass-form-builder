<template>
  <div class="field-editor">
    <div class="space-y-4">
      <!-- Field Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Field Name <span class="text-red-500">*</span>
        </label>
        <input
          v-model="localField.name"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., full_name"
        />
        <p class="mt-1 text-xs text-gray-500">Unique identifier for this field (no spaces)</p>
      </div>
      
      <!-- Field Label -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Label <span class="text-red-500">*</span>
        </label>
        <input
          v-model="localField.display.label"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Full Name"
        />
      </div>
      
      <!-- Placeholder -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
        <input
          v-model="localField.display.placeholder"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Enter your full name"
        />
      </div>
      
      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          v-model="localField.display.description"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="2"
          placeholder="Additional help text for this field"
        ></textarea>
      </div>
      
      <!-- Field Type -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
        <select
          v-model="localField.type"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          @change="handleTypeChange"
        >
          <option value="Text">Text</option>
          <option value="Number">Number</option>
          <option value="Radio">Radio</option>
          <option value="Select">Select</option>
        </select>
      </div>
      
      <!-- Layout -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Layout</label>
        <select
          v-model="localField.layout"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Normal">Normal</option>
          <option value="Wide">Wide</option>
          <option value="Narrow">Narrow</option>
        </select>
      </div>
      
      <!-- Validation Rule -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Validation Rule</label>
        <input
          v-model="localField.rule"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., required"
        />
        <p class="mt-1 text-xs text-gray-500">Examples: required, required|max:100, min:5</p>
      </div>
      
      <!-- Text Field Options -->
      <div v-if="localField.type === 'Text'" class="border-t pt-4">
        <h3 class="font-semibold text-gray-700 mb-3">Text Options</h3>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Max Length</label>
          <input
            v-model.number="localField.props.maxlength"
            type="number"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="280"
          />
        </div>
      </div>
      
      <!-- Number Field Options -->
      <div v-if="localField.type === 'Number'" class="border-t pt-4">
        <h3 class="font-semibold text-gray-700 mb-3">Number Options</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Minimum Value</label>
            <input
              v-model.number="localField.value_constraints.minimum"
              type="number"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Maximum Value</label>
            <input
              v-model.number="localField.value_constraints.maximum"
              type="number"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="flex items-center">
            <input
              v-model="allowDecimalCheck"
              type="checkbox"
              id="allow-decimal"
              class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label for="allow-decimal" class="ml-2 text-sm text-gray-700">Allow Decimal Values</label>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prefill Value</label>
            <input
              v-model.number="localField.prefill.value"
              type="number"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      <!-- Radio/Select Options -->
      <div v-if="localField.type === 'Radio' || localField.type === 'Select'" class="border-t pt-4">
        <h3 class="font-semibold text-gray-700 mb-3">Options</h3>
        <div class="space-y-2 mb-3">
          <div
            v-for="(option, index) in localField.enum"
            :key="index"
            class="flex gap-2"
          >
            <input
              v-model="option.label"
              type="text"
              placeholder="Label"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              v-model="option.value"
              type="text"
              placeholder="Value"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click="removeOption(index)"
              class="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <button
          @click="addOption"
          class="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
        >
          + Add Option
        </button>
      </div>
      
      <!-- Visibility Rules -->
      <div class="border-t pt-4">
        <h3 class="font-semibold text-gray-700 mb-3">Visibility Rules</h3>
        <div v-if="visibilityRules.length > 0" class="space-y-2 mb-3">
          <div
            v-for="(rule, index) in visibilityRules"
            :key="index"
            class="flex gap-2"
          >
            <input
              v-model="rule.field"
              type="text"
              placeholder="Field name"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              v-model="rule.condition"
              type="text"
              placeholder="e.g., required|is:full"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              @click="removeVisibilityRule(index)"
              class="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <button
          @click="addVisibilityRule"
          class="w-full px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
        >
          + Add Visibility Rule
        </button>
        <p class="mt-2 text-xs text-gray-500">
          Show this field only when another field meets certain conditions
        </p>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="flex justify-end gap-3 mt-6 pt-6 border-t">
      <button
        @click="$emit('cancel')"
        class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Cancel
      </button>
      <button
        @click="save"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { FormField, EnumOption } from '../types/schema'

const props = defineProps<{
  field: FormField
}>()

const emit = defineEmits<{
  (e: 'save', field: FormField): void
  (e: 'cancel'): void
}>()

const localField = ref<FormField>(JSON.parse(JSON.stringify(props.field)))

// Ensure required properties exist
if (!localField.value.display) {
  localField.value.display = { label: '' }
}
if (!localField.value.props) {
  localField.value.props = {}
}
if (!localField.value.value_constraints) {
  localField.value.value_constraints = {}
}
if (!localField.value.prefill) {
  localField.value.prefill = { value: '' }
}
if (!localField.value.enum) {
  localField.value.enum = []
}

const allowDecimalCheck = computed({
  get: () => localField.value.value_constraints?.allow_decimal !== 0,
  set: (value) => {
    if (!localField.value.value_constraints) {
      localField.value.value_constraints = {}
    }
    localField.value.value_constraints.allow_decimal = value ? 1 : 0
  }
})

// Visibility rules handling
const visibilityRules = ref<Array<{ field: string; condition: string }>>([])

// Initialize visibility rules from field
watch(() => props.field, (newField) => {
  if (newField.visible) {
    visibilityRules.value = Object.entries(newField.visible).map(([field, condition]) => ({
      field,
      condition
    }))
  }
}, { immediate: true })

function handleTypeChange() {
  if (localField.value.type === 'Radio' || localField.value.type === 'Select') {
    localField.value.builder.type = 'simple_choice'
    if (!localField.value.enum || localField.value.enum.length === 0) {
      localField.value.enum = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ]
    }
  } else {
    localField.value.builder.type = 'simple_input'
  }
}

function addOption() {
  if (!localField.value.enum) {
    localField.value.enum = []
  }
  localField.value.enum.push({
    label: `Option ${localField.value.enum.length + 1}`,
    value: `option${localField.value.enum.length + 1}`
  })
}

function removeOption(index: number) {
  localField.value.enum?.splice(index, 1)
}

function addVisibilityRule() {
  visibilityRules.value.push({ field: '', condition: '' })
}

function removeVisibilityRule(index: number) {
  visibilityRules.value.splice(index, 1)
}

function save() {
  // Convert visibility rules array back to object
  if (visibilityRules.value.length > 0) {
    const visible: Record<string, string> = {}
    visibilityRules.value.forEach(rule => {
      if (rule.field && rule.condition) {
        visible[rule.field] = rule.condition
      }
    })
    if (Object.keys(visible).length > 0) {
      localField.value.visible = visible
    } else {
      delete localField.value.visible
    }
  } else {
    delete localField.value.visible
  }
  
  emit('save', localField.value)
}
</script>

