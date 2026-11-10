<template>
  <div class="auth-layout">
    <header class="auth-topbar">
      <RouterLink :to="{ name: 'dashboard' }" class="auth-brand">
        <img :src="brandLogo" alt="" class="auth-topbar-logo" />
        <span class="brand-wordmark">
          <span class="brand-name">SUN-TZU SECRETS</span>
          <span class="brand-subtitle">{{ t('brand.subtitle') }}</span>
        </span>
      </RouterLink>
      <LanguageToggle />
    </header>
    <section class="auth-form-card">
      <RouterView />
    </section>
    <RouterLink :to="{ name: 'dashboard' }" class="text-link auth-back-link">{{ t('auth.backToMap') }}</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import LanguageToggle from '@/components/LanguageToggle.vue';
import { t } from '@/i18n';
import brandLogo from '@/assets/sun-tzu-secrets-logo.webp';
</script>
