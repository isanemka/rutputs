<template>
  <div class="fullscreen bg-primary text-accent text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2 text-secondary" style="opacity:.4">
        Hoppla hoppla. Något har gått fel...
      </div>

      <q-btn
        class="q-mt-xl"
        color="accent"
        text-color="black"
        unelevated
        to="/landing"
        label="Börja om"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNotFound'
});
</script>
