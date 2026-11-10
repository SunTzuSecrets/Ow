<template>
  <div v-if="territory" class="page-stack">
    <section class="detail-hero">
      <div>
        <p class="eyebrow">{{ t('territory.eyebrow') }}</p>
        <h1>{{ territory.name }}</h1>
        <p class="muted-copy">{{ territory.description }}</p>
        <p class="detail-lore">{{ territory.lore }}</p>
      </div>
      <div class="detail-side">
        <FactionBadge :faction="territory.stats.dominantFaction" />
        <div class="logo-placeholder">{{ t('territory.artwork') }}</div>
      </div>
    </section>

    <section class="stats-grid">
      <StatCard :label="t('territory.confirmed')" :value="territory.stats.confirmedBattles" />
      <StatCard :label="t('territory.pending')" :value="territory.stats.pendingBattles" />
      <StatCard :label="t('territory.dominantFaction')" :value="factionLabel(territory.stats.dominantFaction)" />
    </section>

    <section class="content-grid two-columns">
      <div class="panel-card">
        <SectionHeader :eyebrow="t('territory.factionControl')" :title="t('territory.breakdown')" />
        <div class="breakdown-list">
          <div v-for="entry in territory.stats.factionControl" :key="entry.faction" class="breakdown-row">
            <div class="breakdown-head">
              <FactionBadge :faction="entry.faction" />
              <strong>{{ entry.percentage }}%</strong>
            </div>
            <div class="progress-track">
              <div class="progress-fill" :style="{ ...factionFillStyle(entry.faction), width: `${entry.percentage}%` }" />
            </div>
          </div>
        </div>
      </div>

      <div class="panel-card">
        <SectionHeader :eyebrow="t('territory.armyControl')" :title="t('territory.topArmies')" />
        <div class="breakdown-list">
          <div v-for="entry in territory.stats.armyControl" :key="entry.armyName" class="breakdown-row">
            <div class="breakdown-head">
              <span>{{ entry.armyName }}</span>
              <strong>{{ entry.percentage }}%</strong>
            </div>
            <div class="progress-track">
              <div class="progress-fill neutral" :style="{ width: `${entry.percentage}%` }" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="panel-card">
      <SectionHeader :eyebrow="t('territory.recentHistory')" :title="t('territory.battles')" />
      <MatchesTable :matches="territoryMatches" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import FactionBadge from '@/components/FactionBadge.vue';
import MatchesTable from '@/components/MatchesTable.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import StatCard from '@/components/StatCard.vue';
import { useTheme } from '@/composables/useTheme';
import { useAppStore } from '@/stores/app';

const route = useRoute();
const appStore = useAppStore();
const { recentMatches, territories } = storeToRefs(appStore);
const { factionFillStyle, factionLabel } = useTheme();

const territory = computed(() => appStore.territoryBySlug(String(route.params.slug)));

const territoryMatches = computed(() =>
  recentMatches.value.filter((match) => match.territorySlug === route.params.slug),
);
</script>
