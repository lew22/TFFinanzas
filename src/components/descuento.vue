
<template>

  <div class="pa-md-4 mx-lg-auto">

    <v-card >
    <crear-descuento @addDiscount="agregarDescuento" />

    <v-card>
      <v-card-title>Datos iniciales</v-card-title>
      <v-card-text>
        <li>
          Fecha de descuento {{iteminiciales.fecha}}
        </li>
        <li>
          Dias x año {{iteminiciales.dias}}
        </li>
        <li>
          Gastos iniciales  {{iteminiciales.gastoi}}
        </li>
        <li>
          Gastos finales {{iteminiciales.gastof}}
        </li>
        <li>
          TEA compensatoria {{iteminiciales.tep}} %
        </li>
      </v-card-text>

    </v-card>

    </v-card>

    <v-data-table
        :headers="solucionHeaders"
        :items="soluciones"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="id"
        show-expand
        class="elevation-1"
    >

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-switch
              v-model="singleExpand"
              label="Single expand"
              class="mt-2"
          ></v-switch>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers, item}">
        <td :colspan="headers.length">
          More info about {{ item.ndias}}
        </td>
      </template>


    </v-data-table>

    <v-card-text align="right" style="list-style-type:none;">
              <li >NDias: diferencia de dias entre la fecha de vencimiento de la deuda y el descuento</li>
              <li>TEP: Tasa Efectiva del Periodo</li>
              <li>d: Porcentaje de descuento</li>
              <li>Valor neto: Valor a presente al momento del descuento</li>
              <li>Descuento: Monto descontado de la deuda</li>
              <li>TCEA: Tasa de Costo Efectivo Anual</li>
    </v-card-text>


  </div>


</template>


<script>
import DeudasApiService from "@/services/deudas-api-service";
import CrearDescuento from "@/components/crear-descuento";
// import MonedaApiService from "@/services/moneda-api.service";
import InicialesApiService from "@/services/iniciales-api.service"

