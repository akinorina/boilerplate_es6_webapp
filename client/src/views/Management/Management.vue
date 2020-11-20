<template>
  <div class="page">
    <header>
      <Navbar style="width: 100%;"></Navbar>
    </header>

    <div class="page__contents">

      <div class="page__contents__title">
        管理画面
      </div>

      <b-breadcrumb :items="breadcrumb"></b-breadcrumb>

      <div class="page__contents__contents">

        <div class="page__contents__contents__item" @click="$router.push({ name: 'UserList' })">
          User管理
        </div>

      </div>

    </div>

  </div>
</template>

<script>
//
import Navbar from '../../components/Navbar'

export default {
  name: 'Index',

  components: {
    Navbar
  },

  data: function () {
    return {
      breadcrumb: [
        { text: '管理画面', active: true }
      ]
    }
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
  margin: 0;
  border: 0px red dashed;
  padding: 0px;

  &__contents {
    border: 0px purple solid;
    padding: 15px;

    &__title {
      padding: 15px;
      margin: 0px;
      border: 3px #f0f0f0 solid;
      border-radius: 10px;

      font-size: 24pt;
      font-weight: bold;
      margin-bottom: 10px;
    }

    &__contents {
      border: 3px #f0f0f0 solid;
      border-radius: 10px;
      margin: 0px;
      padding: 15px;

      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;

      &__item{
        width: 200px;
        height: 100px;
        border: 1px #f0f0f0 solid;
        border-radius: 10px;
        margin: 5px;
        background: #f8f8f8;
        vertical-align: middle;
        text-align: center;
        line-height: 100px;
        font-size: 18pt;
        cursor: pointer;
      }
    }

  }

}

</style>
