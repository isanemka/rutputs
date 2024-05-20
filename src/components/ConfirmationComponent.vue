<template>
  <div class="row q-flex q-pb-md justify-center items-center text-center">
    <div class="col-lg-6 col-md-8 col-xs-10">
      <h2 class="text-h2 text-bold text-primary text-uppercase">Tack!</h2>
      <q-card>
        <q-card-section
          class="custom-line-height text-body1 text-primary q-pa-xl"
          :style="textStyle"
        >
        Vad roligt att du skickat in formuläret!
        <br>
        Nu är du ett steg närmare att få dina fönster skinande rena.
        Jag kommer att titta på din offertförfrågan och återkomma till dig inom ett par dagar och
        om har du några frågor, tveka inte att kontakta mig.
        Kontaktuppgifterna finns längst ner på sidan
        </q-card-section>
        <q-card-section>
          <q-btn
            @click="goToLanding" label="Tillbaka till startsidan"
            class="q-pa-md q-mb-md"
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
  name: 'ConfirmationComponent',
  props: {
    title: {
      type: String,
      required: true
    },
  },
  methods: {
    goToLanding() {
      this.$router.push('/landing');
    }
  },
  computed: {
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
