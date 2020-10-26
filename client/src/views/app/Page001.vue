<template>
  <div class="page">
    <header>
      <Navbar style="width: 100%;"></Navbar>
    </header>

    <div class="page__title">
      App - page001 Page.
    </div>

    <div class="page__links">
      <ul>
        <li><router-link :to="{ name: 'AppIndex', params: {} }" >App - Index</router-link></li>
        <li><router-link :to="{ name: 'AppPage001', params: {} }" >App - Page001</router-link></li>
        <li><router-link :to="{ name: 'AppPage002', params: {} }" >App - Page002</router-link></li>
      </ul>
    </div>

  </div>
</template>

<script>
//
import Navbar from '../../components/Navbar'

export default {
  name: 'app-page001',

  components: {
    Navbar
  },

  data: function () {
    return {}
  },

  props: {
  },

  beforeCreate () {
    // is authenticated?
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push({ name: 'Login' })
    }
  },

  methods: {
  }
}
</script>

<style scoped lang="scss">

.page {

  &__title {
    height: 100px;
    padding: 30px;
    font-size: 24pt;
    font-weight: bold;
    margin-bottom: 50px;
  }

  &__links {
    border: 1px #e0e0e0 dashed;
    margin: 8px 16px;
    padding: 8px 16px;

    ul {
      margin: 10px;

      li {
        display: inline-block;
        margin: 0;
        border-right: 1px #e0e0e0 solid;
        padding: 0 10px;
        list-style-type: none;
      }
      li:last-child {
        border-right-width: 0;
      }
    }
  }

}

</style>
