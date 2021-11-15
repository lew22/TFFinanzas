<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="dialog">
    <template v-slot:activator="{on, attrs}">
      <v-btn class="success" v-bind="attrs" v-on="on" width="300">Agregar deuda</v-btn>

    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-card-title>
          <h2>Agregar deuda</h2>
        </v-card-title>

        <v-card-text>
          <v-form class="px-3" ref="datos">
            <v-text-field
                v-model="item.titulo"
                label="Titulo"
                type="text"
                :rules="inputRulesTexto"
                prepend-icon="mdi-format-title"
            ></v-text-field>
            <v-text-field
                v-model="item.descripcion"
                label="Descripcion"
                type="text"
                :rules="inputRulesTexto"
                prepend-icon="mdi-pencil"
            > </v-text-field>
            <v-text-field
                v-model.number="item.valorNominal"
                label="Valor nominal"
                type="number"
                :rules="inputRulesDinero"
                prepend-icon="mdi-cash"
            ></v-text-field>


            <v-container>
              <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="item.fechaGiro"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="item.fechaGiro"
                      label="Fecha de giro"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="item.fechaGiro"
                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="menu1 = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.menu1.save(item.fechaGiro)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

            </v-container>

            <v-container>
              <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="item.fechaVencimiento"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="item.fechaVencimiento"
                      label="Fecha de vencimiento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="item.fechaVencimiento"
                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="menu2 = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.menu2.save(item.fechaVencimiento)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

            </v-container>

            <v-select
                :items=" itemsAPI "
                item-text="nombre"
                item-value="id"
                label="Cliente"
                v-model="item.clienteId"
                prepend-icon="mdi-account-check"
            ></v-select>


            <v-spacer></v-spacer>

            <v-btn text @click="submit(); dialog.value = false " class="success mx-0 mt-3">Agregar tabla</v-btn>
            <v-spacer></v-spacer>
            <v-btn  @click="dialog.value=false" class="error mx-0 mt-3"> Cancelar</v-btn>
          </v-form>
        </v-card-text>


      </v-card>


    </template>


  </v-dialog>

</template>

<script>
import DeudasApiService from "@/services/deudas-api-service";
import ClientesApiService from "@/services/clientes-api.service";

export default {
  name: "agregar-deuda",

  data(){
    return{
      inputRulesDinero:[

        v => v > 0   ||'Por favor complete con un numero positivo',

      ],
      inputRulesTexto:[

        v =>  (v.length >= 5) ||'El nombre debe contener por lo menos 5 letras',

      ],
      inputRulesDireccion:[

        v =>  (v.length >= 3) ||'La direccion debe poseer como minimo 5 caracteres',

      ],
      clientesAPI:[],

      items:[
        {nombre:'Juan', id: 1},
        {nombre:'Pedro', id: 2},
        {nombre:'Luis', id: 3},
      ],
      itemsAPI:[],


      menu1: false,
      modal1: false,
      menu2: false,
      modal2: false,


      item:{
      titulo:'',
      descripcion:'',
       valorNominal:'',
      fechaGiro:'',
      fechaVencimiento: '',
      clienteId:1
    },

    dialog:false,

    }

  },
  methods:{
    submit(){
      if (this.$refs.datos.validate()){
        DeudasApiService.create(this.item)
        console.log(this.item)
        this.recibirClientesAPI()

      }

    },
    recibirClientesAPI() {
      ClientesApiService.getAll()
          .then(response => {
            this.clientesAPI = response.data;
            this.itemsAPI = response.data.map(this.mapear)

          })
          .catch((e) => {
            console.log(e);
          });
      console.log(this.itemsAPI, "este es....")
    },
    mapear(info){
      return{
        nombre: info.nombre,
        id: info.id

      }

    }

  },
  mounted() {
    this.recibirClientesAPI()
  }

}
</script>

<style scoped>

</style>
