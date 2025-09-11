<script setup lang="ts">
import type { MainFormRowData } from '@/types';
import { validateLogin, validatePassword, validateTags } from '@/utils';
import { InputText, Select, type SelectChangeEvent, Button, Password } from 'primevue';
import { computed, onMounted, ref } from 'vue';

interface ValidationPassed {
  login: boolean
  password: boolean
  tags: boolean
}

interface ComponentProps {
  data: MainFormRowData
}

interface ComponentEmits {
  changeAccount: [MainFormRowData]
  remove: [MainFormRowData['id']]
}

const validationPassed = ref<ValidationPassed>({
  login: true,
  password: true,
  tags: true
})

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

const validateAll = () => {
  validateInputData(preparedData.value.tags, 'tags')
  validateInputData(preparedData.value.credentials.login, 'login')
  validateInputData(preparedData.value.credentials.password || '', 'password')
}

onMounted(() => {
  validateAll()
})

const validateInputData = (value: string, inputType: keyof ValidationPassed) => {
  if (inputType === 'tags') {
    if (!validateTags(value)) {
      validationPassed.value[inputType] = false
    }
  }

  if (inputType === 'login') {
    if (!validateLogin(value)) {
      validationPassed.value[inputType] = false
    }
  }

  if (inputType === 'password') {
    if (!validatePassword(value)) {
      validationPassed.value[inputType] = false
    }
  }
}

const onInputBlur = (e: Event, inputType: keyof ValidationPassed) => {
  const { value } = <HTMLInputElement>e.target
  validateInputData(value, inputType)
}

const onInputChange = (e: Event, inputType: keyof ValidationPassed) => {
  const target = <HTMLInputElement>e.target
  const { value } = target

  if (inputType === 'tags') {
    validationPassed.value.tags = true
    emit('changeAccount', { ...props.data, tags: target.value.split(';').filter(s => s !== '').map(tag => ({ text: tag })) })
  }

  if (inputType === 'login') {
    validationPassed.value.login = true
    emit('changeAccount', { ...props.data, credentials: { ...props.data.credentials, login: value } })
  }

  if (inputType === 'password') {
    validationPassed.value.password = true
    emit('changeAccount', { ...props.data, credentials: { ...props.data.credentials, password: value } })
  }
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

  validateAll()
}

const onClickRemove = (id: ComponentEmits['remove'][0]) => {
  emit('remove', id)
}
</script>

<template>
  <div class="form-row">
    <InputText :class="[{ 'validation-failed': !validationPassed.tags }]" :model-value="preparedData.tags"
      @change="e => onInputChange(e, 'tags')" @blur="e => onInputBlur(e, 'tags')" />
    <Select :model-value="preparedData.accountType" @change="onAccountTypeChange" :options="accountTypesOptions"
      optionLabel="name" optionValue="value" class="w-full md:w-56" />
    <template v-if="preparedData.accountType === 'local'">
      <InputText :class="[{ 'validation-failed': !validationPassed.login }]"
        :model-value="preparedData.credentials.login" @change="e => onInputChange(e, 'login')"
        @blur="e => onInputBlur(e, 'login')" />
      <Password :class="[{ 'validation-failed': !validationPassed.password }]"
        :model-value="preparedData.credentials.password" @change="e => onInputChange(e, 'password')"
        @blur="e => onInputBlur(e, 'password')" toggle-mask />
    </template>
    <template v-else>
      <InputText :class="[{ 'validation-failed': !validationPassed.login }]" class="form-row__grow-input"
        :model-value="preparedData.credentials.login" @change="e => onInputChange(e, 'login')"
        @blur="e => onInputBlur(e, 'login')" />
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

  &>input.validation-failed {
    outline: 1px solid #ff5e5e;
    border: transparent;

    :deep(input) {
      &>input.validation-failed {
        outline: 1px solid #ff5e5e;
        border: transparent;
      }
    }
  }

  &>.validation-failed {
    :deep(input) {
      outline: 1px solid #ff5e5e;
      border: transparent;
    }
  }

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