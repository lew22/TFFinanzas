<template>

  <div class="pending">
    <v-container >
      <v-card
          height="75"
          flat v-for="deuda in deudasAPI" :key="deuda.id">
        <v-layout row wrap :class="`pa-3 deuda ${deuda.estado}`">
          <v-flex  lg-6>
            <div class="caption grey--text">Titulo</div>
            <div>{{ deuda.titulo }}</div>
          </v-flex>
          <v-flex  md3>
            <div class="caption grey--text">Descripcion</div>
            <div>{{ deuda.descripcion }}</div>
          </v-flex>
          <v-spacer></v-spacer>

          <v-flex  md2>
            <div class="caption grey--text">Valor nominal</div>
            <div>{{ deuda.valorNominal }}</div>
          </v-flex>
          <v-flex  md2>
            <div class="caption grey--text">Fecha de giro</div>
            <div>{{ deuda.fechaGiro }}</div>
          </v-flex>
          <v-flex  md2>
            <div class="caption grey--text">Fecha de vencimiento</div>
            <div>{{ deuda.fechaVencimiento }}</div>
          </v-flex>
          <v-flex  md2>
            <div class="caption grey--text">Cliente</div>
            <div>{{   RecibirNombreCliente( parseInt(deuda.clienteId)) }}</div>
          </v-flex>
        </v-layout>

      </v-card>
      <v-divider></v-divider>

    </v-container>

  </div>
</template>

<script>
import DeudasApiService from "@/services/deudas-api-service";
import ClientesApiService from "@/services/clientes-api.service";

export default {
name: "pendientes-inicio",
  data() {
    return {
      deudasAPI:[],
      clientesAPI:[],
      numclientes:0,
      numdeudas:0


    }
  },
  methods:{
  recibirDeudas(){
    DeudasApiService.getAll()
    .then(response => {
      this.deudasAPI = response.data;
    } )
        .catch((e) => {
          console.log(e);
        });
  },

    recibirClientesAPI() {
      ClientesApiService.getAll()
          .then(response => {
            this.clientesAPI = response.data;

            this.numclientes= response.data.length

          })
          .catch((e) => {
            console.log(e);
          });
    },

    refreshList() {
    this.recibirDeudas()
      this.recibirClientesAPI()
    },



    RecibirNombreCliente(id){
    let ans =""

    this.clientesAPI.forEach(

        e => {if ( e.id === id)
        ans = e.nombre }
    )
      return ans
    },

  },

  mounted() {
  this.recibirDeudas();
  this.recibirClientesAPI();


  }

}
</script>

<style >



</style>
