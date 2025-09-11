<script setup lang="ts">
import MainForm from './components/MainForm.vue';
import { useFormDataStore } from './stores/MainFormData';
import type { MainFormRowData } from './types';

const formDataStore = useFormDataStore()

const addEmptyAccount = () => {
  formDataStore.addEmptyAccount()
}

const removeAccount = (id: MainFormRowData['id']) => {
  formDataStore.removeAccount(id)
}

const changeAccount = (acc: MainFormRowData) => {
  const index = formDataStore.data.findIndex((account) => account.id === acc.id)
  formDataStore.data[index] = { ...acc }
}
</script>

<template>
  <MainForm @add-empty-account="addEmptyAccount" @change-account="changeAccount" @remove="removeAccount"
    :data="formDataStore.data" class="form" />
</template>

<style scoped lang="scss">
.form {
  max-width: 1000px;
  width: 100%;
  color: #fff;
  margin: 50px 0 0 50px;

}
</style>
