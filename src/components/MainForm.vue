<script setup lang="ts">
import FormData from './FormData.vue';
import FormHeader from './FormHeader.vue'
import type { MainFormRowData } from '@/types';

interface ComponentProps {
  data: Array<MainFormRowData>
}

interface ComponentEmits {
  addEmptyAccount: []
  remove: [MainFormRowData['id']]
  changeAccount: [MainFormRowData]
}

const props = defineProps<ComponentProps>()

const emit = defineEmits<ComponentEmits>()

const removeAccount = (id: MainFormRowData['id']) => {
  emit('remove', id)
}

const changeAccount = (account: MainFormRowData) => {
  emit('changeAccount', account)
}
</script>
<template>
  <div class="main-form">
    <FormHeader @add-empty-account="emit('addEmptyAccount')" />
    <FormData :data="data" @remove="removeAccount" @change-account="changeAccount" />
  </div>
</template>

<style scoped lang="scss">
.main-form {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
}
</style>