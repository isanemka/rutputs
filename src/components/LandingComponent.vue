<template>
  <div class="bg-primary text-center q-pa-md">
    <img
      class="fit q-px-xl"
      style="max-width: 900px"
      src="/icons/main_logo.png"
      alt="Company logo"
    />
    <h1 class="text-h2 text-accent text-uppercase">
      Din rutputsare i Katrineholm & Norrköping
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
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Todo, Meta } from './models';

export default defineComponent({
  name: 'ExampleComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    todos: {
      type: Array as PropType<Todo[]>,
      default: () => [] as Todo[]
    },
    meta: {
      type: Object as PropType<Meta>,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  data(): { clickCount: number } {
    return {
      clickCount: 0
    };
  },
  methods: {
    increment(): void {
      this.clickCount += 1;
    }
  },
  computed: {
    todoCount(): number {
      return this.todos.length;
    }
  }
});
</script>

<style>
.landing-body {
  line-height: 2rem;
}
</style>
