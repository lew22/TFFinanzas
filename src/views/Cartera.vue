<template>

  <v-app class="blue-grey lighten-3">

    <v-content>
      <v-card  flat height="150" color="blue-grey lighten-3"></v-card>
      <v-card-title>Descuento</v-card-title>

      <descuento></descuento>
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
