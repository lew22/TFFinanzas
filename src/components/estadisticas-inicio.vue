<template>
  <v-layout row wrap justify-space-around>
    <v-flex  md4>

      <v-card
          class="mx-auto"
          max-width="344"
          outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">

            </div>
            <v-list-item-title class="text-h5 mb-1">
              Letras pendientes
            </v-list-item-title>
            <v-list-item-subtitle>Calcula las ganancias de tus letras</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
              tile
              size="80"
              color="indigo lighten-3"
          >
            <v-icon size="100"> mdi-wallet-travel</v-icon>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn color="green" @click="navigateToCartera"
              outlined
              rounded
              text
          >
            Button
          </v-btn>
        </v-card-actions>
      </v-card>


    </v-flex>


    <v-flex  md4>

      <v-card
          class="mx-auto"
          max-width="344"
          outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">

            </div>
            <v-list-item-title class="text-h5 mb-1">
              Clientes
            </v-list-item-title>
            <v-list-item-subtitle>Agrega nuevos clientes/modificar</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
              tile
              size="80"
              color="indigo lighten-3"
          >
            <v-icon size="100"> mdi-account-supervisor</v-icon>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn color="green" @click="navigateToClientes"
              outlined
              rounded
              text
          >
            Button
          </v-btn>
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
