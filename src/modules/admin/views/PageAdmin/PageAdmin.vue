<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const links = [
      { title: 'Добавить пиццу', link: '/admin', id: 0 },
      { title: 'Добавить другой продукт', link: '/admin/goods', id: 1 },
    ];
    return {
      links,
    };
  },
});
</script>

<template>
  <div class="admin">
    <h1 class="admin__title">
      Админ панель
    </h1>
    <div class="admin__links">
      <router-link
        v-for="link in links"
        :key="link.id"
        class="admin__links-link"
        :to="link.link"
      >
        {{ link.title }}
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style scoped lang="less">
.admin {
  margin-bottom: 25px;
  &__title {
    margin-bottom: 15px;
    text-align: center;
  }
  &__links {
    display: flex;
    align-items: center;
    justify-content: center;
    &-link {
      color: @black-color;
      margin: 0 10px;
      &.exact-active {
        color: @main-color;
      }
    }
  }
}
</style>
