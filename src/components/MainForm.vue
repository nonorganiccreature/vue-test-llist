<script setup lang="ts">
import FormData from './FormData.vue';
import FormHeader from './FormHeader.vue'
import type { MainFormRowData } from '@/types';

interface ComponentProps {
  modelValue: MainFormRowData[]
}

interface ComponentEmits {
  addEmptyAccount: []
  'update:modelValue': [MainFormRowData[]]
}

const props = defineProps<ComponentProps>()

const emit = defineEmits<ComponentEmits>()

const removeAccount = (id: MainFormRowData['id']) => {
  emit('update:modelValue', props.modelValue.filter((account) => account.id !== id))
}

const changeAccount = (account: MainFormRowData) => {
  const index = props.modelValue.findIndex((acc) => acc.id === account.id)
  const dataCopy = props.modelValue.map((oldAccount) => oldAccount)
  dataCopy[index] = { ...account }

  emit('update:modelValue', dataCopy)
}

const addEmptyAccount = () => {
  const dataCopy = props.modelValue.map((oldAccount) => oldAccount)
  dataCopy.push({ id: Math.floor(Math.random() * 2000), accountType: 'local', tags: [], credentials: { login: '', password: '' } })

  emit('update:modelValue', dataCopy)
}
</script>
<template>
  <div class="main-form">
    <FormHeader @add-empty-account="addEmptyAccount" />
    <FormData :data="modelValue" @remove="removeAccount" @change-account="changeAccount" />
  </div>
</template>

<style scoped lang="scss">
.main-form {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
}
</style>