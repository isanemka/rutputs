<template>
    <q-page>
      <div class="row q-flex justify-center mb-2">
        <div class="col-12 col-md-8">
          <q-stepper
            v-model="step"
            dark
            vertical
            animated
            contracted
            color="primary"
            done-color="positive"
            active-color="accent"
            inactive-color="light-gray"
            class="text-light justify-center"
          >
              <q-step
              :name="1"
              title="Villa eller lägenhet?"
              icon="house"
              :done="step > 1"
              >
              Välj om du bor i villa eller lägenhet.
              <q-radio keep-color v-model="form.propertyType" val="house" label="Villa" color="accent" />
              <q-radio keep-color v-model="form.propertyType" val="apartment" label="Lägenhet" color="accent" />
              <q-stepper-navigation>
                <q-btn @click="validatePropertyType" color="accent" label="Fortsätt" />
              </q-stepper-navigation>
            </q-step>
            <q-step
              :name="2"
              title="Välj tjänster"
              icon="window"
              :done="step > 2"
            >
              <div class="row justify-center bg-dark q-pa-md">
                <div class="col-12">
                  <h1 class="text-body1 text-accent text-center q-pa-md">
                    Räkna snabbt ihop vad det kostar att få rena fönster
                  </h1>
                </div>
                <div class="col-12 col-md-10 q-flex justify-center">
                  <q-table
                    v-model:pagination="pagination"
                    :rows="articles"
                    :columns="columns"
                    row-key="id"
                    class="text-accent q-mx-lg bg-secondary "
                    hide-bottom
                    dense
                  >
                    <template v-slot:body-cell-id="">
                      <q-td style="display: none;"></q-td>
                    </template>
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
                          outlined
                          type="number"
                          min="0"
                          @input="handleQuantityInput(props.row)"
                          style="width: 70px;"
                          class="text-accent text-right"
                        />
                      </q-td>
                    </template>
                    <template v-slot:body-cell-addToCart="props">
                      <q-td :props="props"></q-td>
                    </template>
                </q-table>
                </div>
              </div>
              <q-stepper-navigation>
                <q-btn @click="addToCart(); step = 3" color="accent" label="Fortsätt"  class="q-ml-sm"/>
                <q-btn @click="step = 1" color="secondary" label="Tillbaka" class="q-ml-sm" />
                <q-btn @click="emptyCart" color="light-gray" label="Rensa" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-step>
            <q-step
              :name="3"
              title="Se ditt pris"
              icon="shopping_cart"
              :done="step > 4"
            >
              <div v-if="cart.length > 0">
                <h3>Dina val:</h3>
                <ol>
                  <li v-for="item in cart" :key="item.id">
                    {{ item.description }} - {{ item.quantity }} st
                  </li>
                </ol>
                <h4>Totalpris: {{ form.totalPrice }} kr*</h4>
                <p>*inklusive moms och efter RUT-avdrag</p>
              </div>
              <div v-else>
                <p>Du har inte valt några tjänster än.</p>
              </div>
              <q-stepper-navigation>
                <q-btn @click="step = 4" :disable="cart.length === 0" color="accent" label="Fortsätt" />
                <q-btn @click="step = 2" color="secondary" label="Tillbaka" class="q-ml-sm" />
              </q-stepper-navigation>
            </q-step>
            <q-step
              :name="4"
              title="Fyll i dina uppgifter"
              icon="person"
            >
              <div class="q-pa-md flex items-center justify-center">
                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  dark
                  class="q-gutter-md text-accent bg-secondary q-pa-md"
                >
                  <q-input
                    v-model="form.name"
                    filled
                    label="Ditt namn *"
                    lazy-rules
                    :rules="[ val => val && val.length > 2 || 'Vänligen fyll i ditt namn']"
                  />
                  <q-input
                    v-model="form.tel"
                    filled
                    type="tel"
                    label="Telefonnummer *"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || 'Vänligen fyll i ditt telefonnummer',
                      val => val && val.length > 5 || 'Telefonnumret måste vara minst 6 siffror',
                      val => /^[\d+]*$/.test(val) || 'Vänligen fyll i ett korrekt telefonnummer']"
                  />
                  <q-input
                    v-model="form.address"
                    filled
                    type="text"
                    hint="Adress"
                    label="Adress"
                  />
                  <q-input
                    v-model="form.email"
                    filled
                    type="email"
                    label="E-post *"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || 'Vänligen fyll i din e-postadress',
                      val => /.+@.+\..+/.test(val) || 'Ogiltig e-postadress']"
                  />
                  <q-toggle
                    v-model="form.termsAccepted"
                    @click="openTermsDialog()"
                    checked-icon="check"
                    color="green"
                    unchecked-icon="clear"
                    label="Jag accepterar villkoren"
                  />
                  <q-dialog v-model="showTermsDialog">
                    <q-card>
                      <q-card-section>
                        <h4 class="text-center">Personuppgifter</h4>
                        <p>
                          När du fyller i vårt kontaktformulär på denna webbplats samlar vi
                          in dina personuppgifter, inklusive namn, adress, telefonnummer och
                          e-postadress. Dessa uppgifter används endast för att kontakta dig
                          angående dina förfrågningar eller för att tillhandahålla tjänster som du begär.
                          <br>
                          Vi behandlar dina personuppgifter med största respekt för din integritet och
                          följer de lagar och regler som gäller för dataskydd, inklusive EU:s
                          allmänna dataskyddsförordning (GDPR).
                        </p>
                      </q-card-section>
                      <q-card-actions align="right">
                        <q-btn label="Ok" color="positive" @click="acceptTerms" />
                        <q-btn label="Neka" color="negative" @click="declineTerms" />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                  <q-stepper-navigation>
                    <q-btn type="submit" :disable="!form.termsAccepted" color="accent" label="Skicka offertförfrågan" class="q-ml-sm" />
                    <q-btn type="reset" label="Rensa formulär" color="negative" class="q-ml-sm" />
                    <q-btn @click="step = 3" color="primary" label="Tillbaka" class="q-ml-sm" />
                  </q-stepper-navigation>
                </q-form>
              </div>
            </q-step>
          </q-stepper>
        </div>
      </div>

    </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar, Notify } from 'quasar';
