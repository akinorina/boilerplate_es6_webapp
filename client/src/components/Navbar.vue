<template>
  <div class="navbar">

    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class="mx-3" href="#">WebApp</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="isAuthenticated">
          <b-nav-item href="#/app">app</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right v-if="isAuthenticated">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ userName }}</em>
            </template>
            <b-dropdown-item @click="toEditProfile">プロフィール編集</b-dropdown-item>
            <b-dropdown-item @click="toChangePassword">パスワード変更</b-dropdown-item>
            <b-dropdown-item @click="toManagement">管理</b-dropdown-item>
            <b-dropdown-item @click="logout">logout</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-navbar-nav right v-else>
            <b-button size="sm" class="my-2 mr-sm-2" type="submit" @click="login">login</b-button>
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
    }
  },

  props: {
  },

  computed: {
    //
    userName () {
      return this.$store.getters.getUserName
    },

    //
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
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
    },

    /**
     * toManagement
     */
    toManagement () {
      this.$router.push({ name: 'Management' })
    },

    /**
     * toChangePassword
     */
    toChangePassword () {
      this.$router.push({ name: 'ChangePassword' })
    },

    /**
     * toEditProfile
     */
    toEditProfile () {
      this.$router.push({ name: 'EditProfile' })
    }
  }
}
</script>

<style scoped lang="scss">

.navbar {
  padding: 0;
  width: 100%;
}

</style>
