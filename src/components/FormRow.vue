<script setup lang="ts">
import type { MainFormRowData } from '@/types';
import { InputText, Select, type SelectChangeEvent } from 'primevue';

interface ComponentProps {
  data: MainFormRowData
}

interface ComponentEmits {
  change: [MainFormRowData]
}

const emit = defineEmits<ComponentEmits>()
const props = defineProps<ComponentProps>()

const accountTypesOptions = [
  {
    value: 'local',
    name: 'Локальная'
  },
  {
    value: 'LDAP',
    name: 'LDAP'
  }
]

const onAccountTypeChange = (e: SelectChangeEvent) => {
  emit('change', { ...props.data, accountType: e.value })
}


</script>

<template>
  <div class="form-row">
    <InputText />
    <Select :model-value="data.accountType" @change="onAccountTypeChange" :options="accountTypesOptions"
      optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />

  </div>
</template>
<style lang='scss' scoped>
.form-row {
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  width: 100%;

}
</style>