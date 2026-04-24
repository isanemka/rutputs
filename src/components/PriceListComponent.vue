<template>
    <q-page class="page-shell">
      <div class="page-stack">
      <section class="editorial-panel editorial-panel--solid price-intro-panel">
        <span class="section-kicker price-intro-panel__kicker">Pris direkt online</span>
        <h1 class="section-title text-center">
          Pris på fönsterputsning med RUT-avdrag
        </h1>
        <p class="section-text text-center q-mx-auto price-intro-panel__text">
          Här kan du räkna ut priset för fönsterputsning direkt online.
          Mitt prisformulär är enkelt att använda och ger dig snabbt en tydlig uppskattning av kostnaden.
        </p>
        <p class="section-text text-center q-mx-auto price-intro-panel__text">
          Formuläret är byggt för att göra bokningen enkel: välj bostadstyp, ange antal fönster
          och skicka sedan in din förfrågan när priset känns rätt. Minsta ordervärde är 499 kr efter RUT-avdrag.
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

      <section class="price-package-shell">
        <div class="price-package-shell__header text-center">
          <span class="section-kicker">Tydliga paketpriser</span>
          <h2 class="section-title">Pris efter antal fönster</h2>
          <p class="section-text q-mx-auto">
            Ett enklare upplägg där du snabbt ser ungefärlig kostnad utifrån hur många fönster du vill få putsade.
          </p>
        </div>

        <div class="price-package-grid">
          <article v-for="tier in priceTiers" :key="tier.id" class="editorial-panel editorial-panel--solid price-package-card">
            <span class="price-package-card__range">{{ tier.windowRange }}</span>
            <h3 class="price-package-card__price">{{ tier.priceFrom }}</h3>
            <p class="price-package-card__label">{{ tier.label }}</p>
          </article>
        </div>
      </section>

      <section class="editorial-panel price-list-note">
        <span class="section-kicker">Bra att veta</span>
          <h2 class="section-title">Riktpris innan offert</h2>
        <p class="section-text">
            Paketpriserna ovan är från-priser för normalt smutsade och normalt åtkomliga fönster.
            Eventuella tillägg kan tillkomma vid exempelvis spröjsade fönster, hård nedsmutsning eller svår åtkomst.

        </p>
        <p class="section-text">
            Exakt pris bekräftas alltid innan arbetet startar.
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
                <legend>Välj om du bor i hus eller lägenhet</legend>
                <q-radio keep-color v-model="form.propertyType" val="house" label="Villa/Radhus" color="accent" />
                <q-radio keep-color v-model="form.propertyType" val="apartment" label="Lägenhet" color="accent" />
              </fieldset>
              <q-stepper-navigation>
                <q-btn @click="validatePropertyType" color="accent" label="Fortsätt" class="text-black" />
              </q-stepper-navigation>
            </q-step>

            <!-- Step 2: Select services -->
            <q-step
              :name="2"
              title="Antal fönster"
              icon="window"
              :done="step > 2"
            >
              <div class="row justify-center q-pa-md package-step">
                <div class="col-12 col-md-8 col-lg-6">
                  <h2 class="text-body1 text-accent text-center q-pb-md">
                    Ange antal fönster så matchar jag rätt paket direkt
                  </h2>
                  <q-input
                    v-model.number="form.windowCount"
                    outlined
                    type="number"
                    min="1"
                    step="1"
                    label="Antal fönster"
                    hint="Ange ett antal från 1 och uppåt"
                    :aria-label="'Antal fönster'"
                    @update:model-value="handleWindowCountInput"
                  />
                </div>
                <div class="col-12 q-mt-md">
                  <div class="package-step__preview" v-if="getActiveTier()">
                    <p class="package-step__preview-label">Valt paket</p>
                    <p class="package-step__preview-range">{{ getActiveTier()?.windowRange }}</p>
                    <p class="package-step__preview-price">{{ getActiveTier()?.priceFrom }}</p>
                  </div>
                  <p v-else class="text-center package-step__hint">
                    Välj antal fönster för att se vilket paket som passar.
                  </p>
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
              :done="step > 3"
            >

              <div id="pris-steg"></div>

              <div id="pris-resultat" class="price-result-step">
                <!-- Display selected services and total price if minimum order value is met -->
                <div v-if="cart.length > 0 && form.totalPrice >= minimumOrderValue">
                  <h3>Dina val:</h3>
                  <ul>
                    <li v-for="item in cart" :key="item.id">
                      {{ item.description }}
                    </li>
                  </ul>
                  <h3>Totalpris: {{ form.totalPrice }} kr*</h3>
                  <p>*inklusive moms och efter RUT-avdrag</p>
                </div>

                <!-- Inform user about minimum order value if not met -->
                <div v-else>
                  <p class="text-body1">Ange antal fönster i föregående steg för att få ditt paketpris.</p>
                </div>
              </div>
              <q-stepper-navigation>
                <q-btn @click="step = 4" :disable="cart.length === 0" color="accent" label="Fortsätt"  class="text-black q-ml-sm q-mb-sm" />
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
                  <q-input
                    v-model="form.message"
                    filled
                    type="textarea"
                    label="Meddelande"
                    hint="T.ex. när du vill ha putsningen utförd eller annat du vill meddela"
                    autogrow
                    maxlength="500"
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
                          När du fyller i mitt kontaktformulär på denna webbplats samlar jag
                          in dina personuppgifter, inklusive namn, adress, telefonnummer och
                          e-postadress. Dessa uppgifter används endast för att jag ska kunna kontakta dig
                          angående dina förfrågningar eller för att tillhandahålla tjänster som du begär.
                          <br>
                          Jag behandlar dina personuppgifter med största respekt för din integritet och
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
import { trackEvent } from 'src/boot/analytics';

