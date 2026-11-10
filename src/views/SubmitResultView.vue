<template>
  <div class="page-stack">
    <section class="submit-result-layout">
      <form class="panel-card form-grid" @submit.prevent="handleSubmit">
        <div v-if="pendingSuggestions.length > 0" class="full-span pending-suggestions">
          <div class="pending-suggestions-head">
            <span>{{ t('submit.toConfirm') }}</span>
            <small class="muted-copy">{{ t('submit.suggestionHint') }}</small>
          </div>

          <div class="pending-suggestions-list">
            <button
              v-for="suggestion in pendingSuggestions"
              :key="suggestion.matchId"
              class="pending-suggestion-button"
              type="button"
              @click="applySuggestion(suggestion)"
            >
              <strong>{{ suggestion.opponentNickname }}</strong>
              <span>{{ suggestion.territoryName }}</span>
              <span>{{ suggestion.yourScore }} - {{ suggestion.opponentScore }}</span>
            </button>
          </div>
        </div>

        <label class="submit-territory">
          <span>{{ t('submit.territory') }}</span>
          <select v-model="form.territoryId" required>
            <option value="" disabled>{{ t('submit.selectTerritory') }}</option>
            <option v-for="territory in availableTerritories" :key="territory.id" :value="territory.id">
              {{ territory.name }}
            </option>
          </select>
        </label>

        <div class="submit-layout-spacer" aria-hidden="true"></div>

        <label class="submit-army">
          <span>{{ t('submit.army') }}</span>
          <select v-model="form.ownArmyId" required>
            <option value="" disabled>{{ t('submit.selectArmy') }}</option>
            <option v-for="army in sortedArmies" :key="army.id" :value="army.id">
              {{ army.name }}
            </option>
          </select>
        </label>

        <div class="selected-faction-chip submit-faction-chip" :style="selectedFactionStyle">
          {{ selectedFactionName }}
        </div>

        <label class="submit-opponent-search">
          <span>{{ t('submit.opponent') }}</span>
          <input
            v-model.trim="opponentSearch"
            type="text"
            :placeholder="t('submit.searchOpponent')"
            autocomplete="off"
          />
        </label>

        <label class="submit-opponent-select">
          <span class="sr-only">{{ t('submit.opponentSr') }}</span>
          <select v-model="form.opponentNickname" required>
            <option value="" disabled>{{ t('submit.selectOpponent') }}</option>
            <option
              v-for="opponent in filteredOpponents"
              :key="opponent.id"
              :value="opponent.nickname"
            >
              {{ opponent.nickname }}
            </option>
          </select>
        </label>

        <label class="submit-own-score">
          <span>{{ t('submit.myVp') }}</span>
          <input v-model.number="form.ownScore" type="number" min="0" required />
        </label>

        <label class="submit-opponent-score">
          <span>{{ t('submit.opponentVp') }}</span>
          <input v-model.number="form.opponentScore" type="number" min="0" required />
        </label>

        <label class="submit-notes">
          <span>{{ t('submit.notes') }}</span>
          <textarea v-model="form.note" rows="4" :placeholder="t('submit.notesPh')" />
        </label>

        <button class="primary-button submit-button" :disabled="isSubmitting || !canSubmitNewMatch" type="submit">
          {{ isSubmitting ? t('submit.sending') : t('submit.send') }}
        </button>
        <p v-if="loadError" class="field-error full-span">{{ loadError }}</p>
      </form>

      <aside class="panel-card callout-card submit-result-callout">
        <p class="eyebrow">{{ t('submit.rulesEyebrow') }}</p>
        <h3>{{ t('submit.rulesTitle') }}</h3>
        <ul class="text-list">
          <li>{{ t('submit.rule1') }}</li>
          <li>{{ t('submit.rule2') }}</li>
          <li>{{ t('submit.rule3') }}</li>
          <li>{{ t('submit.rule4') }}</li>
          <li>{{ t('submit.rule5') }}</li>
        </ul>
        <p v-if="submitMessage" class="success-message">{{ submitMessage }}</p>
      </aside>
    </section>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useTheme } from '@/composables/useTheme';
import { api } from '@/services/api';
import { useAppStore } from '@/stores/app';
import type { PendingMatchSuggestion, SubmitResultPayload, UserLookup } from '@/types';

const appStore = useAppStore();
const { armies, territories, user } = storeToRefs(appStore);
const isSubmitting = ref(false);
const submitMessage = ref('');
const loadError = ref('');
const opponents = ref<UserLookup[]>([]);
const opponentSearch = ref('');
const pendingSuggestions = ref<PendingMatchSuggestion[]>([]);

const form = reactive<SubmitResultPayload>({
  territoryId: '',
  ownArmyId: user.value?.preferredArmyId ?? '',
  opponentNickname: '',
  ownScore: 0,
  opponentScore: 0,
  note: '',
});

const sortedArmies = computed(() =>
  [...armies.value].sort((a, b) => a.name.localeCompare(b.name, 'it', { sensitivity: 'base' })),
);

const sortedTerritories = computed(() =>
  [...territories.value].sort((a, b) => a.name.localeCompare(b.name, 'it', { sensitivity: 'base' })),
);
const availableTerritories = computed(() =>
  sortedTerritories.value.filter((territory) => territory.isMatchSubmissionEnabled),
);

