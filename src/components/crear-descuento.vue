<template>

  <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="dialog">
    <template v-slot:activator="{on, attrs}">
      <v-btn rounded outlined color="green" v-bind="attrs" v-on="on">Actualizar datos</v-btn>

    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-card-title>
          <h2>Datos del descuento</h2>
        </v-card-title>

        <v-card-text>
          <v-form class="px-3" ref="form">

            <v-container>
                  <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="fecha"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="fecha"
                          label="Fecha de descuento"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="fecha"
                        no-title
                        scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                          text
                          color="primary"
                          @click="menu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(fecha)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>

            </v-container>


            <v-select
                :items="opciones"
                label="Dias x año"
                v-model.number="dias"
                prepend-icon="mdi-calendar-search"
            ></v-select>

            <v-text-field
                v-model.number="gastoi"
                label="Gastos iniciales"
                type="number"
                prepend-icon="mdi-currency-usd-off"
                :rules="inputRulesNumero"
            ></v-text-field>
            <v-text-field
                v-model.number="gastof"
                label="Gastos finales"
                type="number"
                prepend-icon="mdi-currency-usd-off"
                :rules="inputRulesNumero"
            ></v-text-field>
            <v-text-field
                v-model.number="tep"
                label="TEA" type="number"
                prepend-icon="mdi-sack-percent "
                append-icon="mdi-percent"
                :rules="inputRulesPorcentaje"
            ></v-text-field>


            <v-spacer></v-spacer>

            <v-btn text @click="submit(); dialog.value = false " rounded outlined color="green" class="mx-0 mt-3">Aceptar</v-btn>

            <v-spacer></v-spacer>
            <v-btn  @click="dialog.value=false" rounded outlined color="red" class ="mx-0 mt-3"> Cancelar</v-btn>
          </v-form>
        </v-card-text>



      </v-card>

    </template>

  </v-dialog>
</template>

<script>



import InicialesApiService from "@/services/iniciales-api.service";
// import DeudasApiService from "@/services/deudas-api-service";


export default {
name: "crear-descuento",
  props: ['username'],
  data(){
  return{

    opciones:[
      {text:365},
      {text:360}
    ],


    menu: false,
    modal: false,

    inputRulesNumero:[

      v => v >=0 ||'Por favor complete con un numero positivo',

    ],
    inputRulesPorcentaje:[

      v => v >0 ||'Por favor complete con un numero mayor a 0',

    ],

    iteminiciales:[
      {
        id:1,
        fecha: new Date().toISOString().substr(0, 10),
        dias:360 ,
        gastoi: 10.70,
        gastof:17.00,
        tep:14.100,
      }
    ],

    fecha:new Date().toISOString().substr(0, 10),
    dias:360,
    gastoi: 10.70,
    gastof:17.00,
    tep:1.4,
    dialog:false


  }
  },
  methods:{
  submit(){
    if( this.$refs.form.validate() ){

      console.log(this.iteminiciales.dias + this.iteminiciales.gastoi+ this.iteminiciales.gastof + this.iteminiciales.tep)
      // InicialesApiService.update(this.iteminiciales.id,this.iteminiciales)
      this.$emit("addDiscount", {id:this.iteminiciales.id, fecha:this.iteminiciales.fecha, dias:this.iteminiciales.dias, gastoi: this.iteminiciales.gastoi, gastof:this.iteminiciales.gastof, tep:this.iteminiciales.tep} )
      this.fecha=''
      this.dias=''
      this.gastoi=''
      this.gastof=''
      this.tep=''
    }

  },
    recibirDatosIniciales(){
      InicialesApiService.getAll()
          .then(response => {
            this.datosinicialesAPI = response.data;
            this.itemsdatosinicialesAPI = response.data.map(this.mapearI)
            this.itemsdatosinicialesAPI.forEach(
                e =>{
                  this.iteminiciales.id= e.id,
                      this.iteminiciales.fecha= e.fecha,
                      this.iteminiciales.dias= e.dias,
                      this.iteminiciales.gastoi= e.gastoi,
                      this.iteminiciales.gastof= e.gastof,
                      this.iteminiciales.tep= e.tep
                  console.log(e)
                })
          })
          .catch((e) => {
            e
            // console.log(e);
          });
      console.log(this.itemsdatosinicialesAPI, "este es....")
    },
    mapearI(info){
      return{
        id: info.id,
        fecha:info.fecha,
        dias:info.dias,
        gastoi:info.gastoi,
        gastof:info.gastof,
        tep:info.tep
      }
    }


   }
//   ,
//   mounted() {
//   this.recibirDatosIniciales()
// }
}
</script>

<style scoped>

</style>
