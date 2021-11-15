<template>

<v-app>


  <router-view></router-view>
</v-app>

</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>


export default {
  components: {},
  data: () => ({
    drawer: null,
    items: [
      { title: 'Inicio', icon: 'mdi-view-dashboard', to: '/inicio' },
      { title: 'Clientes', icon: 'mdi-account', to: '/clientes' },
      { title: 'Carteras al descuento', icon: 'mdi-wallet', to: '/carteras' },
      { title: 'Acerca de', icon: 'mdi-help-box', to: '/acerca' },
    ],

    right: null,

    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>
