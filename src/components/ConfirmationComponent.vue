<template>
  <q-page class="page-shell status-page">
    <div class="page-stack">
      <section class="editorial-panel editorial-panel--solid status-page__panel">
        <span class="section-kicker">Offertförfrågan skickad</span>
        <h1 class="section-title text-center">Tack!</h1>
        <p class="section-text text-center q-mx-auto status-page__lead">
          Vad roligt att du skickat in formuläret. Nu är du ett steg närmare att få dina fönster skinande rena.
        </p>
        <p class="section-text text-center q-mx-auto status-page__lead">
          Vi tittar på din offertförfrågan och återkommer inom ett par dagar. Har du frågor innan dess finns kontaktuppgifterna längst ner på sidan.
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
  name: 'ConfirmationComponent',
  meta: {
    title: 'Bekräftelse – Rutputs',
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
