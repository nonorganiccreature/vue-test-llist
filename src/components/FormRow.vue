<script setup lang="ts">
import type { MainFormRowData } from '@/types';
import { InputText, Select, type SelectChangeEvent, Button, Password } from 'primevue';
import { computed } from 'vue';

interface ComponentProps {
  data: MainFormRowData
}

interface ComponentEmits {
  changeAccount: [MainFormRowData]
  remove: [MainFormRowData['id']]
}

const emit = defineEmits<ComponentEmits>()
const props = defineProps<ComponentProps>()

const preparedData = computed(() => ({
  ...props.data,
  tags: props.data.tags.map(obj => obj.text).join(';')
}))

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

const onTagsChange = (e: Event) => {
  const target = <HTMLInputElement>e.target
  emit('changeAccount', { ...props.data, tags: target.value.split(';').filter(s => s !== '').map(tag => ({ text: tag })) })
}

const onAccountTypeChange = (e: SelectChangeEvent) => {
  const { value } = e

  if (value === 'LDAP') {
    emit('changeAccount',
      {
        ...props.data,
        accountType: value,
        credentials: {
          ...props.data.credentials,
          password: null
        }
      }
    )
    return
  }

  if (value === 'local') {
    emit('changeAccount', { ...props.data, accountType: value })
  }

}

const onClickRemove = (id: ComponentEmits['remove'][0]) => {
  emit('remove', id)
}
</script>

<template>
  <div class="form-row">
    <InputText :model-value="preparedData.tags" @change="onTagsChange" />
    <Select :model-value="preparedData.accountType" @change="onAccountTypeChange" :options="accountTypesOptions"
      optionLabel="name" optionValue="value" class="w-full md:w-56" />
    <template v-if="preparedData.accountType === 'local'">
      <InputText :model-value="preparedData.credentials.login" />
      <Password :model-value="preparedData.credentials.password" />
    </template>
    <template v-else>
      <InputText class="form-row__grow-input" :model-value="preparedData.credentials.login" />
    </template>
    <div class="form-row__button-flex-wrapper">
      <Button icon="pi pi-trash" aria-label="Delete" @click="onClickRemove(preparedData.id)"></Button>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.form-row {
  display: flex;
  flex-flow: row nowrap;
  $row-gap: 10px;
  gap: $row-gap;
  width: 100%;

  &>&__grow-input {
    width: calc(48% - $row-gap);
  }

  &>* {
    flex: 0 0 auto;
    width: calc(24% - $row-gap);

    :deep(input) {
      width: 100%;
    }

    &:last-child {
      width: 40px;
      height: 40px;
    }
  }
}
</style>