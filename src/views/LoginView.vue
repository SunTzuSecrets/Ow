<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <p class="eyebrow">{{ t('login.eyebrow') }}</p>
    <h2>{{ t('login.title') }}</h2>
    <label>
      <span>{{ t('login.user') }}</span>
      <input 
        v-model="email" 
        type="text" 
        placeholder="player@example.com" 
        autocomplete="username"
        required
      />
    </label>
    <label>
      <span>{{ t('login.password') }}</span>
      <input 
        v-model="password" 
        type="password" 
        placeholder="••••••••" 
        autocomplete="current-password"
        required
      />
    </label>
    <button class="primary-button" type="submit" :disabled="isLoading">
      {{ isLoading ? t('login.loading') : t('login.submit') }}
    </button>
    <div v-if="error" class="error-message">{{ error }}</div>
    <RouterLink to="/auth/forgot-password" class="text-link">{{ t('login.forgot') }}</RouterLink>
    <RouterLink to="/auth/register" class="text-link">{{ t('login.noAccount') }}</RouterLink>
  </form>
</template>

<script setup lang="ts">
import { t } from '@/i18n';
import { ref } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { useAppStore } from '@/stores/app';

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();

const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {
  error.value = '';
  isLoading.value = true;
  
  try {
    await appStore.login(email.value, password.value);
    
    // Se c'è una pagina di redirect nel query, vai lì; altrimenti vai al dashboard
    const redirectTo = route.query.redirect as string || '/';
    router.push(redirectTo);
  } catch (err) {
    error.value = err instanceof Error ? err.message : t('login.error');
  } finally {
    isLoading.value = false;
  }
};
</script>
