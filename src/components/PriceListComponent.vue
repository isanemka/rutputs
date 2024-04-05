<template>
  <q-row class="bg-primary text-center q-pa-md">
    <h1 class="text-h2 text-accent text-uppercase">Prislista</h1>
    <p class="landing-body text-body1 text-accent q-pa-md">
      Räkna snabbt ihop vad det kostar att få rena fönster
    </p>
    <div class="q-flex justify-center">
      <q-table
        v-model:pagination="pagination"
        :rows="articles"
        :columns="columns"
        row-key="id"
        class="text-accent q-mx-lg q-table--dense"
        hide-bottom
      >
        <template v-slot:body-cell-description="props">
          <q-td
            :props="props"
            style="white-space: normal;"
          >
            {{ props.row.description }}
          </q-td>
        </template>
        <template v-slot:body-cell-price="props">
          <q-td :props="props">{{ props.row.price }}</q-td>
        </template>
        <template v-slot:body-cell-quantity="props">
          <q-td :props="props">
            <q-input
              v-model="props.row.quantity"
              dense
              no-stepper
              style="width: 30px;" type="number" min="0"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-addToCart="props">
          <q-td :props="props">
            <q-btn color="primary" @click="addToCart(props.row)">Lägg till i kundkorg</q-btn>
          </q-td>
        </template>
    </q-table>
    </div>
  </q-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase'

export default defineComponent({
  name: 'PriceListComponent',
  data() {
    return {
      articles: [] as any[],
      cart: [] as any[],
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
          align: 'right',
          field: 'price'
        },
        {
          name: 'quantity',
          required: true,
          label: 'Antal',
          align: 'left',
          field: 'quantity'
        }
      ]
    };
  },
  setup() {
    return {
      pagination: ref ({
        rowsPerPage: 50
      })
    }
  },
  methods: {
    addToCart(article: any) {
      const cartItem = this.cart.find((item: any) => item.id === article.id);
      if (cartItem) {
        cartItem.quantity += article.quantity;
      } else {
        this.cart.push({ ...article });
      }
        useQuasar().notify({
        message: 'Artikeln har lagts till i kundkorgen',
        color: 'positive',
        position: 'top'
      });
    }
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

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.landing-body {
  line-height: 2rem;
}
</style>
