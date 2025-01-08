<script lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue';

import { useAuthModalStore } from '@/modules/user';
import { storeToRefs } from 'pinia';
import { defineComponent, type Ref, ref } from 'vue';
import AuthForm from '../../auth/AuthForm/AuthForm.vue';

interface IUserCredentials {
  email: string
  password: string
}
export default defineComponent({
  components: {
    BaseModal,
    AuthForm,
  },

  setup() {
    const storeModal = useAuthModalStore();
    const userCredentials = ref({}) as Ref<IUserCredentials>;
    const { isAuthModal } = storeToRefs(storeModal);

    return {
      storeModal,
      isAuthModal,
      userCredentials,
    };
  },
});
</script>

<template>
  <BaseModal :is-open="isAuthModal" @close="storeModal.closeAuthModal">
    <div class="modal-content">
      <div class="modal-content__inner">
        <AuthForm />
      </div>
    </div>
  </BaseModal>
</template>

<style scoped lang="less">
.modal-content {
  &__inner {
    max-width: 320px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
