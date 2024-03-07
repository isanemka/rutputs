<template>
  <div class="bg-primary text-center q-pa-md">
    <h1 class="text-h2 text-accent text-uppercase">
      Din rutputsare i Avesta med omnejd
    </h1>
    <p class="landing-body text-body1 text-accent q-pa-xl">
      Tack vare RUT-avdraget så kan Du få Dina rutor putsade för så lite som 350
      kronor! Använd prislistan för att räkna ut Ditt pris! Många väljer att
      endast få utsidan putsad och då lite oftare så ser man alltid bättre ut.
      Fördelen är att man då inte ens behöver vara hemma vid själva putsningen.
      Fråga efter putsabonnemang. Jag fakturerar genom Cool Company och tar
      därför ut en liten avgift på 25 kr per faktura men i övrigt så finns det
      inga dolda avgifter.
    </p>
    <q-btn
      class="q-pa-md text-black"
      label="Se vad det kostar"
      color="accent"
      @click="goToPriceList"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'LandingComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  methods: {
    goToPriceList() {
      this.$router.push('/priceList');
    }
  }
});
</script>

<style>
.landing-body {
  line-height: 2rem;
}
</style>