import axios from 'axios';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase'

export default defineComponent({
  name: 'PriceListComponent',
  data() {
    return {
      showTermsDialog: false,
      form: {
        propertyType: '',
        name: '',
        tel: '',
        address: '',
        email: '',
        termsAccepted: false,
        totalPrice: 0
      },
      articles: [] as any[],
      cart: [] as any[],
      columns: [
        {
          name: 'id',
          required: true,
          label: '',
          align: 'left',
          field: 'id',
          visible: false
        },
        {
          name: 'description',
          required: true,
          label: '',
          align: 'left',
          field: 'description'
        },
        {
          name: 'quantity',
          required: true,
          label: '',
          align: 'left',
          field: 'quantity'
        },
      ]
    };
  },
  setup() {
    const quasar = useQuasar();

    const pagination = ref({
      sortBy: 'id',
      descending: false,
      page: 1,
      rowsPerPage: 50
    });

    return {
      pagination,
      quasar,
      step: ref(1),
      color: ref('accent')
    }
  },
  methods: {
    validatePropertyType() {
      if (this.form.propertyType) {
        this.step = 2;
      } else {
        this.quasar.notify({
          message: 'Vänligen välj ett alternativ',
          color: 'negative',
          position: 'top'
        });
      }
    },
    handleQuantityInput(article: any) {
      article.quantity = Number(article.quantity);
    },
    calculateTotalPrice() {
      return this.cart.reduce((total, item) => {
        const article = this.articles.find(article => article.id === item.id);
        this.form.totalPrice = total + (article.price * item.quantity) + 25; ;
      }, 0);
    },
    addToCart() {
      // Add all articles with a quantity greater than 0 to the cart
      this.articles.forEach(article => {
        if (article.quantity > 0) {
          this.cart.push({
            id: article.id,
            quantity: article.quantity,
            description: article.description
          });
        }
      });
      this.calculateTotalPrice();
    },
    emptyCart() {
      this.cart = [];

      this.articles.forEach(article => {
        article.quantity = 0;
      });
    },
    openTermsDialog() {
      this.showTermsDialog = true;
      if (!this.form.termsAccepted) {
        this.showTermsDialog = false;
      }
    },
    declineTerms() {
      this.form.termsAccepted = false;
      this.showTermsDialog = false;
      this.quasar.notify({
        message: 'Du måste acceptera villkoren för att fortsätta',
        color: 'negative',
        position: 'top'
      });
    },
    acceptTerms() {
      this.form.termsAccepted = true;
      this.showTermsDialog = false;
      this.quasar.notify({
        message: 'Tack för att du accepterade villkoren',
        color: 'positive',
        position: 'top'
      });
    },
    onSubmit() {
      this.quasar.notify({
        message: 'Din offertförfrågan har skickats',
        color: 'positive',
        position: 'top'
      });
      axios.post('http://localhost:8000/submit-form', {
        name: this.form.name,
        email: this.form.email,
        tel: this.form.tel,
        address: this.form.address,
        propertyType: this.form.propertyType,
        cart: this.cart,
        totalPrice: this.form.totalPrice
      })
      .then((response: unknown) => console.log(response))
      .catch((error: unknown) => console.log(error));
    },
    onReset() {
      this.form = {
        propertyType: this.form.propertyType,
        name: '',
        tel: '',
        address: '',
        email: '',
        termsAccepted: false,
        totalPrice: this.form.totalPrice
      };
      console.log(this.form)
      this.quasar.notify({
        message: 'Formuläret har rensats',
        color: 'negative',
        position: 'top'
      });
    }
  },
  created() {
    this.calculateTotalPrice();
  },
  async mounted() {
    const db = getFirestore(app);
    const articlesCollection = collection(db, 'articles');
    const querySnapshot = await getDocs(articlesCollection);
    querySnapshot.forEach((doc) => {
      this.articles.push({ id: doc.id, quantity: 0, ...doc.data() });
    });
  },
});
</script>

<style scoped>
.landing-body {
  line-height: 2rem;
}
</style>
