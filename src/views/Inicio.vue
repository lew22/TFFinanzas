<template>

  <v-app class="white">

<!--    <v-card  flat height="150" color="white" ></v-card>-->

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

          <v-app-bar-title>Inicio</v-app-bar-title>

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
        <estadisticas-inicio></estadisticas-inicio>

        <v-spacer> <h1>Letras actuales </h1></v-spacer>
        <agregar-deuda></agregar-deuda>
        <v-card height="30" flat color="white"></v-card>
        <pendientes-inicio></pendientes-inicio>


      </v-card>



    </v-content>

    <navbar></navbar>
  </v-app>
</template>

<script>

import PendientesInicio from "@/components/pendientes-inicio";
import EstadisticasInicio from "@/components/estadisticas-inicio";
import AgregarDeuda from "@/components/agregar-deuda";
import Navbar from "@/components/navbar";

export default {
name: "Inicio",
  components: {Navbar, AgregarDeuda, EstadisticasInicio, PendientesInicio}
}
</script>

<style scoped>

</style>
