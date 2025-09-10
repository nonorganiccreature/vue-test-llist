import { onMounted, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { MainFormRowData } from '@/types'

export const useFormDataStore = defineStore('formData', () => {
  const data = ref<Array<MainFormRowData>>(
    Array(3)
      .fill(0)
      .map(() => ({
        id: Math.floor(Math.random() * 2048),
        tags: [],
        credentials: {
          login: '',
          password: '',
        },
        accountType: 'local',
      })),
  )

  const addEmptyAccount = () => {
    data.value.push({
      id: Math.floor(Math.random() * 2048),
      tags: [],
      credentials: {
        login: '',
        password: '',
      },
      accountType: 'local',
    })
  }

  const removeAccount = (id: MainFormRowData['id']) => {
    data.value = data.value.filter((account) => account.id !== id)
  }

  onMounted(() => {
    const formDataFromLocalStorage = JSON.parse(localStorage.getItem('formData') || '[]')

    if (formDataFromLocalStorage && formDataFromLocalStorage.length > 0) {
      data.value = formDataFromLocalStorage
    }
  })

  watch(
    data,
    () => {
      localStorage.setItem('formData', JSON.stringify(data.value))
    },
    { deep: true },
  )

  return { data, addEmptyAccount, removeAccount }
})