export default {
name: "descuento",
  components: {CrearDescuento},

  data(){
  return {
    expanded: [],
    singleExpand: false,
    solucionHeaders: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      {text: 'Moneda', value: 'moneda'},
      {text: 'Ndias', value: 'ndias'},
      {text: 'TEP', value: 'tep'},
      {text: 'D', value: 'd'},
      {text: 'Descuento', value: 'descuento'},
      {text: 'Costos iniciales', value: 'costosIniciales'},
      {text: 'Costos finales', value: 'costosFinales'},
      {text: 'Valor neto', value: 'valorNeto'},
      {text: 'Valor a recibir', value: 'valorRecibido'},
      {text: 'Flujo', value: 'Flujo'},
      {text: 'TCEA', value: 'tcea'},
      {text: '', value: 'data-table-expand'},
    ],

    user:[
      {
        username:'richard',
      }
    ],
    iteminiciales:[
      {
        id:0,
        fecha:'2021-11-16',
        dias:360 ,
        gastoi: 10.70,
        gastof:17.00,
        tea:14.100,
      }
    ],

    deudasAPI:[],
    displayDeudasAPI:[],
    datosinicialesAPI:[],

    // id:1,
    // fecha:'2021-11-16',
    // dias:360 ,
    // gastoi: 10.70,
    // gastof:17.00,
    // tea:14.100,

    itemsdatosinicialesAPI:[],

    soluciones:[
      {id: 0, moneda:0,ndias:0, tep:0, d:0, descuento:0,costosIniciales:0.00, costosFinales:0, valorNeto:0, valorRecibido:0, Flujo:0, tcea:0 },

    ],

    deudas:[
      {titulo: 'Deuda 1',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 8538.00 , inicio: '2021-11-16', vencimiento:'2022-11-16', estado:'pendiente', cliente:'cliente1' },
      {titulo: 'Deuda 2',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 9865.00 , inicio: '2021-11-16', vencimiento:'2022-11-16', estado:'pendiente', cliente:'cliente1' },
      {titulo: 'Deuda 3',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 12125.00 , inicio: '2021-11-16', vencimiento:'2022-11-16', estado:'pendiente', cliente:'cliente1' },
      {titulo: 'Deuda 4',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 9358.00 , inicio: '2021-11-16', vencimiento:'2022-11-16', estado:'pendiente', cliente:'cliente1' },
      {titulo: 'Deuda 5',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 12125.00 , inicio: '2021-11-16', vencimiento:'2022-11-16', estado:'pendiente', cliente:'cliente1' },
      {titulo: 'Deuda 6',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 2549.00 , inicio: '2021-11-16', vencimiento:'2022-11-16', estado:'pendiente', cliente:'cliente1' },
      {titulo: 'Deuda 7',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 11999.00 , inicio: '2021-11-16', vencimiento:'2022-11-16', estado:'pendiente', cliente:'cliente1' },
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
  agregarDescuento(obj){

    this.fecha= obj.fecha
    this.dias= obj.dias
    this.gastoi=obj.gastoi
    this.gastof=obj.gastof
    this.tep=obj.tep

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
  ,
  calcularTodo(){

    this.soluciones =[
      {id: 0, moneda:0, ndias:0, tep:0, d:0, descuento:0,costosIniciales:0.00, costosFinales:0, valorNeto:0, valorRecibido:0, Flujo:0, tcea:0},
    ]

    let n =1
    let total=0

    DeudasApiService.getAll()
        .then(response => {
          this.deudasAPI = response.data
          this.deudasAPI.forEach(
              e =>{
                console.log(e)
                let solucion={ }
                solucion.id=n,
                    solucion.moneda = this.monedaTipo(e.TipoMonedaId)
                    solucion.ndias = this.calcularDiferenciaFechas(this.iteminiciales.fecha, e.fechaVencimiento),
                    solucion.tep = this.calcularTEP(solucion.ndias, this.iteminiciales.dias, e.valorTasa)*100,
                    solucion.d= this.calculard(solucion.tep)*100,
                    solucion.descuento = this.calcularDescuento(e.valorNominal, solucion.d),
                    solucion.costosIniciales = -1*this.iteminiciales.gastoi,
                    solucion.costosFinales = -1*this.iteminiciales.gastof,
                    solucion.valorNeto = this.calcularValorNeto(e.valorNominal, solucion.descuento),
                    solucion.valorRecibido = this.calcularValorRecibido(solucion.valorNeto, solucion.costosIniciales),
                    solucion.Flujo = this.calcularFlujo(e.valorNominal, solucion.costosFinales),
                    solucion.tcea = this.calcularTCEA(solucion.Flujo, solucion.valorRecibido, this.iteminiciales.dias, solucion.ndias)*100


                if(solucion.ndias == 0){
                  console.log('valor 0')
                }else{
                  total += solucion.valorRecibido

                  this.soluciones.push(solucion)

                  n=n+1
                }

              }

          )
          this.soluciones[0].valorRecibido = total



        })
        .catch((e) => {
          e
          // console.log(e);
        });



  },

    monedaTipo(tipoMoneda){

      if(tipoMoneda == 1){
        return "Soles";
      }else if(tipoMoneda == 2){
        return "Dolares";
      }

    },
    calcularDiferenciaFechas( dia1 , dia2){

      let fechainicial= new Date(dia1)
      let fechafinal= new Date(dia2)

      if ((fechafinal-fechainicial)/(1000 *3600*24) > 0)
        return (fechafinal-fechainicial)/(1000 *3600*24)
      else return 0
    },
    calcularTEP(dias, dxa, tep){
      //1 tasa efectiva
      // 2 tasa nominal
      // if(TipoTasaId== 1){
      //   return (1+ tep/100)**(dias/dxa) -1
      // }else if(TipoTasaId == 2){
      //   // return (1+ tep/100)**(dias/dxa) -1
      //   return (1+ tep/100)**(dias/dxa) -1
      // }
      return (1+ tep/100)**(dias/dxa) -1
    },
    calculard(tep){
    return (tep/100)/(1+tep/100)
    },
    calcularDescuento(vn, d){
    return -vn*d/100;

    },
    calcularValorNeto(vn, descuento){
    return vn +descuento;

    },
    calcularValorRecibido(vn, costosIniciales){
    return vn + costosIniciales

    },
    calcularFlujo(vn, costosFinales){
    return -vn+ costosFinales
    },
    calcularTCEA(flujo, valorRecibido, dxa, dias){
      return (-flujo/valorRecibido)**(dxa/dias) - 1
    },

    recibirDeudas() {
      DeudasApiService.getAll()
          .then(response => {
            this.deudasAPI = response.data;
            this.displayDeudasAPI = response.data.map(this.mapear)

          })
          .catch((e) => {
            e
            // console.log(e);
          });


    },
    mapear(info){
    return{
      valorNominal: info.valorNominal,
      fechaGiro: info.fechaGiro ,
      fechaVencimiento: info.fechaVencimiento,
      clienteId: info.clienteId,
      id: info.id
    }
    }



  },
  mounted() {
    this.recibirDatosIniciales()
    this.calcularTodo()
  }
}
</script>

<style scoped>

</style>
