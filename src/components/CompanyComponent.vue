<template>
  <q-page>
    <div class="row q-flex q-pa-md bg-dark justify-center items-center text-center">
      <div class="col-lg-6 col-md-8 col-xs-12">
        <h1 class="text-h2 text-accent text-uppercase">Rutputs på era villkor</h1>
        <p class="landing-body text-body1 text-accent q-pa-xl">
          Åt mina företagskunder utför jag alla typer av fönsterputsningar, helt
          enligt företagets önskemål.
          Med rena fönster på ditt företag så visar du att du tar både miljö och
          arbetsmiljö på allvar för dina kunder och medarbetare.
          Kanske vill ni ha rena skyltfönster, entréer, kontor, trapphus eller något annat?
          Vi kan tillsammans skapa ett abonnemang skräddarsytt till just era behov
          eller så kommer jag och putsar en gång, det är RUTPUTS på era villkor.
        </p>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CompanyComponent',
  props: {}
});
</script>

<style>
.landing-body {
  line-height: 2rem;
}
</style>
