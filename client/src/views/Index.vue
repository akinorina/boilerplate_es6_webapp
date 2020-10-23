<template>
  <div class="page">
    <header>
      <Navbar style="width: 100%;"></Navbar>
    </header>

    <div class="page__title">
      Index Page.
    </div>

  </div>
</template>

<script>
//
import Navbar from '../components/Navbar'

export default {
  name: 'Index',

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
