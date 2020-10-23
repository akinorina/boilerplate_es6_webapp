<template>
  <div class="page">
    <header>
      <Navbar style="width: 100%;"></Navbar>
    </header>

    <div class="page__title">
      To Do List - Login
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
      }
    }
  },

  props: {
  },

  methods: {
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
      console.log('form', this.form)
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
}

</style>
