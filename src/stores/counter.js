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

export default createStore ({
  state: {
    tasks: []
  }, 
  mutations: {
    addTask(state, task) {
      state.task.push({...task, id: Date.now()})
    },
    updateTask(state, { index, task }) {
      state.task[index] = { ...state.task[index], ...task }
    }, 
    deleteTask(state, index) {
      state.tasks.splice(index, 1)
    }, 
    updateTaskStatus(state, { taskId, newStatus }) {
      const task = state.tasks.find( t => t.id === taskId)
      if(task) {
        task.status = newStatus
      }
    }
  },
  actions: {
    //Acciones
  }, 
  getters: {
    //getters
  }
})