<template>
  <div class="page">
    <header>
      <Navbar style="width: 100%;"></Navbar>
    </header>

    <div class="page__title">
      App - Index Page.
    </div>

  </div>
</template>

<script>
//
import Navbar from '../../components/Navbar'

export default {
  name: 'app-index',

  components: {
    Navbar
  },

  data: function () {
    return {}
  },

  props: {
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
}

</style>
