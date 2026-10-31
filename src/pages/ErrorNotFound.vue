<template>
  <q-page class="page-shell">
    <div class="page-stack">
      <section class="editorial-panel editorial-panel--solid not-found">
        <span class="section-kicker">404</span>
        <h1 class="section-title">Sidan kunde inte hittas</h1>
        <p class="section-text">
          Adressen du försökte nå finns inte, eller så har sidan flyttats. Här är några bra ställen att fortsätta på.
        </p>
        <div class="hero-actions">
          <q-btn unelevated color="accent" text-color="black" label="Till startsidan" to="/" />
          <q-btn outline color="primary" label="Se pris och begär offert" to="/pris" />
          <q-btn outline color="primary" label="Läs våra guider" to="/guide" />
        </div>
      </section>

      <section class="editorial-panel">
        <span class="section-kicker">Områden</span>
        <h2 class="section-title">Fönsterputs där du bor</h2>
        <div class="not-found__areas">
          <router-link
            v-for="area in areas"
            :key="area.slug"
            :to="'/omrade/' + area.slug"
            class="text-accent text-weight-bold"
          >
            {{ area.name }}
          </router-link>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, useSSRContext } from 'vue';
import { areas } from 'src/data/areas';

export default defineComponent({
  name: 'ErrorNotFound',
  setup() {
    // During server rendering (build-time prerender) answer with HTTP 404, so
    // the prerender script can check it and an SSR server would be correct too.
    if (process.env.SERVER) {
      const ssrContext = useSSRContext();
      ssrContext?.res?.status(404);
    }

    return { areas };
  },
});
</script>

<style scoped>
.not-found__areas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1rem;
  margin-top: 1rem;
}
</style>
