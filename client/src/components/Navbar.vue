<template>
  <div class="navbar">

    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">WebApp</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link001</b-nav-item>
          <b-nav-item href="#">Link002</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-navbar-nav right class="mr-3">
            <b-nav-item><em>User</em></b-nav-item>
            <b-button size="sm" class="my-2 mr-sm-0" type="submit" @click="$router.push({ name: 'Logout' })">Sign out</b-button>
          </b-navbar-nav>
          <b-navbar-nav right>
            <b-button size="sm" class="my-2 mr-sm-0" type="submit" @click="$router.push({ name: 'Login' })">Sign in</b-button>
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

  methods: {
  }
}
</script>

<style scoped lang="scss">

.navbar {
  width: 100%;
}

</style>
