<template>
  <div class="page">
    <header>
      <Navbar style="width: 100%;"></Navbar>
    </header>

    <div class="page__contents">

      <div class="page__contents__title">
        ユーザー管理
      </div>

      <b-breadcrumb :items="breadcrumb"></b-breadcrumb>

      <div class="page__contents__users">

        <div class="page__contents__users__controls">
          <b-button variant="primary" @click="makeNew">新規作成</b-button>
          <b-button variant="outline-primary" @click="prevList">&lt;</b-button>
          <b-button variant="outline-primary" @click="nextList">&gt;</b-button>
        </div>

        <b-table striped hover
          :items="userList.users"
          :fields="[
            { key: 'id', label: 'ID.' },
            { key: 'name', label: '氏名' },
            { key: 'name_kana', label: 'カナ' },
            { key: 'email', label: 'emailアドレス' },
            { key: 'password', label: 'パスワード' }
          ]"
          @row-clicked="selectUser"
        ></b-table>

      </div>

    </div>

  </div>
</template>

<script>
//
import Navbar from '../../../components/Navbar'
//
import UserList from '../../../models/UserList'

export default {
  name: 'Index',

  components: {
    Navbar
  },

  data: function () {
    return {
      //
      userList: {
        users: []
      },

      //
      userParams: {
        offset: 0,
        limit: 10,
        total: 0
      },

      //
      breadcrumb: [
        { text: '管理画面', href: '#/management' },
        { text: 'ユーザー管理', active: true }
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
    this.userList = new UserList()
  },

  beforeMount () {
    //
    this.searchUsers()
  },

  methods: {
    /**
     * prevList
     */
    prevList () {
      //
      if (this.userParams.offset - this.userParams.limit >= 0) {
        //
        this.userParams.offset -= this.userParams.limit
        //
        this.searchUsers()
      }
    },

    /**
     * nextList
     */
    nextList () {
      //
      if (this.userParams.offset + this.userParams.limit < this.userParams.total) {
        //
        this.userParams.offset += this.userParams.limit
        //
        this.searchUsers()
      }
    },

    /**
     * selectUser
     */
    selectUser (item, index, event) {
      //
      this.$router.push({ name: 'UserDetail', params: { id: item.id } })
    },

    /**
     * makeNew
     */
    makeNew () {
      //
      this.$router.push({ name: 'UserCreate', params: {} })
    },

    /**
     * search Users
     */
    searchUsers () {
      //
      this.userList.load(this.userParams, (res) => {
        this.userParams.total = res.total
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

    &__users {
      border: 3px #f0f0f0 solid;
      border-radius: 10px;
      margin: 0px;
      padding: 15px;

      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;

      &__controls {
        margin-bottom: 15px;
        border: 0px red dashed;

        * {
          // width: 100px;
          margin-right: 15px;
        }
      }
    }
  }
}

</style>
