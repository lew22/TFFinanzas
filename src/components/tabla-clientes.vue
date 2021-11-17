<template>
  <div class="pending " >
    <v-container >
      <v-card  height="50">
      </v-card>
      <v-card
          height="70"
          flat v-for="cliente in clientesAPI" :key="cliente.id">
        <v-layout row >
          <v-flex  lg-6>
            <div class="caption grey--text">Nombre</div>
            <div>{{ cliente.nombre }}</div>
          </v-flex>
          <v-flex  md3>
            <div class="caption grey--text">DNI</div>
            <div>{{ cliente.dni }}</div>
          </v-flex>

          <v-flex  md2>
            <div class="caption grey--text">Direccion</div>
            <div>{{ cliente.direccion }}</div>
          </v-flex>

          <v-spacer></v-spacer>
          <v-flex>
            <v-btn small color="error" @click="eliminarClienteAPI(cliente.id)"> eliminar</v-btn>
          </v-flex>
        </v-layout>

      </v-card>

      <v-flex class="mt-4 mb-3">
        <agregar-cliente @AddUser="agregarCliente"/>
      </v-flex>

    </v-container>

  </div>

</template>


<script>
import ClientesApiService from "@/services/clientes-api.service";

import AgregarCliente from "@/components/agregar-cliente";
export default {

  name: "tabla-clientes",
  components: {AgregarCliente},
  data(){
    return {



      clientes: [
        {nombre: 'Luis', dni: 31478395, direccion: 'Av Principal' ,ndeudas: 3},
        {nombre: 'Juan', dni: 31478395, direccion: 'Av Principal' ,ndeudas: 3},
        {nombre: 'Pedro', dni: 31478395, direccion: 'Av Principal' ,ndeudas: 3}

      ],
      clientesAPI:[

      ]


    }
  },
  methods:{
    onResize(){
      if(window.innerWidth < 769)
        this.isMobile = true;
      else
        this.isMobile = false;

    },
    recibirClientesAPI() {
      ClientesApiService.getAll()
          .then(response => {
            this.clientesAPI = response.data;

          })
          .catch((e) => {
            console.log(e);
          });
    },
    refreshList(){
      this.recibirClientesAPI();

    },

    agregarCliente(obj){
      this.clientes.push({nombre: obj.nombre, dni: obj.dni, direccion: obj.direccion ,ndeudas: obj.ndeudas})
      this.refreshList()
    },
    AddUser(){
      this.refreshList();
    },


    eliminarClienteAPI(id){
      ClientesApiService.delete(id);
      this.recibirClientesAPI();
    },

  },
  mounted() {
    this.recibirClientesAPI();
  }
}
</script>

<style scoped>

</style>
