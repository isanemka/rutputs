<template>
    <q-page class="page-shell">
      <div class="page-stack">
      <section class="editorial-panel editorial-panel--solid price-intro-panel">
        <span class="section-kicker price-intro-panel__kicker">Priser &amp; offert</span>
        <h1 class="section-title text-center">
          Pris på fönsterputs i Stockholm
        </h1>
        <p class="section-text text-center q-mx-auto price-intro-panel__text">
          Berätta lite om dina fönster så återkommer jag med en personlig offert.
          Fyll i formuläret nedan – det tar bara någon minut.
        </p>
        <p class="section-text text-center q-mx-auto price-intro-panel__text">
          Priset börjar från 499 kr efter RUT-avdrag och beräknas utifrån antal fönster,
          bostadstyp och vad du vill ha putsat.
        </p>
        <div class="price-intro-panel__actions">
          <q-btn
            color="accent"
            label="Fyll i din förfrågan"
            icon-right="south"
            class="text-black"
            @click="scrollToForm"
          />
        </div>
      </section>

      <section class="editorial-panel price-list-note">
        <span class="section-kicker">Bra att veta</span>
          <h2 class="section-title">Offert utan förpliktelser</h2>
        <p class="section-text">
            Det är kostnadsfritt och inte bindande att skicka in din förfrågan.
            Jag återkommer med ett tydligt pris efter RUT-avdrag utifrån dina uppgifter.
        </p>
        <p class="section-text">
            Eventuella tillägg vid exempelvis spröjsade fönster, hård nedsmutsning eller svår åtkomst
            framgår alltid innan arbetet startar.
        </p>
      </section>

      <section class="editorial-panel price-table-panel">
        <span class="section-kicker">Vad kostar det?</span>
        <h2 class="section-title">Pris per fönster</h2>
        <p class="section-text">
          Priset börjar från 499 kr efter RUT-avdrag och beräknas utifrån dina fönster.
          Fyll i formuläret nedan så räknar jag fram ett exakt pris för just din bostad.
        </p>
        <div class="price-callout">
          Från 499 kr efter RUT-avdrag
        </div>
        <div class="price-table-wrap">
          <table class="price-table">
            <thead>
              <tr>
                <th scope="col">Vad vill du ha putsat?</th>
                <th scope="col">Vad ingår</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Utsida</td>
                <td>Rengöring av utsidan på alla fönster</td>
              </tr>
              <tr>
                <td>Utsida + insida</td>
                <td>Rengöring av både utsida och insida</td>
              </tr>
              <tr>
                <td>Utsida + insida + mellan</td>
                <td>Komplett puts inklusive mellanrutan</td>
              </tr>
              <tr>
                <td>Spröjsade fönster</td>
                <td>Tas med i offerten – priset anpassas efter typ och antal</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="section-text q-mt-md">
          <strong>RUT-avdrag:</strong> Som privatperson betalar du hälften av arbetskostnaden –
          resten dras direkt av på fakturan. Avdraget är redan inräknat i priset ovan.
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

            <!-- Step 2: Window details -->
            <q-step
              :name="2"
              title="Dina fönster"
              icon="window"
              :done="step > 2"
            >
              <div class="row justify-center q-pa-md package-step">
                <div class="col-12 col-md-8 col-lg-6">
                  <h2 class="text-body1 text-accent text-center q-pb-md">
                    Berätta hur många fönster du har och vad du vill ha putsat
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
                  />
                </div>
                <div class="col-12 col-md-8 col-lg-6 q-mt-md">
                  <fieldset class="property-type-group">
                    <legend>Vilka sidor vill du ha putsade?</legend>
                    <q-radio keep-color v-model="form.cleaningSides" val="outside" label="Utsida" color="accent" />
                    <q-radio keep-color v-model="form.cleaningSides" val="both" label="Utsida + Insida" color="accent" />
                    <q-radio keep-color v-model="form.cleaningSides" val="all" label="Utsida + Insida + Mellan" color="accent" />
                  </fieldset>
                  <div class="q-mt-sm">
                    <q-checkbox keep-color v-model="form.hasSprojs" label="Spröjs" color="accent" />
                  </div>
                </div>
              </div>
              <q-stepper-navigation>
                <q-btn @click="goToContactStep" color="accent" label="Fortsätt"  class="q-ml-sm q-mb-sm text-black"/>
                <q-btn @click="step = 1" color="primary" label="Tillbaka" class="q-ml-sm q-mb-sm" />
                <q-btn @click="resetWindowDetails" color="secondary" label="Rensa" class="q-ml-sm q-mb-sm text-black" />
              </q-stepper-navigation>
            </q-step>

            <!-- Step 3: Contact form -->
            <q-step
              :name="3"
              title="Fyll i dina uppgifter"
              icon="person"
            >
              <div class="order-summary">
                <h3 class="order-summary__title">Din förfrågan</h3>
                <dl class="order-summary__list">
                  <div class="order-summary__row">
                    <dt>Boendetyp</dt>
                    <dd>{{ form.propertyType === 'house' ? 'Villa/Radhus' : 'Lägenhet' }}</dd>
                  </div>
                  <div class="order-summary__row">
                    <dt>Antal fönster</dt>
                    <dd>{{ form.windowCount }} st</dd>
                  </div>
                  <div class="order-summary__row">
                    <dt>Sidor</dt>
                    <dd>{{ getCleaningSidesLabel(form.cleaningSides) }}</dd>
                  </div>
                  <div class="order-summary__row">
                    <dt>Spröjs</dt>
                    <dd>{{ form.hasSprojs ? 'Ja' : 'Nej' }}</dd>
                  </div>
                </dl>
                <p class="order-summary__footnote">Jag återkommer med en offert efter RUT-avdrag utifrån dessa uppgifter.</p>
              </div>

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
                    hint="T.ex. om du har önskemål om en specifik tid för putsningen eller annat du vill meddela"
                    autogrow
                    maxlength="500"
                  />

                  <input
                    v-model="form.website"
                    name="website"
                    tabindex="-1"
                    autocomplete="off"
                    aria-hidden="true"
                    class="honeypot-field"
                  >

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
                      <q-btn @click="step = 2" color="primary" label="Tillbaka" class="q-ml-sm q-mb-sm" />
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

      <section class="editorial-panel areas-panel">
        <span class="section-kicker">Var arbetar jag?</span>
        <h2 class="section-title">Fönsterputs i Stockholmsområdet</h2>
        <p class="section-text">
          Jag utför fönsterputs i följande stadsdelar och kommuner runt Stockholm.
          Klicka på din stadsdel för mer information.
        </p>
        <div class="areas-link-grid">
          <router-link
            v-for="area in areas"
            :key="area.slug"
            :to="`/omrade/${area.slug}`"
            class="area-chip"
          >
            {{ area.name }}
          </router-link>
        </div>
      </section>

      <section class="editorial-panel faq-shell q-pb-xl">
        <span class="section-kicker">Vanliga frågor</span>
        <h2 class="section-title">Offert och bokning</h2>
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
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';
import { priceSeo } from 'src/data/seo';
import { trackEvent } from 'src/boot/analytics';
import { areas } from 'src/data/areas';

