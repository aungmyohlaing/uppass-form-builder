<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
    <div class="max-w-4xl w-full">
      <div class="text-center text-white mb-12 animate-fade-in">
        <h1 class="text-6xl font-bold mb-4">UpPass Form Builder</h1>
        <p class="text-xl opacity-90">Create beautiful, dynamic forms with ease</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Builder Card -->
        <router-link
          to="/builder"
          class="group bg-white rounded-2xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl animate-slide-in"
        >
          <div class="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-xl mb-6 group-hover:bg-blue-600 transition-colors">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">Form Builder</h2>
          <p class="text-gray-600 mb-4">
            Design and configure your forms with an intuitive drag-and-drop interface. 
            Add fields, set validation rules, and export your schema.
          </p>
          <div class="flex items-center text-blue-600 font-semibold">
            Start Building
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </router-link>
        
        <!-- Form Card -->
        <router-link
          to="/form"
          class="group bg-white rounded-2xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl animate-slide-in"
          style="animation-delay: 0.1s"
        >
          <div class="flex items-center justify-center w-16 h-16 bg-purple-500 rounded-xl mb-6 group-hover:bg-purple-600 transition-colors">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">Form Renderer</h2>
          <p class="text-gray-600 mb-4">
            Preview and test your forms. See how they'll look to end users with 
            full validation and conditional logic support.
          </p>
          <div class="flex items-center text-purple-600 font-semibold">
            View Form
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </router-link>
      </div>
      
      <!-- Features -->
      <div class="mt-12 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 animate-fade-in" style="animation-delay: 0.2s">
        <h3 class="text-2xl font-bold text-white mb-6 text-center">Features</h3>
        <div class="grid md:grid-cols-3 gap-6 text-white">
          <div class="text-center">
            <div class="text-3xl mb-2">🎨</div>
            <h4 class="font-semibold mb-2">Beautiful UI</h4>
            <p class="text-sm opacity-90">Modern, responsive design with smooth animations</p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-2">⚡</div>
            <h4 class="font-semibold mb-2">Dynamic Forms</h4>
            <p class="text-sm opacity-90">Conditional visibility and validation rules</p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-2">🔧</div>
            <h4 class="font-semibold mb-2">Highly Configurable</h4>
            <p class="text-sm opacity-90">Full control over field types and behaviors</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home page with navigation
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-in {
  animation: slide-in 0.6s ease-out;
  animation-fill-mode: both;
}
</style>

