<template>
  <div class="page">
    <header>
      <Navbar style="width: 100%;"></Navbar>
    </header>

    <div class="page__contents">

      <div class="page__contents__title">
        ユーザー管理 - 詳細
      </div>

      <b-breadcrumb :items="breadcrumb"></b-breadcrumb>

      <div class="page__contents__user">

        <table class="page__contents__user__tbl">
          <tr><th>ID.</th><td>{{user.id}}</td></tr>
          <tr><th>氏名</th><td>{{user.name}}</td></tr>
          <tr><th>カナ</th><td>{{user.name_kana}}</td></tr>
          <tr><th>emailアドレス</th><td>{{user.email}}</td></tr>
          <tr><th>パスワード</th><td>{{user.password}}</td></tr>
        </table>

        <div class="page__contents__user__controls">
          <b-button variant="outline-primary" @click="toBack">back</b-button>
          <b-button variant="primary" @click="toEdit">編集</b-button>
          <b-button variant="danger" @click="toDelete">削除</b-button>
        </div>

      </div>

    </div>

    <b-modal
      id="modal-delete"
      title="削除"
      @ok="toDeleteOk"
      @cancel="toDeleteCancel"
    >
      <p class="my-0">このユーザーを削除しますか？</p>
    </b-modal>

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
        { text: '', active: true }
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
    const params = {}
    params.id = this.$route.params.id
    this.user.load(params, (res) => {
      // パンくずリスト 設定
      this.breadcrumb[2].text = res.data.name
    }, (err) => {
      // 未ログイン状態なら Login へ遷移
      if (err.response.status === 401) {
        this.$router.push({ name: 'Login', params: {} })
      }
    })
  },

  methods: {
    /**
     * toBack
     */
    toBack () {
      this.$router.push({ name: 'UserList' })
    },

    /**
     * toEdit
     */
    toEdit () {
      //
      this.$router.push({ name: 'UserEdit', params: { id: this.$route.params.id } })
    },

    /**
     * toDelete
     */
    toDelete () {
      //
      this.$bvModal.show('modal-delete')
    },

    /**
     * toDelete - Ok
     */
    toDeleteOk () {
      //
      this.user.delete((res) => {
        // deleted successfully
        this.$router.push({ name: 'UserList', params: {} })
      }, (err) => {
        // 未ログイン状態なら Login へ遷移
        if (err.response.status === 401) {
          this.$router.push({ name: 'Login', params: {} })
        }
      })
    },

    /**
     * toDelete - Cancel
     */
    toDeleteCancel () {
      // do nothing...
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
