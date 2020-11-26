<template>
  <div class="page">
    <header>
      <Navbar style="width: 100%;"></Navbar>
    </header>

    <div class="page__contents">

      <div class="page__contents__title">
        ユーザー管理 - 作成
      </div>

      <b-breadcrumb :items="breadcrumb"></b-breadcrumb>

      <div class="page__contents__user">

        <table class="page__contents__user__tbl">
          <tr><th>ID.</th><td>{{user.id}}</td></tr>
          <tr><th>氏名</th><td><b-form-input v-model="user.name" placeholder=""></b-form-input></td></tr>
          <tr><th>かな</th><td><b-form-input v-model="user.name_kana" placeholder=""></b-form-input></td></tr>
          <tr><th>emailアドレス</th><td><b-form-input v-model="user.email" placeholder=""></b-form-input></td></tr>
          <tr><th>パスワード</th><td><b-form-input type="password" v-model="user.password" placeholder=""></b-form-input></td></tr>
        </table>

        <div class="page__contents__user__controls">
          <b-button variant="outline-primary" @click="toBack">back</b-button>
          <b-button variant="danger" @click="createData">作成</b-button>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
//
import Navbar from '../../../components/Navbar'
//
import User from '../../../models/User'

export default {
  name: 'UserDetail',

  components: {
    Navbar
  },

  data: function () {
    return {
      //
      user: null,

      //
      breadcrumb: [
        { text: '管理画面', href: '#/management' },
        { text: 'ユーザー管理', href: '#/management/user' },
        { text: '新規作成', active: true }
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

  created () {
    //
    this.user = new User()
  },

  beforeMount () {
  },

  methods: {
    /**
     * toBack
     */
    toBack () {
      this.$router.push({ name: 'UserList', params: {} })
    },

    /**
     * createData
     */
    createData () {
      //
      this.user.create((res) => {
        //
        this.$router.push({ name: 'UserList', params: {} })
      }, (err) => {
        // 未ログイン状態なら Login へ遷移
        if (err.response.status === 401) {
          this.$router.push({ name: 'Login', params: {} })
        }
      })
    }
  }
}

</script>

<style scoped lang="scss">

.page {
  margin: 0;
  border: 0px red dashed;
  padding: 0px;

  &__contents {
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

    &__user {
      border: 3px #f0f0f0 solid;
      border-radius: 10px;
      margin: 0px;
      padding: 15px;

      &__tbl {
        border: 0px red solid;
        width: 600px;
        margin: 0 auto;

        font-size: 14pt;

        border-collapse: collapse;

        th, td {
          padding: 10px 20px;
          border: 1px #f0f0f0 solid;
        }
        th {
          text-align: right;
        }
        td {
          text-align: left;
        }
      }

      &__controls {
        margin-top: 15px;
        border: 0px red dashed;

        * {
          width: 100px;
          margin-right: 15px;
        }
      }
    }
  }
}

</style>
