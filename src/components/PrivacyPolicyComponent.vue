<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-xl-6 col-lg-8 col-md-10 col-xs-12">
        <q-card bordered class="shadow">
          <q-card-section class="q-pa-lg">
            <h1 class="text-h4 text-primary text-center q-mb-lg">
              Integritetspolicy
            </h1>

            <section class="q-mb-lg">
              <h2 class="text-h6 text-accent q-mb-sm">
                Om denna integritetspolicy
              </h2>
              <p class="text-body1">
                Denna policy beskriver hur RUTPUTS samlar in och hanterar
                information när du besöker vår webbplats. Vi värnar om din
                integritet och följer GDPR (Dataskyddsförordningen).
              </p>
            </section>

            <q-separator class="q-my-md" />

            <section class="q-mb-lg">
              <h2 class="text-h6 text-accent q-mb-sm">
                Vilken information samlar vi in?
              </h2>
              <p class="text-body1 q-mb-sm">
                Om du accepterar cookies använder vi Vercel Analytics som samlar
                in följande anonyma data:
              </p>
              <ul class="text-body1">
                <li>Vilka sidor du besöker på webbplatsen</li>
                <li>Hur länge du stannar på varje sida</li>
                <li>Varifrån du kom till webbplatsen (t.ex. sökmotorer)</li>
                <li>
                  Teknisk information om din enhet (webbläsare, operativsystem,
                  skärmstorlek)
                </li>
                <li>Ditt ungefärliga geografiska område (land/region)</li>
              </ul>
              <p class="text-body1 q-mt-sm">
                <strong>Viktigt:</strong> Vi samlar inte in namn, e-postadresser
                eller annan personlig kontaktinformation via analytics. Vi
                använder inga reklamcookies.
              </p>
            </section>

            <q-separator class="q-my-md" />

            <section class="q-mb-lg">
              <h2 class="text-h6 text-accent q-mb-sm">
                Varför samlar vi in denna information?
              </h2>
              <p class="text-body1">
                Vi använder den insamlade informationen för att:
              </p>
              <ul class="text-body1">
                <li>Förstå hur besökare använder vår webbplats</li>
                <li>Förbättra webbplatsens innehåll och navigation</li>
                <li>Identifiera tekniska problem</li>
              </ul>
            </section>

            <q-separator class="q-my-md" />

            <section class="q-mb-lg">
              <h2 class="text-h6 text-accent q-mb-sm">Hur länge sparas data?</h2>
              <p class="text-body1">
                Vercel Analytics behåller aggregerad analysdata i upp till 12
                månader. Ingen personidentifierbar information lagras.
              </p>
            </section>

            <q-separator class="q-my-md" />

            <section class="q-mb-lg">
              <h2 class="text-h6 text-accent q-mb-sm">
                Delas data med tredje part?
              </h2>
              <p class="text-body1">
                Nej. Analysdata delas inte med externa parter i marknadsförings-
                eller reklamsyfte. Vercel (vår värdtjänst) behandlar data i
                enlighet med sin integritetspolicy, men din data säljs inte
                vidare.
              </p>
            </section>

            <q-separator class="q-my-md" />

            <section class="q-mb-lg">
              <h2 class="text-h6 text-accent q-mb-sm">Dina rättigheter</h2>
              <p class="text-body1">Enligt GDPR har du rätt att:</p>
              <ul class="text-body1">
                <li>
                  <strong>Neka spårning:</strong> Du kan välja att avvisa
                  cookies när bannern visas
                </li>
                <li>
                  <strong>Ändra ditt val:</strong> Du kan när som helst ändra
                  dina cookieinställningar via länken i sidfoten
                </li>
                <li>
                  <strong>Begära information:</strong> Du kan kontakta oss för
                  att få information om vilken data som har samlats in
                </li>
                <li>
                  <strong>Begära radering:</strong> Du kan begära att din data
                  raderas
                </li>
              </ul>
            </section>

            <q-separator class="q-my-md" />

            <section class="q-mb-lg">
              <h2 class="text-h6 text-accent q-mb-sm">Kontakt</h2>
              <p class="text-body1">
                Har du frågor om hur vi hanterar din data? Kontakta oss:
              </p>
              <ul class="text-body1">
                <li>E-post: kontakt (at) rutputs.nu</li>
                <li>Telefon: 0734-64 46 04</li>
              </ul>
            </section>

            <q-separator class="q-my-md" />

            <section class="q-mb-lg">
              <h2 class="text-h6 text-accent q-mb-sm">Cookieinställningar</h2>
              <p class="text-body1 q-mb-md">
                Nuvarande status:
                <q-badge
                  :color="statusColor"
                  :label="statusLabel"
                  class="q-ml-sm"
                />
              </p>
              <q-btn
                unelevated
                :label="changeConsentLabel"
                color="primary"
                @click="handleConsentChange"
                aria-label="Ändra cookieinställningar"
              />
            </section>

            <p class="text-caption text-grey-7 text-center q-mt-lg">
              Senast uppdaterad: November 2025
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useConsent } from 'src/composables/useConsent';

export default defineComponent({
  name: 'PrivacyPolicyComponent',
  setup() {
    const { consentStatus, acceptConsent, rejectConsent, resetConsent } =
      useConsent();

    const statusColor = computed(() => {
      switch (consentStatus.value) {
        case 'accepted':
          return 'positive';
        case 'rejected':
          return 'negative';
        default:
          return 'grey';
      }
    });

    const statusLabel = computed(() => {
      switch (consentStatus.value) {
        case 'accepted':
          return 'Accepterat';
        case 'rejected':
          return 'Avvisat';
        default:
          return 'Inget val gjort';
      }
    });

    const changeConsentLabel = computed(() => {
      if (consentStatus.value === 'pending') {
        return 'Öppna cookieinställningar';
      }
      return 'Ändra mitt val';
    });

    const handleConsentChange = () => {
      if (consentStatus.value === 'accepted') {
        rejectConsent();
      } else if (consentStatus.value === 'rejected') {
        acceptConsent();
      } else {
        // If pending, show the banner by resetting (it will trigger the banner to show)
        resetConsent();
        // Force page reload to show the banner again
        window.location.reload();
      }
    };

    return {
      consentStatus,
      statusColor,
      statusLabel,
      changeConsentLabel,
      handleConsentChange,
    };
  },
});
</script>

<style scoped>
ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}
</style>
