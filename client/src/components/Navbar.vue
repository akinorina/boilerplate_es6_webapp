<template>
  <div class="navbar">

    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">WebApp</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="this.$store.getters.getResult">
          <b-nav-item href="#/app">INDEX</b-nav-item>
          <b-nav-item href="#/app/page001">Page001</b-nav-item>
          <b-nav-item href="#/app/page002">Page002</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-navbar-nav right class="mr-3" v-if="activeUserResult">
            <b-nav-item><em>User</em></b-nav-item>
            <b-button size="sm" class="my-2 mr-sm-0" type="submit" @click="logout">logout</b-button>
          </b-navbar-nav>
          <b-navbar-nav right v-else>
            <b-button size="sm" class="my-2 mr-sm-0" type="submit" @click="login">login</b-button>
          </b-navbar-nav>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

  </div>
</template>

<script>
export default {
  name: 'Navbar',

  components: {
  },

  data: function () {
    return {
      logined: true
    }
  },

  props: {
    msg: String
  },

  computed: {
    //
    activeUserResult () {
      return this.$store.getters.getResult
    }
  },

  methods: {
    //
    login () {
      //
      this.$router.push({ name: 'Login' })
    },

    logout () {
      //
      const logoutPayload = {}
      logoutPayload.successCallback = () => {
        this.$router.push({ name: 'Logout' })
      }
      logoutPayload.failureCallback = () => {
        this.$router.push({ name: 'Logout' })
      }
      //
      this.$store.dispatch('logout', logoutPayload)
    }
  }
}
</script>

<style scoped lang="scss">

.navbar {
  width: 100%;
}

</style>
