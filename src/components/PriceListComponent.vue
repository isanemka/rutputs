<template>
    <q-page class="page-shell">
      <div class="page-stack">
      <section class="editorial-panel editorial-panel--solid price-intro-panel">
        <span class="section-kicker price-intro-panel__kicker">Pris direkt online</span>
        <h1 class="section-title text-center">
          Pris på fönsterputsning med RUT-avdrag
        </h1>
        <p class="section-text text-center q-mx-auto price-intro-panel__text">
          Här kan du räkna ut priset för fönsterputsning i norra Stockholm direkt online.
          Priset börjar från 350 kr efter RUT-avdrag och du ser snabbt vad som gäller för din bostad.
        </p>
        <p class="section-text text-center q-mx-auto price-intro-panel__text">
          Formuläret är byggt för att göra bokningen enkel: välj bostadstyp, ange antal fönster
          och skicka sedan in din förfrågan när priset känns rätt.
        </p>
        <div class="price-intro-panel__actions">
          <q-btn
            color="accent"
            label="Räkna ut ditt pris"
            icon-right="south"
            class="text-black"
            @click="scrollToForm"
          />
        </div>
      </section>

      <section class="section-grid price-list-grid">
        <article v-for="section in priceListSections" :key="section.id" class="editorial-panel editorial-panel--solid price-list-card">
          <span class="section-kicker">{{ section.kicker }}</span>
          <h2 class="section-title price-list-card__title">{{ section.title }}</h2>
          <ul class="price-list-items">
            <li v-for="item in section.items" :key="section.id + '-' + item.id" class="price-list-item">
              <span class="price-list-item__description">{{ item.description }}</span>
              <strong class="price-list-item__price">{{ item.price }} kr</strong>
            </li>
          </ul>
        </article>
      </section>

      <section class="editorial-panel price-list-note">
        <span class="section-kicker">Bra att veta</span>
          <h2 class="section-title">Samma priser används i formuläret</h2>
        <p class="section-text">
            Priserna ovan är samma priser som används när du räknar ut ditt totalpris här på sidan.
            Lägsta ordervärde är 350 kr efter RUT-avdrag.
        </p>
      </section>

      <div class="row q-flex justify-center mb-2">
        <div class="col-12">
          <div id="pris-formular" class="editorial-panel price-stepper-shell">
          <!-- Stepper component for multiple steps -->
          <q-stepper
            :vertical="$q.screen.gt.sm"
            v-model="step"
            animated
            contracted
            color="secondary"
            done-color="positive"
            active-color="accent"
            inactive-color="light-gray"
            class="text-light justify-center"
          >

            <!-- Step 1: Select property type -->
            <q-step
              :name="1"
              title="Villa eller lägenhet?"
              icon="house"
              :done="step > 1"
            >
              <!-- Prompt user to select type of property -->
              <fieldset class="property-type-group">
                <legend>Välj om du bor i villa eller lägenhet</legend>
                <q-radio keep-color v-model="form.propertyType" val="house" label="Villa" color="accent" />
                <q-radio keep-color v-model="form.propertyType" val="apartment" label="Lägenhet" color="accent" />
              </fieldset>
              <q-stepper-navigation>
                <q-btn @click="validatePropertyType" color="accent" label="Fortsätt" class="text-black" />
              </q-stepper-navigation>
            </q-step>

            <!-- Step 2: Select services -->
            <q-step
              :name="2"
              title="Välj tjänster"
              icon="window"
              :done="step > 2"
            >
              <div class="row justify-center q-pa-md">
                <div class="col-12">
                  <h2 class="text-body1 text-accent text-center q-pa-md">
                    Räkna snabbt ihop vad det kostar att få rena fönster
                  </h2>
                </div>
                <div class="col-12 col-md-10 col-lg-8 q-flex">
                  <div v-if="$q.screen.lt.sm" class="service-picker-mobile">
                    <article v-for="article in articles" :key="article.id" class="service-picker-mobile__item">
                      <div class="service-picker-mobile__body">
                        <span class="service-picker-mobile__description">{{ article.description }}</span>
                        <strong class="service-picker-mobile__price">{{ article.price }} kr</strong>
                      </div>
                      <q-input
                        v-model="article.quantity"
                        outlined
                        dense
                        type="number"
                        min="0"
                        label="Antal"
                        :aria-label="'Antal ' + article.description"
                        @input="handleQuantityInput(article)"
                        class="service-picker-mobile__input"
                      />
                    </article>
                  </div>
                  <q-table
                    v-else
                    v-model:pagination="pagination"
                    :rows="articles"
                    :columns="columns"
                    row-key="id"
                    hide-bottom
                    hide-header
                    flat
                  >

                    <!-- Hide ID column -->
                    <template v-slot:body-cell-id="">
                      <q-td style="display: none;"></q-td>
                    </template>

                    <!-- Description column -->
                    <template v-slot:body-cell-description="props">
                      <q-td
                        :props="props"
                        style="white-space: normal;"
                      >
                        {{ props.row.description }}
                      </q-td>
                    </template>

                    <!-- Quantity column with input field -->
                    <template v-slot:body-cell-quantity="props">
                      <q-td :props="props">
                        <q-input
                          v-model="props.row.quantity"
                          outlined
                          type="number"
                          min="0"
                          :aria-label="'Antal ' + props.row.description"
                          @input="handleQuantityInput(props.row)"
                          style="width: 70px;"
                        />
                      </q-td>
                    </template>

                    <!-- Hide addToCart column -->
                    <template v-slot:body-cell-addToCart="props">
                      <q-td style="display: none;" :props="props"></q-td>
                    </template>
                </q-table>
                </div>
              </div>
              <q-stepper-navigation>
                <q-btn @click="goToPriceStep" color="accent" label="Fortsätt"  class="q-ml-sm q-mb-sm text-black"/>
                <q-btn @click="step = 1" color="primary" label="Tillbaka" class="q-ml-sm q-mb-sm" />
                <q-btn @click="emptyCart" color="secondary" label="Rensa" class="q-ml-sm q-mb-sm text-black" />
              </q-stepper-navigation>
            </q-step>

            <!-- Step 3: Review selected services and total price -->
            <q-step
              :name="3"
              title="Se ditt pris"
              icon="shopping_cart"
              :done="step > 4"
            >

              <div id="pris-resultat" class="price-result-step">
                <!-- Display selected services and total price if minimum order value is met -->
                <div v-if="cart.length > 0 && form.totalPrice >= minimumOrderValue">
                  <h3>Dina val:</h3>
                  <ul>
                    <li v-for="item in cart" :key="item.id">
                      {{ item.quantity }} st {{ item.description }}
                    </li>
                  </ul>
                  <h3>Totalpris: {{ form.totalPrice }} kr*</h3>
                  <p>*inklusive moms och efter RUT-avdrag</p>
                </div>

                <!-- Inform user about minimum order value if not met -->
                <div v-else>
                  <p class="text-body1">Du har valt tjänster till ett värde av <strong>{{ form.totalPrice }}kr</strong>. Lägsta ordervärde är 350 kr</p>
                </div>
              </div>
              <q-stepper-navigation>
                <q-btn v-if="form.totalPrice < 350" @click="changeTotalPrice();step = 4 " :disable="cart.length === 0" color="accent" label="Fortsätt med ordervärde på 350 kr"  class="text-black q-ml-sm q-mb-sm" />
                <q-btn v-else @click="step = 4" :disable="cart.length === 0" color="accent" label="Fortsätt"  class="text-black q-ml-sm q-mb-sm" />
                <q-btn @click="step = 2" color="primary" label="Tillbaka" class="q-ml-sm q-mb-sm"/>
              </q-stepper-navigation>
            </q-step>

            <!-- Step 4: Contact form -->
            <q-step
              :name="4"
              title="Fyll i dina uppgifter"
              icon="person"
            >
              <div class="q-pa-md flex items-center justify-center">
                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md q-pa-md"
                >

                  <!-- Contact form fields -->
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

                  <!-- Terms and conditions toggle -->
                  <q-toggle
                    v-model="form.termsAccepted"
                    @click="openTermsDialog()"
                    checked-icon="check"
                    color="green"
                    unchecked-icon="clear"
                    label="Jag accepterar villkoren"
                  />

                  <!-- Terms and conditions dialog -->
                  <q-dialog
                    v-model="showTermsDialog"
                    aria-labelledby="terms-dialog-title"
                    aria-describedby="terms-dialog-description"
                  >
                    <q-card>
                      <q-card-section>
                        <h3 id="terms-dialog-title" class="text-center">Personuppgifter</h3>
                        <p id="terms-dialog-description">
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
                    <div>
                      <q-btn type="submit" :disable="!form.termsAccepted" color="accent" label="Skicka offertförfrågan" class="q-ml-sm q-mb-sm text-black" />
                      <q-btn @click="step = 3" color="primary" label="Tillbaka" class="q-ml-sm q-mb-sm" />
                    </div>
                    <div>
                      <q-btn type="reset" label="Rensa formulär" color="secondary" class="q-ml-sm q-mb-sm text-black" />
                    </div>
                  </q-stepper-navigation>
                </q-form>
              </div>
            </q-step>
          </q-stepper>
          </div>
        </div>
      </div>

      <section class="editorial-panel faq-shell q-pb-xl">
        <span class="section-kicker">Vanliga frågor</span>
        <h2 class="section-title">Pris och bokning</h2>
        <q-list bordered separator>
          <q-expansion-item
            v-for="item in priceFaqs"
            :key="item.question"
            :label="item.question"
            expand-separator
            header-class="text-primary text-weight-medium"
          >
            <q-card flat>
              <q-card-section class="text-body2 text-primary">
                {{ item.answer }}
                <div v-if="item.links?.length" class="faq-link-row">
                  <router-link
                    v-for="link in item.links"
                    :key="link.to"
                    :to="link.to"
                    class="text-accent text-weight-bold"
                  >
                    {{ link.label }}
                  </router-link>
                </div>
                <div v-if="item.linkTo && item.linkLabel" class="faq-link-row">
                  <router-link :to="item.linkTo" class="text-accent text-weight-bold">
                    {{ item.linkLabel }}
                  </router-link>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </section>
      </div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';
