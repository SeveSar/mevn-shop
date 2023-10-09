<template>
  <div class="page-settings">
    <SettingsCard title="Личные данные" @onChange="isChanging = true" :is-changing="isChanging">
      <SettingsForm
        :user-info="{ name: 'Ara', phone: '767676', email: 'a@a', birthday: '01.01.2000' }"
        :is-changing="isChanging"
        @onSubmitForm="isChanging = false"
      />
    </SettingsCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SettingsCard from '../../components/settings/SettingsCard.vue';
import SettingsForm from '../../components/settings/SettingsForm.vue';

const isChanging = ref(false);
</script>

<style scoped></style>
