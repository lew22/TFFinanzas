<template>

  <v-app class="blue-grey lighten-3">

    <v-content>

        <v-card class="overflow-hidden">
          <v-app-bar
              absolute
              color="#6A76AB"
              dark
              shrink-on-scroll
              prominent
              src="https://picsum.photos/1920/1080?random"
              fade-img-on-scroll
              scroll-target="#scrolling-techniques-3"
          >
            <template v-slot:img="{ props }">
              <v-img
                  v-bind="props"
                  gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
              ></v-img>
            </template>

<!--            <v-app-bar-nav-icon></v-app-bar-nav-icon>-->

            <v-app-bar-title>Clientes</v-app-bar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <template v-slot:extension>
              <v-tabs align-with-title>
<!--                <v-tab>Tab 1</v-tab>-->
<!--                <v-tab>Tab 2</v-tab>-->
<!--                <v-tab>Tab 3</v-tab>-->
              </v-tabs>
            </template>
          </v-app-bar>
          <v-sheet
              id="scrolling-techniques-3"
              class="overflow-y-auto"
              max-height="1000"
          >
            <v-container style="height: 300px;">
            </v-container>

          </v-sheet>

          <tabla-clientes></tabla-clientes>
        </v-card>


<!--      <v-card-title>Clientes</v-card-title>-->
<!--      <v-card flat height="100" color ="blue-grey lighten-3">-->

<!--      </v-card>-->
<!--      <tabla-clientes></tabla-clientes>-->

    </v-content>

    <navbar></navbar>

  </v-app>

</template>

<script>
import TablaClientes from "@/components/tabla-clientes";
import Navbar from "@/components/navbar";
export default {
name: "Clientes",
  components: {Navbar, TablaClientes}
}
</script>

<style scoped>

</style>
