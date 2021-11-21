<template>

<!--    <v-card width="400" class="mx-auto mt-5">-->
<!--      <v-card-title>-->
<!--        <h1 class="display-1">Login</h1>-->
<!--      </v-card-title>-->
<!--      <v-card-text>-->
<!--        <v-form ref="form">-->
<!--          <v-text-field-->
<!--              label="Mail"-->
<!--              v-model="mail"-->
<!--              prepend-icon="mdi-account-circle"/>-->
<!--          <v-text-field-->
<!--              :type="showPassword ? 'text': 'password'"-->
<!--              label="Password"-->
<!--              v-model="password"-->
<!--              prepend-icon="mdi-lock"-->
<!--              :append-icon="showPassword ?'mdi-eye':-->
<!--               'mdi-eye-off'"-->
<!--              @click:append="showPassword = !showPassword"-->
<!--          />-->
<!--        </v-form>-->
<!--      </v-card-text>-->
<!--      <v-divider></v-divider>-->
<!--      <v-card-actions>-->
<!--        <v-btn rounded outlined class ="mx-0 mt-3">Register</v-btn>-->

<!--        <v-spacer></v-spacer>-->
<!--        <v-btn rounded outlined class ="mx-0 mt-3" @click="validate">Login</v-btn>-->
<!--      </v-card-actions>-->
<!--    </v-card>-->


<div >
  <v-card class="mx-auto mt-5" max-width="600px" min-width="360px">
    <v-tabs
        v-model="tab"
        background-color="deep-purple accent-4"
        centered
        dark
        icons-and-text
    >
      <v-tabs-slider color="purple darken-4"></v-tabs-slider>
      <v-tab v-for="i in tabs" :key="i">
        <v-icon large>{{ i.icon }}</v-icon>
        <div class="caption py-1">{{ i.name }}</div>
      </v-tab>

    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item >
        <v-card class="px-4">
          <v-card-text>
            <v-card-text>
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
<!--                        <v-btn rounded outlined class ="mx-0 mt-3">Register</v-btn>-->

                        <v-spacer></v-spacer>
                        <v-btn rounded outlined class ="mx-0 mt-3" @click="validate">Login</v-btn>
                      </v-card-actions>

            </v-card-text>
          </v-card-text>
        </v-card>

      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-card-text>
              <v-card-text>
                <v-form ref="form">
<!--                  <v-text-field-->
<!--                      label="Mail"-->
<!--                      v-model="mail"-->
<!--                      prepend-icon="mdi-account-circle"/>-->
<!--                  <v-text-field-->
<!--                      :type="showPassword ? 'text': 'password'"-->
<!--                      label="Password"-->
<!--                      v-model="password"-->
<!--                      prepend-icon="mdi-lock"-->
<!--                      :append-icon="showPassword ?'mdi-eye':-->
<!--                               'mdi-eye-off'"-->
<!--                      @click:append="showPassword = !showPassword"-->
<!--                  />-->
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="item.nombre" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>
                    </v-col>
<!--                    <v-col cols="12" sm="6" md="6">-->
<!--                      <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>-->
<!--                    </v-col>-->
                    <v-col cols="12">
                      <v-text-field v-model="item.email" :rules="emailRules" label="E-mail" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="item.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>

                  </v-row>

                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn rounded outlined class ="mx-0 mt-3" @click="validateRegister">Register</v-btn>

                <v-spacer></v-spacer>
<!--                <v-btn rounded outlined class ="mx-0 mt-3" @click="validate">Login</v-btn>-->
              </v-card-actions>

            </v-card-text>
          </v-card-text>
        </v-card>
      </v-tab-item>



    </v-tabs-items>


  </v-card>

</div>



</template>


<script>
import UsersApiService from "@/services/users-api-service";

export default {
  name: "login",
  data(){
    return{
      tab: 0,
      dialog: true,
      valid :true,
      show1: false,
      mail:'',
      password:'',
      item:{
        nombre:'',
        email:'',
        password:''
      },
      tabs: [
        {name:"Login", icon:"mdi-account"},
        {name:"Register", icon:"mdi-account-outline"}
      ],
      usersAPI:[],
      loginEmailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      emailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 8) || "Min 8 characters"
      },
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
    },
    validateRegister(){

      if (this.$refs.form.validate()){
        let invalidado = true

        UsersApiService.getAll()
            .then(response => {
              this.usersAPI = response.data

              this.usersAPI.forEach(
                  e=>{
                    console.log(e)

                    if(this.mail != e.mail && this.password != e.password){
                      UsersApiService.create(this.item);
                      console.log(this.item)
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
