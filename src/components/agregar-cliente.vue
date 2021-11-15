<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="dialog">
    <template v-slot:activator="{on, attrs}">
      <v-btn class="success" v-bind="attrs" v-on="on">Agregar cliente</v-btn>

    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-card-title>
          <h2>Agregar cliente</h2>
        </v-card-title>

        <v-card-text>
          <v-form class="px-3" ref="datos">
            <v-text-field
                v-model="item.nombre"
                label="Nombre"
                type="text"
                :rules="inputRulesNombre"
                prepend-icon="mdi-account-box"
            ></v-text-field>
            <v-text-field
                v-model.number="item.dni"
                label="DNI"
                type="number"
                :rules="inputRulesDNI"
                prepend-icon="mdi-card-account-details"
            > </v-text-field>
            <v-text-field
                v-model="item.direccion"
                label="Direccion"
                :rules="inputRulesDireccion"
                prepend-icon="mdi-map-marker"
            ></v-text-field>
            <v-spacer></v-spacer>

            <v-btn text @click="submit(); dialog.value = false " class="success mx-0 mt-3">Aceptar</v-btn>
            <v-spacer></v-spacer>
            <v-btn  @click="dialog.value=false" class="error mx-0 mt-3"> Cancelar</v-btn>
          </v-form>
        </v-card-text>


      </v-card>


    </template>


  </v-dialog>
</template>

<script>

import ClientesApiService from "@/services/clientes-api.service";


export default {
name: "agregar-cliente",
  data(){
  return{
    inputRulesDNI:[

      v => (v >=10000000 && v<=99999999) ||'Por favor complete con un numero de DNI valido',

    ],
    inputRulesNombre:[

      v =>  (v.length >= 3) ||'El nombre debe contener por lo menos 3 letras',

    ],
    inputRulesDireccion:[

      v =>  (v.length >= 3) ||'La direccion debe poseer como minimo 5 caracteres',

    ],

    item:{
      nombre:'',
      dni:'',
      direccion:'',
      ndeudas:0
    },

    dialog:false,

  }
  },
  methods:{
  submit(){
    if (this.$refs.datos.validate()) {

      ClientesApiService.create(this.item)
      console.log(this.item)

      this.$emit("AddUser", this.item)

      this.nombre = ''
      this.dni = ''
      this.direccion = ''
      this.ndeudas = 0
    }

  }
  }
}
</script>

<style scoped>

</style>
