<template>
  <div class="lang-toggle" role="group" :aria-label="t('lang.label')">
    <button
      type="button"
      class="lang-toggle-button"
      :class="{ 'is-active': locale === 'en' }"
      :aria-pressed="locale === 'en'"
      @click="setLocale('en')"
    >
      EN
    </button>
    <button
      type="button"
      class="lang-toggle-button"
      :class="{ 'is-active': locale === 'it' }"
      :aria-pressed="locale === 'it'"
      @click="setLocale('it')"
    >
      IT
    </button>
  </div>
</template>

<script setup lang="ts">
import { locale, setLocale, t } from '@/i18n';
</script>
