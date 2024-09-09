import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createStore } from 'vuex'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})


export default createStore({
  state: {
    tasks: []
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task)
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask)
      }
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId)
    }
  },
  actions: {
    addTask({ commit }, task) {
      const newTask = { ...task, id: Date.now() }
      commit('ADD_TASK', newTask)
    },
    updateTask({ commit }, task) {
      commit('UPDATE_TASK', task)
    },
    deleteTask({ commit }, taskId) {
      commit('DELETE_TASK', taskId)
    }
  },
  getters: {
    allTasks: (state) => state.tasks
  }
})