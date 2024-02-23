<template>
  <div class="bg-primary text-center q-pa-md">
    <img
      class="fit q-px-xl"
      style="max-width: 900px"
      src="/icons/main_logo.png"
      alt="Company logo"
    />
    <h1 class="text-h2 text-accent text-uppercase">Prislista</h1>
    <p class="landing-body text-body1 text-accent q-pa-md">
      Räkna snabbt ihop vad det kostar att få rena fönster
    </p>
    <q-table
      :rows="articles"
      row-key="id"
      :columns="columns"
      class="text-accent"
    >
      <template v-slot:body-cell-description="props">
        <q-td :props="props">{{ props.row.description }}</q-td>
      </template>
      <template v-slot:body-cell-price="props">
        <q-td :props="props">{{ props.row.price }}</q-td>
      </template>
      <template v-slot:body-cell-quantity="props">
        <q-td :props="props">
          <q-input v-model="props.row.quantity" type="number" min="1" dense />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase'

export default defineComponent({
  name: 'PriceListComponent',
  data() {
    return {
      articles: [] as any[],
      columns: [
        {
          name: 'description',
          required: true,
          label: 'Beskrivning',
          align: 'left',
          field: 'description'
        },
        {
          name: 'price',
          required: true,
          label: 'Pris',
          align: 'left',
          field: 'price'
        },
        {
          name: 'quantity',
          required: true,
          label: 'Antal',
          align: 'left',
          field: 'quantity' }
      ]
    };
  },
  async mounted() {
    const db = getFirestore(app);
    const articlesCollection = collection(db, 'articles');
    const querySnapshot = await getDocs(articlesCollection);
    querySnapshot.forEach((doc) => {
      this.articles.push({ id: doc.id, ...doc.data() });
    });
  },
});
</script>

<style>
.landing-body {
  line-height: 2rem;
}
</style>
