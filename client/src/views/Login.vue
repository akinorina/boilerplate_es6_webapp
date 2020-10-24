<template>
  <div class="page">
    <header>
      <Navbar style="width: 100%;"></Navbar>
    </header>

    <div class="page__title">
      To Do List - Login
    </div>

    <div>
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="warning"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        emailアドレス、または、パスワードに誤りがあります。
      </b-alert>
    </div>

    <b-form @submit.prevent="onSubmit" class="page__form">

      <b-form-group
        id="input-group-1"
        label-cols-sm="4"
        label="Email address:"
        label-for="input-email"
        description=""
      >
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email address."
          :formatter="formatter"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label-cols-sm="4"
        label="password:"
        label-for="input-password"
        description=""
      >
        <b-form-input
          id="input-password"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password."
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>

    <div class="page__links">
      <router-link :to="{ name: 'Index', params: {} }" >TOPへ戻る</router-link>
    </div>

  </div>
</template>

<script>
//
import Navbar from '../components/Navbar'

export default {
  name: 'Login',

  components: {
    Navbar
  },

  data: function () {
    return {
      form: {
        email: '',
        password: ''
      },

      //
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },

  props: {
  },

  methods: {
    /**
     * show alert.
     */
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    /**
     * formatter - lower case に変換
     */
    formatter (value) {
      return value.toLowerCase()
    },

    /**
     * onSubmit()
     */
    onSubmit () {
      //
      const loginPayload = {}
      loginPayload.form = this.form
      loginPayload.successCallback = (res) => {
        if (res.result === 'ok') {
          this.$router.push({ name: 'AppIndex' })
        } else {
          this.dismissCountDown = this.dismissSecs
        }
      }
      loginPayload.failureCallback = () => {
        this.dismissCountDown = this.dismissSecs
      }
      //
      this.$store.dispatch('login', loginPayload)
    }
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

  &__form {
    margin: 0 auto;
    max-width: 500px;
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
