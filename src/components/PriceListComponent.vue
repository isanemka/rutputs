<template>
  <div class="bg-primary text-center q-pa-md">
    <img
      class="fit q-px-xl"
      style="max-width: 900px"
      src="/icons/main_logo.png"
      alt="Company logo"
    />
    <h1 class="text-h2 text-accent text-uppercase">Prislista</h1>
    <p class="landing-body text-body1 text-accent q-pa-xl">
      för smarta företagare
    </p>
    <q-btn
      class="q-pa-md text-black"
      label="Se vad det kostar"
      color="accent"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'PriceListComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  }
});
</script>

<style>
.landing-body {
  line-height: 2rem;
}
</style>
