<script setup lang="ts">
import { useValidation } from '@/composables';
import type { MainFormRowData } from '@/types';
import { validateLogin, validatePassword, validateTags } from '@/utils';
import { InputText, Select, type SelectChangeEvent, Button, Password } from 'primevue';
import { computed, onMounted, ref } from 'vue';

interface ShowValidationError {
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

const emit = defineEmits<ComponentEmits>()
const props = defineProps<ComponentProps>()


const validatedData = useValidation()

const [tags, validateTagsField] = validatedData.defineField({ defaultValue: props.data.tags.map(obj => obj.text).join(';'), name: 'tags', rules: [validateTags] })
const [login, validateLoginField] = validatedData.defineField({ defaultValue: props.data.credentials.login, name: 'login', rules: [validateLogin] })
const [password, validatePasswordField] = validatedData.defineField({ defaultValue: props.data.credentials.password || '', name: 'password', rules: [validatePassword] })

const showValidationError = ref<ShowValidationError>({
  login: false,
  password: false,
  tags: false
})


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

const highlightAllValidation = () => {
  highlightValidationInputData(preparedData.value.tags, 'tags')
  highlightValidationInputData(preparedData.value.credentials.login, 'login')
  highlightValidationInputData(preparedData.value.credentials.password || '', 'password')
}

onMounted(() => {
  highlightAllValidation()
})

const highlightValidationInputData = (value: string, inputType: keyof ShowValidationError) => {

  if (inputType === 'tags') {
    validateTagsField()

    if (validatedData.errors.value['tags']) {
      showValidationError.value[inputType] = true
    }
  }

  if (inputType === 'login') {
    validateLoginField()

    if (validatedData.errors.value['login']) {
      showValidationError.value[inputType] = true
    }
  }

  if (inputType === 'password') {
    validatePasswordField()

    if (validatedData.errors.value['password']) {
      showValidationError.value[inputType] = true
    }
  }
}

const onFocus = (e: Event, inputType: keyof ShowValidationError) => {
  showValidationError.value[inputType] = false
}

const onBlur = (e: Event, inputType: keyof ShowValidationError) => {
  const { value } = <HTMLInputElement>e.target
  highlightValidationInputData(value, inputType)
}

const onInput = (e: Event, inputType: keyof ShowValidationError) => {
  if (inputType === 'tags') {
    emit('changeAccount', { ...props.data, tags: tags.value.split(';').filter(s => s !== '').map(tag => ({ text: tag })) })
  }

  if (inputType === 'login') {
    emit('changeAccount', { ...props.data, credentials: { ...props.data.credentials, login: login.value } })
  }

  if (inputType === 'password') {
    emit('changeAccount', { ...props.data, credentials: { ...props.data.credentials, password: password.value } })
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

  highlightAllValidation()
}

const onClickRemove = (id: ComponentEmits['remove'][0]) => {
  emit('remove', id)
}
</script>

<template>
  <div class="form-row">
    <InputText :class="[{ 'validation-failed': showValidationError.tags }]" v-model="tags"
      @input="e => onInput(e, 'tags')" @blur="e => onBlur(e, 'tags')" @focus="e => onFocus(e, 'tags')" />
    <Select :model-value="preparedData.accountType" @change="onAccountTypeChange" :options="accountTypesOptions"
      optionLabel="name" optionValue="value" class="w-full md:w-56" />
    <template v-if="preparedData.accountType === 'local'">
      <InputText :class="[{ 'validation-failed': showValidationError.login }]" v-model="login"
        @input="e => onInput(e, 'login')" @blur="e => onBlur(e, 'login')" @focus="e => onFocus(e, 'login')" />
      <Password :class="[{ 'validation-failed': showValidationError.password }]" v-model="password"
        @change="e => onInput(e, 'password')" @blur="e => onBlur(e, 'password')" @focus="e => onFocus(e, 'password')"
        toggle-mask />
    </template>
    <template v-else>
      <InputText :class="[{ 'validation-failed': showValidationError.login }]" class="form-row__grow-input"
        v-model="login" @change="e => onInput(e, 'login')" @blur="e => onBlur(e, 'login')"
        @focus="e => onFocus(e, 'login')" />
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