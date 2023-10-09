<template>
  <div class="settings-card">
    <div class="settings-card__header">
      <h3 class="settings-card__title">
        {{ title }}
      </h3>
      <button class="settings-card__change" @click="emit('onChange')" v-if="!isChanging">Изменить</button>
    </div>
    <div class="settings-card__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  isChanging: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['onChange']);
</script>

<style scoped lang="less">
.settings-card {
  border-radius: 12px;
  border: 1px solid var(--Line-gray, #f0f0f0);
  background: #fff;
  padding: 24px 32px;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.4;
  }

  &__content {
    &:not(:empty) {
      margin-top: 16px;
    }
  }
}
</style>
