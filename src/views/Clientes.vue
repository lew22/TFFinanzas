<template>

  <v-app class="blue-grey lighten-3">


    <v-card-title>Clientes</v-card-title>
    <v-card flat height="100" color ="blue-grey lighten-3">

    </v-card>
    <tabla-clientes></tabla-clientes>

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
