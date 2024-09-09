<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ isEditing ? 'Editar Ticket' : 'Crear Nuevo Ticket' }}</h3>
        <form @submit.prevent="submitForm" class="mt-2 text-left">
          <div class="mb-4">
            <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Título</label>
            <input v-model="form.title" type="text" id="title" name="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
            <textarea v-model="form.description" id="description" name="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
          </div>
          <div class="mb-4">
            <label for="priority" class="block text-gray-700 text-sm font-bold mb-2">Prioridad</label>
            <select v-model="form.priority" id="priority" name="priority" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div class="flex items-center justify-between mt-4">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {{ isEditing ? 'Actualizar Ticket' : 'Crear Ticket' }}
            </button>
            <button @click="closeModal" type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isOpen = ref(false)
const isEditing = ref(false)
const form = reactive({
  id: null,
  title: '',
  description: '',
  priority: 'media',
  status: 'Por hacer'
})

const openModal = (ticket = null) => {
  isOpen.value = true
  if (ticket) {
    isEditing.value = true
    Object.assign(form, ticket)
  } else {
    isEditing.value = false
    resetForm()
  }
}

const closeModal = () => {
  isOpen.value = false
  resetForm()
}

const resetForm = () => {
  form.id = null
  form.title = ''
  form.description = ''
  form.priority = 'media'
  form.status = 'Por hacer'
}

const submitForm = () => {
  if (isEditing.value) {
    store.dispatch('updateTask', { ...form })
  } else {
    store.dispatch('addTask', { ...form })
  }
  closeModal()
}

defineExpose({ openModal })
</script>