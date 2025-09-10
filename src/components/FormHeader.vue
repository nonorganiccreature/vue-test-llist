<script setup lang="ts">
import Button from 'primevue/button'

interface ComponentEmits {
  addEmptyAccount: []
}

const emit = defineEmits<ComponentEmits>()

</script>
<template>
  <div class="form-header">
    <div class="form-header__title">
      <h2>Учетные записи</h2>
    </div>
    <div class="form-header__button">
      <Button icon="pi pi-plus" aria-label="Save" @click="emit('addEmptyAccount')"></Button>
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