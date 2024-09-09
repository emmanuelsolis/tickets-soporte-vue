<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Lista de Tickets de Soporte</h1>
    
    <div class="mb-4">
      <button @click="openNewTicketModal" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Crear Nuevo Ticket
      </button>
    </div>

    <!-- Filtros y ordenamiento -->
    <div class="mb-4 flex flex-wrap items-center">
      <input v-model="searchTerm" placeholder="Buscar tickets" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 mb-2">
      <select v-model="filterPriority" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 mb-2">
        <option value="">Todas las prioridades</option>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
      <select v-model="sortBy" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2">
        <option value="title">Ordenar por título</option>
        <option value="priority">Ordenar por prioridad</option>
        <option value="status">Ordenar por estado</option>
      </select>
    </div>

    <!-- Lista de tareas -->
    <ul>
      <li v-for="task in filteredAndSortedTasks" :key="task.id" class="border p-4 mb-2 flex justify-between items-center bg-white shadow-md rounded">
        <div>
          <h3 class="font-bold text-lg">{{ task.title }}</h3>
          <p class="text-gray-600">{{ task.description }}</p>
          <p class="text-sm text-gray-500">Estado: {{ task.status }}</p>
          <span :class="priorityClass(task.priority)" class="inline-block px-2 py-1 text-xs font-semibold rounded-full mt-2">
            {{ task.priority.charAt(0).toUpperCase() + task.priority.slice(1) }}
          </span>
        </div>
        <div>
          <button @click="editTask(task)" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2">Editar</button>
          <button @click="deleteTask(task.id)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Eliminar</button>
        </div>
      </li>
    </ul>

    <NewTicketModal ref="newTicketModal" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import NewTicketModal from '@/components/NewTicketModal.vue'

const store = useStore()
const newTicketModal = ref(null)
const searchTerm = ref('')
const filterPriority = ref('')
const sortBy = ref('title')

const filteredAndSortedTasks = computed(() => {
  let result = store.state.tasks

  if (searchTerm.value) {
    result = result.filter(task => 
      task.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  if (filterPriority.value) {
    result = result.filter(task => task.priority === filterPriority.value)
  }

  result.sort((a, b) => {
    if (sortBy.value === 'priority') {
      const priorityOrder = { alta: 3, media: 2, baja: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    } else {
      return a[sortBy.value].localeCompare(b[sortBy.value])
    }
  })

  return result
})

const priorityClass = (priority) => {
  switch (priority) {
    case 'alta': return 'bg-red-500 text-white'
    case 'media': return 'bg-yellow-500 text-white'
    case 'baja': return 'bg-green-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

const openNewTicketModal = () => {
  newTicketModal.value.openModal()
}

const editTask = (task) => {
  // Implementar lógica de edición
  console.log('Editar tarea:', task)
}

const deleteTask = (taskId) => {
  store.dispatch('deleteTask', taskId)
}
</script>