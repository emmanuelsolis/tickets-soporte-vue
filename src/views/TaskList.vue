<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">Lista de Tickets de Soporte</h1>
      
      <!-- Formulario para agregar/editar tarea -->
      <form @submit.prevent="saveTask" class="mb-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Título
          </label>
          <input v-model="newTask.title" id="title" type="text" placeholder="Título del ticket" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
            Descripción
          </label>
          <textarea v-model="newTask.description" id="description" placeholder="Descripción del ticket" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="assignee">
            Asignado a
          </label>
          <input v-model="newTask.assignee" id="assignee" type="text" placeholder="Nombre del responsable" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="priority">
            Prioridad
          </label>
          <select v-model="newTask.priority" id="priority" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {{ editingIndex === null ? 'Agregar Ticket' : 'Actualizar Ticket' }}
          </button>
        </div>
      </form>
  
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
          <option value="assignee">Ordenar por responsable</option>
        </select>
      </div>
  
      <!-- Lista de tareas -->
      <ul>
        <li v-for="(task, index) in filteredAndSortedTasks" :key="task.id" class="border p-4 mb-2 flex justify-between items-center bg-white shadow-md rounded">
          <div>
            <h3 class="font-bold text-lg">{{ task.title }}</h3>
            <p class="text-gray-600">{{ task.description }}</p>
            <p class="text-sm text-gray-500">Asignado a: {{ task.assignee }}</p>
            <span :class="priorityClass(task.priority)" class="inline-block px-2 py-1 text-xs font-semibold rounded-full mt-2">
              {{ task.priority.charAt(0).toUpperCase() + task.priority.slice(1) }}
            </span>
          </div>
          <div>
            <button @click="editTask(index)" class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2">Editar</button>
            <button @click="deleteTask(index)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    setup() {
      const store = useStore()
      const newTask = ref({ title: '', description: '', assignee: '', priority: 'media', status: 'Por hacer' })
      const editingIndex = ref(null)
      const searchTerm = ref('')
      const filterPriority = ref('')
      const sortBy = ref('title')
  
      const saveTask = () => {
        if (editingIndex.value === null) {
          store.commit('addTask', { ...newTask.value })
        } else {
          store.commit('updateTask', { index: editingIndex.value, task: newTask.value })
          editingIndex.value = null
        }
        newTask.value = { title: '', description: '', assignee: '', priority: 'media', status: 'Por hacer' }
      }
  
      const editTask = (index) => {
        newTask.value = { ...store.state.tasks[index] }
        editingIndex.value = index
      }
  
      const deleteTask = (index) => {
        store.commit('deleteTask', index)
      }
  
      const filteredAndSortedTasks = computed(() => {
        let result = store.state.tasks
  
        if (searchTerm.value) {
          result = result.filter(task => 
            task.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            task.assignee.toLowerCase().includes(searchTerm.value.toLowerCase())
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
  
      return {
        newTask,
        editingIndex,
        searchTerm,
        filterPriority,
        sortBy,
        filteredAndSortedTasks,
        saveTask,
        editTask,
        deleteTask,
        priorityClass
      }
    }
  }
  </script>