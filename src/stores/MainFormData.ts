import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MainFormRowData } from '@/types'

export const useFormDataStore = defineStore('formData', () => {
  const data = ref<Array<MainFormRowData>>([])

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

  addEmptyAccount()
  addEmptyAccount()
  addEmptyAccount()

  return { data, addEmptyAccount, removeAccount }
})