import { priceSeo } from 'src/data/seo';
import priceArticlesData from 'src/data/prices.json';
import { trackEvent } from 'src/boot/analytics';

const columnAlign = 'left' as const;

const priceFaqs = priceSeo.faq ?? [];

interface PriceArticle {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface CartItem {
  id: number;
  quantity: number;
  description: string;
}

interface PriceTableRow extends PriceArticle {
  quantity: number;
}

interface PriceListSection {
  id: string;
  kicker: string;
  title: string;
  items: PriceArticle[];
}

const priceArticles = priceArticlesData as PriceArticle[];

const priceListSections: PriceListSection[] = [
  {
    id: 'base',
    kicker: 'Fönsterputs',
    title: 'Pris per fönsterbåge',
    items: priceArticles.filter((article) => article.id >= 1 && article.id <= 4),
  },
  {
    id: 'addons',
    kicker: 'Tillägg',
    title: 'Extra moment vid behov',
    items: priceArticles.filter((article) => article.id >= 5 && article.id <= 10),
  },
  {
    id: 'sunrooms',
    kicker: 'Uterum/Inglasad balkong',
    title: 'Uterum och inglasade balkonger upp till 10 kvm',
    items: priceArticles.filter((article) => article.id >= 11),
  },
];

export default defineComponent({
  name: 'PriceListComponent',
  meta: {
    title: priceSeo.title,
    meta: {
      description: {
        name: 'description',
        content: priceSeo.description
      },
      ogTitle: {
        property: 'og:title',
        content: priceSeo.title
      },
      ogDescription: {
        property: 'og:description',
        content: priceSeo.description
      },
      ogImage: {
        property: 'og:image',
        content: 'https://www.rutputs.nu/og-image.jpg'
      },
      ogUrl: {
        property: 'og:url',
        content: 'https://www.rutputs.nu/pris'
      },
      twitterCard: {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      twitterTitle: {
        name: 'twitter:title',
        content: priceSeo.title
      },
      twitterDescription: {
        name: 'twitter:description',
        content: priceSeo.description
      },
      twitterImage: {
        name: 'twitter:image',
        content: 'https://www.rutputs.nu/og-image.jpg'
      }
    },
    link: {
      canonical: {
        rel: 'canonical',
        href: 'https://www.rutputs.nu/pris'
      }
    },
    script: {
      faqSchema: {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: priceFaqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer
            }
          }))
        })
      }
    }
  },
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
      minimumOrderValue: 350,
      articles: priceArticles
        .slice()
        .sort((firstArticle, secondArticle) => firstArticle.id - secondArticle.id)
        .map((article) => ({ ...article, quantity: 0 })) as PriceTableRow[],
      cart: [] as CartItem[],
      columns: [
        {
          name: 'id',
          required: true,
          label: '',
          align: columnAlign,
          field: 'id',
          visible: false
        },
        {
          name: 'description',
          required: true,
          label: '',
          align: columnAlign,
          field: 'description'
        },
        {
          name: 'quantity',
          required: true,
          label: '',
          align: columnAlign,
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
      priceListSections,
      priceFaqs,
      quasar,
      step: ref(1),
      color: ref('accent')
    }
  },
  methods: {
    // Validate property type selection before proceeding to next step
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
    scrollToForm() {
      document.getElementById('pris-formular')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    },
    goToPriceStep() {
      const activeElement = document.activeElement;

      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }

      this.addToCart();
      this.step = 3;

      void nextTick(() => {
        document.getElementById('pris-resultat')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    },
    // Handle quantity input for each article
    handleQuantityInput(article: PriceTableRow) {
      article.quantity = Number(article.quantity);
    },
    // Calculate total price based on selected services
    calculateTotalPrice() {
      const totalPrice = this.cart.reduce((total, item) => {
        const article = this.articles.find((priceArticle) => priceArticle.id === item.id);

        if (!article) {
          return total;
        }

        return total + (article.price * item.quantity);
      }, 0);

      this.form.totalPrice = totalPrice;

      return totalPrice;
    },
    // Add selected services to cart and calculate total price
    addToCart() {
      this.articles.forEach((article) => {
        const cartItemIndex = this.cart.findIndex((item) => item.id === article.id);
        if (article.quantity > 0) {
          if (cartItemIndex !== -1) {
            this.cart[cartItemIndex].quantity = article.quantity;
          } else {
            this.cart.push({
              id: article.id,
              quantity: article.quantity,
              description: article.description
            });
          }
        } else {
          if (cartItemIndex !== -1) {
            this.cart.splice(cartItemIndex, 1);
          }
        }
      });
      this.calculateTotalPrice();
      if (this.cart.length === 0) {
        this.emptyCart();
      }
    },
    // Empty cart and reset quantity for each article
    emptyCart() {
      this.cart = [];
      this.form.totalPrice = 0;

      this.articles.forEach((article) => {
        article.quantity = 0;
      });
    },
    // Open terms and conditions dialog
    openTermsDialog() {
      this.showTermsDialog = true;
      if (!this.form.termsAccepted) {
        this.showTermsDialog = false;
      }
    },
    // If user declines terms, prevent form submission
    declineTerms() {
      this.form.termsAccepted = false;
      this.showTermsDialog = false;
      this.quasar.notify({
        message: 'Du måste acceptera villkoren för att fortsätta',
        color: 'negative',
        position: 'top'
      });
    },
    // If user accepts terms, proceed to next step
    acceptTerms() {
      this.form.termsAccepted = true;
      this.showTermsDialog = false;
      this.quasar.notify({
        message: 'Tack för att du accepterade villkoren',
        color: 'positive',
        position: 'top'
      });
    },
    // Submit form data to backend
    onSubmit() {
      axios.post('/api/submit-form', {
        name: this.form.name,
        email: this.form.email,
        tel: this.form.tel,
        address: this.form.address,
        propertyType: this.form.propertyType,
        cart: this.cart,
        totalPrice: this.form.totalPrice
      }, {
        timeout: 7000
      })
      .then(() => {
        trackEvent('lead_form_submit', {
          form_name: 'price_request',
          property_type: this.form.propertyType,
          total_price: this.form.totalPrice,
          currency: 'SEK',
        });

        this.quasar.notify({
          message: 'Din offertförfrågan har skickats',
          color: 'positive',
          position: 'top'
        });
        this.goToConfirmation();
      })
      .catch(() => {
        this.quasar.notify({
          message: 'Något gick fel',
          color: 'negative',
          position: 'top'
        });
        this.goToFormFail();
      });
    },
    // Reset form data
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
      this.quasar.notify({
        message: 'Formuläret har rensats',
        color: 'negative',
        position: 'top'
      });
    },
    // Redirect user to confirmation page after form submission
    goToConfirmation() {
      this.$router.push('/bekraftelse');
    },
    // Redirect user to confirmation fail page if form submission fails
    goToFormFail() {
      this.$router.push('/fel');
    },
    // Change total price to minimum order value
    changeTotalPrice() {
      this.form.totalPrice = this.minimumOrderValue;
      this.quasar.notify({
        message: 'Ditt ordervärde har justerats till 350 kr',
        color: 'positive',
        position: 'top'
      });
    }
  },
  // Calculate total price when component is created
  created() {
    this.calculateTotalPrice();
  },
});
</script>
<style scoped>
.property-type-group {
  margin: 1rem 0 0;
  padding: 0;
  border: 0;
}

