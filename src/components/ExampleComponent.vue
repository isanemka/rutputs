<template>
  <div class="bg-primary text-center q-pa-md">
    <img
      class="fit q-px-xl"
      style="max-width: 900px"
      src="/icons/main_logo.png"
      alt="Company logo"
    />
    <h1 class="text-accent">{{ title }}</h1>
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
