<template>
  <div class="page-stack">
    <SectionHeader
      :eyebrow="t('resources.eyebrow')"
      :title="t('resources.title')"
    />

    <section class="content-grid single-column">
      <article class="panel-card resources-card">
        <div class="resources-list">
          <a class="resource-item" :href="manualPdf" download>
            <strong>{{ t('resources.manual') }}</strong>
            <span>{{ t('resources.manualDesc') }}</span>
          </a>

          <a class="resource-item" :href="efigaPdf" :target="config?.efigaAvailable ? undefined : '_blank'" :rel="config?.efigaAvailable ? undefined : 'noreferrer'">
            <strong>EFIGA</strong>
            <span>{{ config?.efigaAvailable ? t('resources.efigaUploaded') : t('resources.efigaExternal') }}</span>
          </a>

          <a class="resource-item" :href="gwFaqUrl" target="_blank" rel="noreferrer">
            <strong>{{ t('resources.gwFaq') }}</strong>
            <span>{{ t('resources.gwFaqDesc') }}</span>
          </a>

          <a class="resource-item" :href="federationUrl" target="_blank" rel="noreferrer">
            <strong>{{ t('resources.federation') }}</strong>
            <span>{{ t('resources.federationDesc') }}</span>
          </a>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import SectionHeader from '@/components/SectionHeader.vue';
import { api } from '@/services/api';
import { useAppStore } from '@/stores/app';

const efigaUrl = 'https://oldworldfederation.com/assets/infopacks/Old%20World%20Federation%20-%20EFIGA%202026.03ita.pdf';
const gwFaqUrl = 'https://www.warhammer-community.com/en-gb/downloads/warhammer-the-old-world/';
const federationUrl = 'https://oldworldfederation.com/';
const appStore = useAppStore();
const { config } = storeToRefs(appStore);
const manualPdf = computed(() => config.value?.manualUrl ?? api.manualDownloadUrl());
const efigaPdf = computed(() => config.value?.efigaAvailable ? config.value.efigaUrl : efigaUrl);
</script>