const selectedArmy = computed(() =>
  armies.value.find((army) => army.id === form.ownArmyId) ?? null,
);

const { factionBadgeStyle, factionLabel } = useTheme();

const selectedFactionName = computed(() =>
  selectedArmy.value ? factionLabel(selectedArmy.value.defaultFaction) : '',
);

const selectedFactionStyle = computed(() =>
  selectedArmy.value ? factionBadgeStyle(selectedArmy.value.defaultFaction) : undefined,
);

const availableOpponents = computed(() =>
  opponents.value
    .filter((opponent) => opponent.nickname !== user.value?.nickname)
    .sort((a, b) => a.nickname.localeCompare(b.nickname, 'it', { sensitivity: 'base' })),
);

const filteredOpponents = computed(() => {
  const query = opponentSearch.value.trim().toLowerCase();

  if (!query) {
    return availableOpponents.value;
  }

  return availableOpponents.value.filter((opponent) =>
    opponent.nickname.toLowerCase().includes(query),
  );
});

const hasLookupData = computed(() =>
  sortedArmies.value.length > 0 && availableTerritories.value.length > 0 && availableOpponents.value.length > 0,
);
const canSubmitNewMatch = computed(() => hasLookupData.value && form.territoryId !== '');

watch(
  () => user.value?.preferredArmyId,
  (preferredArmyId) => {
    if (preferredArmyId) {
      form.ownArmyId = preferredArmyId;
    }
  },
  { immediate: true },
);

watch(
  availableTerritories,
  (nextTerritories) => {
    if (nextTerritories.some((territory) => territory.id === form.territoryId)) {
      return;
    }

    form.territoryId = '';
  },
  { immediate: true },
);

onMounted(async () => {
  if (!appStore.hasBootstrapped) {
    await appStore.ensureBootstrapped();
  }

  if (territories.value.length === 0 || armies.value.length === 0 || appStore.factions.length === 0) {
    const [territoriesResult, armiesResult, factionsResult] = await Promise.allSettled([
      api.getTerritories(),
      api.getArmies(),
      api.getFactions(),
    ]);

    if (territoriesResult.status === 'fulfilled') {
      appStore.territories = territoriesResult.value;
    }

    if (armiesResult.status === 'fulfilled') {
      appStore.armies = armiesResult.value;
    }

    if (factionsResult.status === 'fulfilled') {
      appStore.factions = factionsResult.value;
    }
  }

  const [usersResult, pendingResult] = await Promise.allSettled([
    api.getUsers(),
    api.getPendingMatchesForMe(),
  ]);

  if (usersResult.status === 'fulfilled') {
    opponents.value = usersResult.value;
  }

  if (pendingResult.status === 'fulfilled') {
    pendingSuggestions.value = pendingResult.value;
  }

  if (usersResult.status === 'rejected') {
    loadError.value = t('submit.errOpponents');
  }

  const missingLookupParts = [];

  if (territories.value.length === 0) {
    missingLookupParts.push(t('submit.part.territories'));
  }

  if (sortedArmies.value.length === 0) {
    missingLookupParts.push(t('submit.part.armies'));
  }

  if (availableOpponents.value.length === 0) {
    missingLookupParts.push(t('submit.part.opponents'));
  }

  if (missingLookupParts.length > 0) {
    loadError.value = t('submit.errMissing', { list: missingLookupParts.join(', ') });
  } else if (availableTerritories.value.length === 0) {
    loadError.value = t('submit.noEnabled');
  } else {
    loadError.value = '';

    if (user.value?.preferredArmyId) {
      form.ownArmyId = user.value.preferredArmyId;
    } else if (!form.ownArmyId && sortedArmies.value[0]) {
      form.ownArmyId = sortedArmies.value[0].id;
    }
  }
});

async function handleSubmit() {
  isSubmitting.value = true;
  submitMessage.value = '';
  loadError.value = '';

  try {
    const result = await api.submitResult({
      ...form,
      ownFaction: selectedArmy.value?.defaultFaction,
      playedAt: '',
    });
    submitMessage.value = result.message;
    const [recentMatchesResult, pendingResult] = await Promise.allSettled([
      api.getRecentMatches(),
      api.getPendingMatchesForMe(),
    ]);

    if (recentMatchesResult.status === 'fulfilled') {
      appStore.recentMatches = recentMatchesResult.value;
    }

    if (pendingResult.status === 'fulfilled') {
      pendingSuggestions.value = pendingResult.value;
    }
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : t('submit.saveError');
  } finally {
    isSubmitting.value = false;
  }
}

function applySuggestion(suggestion: PendingMatchSuggestion) {
  form.territoryId = suggestion.territoryId;
  form.opponentNickname = suggestion.opponentNickname;
  form.ownScore = suggestion.yourScore;
  form.opponentScore = suggestion.opponentScore;
  opponentSearch.value = suggestion.opponentNickname;

  if (!form.ownArmyId && sortedArmies.value[0]) {
    form.ownArmyId = sortedArmies.value[0].id;
  }
}
</script>
