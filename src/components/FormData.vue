<script setup lang="ts">
import type { MainFormRowData } from '@/types';

import FormRow from './FormRow.vue';

interface ComponentEmits {
  remove: [MainFormRowData['id']]
  changeAccount: [MainFormRowData]
}

interface ComponentProps {
  data: Array<MainFormRowData>
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
  <div class="form-data">
    <FormRow v-for="row in data" :key="row.id" :data="row" @remove="removeAccount" @change-account="changeAccount" />
  </div>
</template>
<style lang='scss' scoped>
.form-data {
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;

}
</style>