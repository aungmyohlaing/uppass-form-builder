<template>
  <div class="form-builder max-w-6xl mx-auto p-6">
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold text-gray-800">Form Builder</h1>
          <p class="text-gray-600 mt-1">Design your form by adding and configuring fields</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            @click="exportSchema"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Schema
          </button>
          <button
            @click="showImportModal = true"
            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import Schema
          </button>
        </div>
      </div>
      
      <!-- Form Metadata -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Form Name</label>
          <input
            v-model="schema.name"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., step"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Form Label</label>
          <input
            v-model="schema.label"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Leave Request"
          />
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Field Palette -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-lg p-6 sticky top-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Add Fields</h2>
          <div class="space-y-2">
            <button
              v-for="type in fieldTypes"
              :key="type.value"
              @click="addField(type.value)"
              class="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <component :is="type.icon" class="w-5 h-5" />
              <span>{{ type.label }}</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Field List -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Form Fields</h2>
          
          <div v-if="fieldsArray.length === 0" class="text-center py-12 text-gray-400">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p class="text-lg">No fields yet</p>
            <p class="text-sm mt-2">Click on a field type to add it to your form</p>
          </div>
          
          <draggable
            v-model="fieldsArray"
            item-key="name"
            handle=".drag-handle"
            @end="onDragEnd"
            class="space-y-3"
          >
            <template #item="{ element, index }">
              <div
                class="border-2 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
                :class="{
                  'border-blue-500 bg-blue-50': selectedFieldIndex === index,
                  'border-gray-200': selectedFieldIndex !== index
                }"
              >
                <div class="flex items-start gap-3">
                  <button class="drag-handle cursor-move text-gray-400 hover:text-gray-600 mt-1">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                    </svg>
                  </button>
                  
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                          {{ element.type }}
                        </span>
                        <h3 class="font-semibold text-gray-800">{{ element.display.label }}</h3>
                      </div>
                      <div class="flex gap-2">
                        <button
                          @click="editField(index)"
                          class="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          @click="removeField(index)"
                          class="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p class="text-sm text-gray-600">
                      Name: <code class="bg-gray-100 px-1 rounded">{{ element.name }}</code>
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
    
    <!-- Field Editor Modal -->
    <Transition name="modal">
      <div
        v-if="editingField"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click="closeEditor"
      >
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Edit Field</h2>
          
          <FieldEditor
            :field="editingField"
            @save="saveField"
            @cancel="closeEditor"
          />
        </div>
      </div>
    </Transition>
    
    <!-- Import Modal -->
    <Transition name="modal">
      <div
        v-if="showImportModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click="showImportModal = false"
      >
        <div
          class="bg-white rounded-lg p-6 max-w-2xl w-full"
          @click.stop
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Import Schema</h2>
          <p class="text-gray-600 mb-4">Paste your JSON schema below:</p>
          
          <textarea
            v-model="importSchemaText"
            class="w-full h-64 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500"
            placeholder='{ "name": "form", "label": "My Form", "items": { ... } }'
          ></textarea>
          
          <div class="flex justify-end gap-3 mt-4">
            <button
              @click="showImportModal = false"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="importSchema"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Delete Modal -->
    <Transition name="modal">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="showDeleteModal = false"
      >
        <div class="bg-white rounded-lg p-8 max-w-md animate-bounce-subtle" @click.stop>
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Delete Field</h3>
            <p class="text-sm text-gray-500 mb-4">Are you sure you want to delete this field? {{ deletingField?.name }}</p>
            <button
              @click="deleteField(deletingField?.name ?? '')"
              class="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
            <button
              @click="showDeleteModal = false"
              class="mt-4 w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useFormStore } from '../stores/formStore'
import { createDefaultField } from '../utils/schema'
import type { FormField, FieldType } from '../types/schema'
import draggable from 'vuedraggable'
import FieldEditor from './FieldEditor.vue'

const formStore = useFormStore()
const { schema } = formStore

const selectedFieldIndex = ref<number | null>(null)
const editingField = ref<FormField | null>(null)
const editingIndex = ref<number | null>(null)
const showImportModal = ref(false)
const importSchemaText = ref('')
const showDeleteModal = ref(false)
const deletingField = ref<FormField | null>(null)
// Field types with icons
const fieldTypes = [
  { 
    value: 'Text' as FieldType, 
    label: 'Text Input',
    icon: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
    ])
  },
  { 
    value: 'Number' as FieldType, 
    label: 'Number Input',
    icon: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14' })
    ])
  },
  { 
    value: 'Radio' as FieldType, 
    label: 'Radio Choice',
    icon: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  },
  { 
    value: 'Select' as FieldType, 
    label: 'Select Dropdown',
    icon: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 6h16M4 12h16M4 18h16' })
    ])
  },
  {
    value: 'Date' as FieldType,
    label: 'Date Picker',
    icon: () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
    ])
  }
]

const fieldsArray = computed({
  get: () => Object.values(schema.items || {}),
  set: (newFields: FormField[]) => {
    const newItems: Record<string, FormField> = {}
    newFields.forEach(field => {
      newItems[field.name] = field
    })
    schema.items = newItems
  }
})

function addField(type: FieldType) {
  const newField = createDefaultField(type)
  formStore.addField(newField)
}

function editField(index: number) {
  editingIndex.value = index
  editingField.value = JSON.parse(JSON.stringify(fieldsArray.value[index]))
  selectedFieldIndex.value = index
}

function saveField(updatedField: FormField) {
  if (editingIndex.value !== null) {
    const oldField = fieldsArray.value[editingIndex.value]
    formStore.updateField(oldField.name, updatedField)
  }
  closeEditor()
}

function closeEditor() {
  editingField.value = null
  editingIndex.value = null
  selectedFieldIndex.value = null
}

function removeField(index: number) {
  deletingField.value = JSON.parse(JSON.stringify(fieldsArray.value[index]))
  showDeleteModal.value = true
}

function onDragEnd() {
  // Fields array is automatically updated via v-model
}

function exportSchema() {
  const schemaJson = JSON.stringify(schema, null, 2)
  const blob = new Blob([schemaJson], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${schema.name || 'form'}-schema.json`
  a.click()
  URL.revokeObjectURL(url)
}

function importSchema() {
  try {
    const importedSchema = JSON.parse(importSchemaText.value)
    formStore.updateSchema(importedSchema)
    showImportModal.value = false
    importSchemaText.value = ''
  } catch (error) {
    alert('Invalid JSON schema. Please check your input.')
  }
}

function deleteField(fieldName: string) {
  formStore.removeField(fieldName)
  showDeleteModal.value = false
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

