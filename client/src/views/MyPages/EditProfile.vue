<template>
  <div class="page">
    <header>
      <Navbar style="width: 100%;"></Navbar>
    </header>

    <div class="page__contents">

      <div class="page__contents__title">
        MyPage - プロフィール編集
      </div>

      <b-breadcrumb :items="breadcrumb"></b-breadcrumb>

      <div class="page__contents__user">

        <table class="page__contents__user__tbl">
          <tr><th>ID.</th><td>{{user.id}}</td></tr>
          <tr><th>氏名</th><td><b-form-input v-model="user.name" placeholder=""></b-form-input></td></tr>
          <tr><th>かな</th><td><b-form-input v-model="user.name_kana" placeholder=""></b-form-input></td></tr>
          <tr><th>emailアドレス</th><td><b-form-input v-model="user.email" placeholder=""></b-form-input></td></tr>
        </table>

        <b-alert
          class="page__contents__user__alert"
          :show="alertData.countDown"
          :variant="alertData.variant"
          fade
          dismissible
          @dismissed="alertData.countDown=0"
          @dismiss-count-down="alertData.countDownChanged"
        >
          {{alertData.message}}
        </b-alert>

        <div class="page__contents__user__controls">
          <b-button variant="primary" @click="updateData">更新</b-button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
//
import Navbar from '../../components/Navbar'
//
import User from '../../models/User'

export default {
  name: 'UserDetail',

  components: {
    Navbar
  },

  data: function () {
    return {
      // ログインユーザー情報
      user: null,

      // Alert表示
      alertData: {
        message: '',
        countDown: 0,
        secs: 3,
        variant: '',
        countDownChanged: (dCountDown) => {
          this.alertData.countDown = dCountDown
        }
      },

      // パンくずリスト
      breadcrumb: [
        { text: 'My Pages', href: '#/mypage' },
        { text: 'プロフィール編集', active: true }
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
    //
    const loginUser = this.$store.getters.getUserData
    const params = { id: loginUser.user_id }
    this.user.load(params, (res) => {
      // success
    }, (err) => {
      // failure

      // 未ログイン状態なら Login へ遷移
      if (err.response.status === 401) {
        this.$router.push({ name: 'Login', params: {} })
      }
    })
  },

  methods: {
    /**
     * updateData
     */
    updateData () {
      //
      this.user.updateWithoutPassword((res) => {
        // success
        this.alertData.variant = 'success'
        this.alertData.message = 'プロフィール更新 完了。'
        this.alertData.countDown = this.alertData.secs
      }, (err) => {
        // 未ログイン状態なら Login へ遷移
        if (err.response.status === 401) {
          this.$router.push({ name: 'Login', params: {} })
        } else {
          this.alertData.variant = 'danger'
          this.alertData.message = 'プロフィール更新 失敗。'
          this.alertData.countDown = this.alertData.secs
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

      &__alert {
        width: 600px;
        margin: 10px auto;
      }
    }
  }
}

</style>
