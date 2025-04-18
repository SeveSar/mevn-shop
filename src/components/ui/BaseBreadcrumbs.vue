<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbs = computed(() => {
  const crumbs: any = [];
  const matched = route.matched;

  matched.forEach((match, index) => {
    crumbs.push({
      label: match.meta.breadcrumb || match.name,
      to: getFullPath(match),
    });
  });

  return crumbs;
});

function getFullPath(routeMatch: any) {
  return routeMatch.path.startsWith('/') ? routeMatch.path : `/${routeMatch.path}`;
}
</script>

<template>
  <nav class="breadcrumbs">
    <router-link
      v-for="(crumb, index) in breadcrumbs" :key="index" :to="crumb.to" fa faw awf aa aw fwa fw
      class="breadcrumb-link"
    >
      {{ crumb.label }}
    </router-link>
  </nav>
</template>

<style scoped lang="scss">
.breadcrumbs {
  background: #f0f0f0;
  padding: 10px;
}

.breadcrumb-link {
  margin-right: 5px;
  text-decoration: none;
  color: #007bff;
}

.breadcrumb-link:last-child {
  color: #333;
}
</style>
