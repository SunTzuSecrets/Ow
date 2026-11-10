<template>
  <form class="auth-form">
    <p class="eyebrow">{{ t('forgot.eyebrow') }}</p>
    <h2>{{ t('forgot.title') }}</h2>
    <label>
      <span>{{ t('forgot.email') }}</span>
      <input type="email" placeholder="player@example.com" />
    </label>
    <button class="primary-button" type="submit">{{ t('forgot.submit') }}</button>
    <RouterLink to="/auth/login" class="text-link">{{ t('forgot.back') }}</RouterLink>
  </form>
</template>

<script setup lang="ts">
import { t } from '@/i18n';
import { RouterLink } from 'vue-router';
</script>