const STEP_TRANSITION_DURATION_MS = 350;

const priceFaqs = priceSeo.faq ?? [];

interface CartItem {
  id: string;
  quantity: number;
  description: string;
}

interface PriceTier {
  id: string;
  windowRange: string;
  priceFrom: string;
  label: string;
  minWindows: number;
  maxWindows: number;
  price: number;
}

const priceTiers: PriceTier[] = [
  {
    id: 'tier-1',
    windowRange: '1-6 fönster',
    priceFrom: 'Från 499 kr',
    label: 'Perfekt för mindre bostäder',
    minWindows: 1,
    maxWindows: 6,
    price: 499,
  },
  {
    id: 'tier-2',
    windowRange: '7-12 fönster',
    priceFrom: 'Från 799 kr',
    label: 'Vanligt val för lägenhet och mindre villa',
    minWindows: 7,
    maxWindows: 12,
    price: 799,
  },
  {
    id: 'tier-3',
    windowRange: '13-20 fönster',
    priceFrom: 'Från 999 kr',
    label: 'Populärt val för familjebostad',
    minWindows: 13,
    maxWindows: 20,
    price: 999,
  },
  {
    id: 'tier-4',
    windowRange: '21-30 fönster',
    priceFrom: 'Från 1 399 kr',
    label: 'För större villa och fler glaspartier',
    minWindows: 21,
    maxWindows: 30,
    price: 1399,
  },
  {
    id: 'tier-5',
    windowRange: '31-40 fönster',
    priceFrom: 'Från 1 699 kr',
    label: 'För stora fastigheter och många fönsterpartier',
    minWindows: 31,
    maxWindows: 40,
    price: 1699,
  },
  {
    id: 'tier-6',
    windowRange: '41+ fönster',
    priceFrom: 'Från 1 999 kr',
    label: 'För mycket stora uppdrag med många fönster',
    minWindows: 41,
    maxWindows: Number.POSITIVE_INFINITY,
    price: 1999,
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
        windowCount: null as number | null,
        selectedTierId: '',
        name: '',
        tel: '',
        address: '',
        email: '',
        message: '',
        termsAccepted: false,
        totalPrice: 0
      },
      priceStepScrollTimeoutId: null as number | null,
      minimumOrderValue: 499,
      cart: [] as CartItem[],
    };
  },
  setup() {
    const quasar = useQuasar();

    return {
      priceTiers,
      priceFaqs,
      quasar,
      step: ref(1)
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
    getTierFromWindowCount(windowCount: number | null) {
      if (!windowCount || Number.isNaN(windowCount)) {
        return null;
      }

      return priceTiers.find((tier) => windowCount >= tier.minWindows && windowCount <= tier.maxWindows) ?? null;
    },
    getActiveTier() {
      if (this.form.selectedTierId) {
        return priceTiers.find((tier) => tier.id === this.form.selectedTierId) ?? null;
      }

      return this.getTierFromWindowCount(this.form.windowCount);
    },
    handleWindowCountInput() {
      if (this.form.windowCount === null) {
        this.form.selectedTierId = '';
        this.cart = [];
        this.form.totalPrice = 0;
        return;
      }

      this.form.windowCount = Number(this.form.windowCount);

      if (!Number.isInteger(this.form.windowCount) || this.form.windowCount < 1) {
        this.form.selectedTierId = '';
        this.cart = [];
        this.form.totalPrice = 0;
        return;
      }

      const tier = this.getTierFromWindowCount(this.form.windowCount);

      if (!tier) {
        this.form.selectedTierId = '';
        this.cart = [];
        this.form.totalPrice = 0;
        return;
      }

      this.form.selectedTierId = tier.id;
      this.cart = [
        {
          id: tier.id,
          quantity: 1,
          description: `${this.form.windowCount} fönster (${tier.windowRange}) - ${tier.priceFrom}`,
        },
      ];
      this.form.totalPrice = tier.price;
    },
    goToPriceStep() {
      const activeElement = document.activeElement;

      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }

      this.handleWindowCountInput();

      if (!this.form.windowCount || this.form.windowCount < 1) {
        this.quasar.notify({
          message: 'Ange antal fönster från 1 och uppåt',
          color: 'negative',
          position: 'top'
        });
        return;
      }

      if (!Number.isInteger(Number(this.form.windowCount))) {
        this.quasar.notify({
          message: 'Antalet fönster måste vara ett heltal.',
          color: 'negative',
          position: 'top'
        });
        return;
      }

      if (!this.form.selectedTierId || this.cart.length === 0) {
        this.quasar.notify({
          message: 'Jag kunde inte matcha ett paket. Kontrollera antal fönster.',
          color: 'negative',
          position: 'top'
        });
        return;
      }

      this.step = 3;

      if (this.priceStepScrollTimeoutId !== null) {
        window.clearTimeout(this.priceStepScrollTimeoutId);
      }

      void nextTick(() => {
        this.priceStepScrollTimeoutId = window.setTimeout(() => {
          document.getElementById('pris-steg')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          this.priceStepScrollTimeoutId = null;
        }, STEP_TRANSITION_DURATION_MS);
      });
    },
    // Calculate total price based on selected package
    calculateTotalPrice() {
      const tier = this.getActiveTier();
      const totalPrice = tier ? tier.price : 0;

      this.form.totalPrice = totalPrice;

      return totalPrice;
    },
    // Empty cart and reset quantity for each article
    emptyCart() {
      this.cart = [];
      this.form.totalPrice = 0;
      this.form.windowCount = null;
      this.form.selectedTierId = '';
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
        message: this.form.message,
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
        windowCount: this.form.windowCount,
        selectedTierId: this.form.selectedTierId,
        name: '',
        tel: '',
        address: '',
        email: '',
        message: '',
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
    }
  },
  // Calculate total price when component is created
  created() {
    this.calculateTotalPrice();
  },
  beforeUnmount() {
    if (this.priceStepScrollTimeoutId !== null) {
      window.clearTimeout(this.priceStepScrollTimeoutId);
    }
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

.price-package-shell {
  display: grid;
  gap: 1rem;
}

.price-package-shell__header {
  display: grid;
  gap: 0.6rem;
}

.price-package-shell__header .section-text {
  max-width: 48rem;
}

.price-package-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}