.property-type-group legend {
  margin-bottom: 0.6rem;
  font-weight: 600;
}

.price-intro-panel {
  display: grid;
  justify-items: center;
  padding-block: clamp(1.5rem, 4vw, 2.5rem);
}

.price-intro-panel__kicker {
  margin-bottom: 1rem;
}

.price-intro-panel__text {
  max-width: 48rem;
}

.price-intro-panel__actions {
  margin-top: 0.5rem;
}

.price-list-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.price-list-card {
  display: grid;
  align-content: start;
  gap: 0.9rem;
}

.price-list-card__title {
  margin-bottom: 0;
}

.price-list-items {
  display: grid;
  gap: 0.85rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.price-list-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.75rem;
  align-items: start;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid rgba(69, 90, 100, 0.12);
}

.price-list-item:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.price-list-item__description {
  line-height: 1.55;
}

.price-list-item__price {
  white-space: nowrap;
  color: var(--q-accent);
}

.price-list-note {
  width: 100%;
  max-width: none;
}

.service-picker-mobile {
  display: grid;
  gap: 0.85rem;
  width: min(100%, 34rem);
  margin: 0 auto;
}

.service-picker-mobile__item {
  display: grid;
  gap: 0.9rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(69, 90, 100, 0.12);
  box-shadow: 0 10px 24px rgba(33, 41, 49, 0.06);
}

