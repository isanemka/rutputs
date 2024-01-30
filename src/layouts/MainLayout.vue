<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated class="bg-secondary text-accent" height-hint="98">
      <q-tabs align="left">
        <q-img
          src="/icons/favicon.png"
          class="q-ml-md"
          style="height: 30px; max-width: 30px"
        />
        <q-route-tab to="/page1" label="Puts på rut" />
        <q-route-tab to="/page2" label="Prislista" />
        <q-route-tab to="/page3" label="Företag" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="text-black footer-style">
      <div class="q-mx-xl text-overline">
        <p class="text-uppercase q-ma-xl text-subtitle1 text-center">
          Telefon: 0734-64 46 04
        </p>
        <q-separator color="white" />
        <p class="text-uppercase q-ma-xl text-subtitle1 text-center">
          E-Mail: kontakt (at) rutputs.nu
        </p>
        <q-separator color="white" />
        <p class="text-uppercase q-ma-md text-center">Copyright &copy;2024</p>
      </div>
    </q-footer>
  </q-layout>
</template>

<style>
.footer-style {
  background-color: #a3a3a3;
}
</style>
