import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MainFormRowData } from '@/types'

export const useFormDataStore = defineStore('formData', () => {
  const data = ref<Array<MainFormRowData>>([])

  const addEmptyAccount = () => {
    data.value.push({
      id: Math.floor(Math.random() * 2048),
      tags: [],
      data: {
        login: '',
        password: '',
      },
      accountType: 'local',
    })
  }

  addEmptyAccount()
  addEmptyAccount()
  addEmptyAccount()

  return { data, addAccount: addEmptyAccount }
})
