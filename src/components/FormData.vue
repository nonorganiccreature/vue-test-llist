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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div class="form-data__title">
      <span>Метки</span>
      <span>Тип записи</span>
      <span>Логин</span>
      <span>Пароль</span>
    </div>
    <FormRow v-for="row in data" :key="row.id" :data="row" @remove="removeAccount" @change-account="changeAccount" />
  </div>
</template>
<style lang='scss' scoped>
.form-data {
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;

  &__title {
    display: flex;
    flex-flow: row nowrap;
    padding: 10px 0;

    &>* {
      flex: 0 0 auto;
      width: 24%;
      padding: 0 5px;
    }
  }
}
</style>