// shims-vue.d.ts
declare module '*.vue' {
  import type { defineComponent } from 'vue';

  const component: ReturnType<typeof defineComponent>;
  export default component;
}
// declare module "*.vue" {
//   import { defineComponent } from "vue";
//   const component: ReturnType<typeof defineComponent>;
//   export default component;
// }