const priceFaqs = priceSeo.faq ?? [];

type CleaningSides = 'outside' | 'both' | 'all';

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
        name: '',
        tel: '',
        address: '',
        email: '',
        message: '',
        website: '',
        termsAccepted: false,
        cleaningSides: 'outside' as CleaningSides,
        hasSprojs: false,
      },
    };  },
  setup() {
    const quasar = useQuasar();

    return {
      priceFaqs,
      quasar,
      step: ref(1),
      areas,
    }
  },
  methods: {
    getCleaningSidesLabel(sides: CleaningSides): string {
      const map: Record<CleaningSides, string> = {
        outside: 'Utsida',
        both: 'Utsida + Insida',
        all: 'Utsida + Insida + Mellan',
      };
      return map[sides];
    },
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
    scrollToElement(id: string) {
      const el = document.getElementById(id);
      if (!el) return;
      const header = document.querySelector('.q-header') as HTMLElement | null;
      const offset = (header?.offsetHeight ?? 0) + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    },
    scrollToForm() {
      this.scrollToElement('pris-formular');
    },
    goToContactStep() {
      const activeElement = document.activeElement;

      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }

      if (this.form.windowCount !== null) {
        this.form.windowCount = Number(this.form.windowCount);
      }

      if (!this.form.windowCount || this.form.windowCount < 1) {
        this.quasar.notify({
          message: 'Ange antal fönster från 1 och uppåt',
          color: 'negative',
          position: 'top'
        });
        return;
      }

      if (!Number.isInteger(this.form.windowCount)) {
        this.quasar.notify({
          message: 'Antalet fönster måste vara ett heltal.',
          color: 'negative',
          position: 'top'
        });
        return;
      }

      this.step = 3;
    },
    resetWindowDetails() {
      this.form.windowCount = null;
      this.form.cleaningSides = 'outside';
      this.form.hasSprojs = false;
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
      axios.post('/api/kontakt', {
        name: this.form.name,
        email: this.form.email,
        tel: this.form.tel,
        address: this.form.address,
        message: this.form.message,
        website: this.form.website,
        propertyType: this.form.propertyType,
        windowCount: this.form.windowCount,
        cleaningSides: this.form.cleaningSides,
        hasSprojs: this.form.hasSprojs,
      }, {
        timeout: 7000
      })
      .then(() => {
        trackEvent('lead_form_submit', {
          form_name: 'quote_request',
          property_type: this.form.propertyType,
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
    // Reset contact fields
    onReset() {
      this.form.name = '';
      this.form.tel = '';
      this.form.address = '';
      this.form.email = '';
      this.form.message = '';
      this.form.website = '';
      this.form.termsAccepted = false;
      this.quasar.notify({
        message: 'Formuläret har rensats',
        color: 'negative',
        position: 'top'
      });
    },
    // Redirect user to confirmation page after form submission
    goToConfirmation() {
      if (typeof window !== 'undefined') {
        try {
          window.sessionStorage.setItem('rutputs:pending_lead', '1');
        } catch {
          // Storage may be blocked or full – confirmation should still proceed.
        }
      }
      this.$router.push('/bekraftelse');
    },
    // Redirect user to confirmation fail page if form submission fails
    goToFormFail() {
      this.$router.push('/fel');
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

.honeypot-field {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.order-summary {
  margin: 0 1rem 1.5rem;
  padding: 1.25rem 1.5rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.order-summary__title {
  margin: 0 0 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.order-summary__list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.order-summary__row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
}

.order-summary__row dt {
  opacity: 0.7;
}

.order-summary__row dd {
  margin: 0;
  font-weight: 500;
  text-align: right;
}

.order-summary__footnote {
  margin: 0.75rem 0 0;
  font-size: 0.75rem;
  opacity: 0.55;
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

.price-list-note {
  width: 100%;
  max-width: none;
}

.package-step {
  gap: 0.9rem;
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

  .price-stepper-shell {
    padding: 0.2rem;
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

  .price-stepper-shell :deep(.q-dialog__inner > div) {
    width: min(100vw - 1rem, 420px);
  }
}

.price-callout {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 1.1rem;
  font-weight: 600;
}

.price-table-wrap {
  width: 100%;
  overflow-x: auto;
  margin-top: 1.25rem;
}

.price-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.price-table th,
.price-table td {
  padding: 0.65rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.price-table thead th {
  font-weight: 600;
  border-bottom-color: rgba(255, 255, 255, 0.2);
  white-space: nowrap;
}

.price-table tbody tr:last-child td {
  border-bottom: none;
}

.price-table tbody tr:nth-child(even) td {
  background: rgba(255, 255, 255, 0.03);
}

.areas-link-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.area-chip {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.85rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s, background 0.15s;
}

.area-chip:hover {
  border-color: currentColor;
  background: rgba(255, 255, 255, 0.06);
}
</style>
