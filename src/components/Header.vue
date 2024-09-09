<template>
  <header class="header">
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <RouterLink to="/" class="text-xl font-bold">Gestión de Tickets</RouterLink>
        <div class="space-x-4">
          <RouterLink to="/" class="hover:text-gray-300">Inicio</RouterLink>
          <RouterLink to="/tasklist" class="hover:text-gray-300">Lista de Tareas</RouterLink>
          <RouterLink to="/kanbanboard" class="hover:text-gray-300">Tablero Kanban</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
