<script setup lang="ts">
import type { MainFormRowData } from '@/types';
import FormRow from './FormRow.vue';

interface ComponentProps {
  data: Array<MainFormRowData>
}

const props = defineProps<ComponentProps>()

</script>
<template>
  <div class="form-data">
    <FormRow v-for="row in data" :key="row.id" :data="row" />
  </div>
</template>
<style lang='scss' scoped>
.form-data {
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;

}
</style>