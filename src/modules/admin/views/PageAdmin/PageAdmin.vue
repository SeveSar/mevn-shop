<template>
  <div></div>
  <div class="admin">
    <h1 class="admin__title">Админ панель</h1>
    <div class="admin__links">
      <router-link
        class="admin__links-link"
        v-for="link in links"
        :to="link.link"
        :key="link.id"
      >
        {{ link.title }}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const links = [
      { title: "Добавить пиццу", link: "/admin", id: 0 },
      { title: "Добавить другой продукт", link: "/admin/goods", id: 1 },
    ];
    return {
      links,
    };
  },
});
</script>

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
