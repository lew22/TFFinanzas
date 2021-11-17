<template>

  <v-app class="blue-grey lighten-3">

    <v-content>

<!--      <v-card  flat height="150" color="blue-grey lighten-3"></v-card>-->
<!--      <v-card-title>Descuento</v-card-title>-->
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

          <v-app-bar-title>Descuento</v-app-bar-title>

          <v-spacer></v-spacer>

          <template v-slot:extension>
            <v-tabs align-with-title>
            </v-tabs>
          </template>
        </v-app-bar>
        <v-sheet
            id="scrolling-techniques-3"
            class="overflow-y-auto"
            max-height="1000"
        >
          <v-container style="height: 300px;"></v-container>
        </v-sheet>

        <descuento></descuento>

        </v-card>

    </v-content>

    <navbar></navbar>

  </v-app>
</template>

<script>
import Descuento from "@/components/descuento";
import Navbar from "@/components/navbar";
export default {
name: "Cartera",
  components: {Navbar, Descuento}
}
</script>

<style scoped>

</style>
