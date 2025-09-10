<script setup lang="ts">
import { useFormDataStore } from '@/stores/MainFormData';
import FormData from './FormData.vue';
import FormHeader from './FormHeader.vue'

const formDataStore = useFormDataStore()

</script>
<template>
  <div class="main-form">
    <FormHeader />
    <FormData :data="formDataStore.data" />
  </div>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;

}
</style>