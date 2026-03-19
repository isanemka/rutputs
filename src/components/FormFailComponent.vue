<template>
  <q-page class="page-shell status-page">
    <div class="page-stack">
      <section class="editorial-panel editorial-panel--solid status-page__panel">
        <span class="section-kicker">Skicka igen</span>
        <h1 class="section-title text-center">Hoppla!</h1>
        <p class="section-text text-center q-mx-auto status-page__lead">
          Något gick fel med din offertförfrågan. Testa gärna att fylla i formuläret igen.
        </p>
        <p class="section-text text-center q-mx-auto status-page__lead">
          Om det fortfarande strular går det bra att kontakta mig direkt via telefon eller e-post. Kontaktuppgifterna finns längst ner på sidan.
        </p>
        <q-btn
          @click="goToLanding"
          label="Tillbaka till startsidan"
          class="status-page__button text-black"
          color="accent"
          unelevated
        />
      </section>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormFailComponent',
  meta: {
    title: 'Något gick fel – Rutputs',
    meta: {
      robots: {
        name: 'robots',
        content: 'noindex, nofollow'
      }
    }
  },
  methods: {
    goToLanding() {
      this.$router.push('/');
    }
  }
});
</script>

<style scoped>
.status-page__panel {
  justify-items: center;
  text-align: center;
  padding-block: clamp(1.5rem, 5vw, 2.5rem);
}

.status-page__lead {
  max-width: 40rem;
}

.status-page__button {
  margin-top: 0.5rem;
}

@media (max-width: 599px) {
  .status-page__button {
    width: 100%;
  }
}
</style>
