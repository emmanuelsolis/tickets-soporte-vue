<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">Sistema de Gestión de Tickets de Soporte</h1>
    
    <div class="grid md:grid-cols-2 gap-8 mb-12">
      <RouterLink to="/tasklist" class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        <h2 class="text-2xl font-semibold mb-4">Lista de Tareas</h2>
        <p>Gestiona y organiza todos los tickets de soporte en un solo lugar.</p>
      </RouterLink>
      
      <RouterLink to="/kanbanboard" class="bg-green-500 hover:bg-green-600 text-white rounded-lg p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        <h2 class="text-2xl font-semibold mb-4">Tablero Kanban</h2>
        <p>Visualiza y actualiza el estado de los tickets de forma intuitiva.</p>
      </RouterLink>
    </div>
    
    <div class="bg-gray-100 rounded-lg p-8 mb-12">
      <h2 class="text-2xl font-semibold mb-6 text-center">Resumen de Tickets</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="stat in ticketStats" :key="stat.label" class="bg-white p-4 rounded-lg shadow text-center">
          <p class="text-3xl font-bold" :class="stat.color">{{ stat.value }}</p>
          <p class="text-gray-600">{{ stat.label }}</p>
        </div>
      </div>
    </div>
    
    <div class="text-center mb-8">
      <button @click="openNewTicketModal" class="bg-red-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded transition duration-300 ease-in-out">
        Crear Nuevo Ticket
      </button>
    </div>
    
    <div class="text-center">
      <h2 class="text-2xl font-semibold mb-4">¿Necesitas ayuda?</h2>
      <p class="mb-4">Nuestro equipo de soporte está aquí para ayudarte.</p>
      <RouterLink :to="{ name: 'soporte' }" class="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
        Contactar Soporte
      </RouterLink>
    </div>

    <NewTicketModal ref="newTicketModal" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'
import NewTicketModal from './NewTicketModal.vue'

const store = useStore()
const newTicketModal = ref(null)

const ticketStats = computed(() => {
  const tasks = store.state.tasks
  return [
    { label: 'Total de Tickets', value: tasks.length, color: 'text-blue-500' },
    { label: 'En Progreso', value: tasks.filter(t => t.status === 'En proceso').length, color: 'text-yellow-500' },
    { label: 'Completados', value: tasks.filter(t => t.status === 'Aprobada').length, color: 'text-green-500' },
    { label: 'Alta Prioridad', value: tasks.filter(t => t.priority === 'alta').length, color: 'text-red-500' }
  ]
})

const openNewTicketModal = () => {
  newTicketModal.value.openModal()
}
</script>