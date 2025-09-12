import { ref, unref, watch, type Ref } from 'vue'

export interface FieldScheme {
  defaultValue: string
  name: string
  rules: [(s: string) => boolean]
}

export interface FieldData {
  [key: string]: Ref<string>
}

export interface FieldError {
  [key: string]: boolean
}

export const useValidation = () => {
  const fields = ref<FieldData>({})
  const errors = ref<FieldError>({})

  const defineField = ({ defaultValue, name, rules }: FieldScheme) => {
    const field = ref(defaultValue)

    fields.value[name] = field
    errors.value[name] = false

    const validateField = () => {
      for (const validator of rules) {
        if (!validator(field.value)) {
          errors.value[name] = true
        } else {
          errors.value[name] = false
        }
      }
    }

    return [field, validateField] as const
  }

  return { fields: unref(fields), errors, defineField }
}
