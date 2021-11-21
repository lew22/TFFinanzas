<template>

    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
              label="Mail"
              v-model="mail"
              prepend-icon="mdi-account-circle"/>
          <v-text-field
              :type="showPassword ? 'text': 'password'"
              label="Password"
              v-model="password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ?'mdi-eye':
               'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn rounded outlined class ="mx-0 mt-3">Register</v-btn>
        <v-spacer></v-spacer>
        <v-btn rounded outlined class ="mx-0 mt-3" @click="validate">Login</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import UsersApiService from "@/services/users-api-service";

export default {
  name: "login",
  data(){
    return{
      mail:'',
      password:'',

      usersAPI:[],

      inputRulesUser:[

        v => v == v||'Por favor complete con un numero de DNI valido',

      ],
      inputRulesPassword:[

        v => (v >=10000000 && v<=99999999) ||'Por favor complete con un numero de DNI valido',

      ],

      showPassword: false
    }
  },

  methods:{
    onResize(){
      if(window.innerWidth < 769)
        this.isMobile = true;
      else
        this.isMobile = false;

    },
    navigateToApp() {
      this.$router.push({name: 'Inicio'});
    },
    maper(info){
      return{
        mail: info.mail,
        password: info.password,
        nombre: info.nombre,
      }

    },
    validate(){

      if (this.$refs.form.validate()){
        let invalidado = true

        UsersApiService.getAll()
            .then(response => {
              this.usersAPI = response.data

              this.usersAPI.forEach(
                  e=>{
                    console.log(e)

                     if(this.mail ==e.mail && this.password == e.password){

                       invalidado =false
                      this.navigateToApp()

                    }

                  }
              )
            })
            .catch((e) => {
              console.log(e);
            });



        if(invalidado){
         console.log('Correo o contraseña no validos')}

      }
    }
  }
}
</script>

<style scoped>

</style>
