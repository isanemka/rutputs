<template>
  <div class="row q-flex q-pb-md justify-center items-center text-center">
    <div class="col-lg-6 col-md-8 col-xs-10">
      <h2 class="text-h2 text-bold text-primary text-uppercase">Hoppla!</h2>

      <!-- Card section -->
      <q-card>
        <q-card-section
          class="custom-line-height text-body1 text-primary text-justify q-pa-xl"
          :style="textStyle"
        >
        <div class="text-h6 text-center text-accent">Något gick fel med din offertförfrågan!</div>
        <hr class="q-my-md">
        Testa gärna att fylla i formuläret igen.
        Annars är du välkommen att kontakta mig direkt via telefon eller e-post.
        Kontaktuppgifterna finns längst ner på sidan.
        </q-card-section>
        <q-card-section>
          <q-btn
            @click="goToLanding" label="Tillbaka till startsidan"
            class="q-pa-md q-mb-md text-black"
            color="accent"
          />
        </q-card-section>

      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormFailComponent',
  props: {
    title: {
      type: String,
      required: true
    },
  },
  methods: {
    // Method to navigate back to landing page
    goToLanding() {
      this.$router.push('/landing');
    }
  },
  computed: {
    // Computed property to dynamically adjust text style based on screen size
    textStyle() {
      if (this.$q.screen.lt.sm) {
        return {
          'font-size': '1rem',
          'line-height': '1.6',
          'padding': '1rem'
        };
      } else {
        return {
          'font-size': '1.2rem'
        };
      }
    }
  }
});
</script>
