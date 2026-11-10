import { ref } from 'vue';

export type Locale = 'en' | 'it';

const STORAGE_KEY = 'sts-lang';

function detectInitialLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'it') {
      return stored;
    }
  } catch {
    // storage unavailable: fall back to the browser language
  }

  const browserLanguage = (navigator.language || '').toLowerCase();
  return browserLanguage.startsWith('it') ? 'it' : 'en';
}

export const locale = ref<Locale>(detectInitialLocale());

const messages: Record<Locale, Record<string, string>> = {
  it: {
    'brand.subtitle': 'Warhammer: The Old World',
    'brand.backToSite': 'Torna al sito',
    'lang.label': 'Lingua',

    'nav.aria': 'Navigazione principale',
    'nav.mobileAria': 'Navigazione mobile',
    'nav.map': 'Mappa e territori',
    'nav.map.short': 'Mappa',
    'nav.login': 'Accedi',
    'nav.login.short': 'Login',
    'nav.register': 'Registrati',
    'nav.register.short': 'Iscriviti',
    'nav.resources': 'Risorse',
    'nav.resources.short': 'Risorse',
    'nav.submit': 'Inserisci risultato',
    'nav.submit.short': 'Esito',
    'nav.results': 'I miei risultati',
    'nav.results.short': 'Storico',
    'nav.profile': 'Profilo',
    'nav.profile.short': 'Profilo',
    'nav.admin': 'Admin',
    'nav.logout': 'Logout',

    'shell.activeCampaign': 'Campagna attiva',
    'shell.campaignTitle': 'Le Ombre sulla Baia dei Relitti',
    'shell.guest': 'Accesso ospite',
    'shell.version': 'Versione',
    'shell.legal': 'Note legali',
    'shell.privacy': 'Privacy',
    'shell.cookie': 'Cookie',
    'shell.contacts': 'Contatti',
    'shell.pageTitle': 'Le Ombre sulla Baia dei Relitti · Sun-Tzu Secrets',

    'dashboard.activeTerritories': 'Territori attivi',
    'dashboard.confirmedBattles': 'Battaglie confermate',
    'dashboard.leadingFaction': 'Fazione in vantaggio',
    'dashboard.pieLabel': 'Distribuzione del controllo tra le tre fazioni',
    'dashboard.balanced': 'Equilibrio tra le fazioni',
    'dashboard.points': 'pt',
    'dashboard.recentEyebrow': 'Ultimi scontri',
    'dashboard.recentTitle': 'Match recenti',

    'map.territories': 'Territori campagna',
    'map.selected': 'Territorio selezionato sulla mappa',
    'map.hint': 'Passa sopra un territorio o cliccalo per mantenerlo selezionato',
    'map.alt': 'Mappa della campagna',
    'map.focus': 'Focus territorio',
    'map.gamesPlayed': 'Partite giocate',
    'map.dominantFaction': 'Fazione dominante',
    'map.contested': 'Conteso',
    'map.na': 'N.D.',
    'map.localControl': 'Controllo locale',
    'map.localPieLabel': 'Distribuzione del controllo per il territorio selezionato',
    'map.wins': 'vittorie',
    'map.noGames': 'Ancora nessuna partita confermata su questo territorio.',

    'territory.eyebrow': 'Dettaglio territorio',
    'territory.artwork': 'Stemmi / Artwork territorio',
    'territory.confirmed': 'Match confermati',
    'territory.pending': 'Match pendenti',
    'territory.dominantFaction': 'Fazione dominante',
    'territory.factionControl': 'Controllo fazioni',
    'territory.breakdown': 'Ripartizione territorio',
    'territory.armyControl': 'Controllo armate',
    'territory.topArmies': 'Armate più influenti',
    'territory.recentHistory': 'Storico recente',
    'territory.battles': 'Battaglie sul territorio',

    'matches.none': 'Nessuna partita disputata',
    'matches.battleFor': 'Battaglia per:',

    'outcome.draw': 'Pareggio',
    'outcome.minorWin': 'Vittoria Minore',
    'outcome.minorLoss': 'Sconfitta Minore',
    'outcome.majorWin': 'Vittoria Maggiore',
    'outcome.majorLoss': 'Sconfitta Maggiore',
    'outcome.massacre': 'Massacro',
    'outcome.totalLoss': 'Sconfitta Totale',
    'outcome.win': 'Vittoria',
    'outcome.loss': 'Sconfitta',

    'resources.eyebrow': 'Risorse',
    'resources.title': 'Download e riferimenti',
    'resources.manual': 'Manuale Campagna',
    'resources.manualDesc': 'Scarica il PDF del manuale della campagna.',
    'resources.efiga': 'EFIGA',
    'resources.efigaUploaded': 'Scarica il PDF EFIGA caricato nel portale.',
    'resources.efigaExternal': 'Download del pack EFIGA ospitato su Old World Federation.',
    'resources.gwFaq': 'FAQ GW',
    'resources.gwFaqDesc': 'Pagina ufficiale Games Workshop con i download e le FAQ di Warhammer: The Old World.',
    'resources.federation': 'Sito Federazione',
    'resources.federationDesc': 'Portale ufficiale della federazione Old World Federation.',

    'login.eyebrow': 'Accesso',
    'login.title': 'Entra nel portale',
    'login.user': 'Email o nickname',
    'login.password': 'Password',
    'login.loading': 'Accesso in corso...',
    'login.submit': 'Accedi',
    'login.forgot': 'Password dimenticata?',
    'login.noAccount': 'Non hai un account? Registrati',
    'login.error': "Errore durante l'accesso",
    'auth.backToMap': '← Torna alla mappa',

    'forgot.eyebrow': 'Recupero accesso',
    'forgot.title': 'Richiedi reset password',
    'forgot.email': 'Email',
    'forgot.submit': 'Invia istruzioni',
    'forgot.back': 'Torna al login',

    'register.eyebrow': 'Registrazione',
    'register.title': 'Crea un nuovo comandante',
    'register.nickname': 'Nickname',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.confirm': 'Conferma password',
    'register.loading': 'Registrazione in corso...',
    'register.submit': 'Registrati',
    'register.haveAccount': 'Hai già un account? Accedi',
    'register.errNickname': 'Il nickname deve avere almeno 4 caratteri.',
    'register.errEmail': 'Inserisci una email valida.',
    'register.errPassword': 'La password deve avere almeno 8 caratteri.',
    'register.errMatch': 'Le due password non coincidono.',
    'register.emailFailed': "Registrazione completata, ma l'invio dell'email non è riuscito sul server.",
    'register.failed': 'Registrazione non riuscita.',

    'profile.eyebrow': 'Profilo utente',
    'profile.title': 'Account, avatar e preferenze',
    'profile.hidden': 'Dati sensibili nascosti lato interfaccia.',
    'profile.preferredArmy': 'Armata preferita',
    'profile.none': 'Nessuna',
    'profile.preferredFaction': 'Fazione preferita',
    'profile.newPassword': 'Nuova password',
    'profile.newPasswordPh': 'Aggiorna password',
    'profile.confirmPassword': 'Conferma password',
    'profile.confirmPasswordPh': 'Conferma nuova password',
    'profile.saving': 'Salvataggio in corso...',
    'profile.save': 'Salva modifiche',
    'profile.saveFailed': 'Salvataggio non riuscito.',

    'results.eyebrow': 'I miei risultati',
    'results.title': 'Storico conferme e partite pendenti',
    'results.toConfirm': 'Da confermare',
    'results.toVerify': 'Partite da verificare',
    'results.awaitingYours': '(In attesa della tua conferma)',
    'results.awaiting': 'In attesa di conferma',
    'results.awaitingParen': '(In attesa di conferma)',
    'results.enteredByYou': 'Partite inserite da te',

    'submit.toConfirm': 'Da confermare',
    'submit.suggestionHint': 'Selezionandone uno, il form si precompila con territorio, avversario e punteggi speculari.',
    'submit.territory': 'Territorio',
    'submit.selectTerritory': 'Seleziona un territorio abilitato',
    'submit.army': 'Armata',
    'submit.selectArmy': 'Seleziona una armata',
    'submit.opponent': 'Nickname avversario',
    'submit.searchOpponent': 'Cerca nickname avversario',
    'submit.opponentSr': 'Selezione avversario',
    'submit.selectOpponent': 'Seleziona un avversario',
    'submit.myVp': 'Miei punti vittoria',
    'submit.opponentVp': 'P.V. avversario',
    'submit.notes': 'Note',
    'submit.notesPh': 'Dettagli extra, missione, scenario, anomalia da segnalare...',
    'submit.sending': 'Invio in corso...',
    'submit.send': 'Invia risultato',
    'submit.rulesEyebrow': 'Regole di conferma',
    'submit.rulesTitle': 'Come il sistema conferma il match',
    'submit.rule1': 'Entrambi i giocatori devono indicare lo stesso territorio.',
    'submit.rule2': 'I punteggi devono combaciare in modo speculare.',
    'submit.rule3': 'I match incoerenti restano fuori dalle statistiche finché non vengono risolti.',
    'submit.rule4': "Le partite che combaciano vengono registrate automaticamente come accoppiate all'inserimento.",
    'submit.rule5': 'Il sistema propone i match inseriti dal tuo avversario e non ancora confermati da te.',
    'submit.errOpponents': 'Non sono riuscito a caricare la lista avversari dal server.',
    'submit.errMissing': 'Non sono riuscito a caricare: {list}.',
    'submit.part.territories': 'territori',
    'submit.part.armies': 'armate',
    'submit.part.opponents': 'avversari',
    'submit.noEnabled': 'Al momento non ci sono territori abilitati alla registrazione di nuovi match.',
    'submit.saveError': 'Errore durante il salvataggio del risultato.',

    'info.eyebrow': 'Informazioni',
    'info.back': 'Indietro',
  },
  en: {
    'brand.subtitle': 'Warhammer: The Old World',
    'brand.backToSite': 'Back to the site',
    'lang.label': 'Language',

    'nav.aria': 'Main navigation',
    'nav.mobileAria': 'Mobile navigation',
    'nav.map': 'Map & territories',
    'nav.map.short': 'Map',
    'nav.login': 'Log in',
    'nav.login.short': 'Log in',
    'nav.register': 'Sign up',
    'nav.register.short': 'Join',
    'nav.resources': 'Resources',
    'nav.resources.short': 'Files',
    'nav.submit': 'Submit a result',
    'nav.submit.short': 'Result',
    'nav.results': 'My results',
    'nav.results.short': 'History',
    'nav.profile': 'Profile',
    'nav.profile.short': 'Profile',
    'nav.admin': 'Admin',
    'nav.logout': 'Log out',

    'shell.activeCampaign': 'Active campaign',
    'shell.campaignTitle': 'Shadows over the Bay of Wrecks',
    'shell.guest': 'Guest access',
    'shell.version': 'Version',
    'shell.legal': 'Legal notice',
    'shell.privacy': 'Privacy',
    'shell.cookie': 'Cookies',
    'shell.contacts': 'Contact',
    'shell.pageTitle': 'Shadows over the Bay of Wrecks · Sun-Tzu Secrets',

    'dashboard.activeTerritories': 'Active territories',
    'dashboard.confirmedBattles': 'Confirmed battles',
    'dashboard.leadingFaction': 'Leading faction',
    'dashboard.pieLabel': 'How control is split between the three factions',
    'dashboard.balanced': 'The factions are balanced',
    'dashboard.points': 'pts',
    'dashboard.recentEyebrow': 'Latest clashes',
    'dashboard.recentTitle': 'Recent matches',

    'map.territories': 'Campaign territories',
    'map.selected': 'Territory selected on the map',
    'map.hint': 'Hover over a territory, or click it to keep it selected',
    'map.alt': 'Campaign map',
    'map.focus': 'Territory focus',
    'map.gamesPlayed': 'Games played',
    'map.dominantFaction': 'Dominant faction',
    'map.contested': 'Contested',
    'map.na': 'N/A',
    'map.localControl': 'Local control',
    'map.localPieLabel': 'How control is split in the selected territory',
    'map.wins': 'wins',
    'map.noGames': 'No confirmed games in this territory yet.',

    'territory.eyebrow': 'Territory details',
    'territory.artwork': 'Territory crest / artwork',
    'territory.confirmed': 'Confirmed matches',
    'territory.pending': 'Pending matches',
    'territory.dominantFaction': 'Dominant faction',
    'territory.factionControl': 'Faction control',
    'territory.breakdown': 'Territory breakdown',
    'territory.armyControl': 'Army control',
    'territory.topArmies': 'Most influential armies',
    'territory.recentHistory': 'Recent history',
    'territory.battles': 'Battles in this territory',

    'matches.none': 'No games played yet',
    'matches.battleFor': 'Battle for:',

    'outcome.draw': 'Draw',
    'outcome.minorWin': 'Minor Victory',
    'outcome.minorLoss': 'Minor Defeat',
    'outcome.majorWin': 'Major Victory',
    'outcome.majorLoss': 'Major Defeat',
    'outcome.massacre': 'Massacre',
    'outcome.totalLoss': 'Total Defeat',
    'outcome.win': 'Victory',
    'outcome.loss': 'Defeat',

    'resources.eyebrow': 'Resources',
    'resources.title': 'Downloads & references',
    'resources.manual': 'Campaign manual',
    'resources.manualDesc': 'Download the campaign manual (PDF, in Italian).',
    'resources.efiga': 'EFIGA',
    'resources.efigaUploaded': 'Download the EFIGA PDF uploaded to the portal.',
    'resources.efigaExternal': 'Download the EFIGA pack hosted by the Old World Federation.',
    'resources.gwFaq': 'GW FAQ',
    'resources.gwFaqDesc': 'Official Games Workshop page with the downloads and FAQs for Warhammer: The Old World.',
    'resources.federation': 'Federation website',
    'resources.federationDesc': 'Official portal of the Old World Federation.',

    'login.eyebrow': 'Log in',
    'login.title': 'Enter the portal',
    'login.user': 'Email or nickname',
    'login.password': 'Password',
    'login.loading': 'Logging in...',
    'login.submit': 'Log in',
    'login.forgot': 'Forgot your password?',
    'login.noAccount': "Don't have an account? Sign up",
    'login.error': 'Login failed',
    'auth.backToMap': '← Back to the map',

    'forgot.eyebrow': 'Account recovery',
    'forgot.title': 'Request a password reset',
    'forgot.email': 'Email',
    'forgot.submit': 'Send instructions',
    'forgot.back': 'Back to login',

    'register.eyebrow': 'Sign up',
    'register.title': 'Create a new commander',
    'register.nickname': 'Nickname',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.confirm': 'Confirm password',
    'register.loading': 'Signing up...',
    'register.submit': 'Sign up',
    'register.haveAccount': 'Already have an account? Log in',
    'register.errNickname': 'Your nickname must be at least 4 characters long.',
    'register.errEmail': 'Enter a valid email address.',
    'register.errPassword': 'Your password must be at least 8 characters long.',
    'register.errMatch': "The two passwords don't match.",
    'register.emailFailed': "Sign-up complete, but the server couldn't send the confirmation email.",
    'register.failed': 'Sign-up failed.',

    'profile.eyebrow': 'User profile',
    'profile.title': 'Account, avatar and preferences',
    'profile.hidden': 'Sensitive data is hidden in the interface.',
    'profile.preferredArmy': 'Preferred army',
    'profile.none': 'None',
    'profile.preferredFaction': 'Preferred faction',
    'profile.newPassword': 'New password',
    'profile.newPasswordPh': 'Update your password',
    'profile.confirmPassword': 'Confirm password',
    'profile.confirmPasswordPh': 'Confirm the new password',
    'profile.saving': 'Saving...',
    'profile.save': 'Save changes',
    'profile.saveFailed': 'Saving failed.',

    'results.eyebrow': 'My results',
    'results.title': 'Confirmed history and pending games',
    'results.toConfirm': 'To confirm',
    'results.toVerify': 'Games to check',
    'results.awaitingYours': '(Waiting for your confirmation)',
    'results.awaiting': 'Waiting for confirmation',
    'results.awaitingParen': '(Waiting for confirmation)',
    'results.enteredByYou': 'Games you entered',

    'submit.toConfirm': 'To confirm',
    'submit.suggestionHint': 'Pick one to pre-fill the form with the territory, opponent and mirrored scores.',
    'submit.territory': 'Territory',
    'submit.selectTerritory': 'Select an open territory',
    'submit.army': 'Army',
    'submit.selectArmy': 'Select an army',
    'submit.opponent': "Opponent's nickname",
    'submit.searchOpponent': "Search for your opponent's nickname",
    'submit.opponentSr': 'Opponent selection',
    'submit.selectOpponent': 'Select an opponent',
    'submit.myVp': 'My victory points',
    'submit.opponentVp': "Opponent's VP",
    'submit.notes': 'Notes',
    'submit.notesPh': 'Extra details, mission, scenario, anything to report...',
    'submit.sending': 'Sending...',
    'submit.send': 'Submit result',
    'submit.rulesEyebrow': 'Confirmation rules',
    'submit.rulesTitle': 'How a match gets confirmed',
    'submit.rule1': 'Both players must enter the same territory.',
    'submit.rule2': 'The scores must mirror each other.',
    'submit.rule3': "Mismatched results stay out of the statistics until they're resolved.",
    'submit.rule4': 'Results that match are paired automatically as soon as they are entered.',
    'submit.rule5': "The system suggests matches your opponent entered that you haven't confirmed yet.",
    'submit.errOpponents': "Couldn't load the list of opponents from the server.",
    'submit.errMissing': "Couldn't load: {list}.",
    'submit.part.territories': 'territories',
    'submit.part.armies': 'armies',
    'submit.part.opponents': 'opponents',
    'submit.noEnabled': 'No territories are currently open for new match results.',
    'submit.saveError': 'Error while saving the result.',

    'info.eyebrow': 'Information',
    'info.back': 'Back',
  },
};

export function t(key: string, params?: Record<string, string | number>): string {
  const template = messages[locale.value][key] ?? messages.it[key] ?? key;

  if (!params) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    params[name] !== undefined ? String(params[name]) : match,
  );
}

function applyDocumentLanguage(next: Locale) {
  document.documentElement.lang = next;
  document.title = messages[next]['shell.pageTitle'];
}

export function setLocale(next: Locale) {
  locale.value = next;

  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // storage unavailable: the choice lasts for this visit only
  }

  applyDocumentLanguage(next);
}

applyDocumentLanguage(locale.value);
