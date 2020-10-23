<template>
  <div id="app">

    <div class="nav__links">
      <ul>
        <li><router-link :to="{ name: 'Index', params: {} }">トップページ</router-link></li>
        <li><router-link :to="{ name: 'Login', params: {} }" >ログイン</router-link></li>
        <li><router-link :to="{ name: 'Logout', params: {} }" >ログアウト</router-link></li>
        <li><router-link :to="{ name: 'AppIndex', params: {} }" >App - Index</router-link></li>
        <li><router-link :to="{ name: 'AppPage001', params: {} }" >App - Page001</router-link></li>
        <li><router-link :to="{ name: 'AppPage002', params: {} }" >App - Page002</router-link></li>
      </ul>
    </div>

    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.nav__links {
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

</style>
