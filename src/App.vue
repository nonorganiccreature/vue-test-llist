<script setup lang="ts">
import MainForm from './components/MainForm.vue';
import { useFormDataStore } from './stores/MainFormData';

const formDataStore = useFormDataStore()
</script>

<template>
  <MainForm v-model="formDataStore.data" class="form" />
</template>

<style scoped lang="scss">
.form {
  max-width: 1000px;
  width: 100%;
  color: #fff;
  margin: 50px 0 0 50px;

}
</style>
