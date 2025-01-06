<script setup lang="ts">
import { useUserStore } from '@/modules/user';
import { onMounted, ref } from 'vue';
import SettingsCard from '../../components/settings/SettingsCard.vue';
import SettingsForm from '../../components/settings/SettingsForm.vue';

const isChanging = ref(false);
const userStore = useUserStore();
</script>

<template>
  <div v-if="userStore.user" class="page-settings">
    <SettingsCard title="Личные данные" :is-changing="isChanging" @on-change="isChanging = true">
      <SettingsForm
        :user-info="{ name: userStore.user.name, phone: userStore.user.phone, email: userStore.user.email, birthDay: null }"
        :is-changing="isChanging"
        @on-submit-form="isChanging = false"
      />
    </SettingsCard>
  </div>
</template>

<style scoped></style>
