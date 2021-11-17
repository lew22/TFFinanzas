<template>

  <v-app class="white">

    <v-card  flat height="150" color="white"></v-card>


  <v-card-title>Inicio</v-card-title>
    <estadisticas-inicio></estadisticas-inicio>

    <v-card  flat color="white" height="100">

    </v-card>


    <v-spacer> <h1>Deudas actuales </h1></v-spacer>
    <agregar-deuda ></agregar-deuda>
    <v-card height="30" flat color="white"></v-card>
    <pendientes-inicio></pendientes-inicio>

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
