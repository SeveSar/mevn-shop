<template>
  <div class="ui-card-shadow">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  isArrow: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isArrow: true,
});
</script>

<style scoped lang="less">
.ui-card-shadow {
  border-radius: 12px;
  padding: 20px;
  background: @white-color;
  position: relative;
  border: 1px solid @gray-color;
  box-shadow: 0px 2px 8px 0px rgba(25, 25, 25, 0.1);
  // &::before {
  //   content: '';
  //   position: absolute;
  //   border: 2px solid #fff;
  //   left: 0;
  //   right: 0;
  //   width: 10px;
  //   height: 10px;
  //   background: inherit;
  //   top: 0;
  //   margin: auto;
  //   transform: rotate(45deg) translateY(-100%);
  //   box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  //   clip-path: polygon(0 0, 0% 100%, 100% 0);
  // }

  // &::after {
  //   content: '';

  //   border-radius: 12px;
  //   left: 0;
  //   right: 0;
  //   top: 0;
  // }
}
</style>
