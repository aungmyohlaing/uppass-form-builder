<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useFormStore } from './stores/formStore'

const formStore = useFormStore()

// Load sample schema on mount
onMounted(() => {
  const sampleSchema = {
    "name": "step",
    "label": "ใบลา",
    "items": {
      "full_name": {
        "name": "full_name",
        "display": {
          "label": "ชื่อ"
        },
        "rule": "required",
        "props": {
          "maxlength": 280
        },
        "builder": {
          "type": "simple_input"
        },
        "layout": "Normal",
        "type": "Text"
      },
      "duration": {
        "name": "duration",
        "display": {
          "label": "ลาทำไม",
          "placeholder": "หากลาเต็มวันกรุณากรอกวันด้านล่างด้วย"
        },
        "enum": [
          {
            "label": "ครึ่งวัน",
            "value": "half"
          },
          {
            "label": "เต็มวัน",
            "value": "full"
          }
        ],
        "builder": {
          "type": "simple_choice"
        },
        "layout": "Normal",
        "type": "Radio"
      },
      "days": {
        "display": {
          "label": "ลากี่วัน"
        },
        "name": "days",
        "prefill": {
          "value": 1
        },
        "value_constraints": {
          "maximum": 1000000,
          "allow_decimal": 0
        },
        "visible": {
          "duration": "required|is:full"
        },
        "builder": {
          "type": "simple_input"
        },
        "layout": "Normal",
        "type": "Number"
      }
    }
  }
  
  formStore.setSchema(sampleSchema)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