.price-package-card {
  display: grid;
  align-content: start;
  gap: 0.45rem;
  text-align: center;
}

.price-package-card__range {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 2rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(69, 90, 100, 0.16);
  color: rgba(33, 41, 49, 0.85);
  font-weight: 600;
}

.price-package-card__price {
  margin: 0;
  font-size: clamp(1.35rem, 2.1vw, 1.7rem);
  line-height: 1.1;
  color: var(--q-accent);
}

.price-package-card__label {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.35;
  color: rgba(69, 90, 100, 0.84);
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

.package-step {
  gap: 0.9rem;
}

.package-step__preview {
  width: min(100%, 28rem);
  margin: 0 auto;
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(69, 90, 100, 0.12);
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 10px 24px rgba(33, 41, 49, 0.06);
  text-align: center;
}

.package-step__preview-label,
.package-step__preview-range,
.package-step__preview-price {
  margin: 0;
}

.package-step__preview-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(69, 90, 100, 0.8);
}

.package-step__preview-range {
  margin-top: 0.2rem;
  font-size: 1rem;
  color: rgba(33, 41, 49, 0.95);
}

.package-step__preview-price {
  margin-top: 0.35rem;
  font-size: 1.3rem;
  color: var(--q-accent);
  font-weight: 700;
}

.package-step__hint {
  color: rgba(69, 90, 100, 0.84);
}

.price-stepper-shell {
  padding: 1rem;
  scroll-margin-top: 1.5rem;
}

.price-stepper-shell :deep(.q-stepper) {
  background: transparent;
  box-shadow: none;
}

@media (max-width: 839px) {
  .price-package-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .price-stepper-shell {
    padding: 0.4rem;
  }
}

@media (max-width: 699px) {
  .price-intro-panel {
    padding-block: 1.1rem;
  }

  .price-intro-panel__text {
    max-width: none;
  }

  .price-package-card {
    gap: 0.35rem;
  }

  .price-package-card__label {
    font-size: 0.88rem;
  }

  .package-step__preview {
    width: min(100%, 24rem);
  }

  .package-step__preview-price {
    font-size: 1.2rem;
  }

  .price-stepper-shell {
    padding: 0.2rem;
  }

  .price-package-grid {
    grid-template-columns: 1fr;
  }

  .price-stepper-shell :deep(.q-stepper__title) {
    font-size: 0.92rem;
    line-height: 1.2;
  }

  .price-stepper-shell :deep(.q-stepper__caption) {
    font-size: 0.8rem;
  }

  .price-stepper-shell :deep(.q-stepper__nav) {
    display: grid;
    grid-template-columns: 1fr;
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
  .package-step__preview {
    padding: 0.85rem;
  }
}
</style>
