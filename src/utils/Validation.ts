export const validateTags = (s: string) => {
  return s.length <= 50
}

export const validateLogin = (s: string) => {
  return s.length <= 100
}

export const validatePassword = (s: string) => {
  return s.length <= 100
}
