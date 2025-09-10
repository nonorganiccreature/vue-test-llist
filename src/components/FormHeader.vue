<script setup lang="ts">
import CButton from 'primevue/button'

interface ComponentEmits {
  addAccount: []
}

const emit = defineEmits<ComponentEmits>()

</script>
<template>
  <div class="form-header">
    <div class="form-header__title">
      <h2>Учетные записи</h2>
    </div>
    <div class="form-header__button">
      <CButton icon="pi pi-home" aria-label="Save" @click="emit('addAccount')"></CButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-header {
  display: flex;
  flex-flow: row nowrap;
  padding: 10px 0;
  gap: 20px;
  align-items: center;

  &__title {}

  &__button {}
}
</style>