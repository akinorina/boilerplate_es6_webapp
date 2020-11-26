<template>
  <div class="page">
    <header>
      <Navbar style="width: 100%;"></Navbar>
    </header>

    <div class="page__contents">

      <div class="page__contents__title">
        MyPage - パスワード変更
      </div>

      <b-breadcrumb :items="breadcrumb"></b-breadcrumb>

      <div class="page__contents__user">

        <table class="page__contents__user__tbl">
          <tr><th>現在のパスワード</th><td><b-form-input type="password" v-model="Passwords.current" placeholder=""></b-form-input></td></tr>
          <tr><th>新しいパスワード</th><td><b-form-input type="password" v-model="Passwords.new" placeholder=""></b-form-input></td></tr>
          <tr><th>新しいパスワード再入力</th><td><b-form-input type="password" v-model="Passwords.new2" placeholder=""></b-form-input></td></tr>
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
          <b-button variant="primary" @click="changePassword">更新</b-button>
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
  name: 'ChangePassword',

  components: {
    Navbar
  },

  data: function () {
    return {
      // ユーザー情報
      user: null,

      // パスワード新旧データ
      Passwords: {
        current: '',
        new: '',
        new2: ''
      },

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
        { text: 'パスワード変更', active: true }
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
    // ログイン情報
    const LoginUser = this.$store.getters.getUserData
    // console.log('LoginUser', LoginUser)

    // ログイン中のユーザー情報 取得
    this.user.load({ id: LoginUser.user_id }, (res) => {
      //
    }, (err) => {
      // 未ログイン状態なら Login へ遷移
      if (err.response.status === 401) {
        this.$router.push({ name: 'Login', params: {} })
      }
    })
  },

  methods: {
    /**
     * [event handler]: パスワード更新
     */
    changePassword () {
      //
      if (this.Passwords.new !== this.Passwords.new2) {
        this.alertData.variant = 'danger'
        this.alertData.message = '新しいパスワードの２度の入力が不一致です。'
        this.alertData.countDown = this.alertData.secs
        return
      }
      const params = { id: '', password: '', new_password: '' }
      params.id = this.user.id
      params.password = this.Passwords.current
      params.new_password = this.Passwords.new

      // パスワード変更 実行
      this.user.changePassword(params, (res) => {
        //
        if (res.code === 0) {
          // パスワード変更 成功
          this.alertData.variant = 'success'
          this.alertData.message = 'パスワードの更新が完了しました。'
          this.alertData.countDown = this.alertData.secs
        } else if (res.code === 1001) {
          // パスワード変更 失敗: 現在のパスワード不一致
          this.alertData.variant = 'danger'
          this.alertData.message = '現在のパスワードに誤りがあります。'
          this.alertData.countDown = this.alertData.secs
        } else {
          // パスワード変更 失敗
          this.alertData.variant = 'danger'
          this.alertData.message = 'パスワードの更新に失敗しました。'
          this.alertData.countDown = this.alertData.secs
        }
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
          text-align: left;
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
