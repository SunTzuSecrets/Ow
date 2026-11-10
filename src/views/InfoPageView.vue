<template>
  <div class="page-stack">
    <SectionHeader
      :eyebrow="t('info.eyebrow')"
      :title="pageTitle"
      :description="pageIntro"
    />

    <section class="panel-card info-page-card">
      <div class="info-page-copy">
        <section v-for="section in pageSections" :key="section.title">
          <h3>{{ section.title }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph" class="muted-copy">
            {{ paragraph }}
          </p>
        </section>
      </div>

      <button class="secondary-button info-page-back" type="button" @click="handleBack">
        {{ t('info.back') }}
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SectionHeader from '@/components/SectionHeader.vue';
import { locale, t } from '@/i18n';

const route = useRoute();
const router = useRouter();

const pagesIt = {
  legal: {
    title: 'Note legali',
    intro: 'Informazioni sintetiche su titolarita, utilizzo del portale e limiti dei contenuti pubblicati.',
    sections: [
      {
        title: 'Titolare del portale',
        paragraphs: [
          'Sun-Tzu Secrets Play Portal e una piattaforma informativa e operativa dedicata alla gestione della campagna e delle attivita collegate alla community di gioco.',
          'I riferimenti ufficiali del titolare e dei responsabili del progetto verranno pubblicati in questa sezione insieme ai dati identificativi completi.',
        ],
      },
      {
        title: 'Utilizzo dei contenuti',
        paragraphs: [
          'Testi, elementi grafici, materiali organizzativi e contenuti pubblicati nel portale sono destinati alla consultazione da parte degli utenti registrati e dei visitatori autorizzati.',
          'E vietato riutilizzare, copiare o distribuire i contenuti del portale per finalita non autorizzate senza consenso espresso del progetto o dei rispettivi titolari.',
        ],
      },
      {
        title: 'Limitazione di responsabilita',
        paragraphs: [
          'Le informazioni presenti nel portale sono fornite nello stato in cui si trovano e possono essere aggiornate, corrette o rimosse senza preavviso.',
          'Il team del progetto si impegna a mantenere i dati il piu possibile accurati, ma non garantisce l assenza di errori materiali, omissioni o interruzioni del servizio.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy',
    intro: 'Panoramica provvisoria sul trattamento dei dati personali degli utenti del portale.',
    sections: [
      {
        title: 'Dati raccolti',
        paragraphs: [
          'Durante l utilizzo del portale possono essere raccolti dati identificativi e operativi come nickname, email di accesso, preferenze profilo e informazioni inserite nelle funzionalita della campagna.',
          'I dati vengono trattati nella misura necessaria per consentire autenticazione, navigazione, gestione risultati e amministrazione tecnica della piattaforma.',
        ],
      },
      {
        title: 'Finalita del trattamento',
        paragraphs: [
          'I dati personali sono utilizzati per fornire accesso ai servizi del portale, garantire sicurezza applicativa, organizzare le attivita della campagna e offrire supporto agli utenti.',
          'Eventuali finalita ulteriori, basi giuridiche dettagliate e tempi di conservazione saranno descritti nella versione definitiva dell informativa privacy.',
        ],
      },
      {
        title: 'Diritti dell utente',
        paragraphs: [
          'Gli utenti potranno richiedere aggiornamento, rettifica o cancellazione dei dati secondo quanto previsto dalla normativa applicabile.',
          'I recapiti ufficiali per l esercizio dei diritti privacy verranno pubblicati qui non appena definiti in modo permanente.',
        ],
      },
    ],
  },
  cookie: {
    title: 'Cookie',
    intro: 'Pagina informativa dedicata ai cookie tecnici e agli eventuali strumenti di tracciamento.',
    sections: [
      {
        title: 'Cookie tecnici',
        paragraphs: [
          'Il portale puo utilizzare cookie tecnici o strumenti equivalenti necessari al funzionamento di autenticazione, sessione utente e preferenze essenziali di navigazione.',
          'Questi strumenti sono impiegati per garantire il corretto utilizzo dell applicazione e non richiedono necessariamente interventi manuali dell utente per ogni accesso.',
        ],
      },
      {
        title: 'Strumenti opzionali',
        paragraphs: [
          'Eventuali strumenti statistici, integrazioni esterne o funzionalita aggiuntive che comportino tracciamento verranno indicati in modo esplicito in questa pagina.',
          'Quando presenti, saranno accompagnati da informazioni chiare sulla finalita, sulla durata e sulle modalita di gestione del consenso.',
        ],
      },
      {
        title: 'Gestione preferenze',
        paragraphs: [
          'L utente puo in ogni momento gestire le proprie preferenze relative ai cookie tramite le impostazioni del browser o mediante gli strumenti che verranno resi disponibili dal portale.',
          'La documentazione definitiva con l elenco completo dei cookie sara pubblicata in questa sezione.',
        ],
      },
    ],
  },
  contacts: {
    title: 'Contatti',
    intro: 'Riferimenti provvisori per richieste informative, assistenza e comunicazioni ufficiali.',
    sections: [
      {
        title: 'Supporto generale',
        paragraphs: [
          'Questa pagina raccogliera i riferimenti ufficiali per assistenza tecnica, richieste informative e comunicazioni organizzative relative al portale.',
          'Fino alla pubblicazione dei recapiti definitivi, i contatti sono da considerarsi in fase di aggiornamento.',
        ],
      },
      {
        title: 'Richieste amministrative',
        paragraphs: [
          'Le richieste relative a gestione account, correzione dati e supporto operativo avranno un canale dedicato che verra indicato qui.',
          'La sezione verra aggiornata con email, eventuali moduli di contatto e tempi medi di risposta.',
        ],
      },
      {
        title: 'Recapiti in aggiornamento',
        paragraphs: [
          'Contatto principale: informazioni in corso di definizione.',
          'Canali ufficiali del progetto: pubblicazione prevista in una delle prossime revisioni del portale.',
        ],
      },
    ],
  },
} as const;

const pagesEn = {
  legal: {
    title: 'Legal notice',
    intro: 'A short summary of who runs the portal, how it may be used and the limits of the content published here.',
    sections: [
      {
        title: 'Portal owner',
        paragraphs: [
          'Sun-Tzu Secrets Play Portal is an information and management platform for running the campaign and the activities of the gaming community.',
          'The official details of the owner and of the people responsible for the project will be published in this section, together with their full identifying information.',
        ],
      },
      {
        title: 'Use of content',
        paragraphs: [
          'Texts, graphics, organisational material and other content published on the portal are intended for registered users and authorised visitors.',
          'Reusing, copying or distributing the portal content for unauthorised purposes without the express consent of the project or of the respective owners is not allowed.',
        ],
      },
      {
        title: 'Limitation of liability',
        paragraphs: [
          'The information on the portal is provided as is and may be updated, corrected or removed without notice.',
          'The project team works to keep the data as accurate as possible, but cannot guarantee that it is free of errors or omissions, or that the service will never be interrupted.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy',
    intro: 'A provisional overview of how the personal data of portal users is processed.',
    sections: [
      {
        title: 'Data collected',
        paragraphs: [
          'While you use the portal we may collect identifying and operational data such as your nickname, login email, profile preferences and the information you enter in the campaign features.',
          'This data is processed only as far as needed for login, navigation, results management and the technical administration of the platform.',
        ],
      },
      {
        title: 'Purposes of processing',
        paragraphs: [
          'Personal data is used to give you access to the portal services, keep the application secure, organise the campaign activities and support users.',
          'Any further purposes, the detailed legal bases and retention periods will be described in the final version of the privacy notice.',
        ],
      },
      {
        title: 'Your rights',
        paragraphs: [
          'Users can ask for their data to be updated, corrected or deleted, as provided by the applicable law.',
          'The official contact details for exercising your privacy rights will be published here as soon as they are finalised.',
        ],
      },
    ],
  },
  cookie: {
    title: 'Cookies',
    intro: 'Information about technical cookies and any tracking tools.',
    sections: [
      {
        title: 'Technical cookies',
        paragraphs: [
          'The portal may use technical cookies or similar tools needed for login, the user session and essential browsing preferences.',
          'These tools make the application work properly and do not necessarily require any action from you each time you visit.',
        ],
      },
      {
        title: 'Optional tools',
        paragraphs: [
          'Any analytics tools, external integrations or extra features that involve tracking will be listed explicitly on this page.',
          'Where present, they will come with clear information on their purpose, how long they last and how to manage your consent.',
        ],
      },
      {
        title: 'Managing your preferences',
        paragraphs: [
          'You can manage your cookie preferences at any time through your browser settings or through the tools the portal will make available.',
          'The final documentation, with the complete list of cookies, will be published in this section.',
        ],
      },
    ],
  },
  contacts: {
    title: 'Contact',
    intro: 'Provisional contact details for information requests, support and official communications.',
    sections: [
      {
        title: 'General support',
        paragraphs: [
          'This page will list the official contacts for technical support, information requests and organisational communications about the portal.',
          'Until the final contact details are published, this information is being updated.',
        ],
      },
      {
        title: 'Account requests',
        paragraphs: [
          'Requests about account management, data corrections and operational support will have a dedicated channel, which will be listed here.',
          'This section will be updated with an email address, any contact forms and typical response times.',
        ],
      },
      {
        title: 'Contact details being updated',
        paragraphs: [
          'Main contact: being defined.',
          'Official project channels: due in one of the next portal updates.',
        ],
      },
    ],
  },
} as const;

const pageKey = computed(() => String(route.name ?? '').replace('info-', '') as keyof typeof pagesIt);
const page = computed(() => {
  const pages = locale.value === 'en' ? pagesEn : pagesIt;
  return pages[pageKey.value] ?? pages.legal;
});
const pageTitle = computed(() => page.value.title);
const pageIntro = computed(() => page.value.intro);
const pageSections = computed(() => page.value.sections);

const handleBack = async () => {
  if (window.history.length > 1) {
    router.back();
    return;
  }

  await router.push({ name: 'dashboard' });
};
</script>
