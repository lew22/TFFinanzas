<template>
  <v-app id="inspire" class="blue-grey lighten-3">
    <v-navigation-drawer
        v-model="drawer"
        app
        class ="blue "
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/profile1.jpg" alt="">
          </v-avatar>
          <p class=" mt-2 ">
            Andree Liñan</p>
        </v-flex>
      </v-layout>
      <v-list-item  >
        <v-list-item-content  >
          <v-list-item-title class="text-h6">

          </v-list-item-title>
          <v-list-item-subtitle>

          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to = "item.to"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app class="blue">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Applicacion de cartera de letras al descuento</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: "navbar",
  data: () => ({
    drawer: null,
    items: [
      { title: 'Inicio', icon: 'mdi-view-dashboard', to: '/inicio' },
      { title: 'Clientes', icon: 'mdi-account', to: '/clientes' },
      { title: 'Carteras al descuento', icon: 'mdi-wallet', to: '/carteras' },

    ],


    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
  methods:{

  }
}
</script>

<style scoped>

</style>
