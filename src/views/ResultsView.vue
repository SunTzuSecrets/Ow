<template>
  <div class="page-stack">
    <SectionHeader
      :eyebrow="t('results.eyebrow')"
      :title="t('results.title')"
    />

    <section class="panel-card">
      <MatchesTable :matches="myRecentMatches" />
    </section>

    <section v-if="pendingMatchesForMe.length > 0" class="panel-card pending-results-panel">
      <div class="pending-results-head">
        <p class="eyebrow">{{ t('results.toConfirm') }}</p>
        <h3>{{ t('results.toVerify') }}</h3>
      </div>

      <div class="pending-results-list">
        <article
          v-for="match in pendingMatchesForMe"
          :key="match.matchId"
          class="pending-result-card"
        >
          <p class="match-battle-title">
            <strong>{{ t('matches.battleFor') }} {{ match.territoryName }}</strong>
            <span> - {{ pendingForMeOutcomeLabel(match) }}</span>
          </p>

          <div class="match-duel pending-result-duel">
            <div class="match-player-card pending-result-player-card">
              <div class="match-player-head">
                <strong>{{ user?.nickname }}</strong>
                <span class="match-player-vp">({{ match.yourScore }})</span>
              </div>
              <p class="match-player-meta">{{ t('results.awaitingYours') }}</p>
            </div>

            <span class="match-player-score match-player-score-outside">{{ pendingForMeMatchPoints(match).playerA }}</span>
            <span class="match-separator">-</span>
            <span class="match-player-score match-player-score-outside">{{ pendingForMeMatchPoints(match).playerB }}</span>

            <div class="match-player-card pending-result-player-card is-opponent">
              <div class="match-player-head">
                <strong>{{ match.opponentNickname }}</strong>
                <span class="match-player-vp">({{ match.opponentScore }})</span>
              </div>
              <p class="match-player-meta">({{ match.opponentArmyName }} - {{ factionLabel(match.opponentFaction) }})</p>
            </div>
          </div>

          <p class="pending-result-status">{{ t('results.toConfirm') }}</p>
        </article>
      </div>
    </section>

    <section v-if="pendingMatchesByMe.length > 0" class="panel-card pending-results-panel">
      <div class="pending-results-head">
        <p class="eyebrow">{{ t('results.awaiting') }}</p>
        <h3>{{ t('results.enteredByYou') }}</h3>
      </div>

      <div class="pending-results-list">
        <article
          v-for="match in pendingMatchesByMe"
          :key="match.matchId"
          class="pending-result-card"
        >
          <p class="match-battle-title">
            <strong>{{ t('matches.battleFor') }} {{ match.territoryName }}</strong>
            <span> - {{ pendingOutcomeLabel(match) }}</span>
          </p>

          <div class="match-duel pending-result-duel">
            <div class="match-player-card pending-result-player-card">
              <div class="match-player-head">
                <strong>{{ user?.nickname }}</strong>
                <span class="match-player-vp">({{ match.ownScore }})</span>
              </div>
              <p class="match-player-meta">({{ match.ownArmyName }} - {{ factionLabel(match.ownFaction) }})</p>
            </div>

            <span class="match-player-score match-player-score-outside">{{ pendingMatchPoints(match).playerA }}</span>
            <span class="match-separator">-</span>
            <span class="match-player-score match-player-score-outside">{{ pendingMatchPoints(match).playerB }}</span>

            <div class="match-player-card pending-result-player-card is-opponent">
              <div class="match-player-head">
                <strong>{{ match.opponentNickname }}</strong>
                <span class="match-player-vp">({{ match.opponentScore }})</span>
              </div>
              <p class="match-player-meta">{{ t('results.awaitingParen') }}</p>
            </div>
          </div>

          <p class="pending-result-status">{{ t('results.awaiting') }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n';
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import MatchesTable from '@/components/MatchesTable.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import { useTheme } from '@/composables/useTheme';
import { api } from '@/services/api';
import { useAppStore } from '@/stores/app';
import type { PendingMatchSuggestion, PendingOwnMatch } from '@/types';
import { battleOutcomeLabel, calculateMatchPoints } from '@/utils/matchScoring';

const appStore = useAppStore();
const { recentMatches, user } = storeToRefs(appStore);
const pendingMatchesForMe = ref<PendingMatchSuggestion[]>([]);
const pendingMatchesByMe = ref<PendingOwnMatch[]>([]);
const { factionLabel } = useTheme();
const myRecentMatches = computed(() => {
  const nickname = user.value?.nickname?.trim().toLowerCase();

  if (!nickname) {
    return [];
  }

  return recentMatches.value.filter((match) =>
    match.playerA.trim().toLowerCase() === nickname || match.playerB.trim().toLowerCase() === nickname,
  );
});

onMounted(async () => {
  const [pendingForMeResult, pendingByMeResult] = await Promise.allSettled([
    api.getPendingMatchesForMe(),
    api.getPendingMatchesByMe(),
  ]);

  pendingMatchesForMe.value = pendingForMeResult.status === 'fulfilled' ? pendingForMeResult.value : [];
  pendingMatchesByMe.value = pendingByMeResult.status === 'fulfilled' ? pendingByMeResult.value : [];
});

const pendingMatchPoints = (match: PendingOwnMatch) =>
  calculateMatchPoints(match.ownScore, match.opponentScore);

const pendingOutcomeLabel = (match: PendingOwnMatch) => {
  const points = pendingMatchPoints(match);
  return battleOutcomeLabel(points.playerA, points.playerB);
};

const pendingForMeMatchPoints = (match: PendingMatchSuggestion) =>
  calculateMatchPoints(match.yourScore, match.opponentScore);

const pendingForMeOutcomeLabel = (match: PendingMatchSuggestion) => {
  const points = pendingForMeMatchPoints(match);
  return battleOutcomeLabel(points.playerA, points.playerB);
};
</script>
