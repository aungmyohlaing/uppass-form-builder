<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <router-link to="/" class="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span class="font-semibold">Back to Home</span>
          </router-link>
          <router-link
            to="/builder"
            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit in Builder
          </router-link>
        </div>
      </div>
    </nav>
    
    <div class="py-8">
      <FormRenderer :schema="schema" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FormRenderer from '../components/FormRenderer.vue'
import { useFormStore } from '../stores/formStore'

const formStore = useFormStore()
const schema = computed(() => formStore.schema)
</script>

