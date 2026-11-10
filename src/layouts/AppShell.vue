<template>
  <div class="app-shell">
    <aside class="shell-sidebar">
      <div class="sidebar-brand">
        <img :src="brandLogo" alt="Sun-Tzu Secrets logo" class="brand-logo" />
        <div class="brand-wordmark">
          <span class="brand-name">SUN-TZU SECRETS</span>
          <span class="brand-subtitle">{{ t('brand.subtitle') }}</span>
        </div>
      </div>

      <nav class="main-nav" :aria-label="t('nav.aria')">
        <RouterLink
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          custom
          v-slot="{ href, navigate }"
        >
          <a
            :href="href"
            class="nav-link"
            :class="{ 'is-active': isNavItemActive(item.matchNames) }"
            @click="navigate"
          >
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
        <button v-if="user" type="button" class="nav-link nav-button logout-link" @click="handleLogout">
          {{ t('nav.logout') }}
        </button>
      </nav>

      <a class="sidebar-site-link" :href="siteUrl">← {{ t('brand.backToSite') }}</a>
    </aside>

    <div class="shell-content">
      <header class="shell-topbar">
        <a class="topbar-mobile-brand" :href="siteUrl" :aria-label="t('brand.backToSite')">
          <img :src="brandLogo" alt="" class="topbar-mobile-logo" />
        </a>
        <div class="topbar-title">
          <p class="eyebrow">{{ t('shell.activeCampaign') }}</p>
          <h2>{{ t('shell.campaignTitle') }}</h2>
        </div>
        <div class="topbar-actions">
          <LanguageToggle />
          <span class="season-badge">{{ user?.nickname ?? t('shell.guest') }}</span>
        </div>
      </header>

      <main class="shell-main">
        <section class="content-frame">
          <RouterView />
        </section>
      </main>

      <footer class="shell-footer">
        <div class="footer-block">
          <strong>{{ config?.appName }}</strong>
          <p class="muted-copy footer-meta-line">{{ t('shell.version') }} {{ config?.appVersion }} · Powered by LiminalCode</p>
        </div>
        <div class="footer-block footer-block-center">
          <div class="footer-links">
            <RouterLink :to="{ name: 'info-legal' }">{{ t('shell.legal') }}</RouterLink>
            <RouterLink :to="{ name: 'info-privacy' }">{{ t('shell.privacy') }}</RouterLink>
            <RouterLink :to="{ name: 'info-cookie' }">{{ t('shell.cookie') }}</RouterLink>
            <RouterLink :to="{ name: 'info-contacts' }">{{ t('shell.contacts') }}</RouterLink>
            <a :href="siteUrl">suntzusecrets.com</a>
          </div>
        </div>
      </footer>
    </div>

    <nav class="mobile-nav" :aria-label="t('nav.mobileAria')">
      <RouterLink
        v-for="item in navItems"
        :key="item.key"
        :to="item.to"
        custom
        v-slot="{ href, navigate }"
      >
        <a
          :href="href"
          class="mobile-nav-link"
          :class="{ 'is-active': isNavItemActive(item.matchNames) }"
          @click="navigate"
        >
          {{ item.short }}
        </a>
      </RouterLink>
      <button v-if="user" type="button" class="mobile-nav-link mobile-nav-button" @click="handleLogout">
        {{ t('nav.logout') }}
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import LanguageToggle from '@/components/LanguageToggle.vue';
import { t } from '@/i18n';
import { useAppStore } from '@/stores/app';
import brandLogo from '@/assets/sun-tzu-secrets-logo.jpg';

const siteUrl = 'https://www.suntzusecrets.com/';

const appStore = useAppStore();
const { config, user } = storeToRefs(appStore);
const router = useRouter();
const route = useRoute();

const navItem = (key: string, to: { name: string }, matchNames: string[]) => ({
  key,
  label: t(`nav.${key}`),
  short: t(`nav.${key}.short`),
  to,
  matchNames,
});

const navItems = computed(() => {
  if (!user.value) {
    return [
      navItem('map', { name: 'dashboard' }, ['dashboard', 'territory-detail']),
      navItem('login', { name: 'login' }, ['login', 'forgot-password']),
      navItem('register', { name: 'register' }, ['register']),
      navItem('resources', { name: 'resources' }, ['resources']),
    ];
  }

  return [
    navItem('map', { name: 'dashboard' }, ['dashboard', 'territory-detail']),
    navItem('submit', { name: 'submit-result' }, ['submit-result']),
    navItem('results', { name: 'results' }, ['results']),
    navItem('profile', { name: 'profile' }, ['profile']),
    navItem('resources', { name: 'resources' }, ['resources']),
    ...(user.value?.role === 'ADMIN'
      ? [{ key: 'admin', label: t('nav.admin'), short: t('nav.admin'), to: { name: 'admin' }, matchNames: ['admin'] }]
      : []),
  ];
});

const isNavItemActive = (matchNames: string[]) =>
  route.name !== undefined && matchNames.includes(String(route.name));

const handleLogout = async () => {
  await appStore.logout();
  await router.push({ name: 'dashboard' });
};

onMounted(async () => {
  if (!appStore.hasBootstrapped) {
    await appStore.ensureBootstrapped();
  }
});
</script>
