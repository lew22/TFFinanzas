<template>

  <v-card height="120">

    <crear-descuento @addDiscount="agregarDescuento" />


    <v-card>
      <v-card-title>Datos iniciales</v-card-title>
      <v-card-text>
        <li>
          Fecha de descuento {{fecha}}
        </li>
        <li>
          Dias x año {{dias}}
        </li>
        <li>
          Gastos iniciales  {{gastoi}}
        </li>
        <li>
          Gastos finales {{gastof}}
        </li>
        <li>
          TEA compensatoria {{tea}} %
        </li>
      </v-card-text>

    </v-card>

    <v-card>

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-right">
            Id
          </th>
          <th class="text-right">
            NDias
          </th>
          <th class="text-right">
            TEP (i')
          </th>
          <th class="text-right">
            d
          </th>
          <th class="text-right">
            Descuento
          </th>
          <th class="text-right">
            Costos iniciales
          </th>
          <th class="text-right">
            Costos finales
          </th>
          <th class="text-right">
            Valor neto
          </th>
          <th class="text-right">
            Valor a recibir
          </th>
          <th class="text-right">
            Flujo
          </th>
          <th class="text-right">
            TCEA
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in soluciones"
            :key="item.id"
        >
          <td class="text-right"> {{item.id}} </td>
          <td class="text-right"> {{item.ndias}} </td>
          <td class="text-right"> {{ item.tep.toFixed(3)}} %</td>
          <td class="text-right"> {{item.d.toFixed(3)}} %</td>
          <td class="text-right red--text" > {{ item.descuento.toFixed(2) }} </td>
          <td class="text-right red--text"> {{ item.costosIniciales.toFixed(2) }} </td>
          <td class="text-right red--text"> {{ item.costosFinales.toFixed(2) }} </td>
          <td class="text-right"> {{ item.valorNeto.toFixed(2) }}</td>
          <td class="text-right blue--text"> {{ item.valorRecibido.toFixed(2) }} </td>
          <td class="text-right red--text"> {{ item.Flujo.toFixed(2) }} </td>
          <td class="text-right"> {{ item.tcea.toFixed(4) }}  %</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

  </v-card>
    <v-card-actions>
      <v-card-text align="right" style="list-style-type:none;">
        <li >NDias: diferencia de dias entre la fecha de vencimiento de la deuda y el descuento</li>
        <li>TEP: Tasa Efectiva del Periodo</li>
        <li>d: Porcentaje de descuento</li>
        <li>Valor neto: Valor a presente al momento del descuento</li>
        <li>Descuento: Monto descontado de la deuda</li>
        <li>TCEA: Tasa de Costo Efectivo Anual</li>
      </v-card-text>
    </v-card-actions>
  </v-card>

</template>

<script>
import DeudasApiService from "@/services/deudas-api-service";
import CrearDescuento from "@/components/crear-descuento";

export default {
name: "descuento",
  components: {CrearDescuento},

  data(){
  return{
    deudasAPI:[],
    displayDeudasAPI:[],

    id:1,
    fecha:'2021-05-04',

    dias:360 ,
    gastoi: 11.70,
    gastof:17.00,
    tea:14.800,

    soluciones:[
      {id: 0, ndias:0, tep:0, d:0, descuento:0,costosIniciales:0.00, costosFinales:0, valorNeto:0, valorRecibido:0, Flujo:0, tcea:0 },

    ],

    deudas:[
      {titulo: 'Deuda 1',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 8538.00 , inicio: '2021-04-11', vencimiento:'2021-07-10', estado:'pendiente', cliente:'cliente1' },
      {titulo: 'Deuda 2',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 9865.00 , inicio: '2021-04-15', vencimiento:'2021-06-14', estado:'pendiente', cliente:'cliente1' },
      {titulo: 'Deuda 3',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 12125.00 , inicio: '2021-04-08', vencimiento:'2021-07-07', estado:'pendiente', cliente:'cliente1' },
      {titulo: 'Deuda 4',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 9358.00 , inicio: '2021-04-05', vencimiento:'2021-08-03', estado:'pendiente', cliente:'cliente1' },
      {titulo: 'Deuda 5',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 12125.00 , inicio: '2021-04-07', vencimiento:'2021-07-06', estado:'pendiente', cliente:'cliente1' },
      {titulo: 'Deuda 6',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 2549.00 , inicio: '2021-04-04', vencimiento:'2021-07-03', estado:'pendiente', cliente:'cliente1' },
      {titulo: 'Deuda 7',descripcion:'Deuda por servicios prestados en el 2021 ', valor: 11999.00 , inicio: '2021-04-15', vencimiento:'2021-05-15', estado:'pendiente', cliente:'cliente1' },
    ]
  }
  },
  methods:{
  agregarDescuento(obj){

    this.fecha= obj.fecha
    this.dias= obj.dias
    this.gastoi=obj.gastoi
    this.gastof=obj.gastof
    this.tea=obj.tea

  },


  calcularTodo(){

    this.soluciones =[
      {id: 0, ndias:0, tep:0, d:0, descuento:0,costosIniciales:0.00, costosFinales:0, valorNeto:0, valorRecibido:0, Flujo:0, tcea:0 },
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
                    solucion.ndias = this.calcularDiferenciaFechas(this.fecha, e.fechaVencimiento),
                    solucion.tep = this.calcularTEP(solucion.ndias, this.dias, this.tea)*100,
                    solucion.d= this.calculard(solucion.tep)*100,
                    solucion.descuento = this.calcularDescuento(e.valorNominal, solucion.d),
                    solucion.costosIniciales = -1*this.gastoi,
                    solucion.costosFinales = -1*this.gastof,
                    solucion.valorNeto = this.calcularValorNeto(e.valorNominal, solucion.descuento),
                    solucion.valorRecibido = this.calcularValorRecibido(solucion.valorNeto, solucion.costosIniciales),
                    solucion.Flujo = this.calcularFlujo(e.valorNominal, solucion.costosFinales),
                    solucion.tcea = this.calcularTCEA(solucion.Flujo, solucion.valorRecibido, this.dias, solucion.ndias)*100


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
          console.log(e);
        });



  },

    calcularDiferenciaFechas( dia1 , dia2){

      let fechainicial= new Date(dia1)
      let fechafinal= new Date(dia2)

      if ((fechafinal-fechainicial)/(1000 *3600*24) > 0)
        return (fechafinal-fechainicial)/(1000 *3600*24)
      else return 0
    },
    calcularTEP(dias, dxa, tea){

    return (1+ tea/100)**(dias/dxa) -1

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
            console.log(e);
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
  this.calcularTodo()
  }
}
</script>

<style scoped>

</style>
