<template>
  <div class="page-stack">
    <SectionHeader
      :eyebrow="t('profile.eyebrow')"
      :title="t('profile.title')"
    />

    <section class="panel-card profile-card">
      <div class="profile-head">
        <div class="avatar-large">{{ initials }}</div>
        <div>
          <h3>{{ user?.nickname }}</h3>
          <p class="muted-copy">{{ t('profile.hidden') }}</p>
        </div>
      </div>

      <form class="profile-grid" @submit.prevent="handleSubmit">
        <label>
          <span>{{ t('profile.preferredArmy') }}</span>
          <select v-model="form.preferredArmyId">
            <option value="">{{ t('profile.none') }}</option>
            <option v-for="army in armies" :key="army.id" :value="army.id">
              {{ army.name }}
            </option>
          </select>
        </label>
        <div>
          <span>{{ t('profile.preferredFaction') }}</span>
          <div class="selected-faction-chip profile-faction-chip" :style="selectedFactionStyle">
            {{ selectedFactionName }}
          </div>
        </div>
        <label>
          <span>{{ t('profile.newPassword') }}</span>
          <input v-model="form.password" type="password" :placeholder="t('profile.newPasswordPh')" />
        </label>
        <label>
          <span>{{ t('profile.confirmPassword') }}</span>
          <input v-model="form.passwordConfirmation" type="password" :placeholder="t('profile.confirmPasswordPh')" />
        </label>
        <p v-if="saveMessage" class="success-message full-span">{{ saveMessage }}</p>
        <p v-if="saveError" class="field-error full-span">{{ saveError }}</p>
        <button class="primary-button full-span" :disabled="appStore.isLoading" type="submit">
          {{ appStore.isLoading ? t('profile.saving') : t('profile.save') }}
        </button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n';
import { computed, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import SectionHeader from '@/components/SectionHeader.vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
const { armies, factions, user } = storeToRefs(appStore);
const form = reactive({
  preferredArmyId: '',
  password: '',
  passwordConfirmation: '',
});
const saveMessage = ref('');
const saveError = ref('');

const initials = computed(() => (user.value?.nickname ?? 'OW').slice(0, 2).toUpperCase());
const selectedArmy = computed(() => armies.value.find((army) => army.id === form.preferredArmyId));
const selectedFaction = computed(() => factions.value.find((faction) => faction.code === selectedArmy.value?.defaultFaction));
const selectedFactionName = computed(() => selectedFaction.value?.name ?? t('profile.none'));
const selectedFactionStyle = computed(() => ({
  color: selectedFaction.value?.color ?? 'var(--text-muted)',
}));

watch(
  user,
  (nextUser) => {
    form.preferredArmyId = nextUser?.preferredArmyId ?? '';
    form.password = '';
    form.passwordConfirmation = '';
  },
  { immediate: true },
);

const handleSubmit = async () => {
  saveMessage.value = '';
  saveError.value = '';

  if (form.password && form.password.length < 8) {
    saveError.value = t('register.errPassword');
    return;
  }

  if (form.password !== form.passwordConfirmation) {
    saveError.value = t('register.errMatch');
    return;
  }

  try {
    const result = await appStore.updateMyProfile({
      preferredArmyId: form.preferredArmyId || null,
      preferredFaction: selectedArmy.value?.defaultFaction ?? null,
      password: form.password || undefined,
    });

    form.password = '';
    form.passwordConfirmation = '';
    saveMessage.value = result.message;
  } catch (error) {
    saveError.value = error instanceof Error ? error.message : t('profile.saveFailed');
  }
};
</script>
