// eslint-disable-next-line vue/multi-word-component-names
<script setup>
import { RouterLink } from 'vue-router'; 
</script>
<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-between items-center">
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 class="text-xl font-bold mb-2">Sistema de Gestión de Tickets</h3>
          <p class="text-gray-400">Simplificando el soporte técnico</p>
        </div>
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
          <h4 class="text-lg font-semibold mb-2">Enlaces rápidos</h4>
          <ul>
            <li><RouterLink to="/" class="text-gray-400 hover:text-white">Inicio</RouterLink></li>
            <li><RouterLink to="/tasklist" class="text-gray-400 hover:text-white">Lista de Tareas</RouterLink></li>
            <li><RouterLink to="/kanbanboard" class="text-gray-400 hover:text-white">Tablero Kanban</RouterLink></li>
          </ul>
        </div>
        <div class="w-full md:w-1/3">
          <h4 class="text-lg font-semibold mb-2">Contacto</h4>
          <p class="text-gray-400">Email: soporte@ejemplo.com</p>
          <p class="text-gray-400">Teléfono: (123) 456-7890</p>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-gray-700 text-center">
        <p class="text-gray-400">&copy; {{ new Date().getFullYear() }} Sistema de Gestión de Tickets. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>




