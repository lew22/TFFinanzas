<template>
  <v-layout row wrap justify-space-around>
    <v-flex  md4>
      <v-card
          flat
          height="360"
          class="indigo lighten-3">

        <v-card-title class="text-h5">
          Deudas pendientes
        </v-card-title>
        <v-card-subtitle class="text-h6">

          Calcula las ganancias de tus deudas

        </v-card-subtitle>
        <v-card-text>
          <v-avatar size="120">
            <v-icon size="100"> mdi-wallet-travel</v-icon>
          </v-avatar>
          <p class="text-h4 text--primary">
            {{ numdeudas }}

          </p>

        </v-card-text>

        <v-card-actions>
          <v-btn depressed color="green" @click="navigateToCartera"> Ir a descuentos</v-btn>
        </v-card-actions>
      </v-card>


    </v-flex>


    <v-flex  md4>
      <v-card
          flat
          height="360"
          class="indigo lighten-3">

        <v-card-title class="text-h5">
          Clientes
        </v-card-title>
        <v-card-subtitle class="text-h6">

          Agrega nuevos clientes o actualiza informacion.

        </v-card-subtitle>
        <v-card-text>
          <v-avatar size="120">
            <v-icon size="100"> mdi-account-supervisor</v-icon>
          </v-avatar>
          <p class="text-h4 text--primary">
            {{ numclientes}}

          </p>

        </v-card-text>

        <v-card-actions>
          <v-btn depressed color="green" @click="navigateToClientes" > Ir a clientes</v-btn>
        </v-card-actions>
      </v-card>


    </v-flex>

  </v-layout>

</template>

<script>
import DeudasApiService from "@/services/deudas-api-service";
import ClientesApiService from "@/services/clientes-api.service";

export default {
name: "estadisticas-inicio",
  data(){
  return{

    numdeudas:'',
    numclientes:'',

    deudas:[],

    clientes:[],


  }
  },

  methods:{
    onResize(){
      if(window.innerWidth < 769)
        this.isMobile = true;
      else
        this.isMobile = false;

    },
    recibirDeudas(){
      DeudasApiService.getAll()
          .then(response => {
            this.deudas = response.data;
            this.numdeudas= response.data.length
          } )
          .catch((e) => {
            console.log(e);
          });
      console.log(this.deudas)
    },

    recibirClientesAPI() {
      ClientesApiService.getAll()
          .then(response => {
            this.clientes = response.data;
            this.numclientes = response.data.length

          })
          .catch((e) => {
            console.log(e);
          });
    },


    refreshList() {
      this.recibirDeudas()
      this.recibirClientesAPI()

    },

    navigateToClientes() {
      this.$router.push({name: 'Clientes'});
    },
    navigateToCartera() {
      this.$router.push({name: 'Carteras'});
    }

  },
  mounted() {
  this.refreshList()
  }
}
</script>

<style scoped>

</style>