.service-picker-mobile__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.75rem;
  align-items: start;
}

.service-picker-mobile__description {
  line-height: 1.5;
  color: rgba(69, 90, 100, 0.94);
  font-weight: 500;
}

.service-picker-mobile__price {
  color: var(--q-accent);
  font-size: 1rem;
  line-height: 1.2;
  white-space: nowrap;
}

.service-picker-mobile__input {
  width: min(100%, 7rem);
}

.price-result-step {
  scroll-margin-top: 1rem;
}

.price-stepper-shell {
  padding: 1rem;
  scroll-margin-top: 1.5rem;
}

.price-stepper-shell :deep(.q-stepper) {
  background: transparent;
  box-shadow: none;
}

@media (max-width: 1023px) {
  .price-list-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 599px) {
  .price-intro-panel {
    padding-block: 1.1rem;
  }

  .price-intro-panel__text {
    max-width: none;
  }

  .service-picker-mobile__item {
    gap: 0.8rem;
    padding: 0.9rem;
  }

  .service-picker-mobile__input {
    width: 100%;
  }

  .price-stepper-shell {
    padding: 0.2rem;
  }

  .price-list-item {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }

  .price-list-item__price {
    justify-self: start;
  }

  .price-stepper-shell :deep(.q-stepper__title) {
    font-size: 0.92rem;
    line-height: 1.2;
  }

  .price-stepper-shell :deep(.q-stepper__caption) {
    font-size: 0.8rem;
  }

  .price-stepper-shell :deep(.q-stepper__nav) {
    gap: 0.55rem;
  }

  .price-stepper-shell :deep(.q-stepper__nav .q-btn) {
    width: 100%;
    min-height: 44px;
    margin-left: 0 !important;
    margin-bottom: 0 !important;
  }

  .price-stepper-shell :deep(.q-stepper__step-inner) {
    padding-top: 0.75rem;
  }

  .price-stepper-shell :deep(.q-form) {
    width: 100%;
    padding: 0.25rem 0 !important;
  }

  .price-stepper-shell :deep(.q-field__native),
  .price-stepper-shell :deep(.q-field__input) {
    font-size: 16px;
  }

  .price-stepper-shell :deep(.q-table td),
  .price-stepper-shell :deep(.q-table th) {
    padding: 0.5rem 0.35rem;
    font-size: 0.9rem;
  }

  .price-stepper-shell :deep(.q-dialog__inner > div) {
    width: min(100vw - 1rem, 420px);
  }
}

@media (max-width: 380px) {
  .service-picker-mobile__body {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}
</style>
