<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SettingsCard from '../../components/settings/SettingsCard.vue';
import SettingsForm from '../../components/settings/SettingsForm.vue';
import { api } from '@/api/api';
import type { UserResponse } from '@/types/responses/user';

const isChanging = ref(false);
const userData = ref<UserResponse | null>(null);
onMounted(async () => {
  try {
    userData.value = await api.user.refresh();
  }
  catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <div v-if="userData" class="page-settings">
    <SettingsCard title="Личные данные" :is-changing="isChanging" @on-change="isChanging = true">
      <SettingsForm
        :user-info="{ name: userData.user.name, phone: userData?.user.phone, email: userData?.user.email, birthDay: null }"
        :is-changing="isChanging"
        @on-submit-form="isChanging = false"
      />
    </SettingsCard>
  </div>
</template>

<style scoped></style>
