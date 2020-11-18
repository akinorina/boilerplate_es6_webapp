import Vue from 'vue'
import VueRouter from 'vue-router'

//
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'

// Management
import Management from '../views/Management/Management'
import UserList from '../views/Management/User/List'
import UserDetail from '../views/Management/User/Detail'
import UserEdit from '../views/Management/User/Edit'
import UserCreate from '../views/Management/User/Create'

//
import AppIndex from '../views/app/Index'
import AppPage001 from '../views/app/Page001'
import AppPage002 from '../views/app/Page002'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },

  {
    path: '/management',
    name: 'Management',
    component: Management
  },
  {
    path: '/management/user',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/management/user/detail/:id',
    name: 'UserDetail',
    component: UserDetail
  },
  {
    path: '/management/user/edit/:id',
    name: 'UserEdit',
    component: UserEdit
  },
  {
    path: '/management/user/create',
    name: 'UserCreate',
    component: UserCreate
  },

  {
    path: '/app',
    name: 'AppIndex',
    component: AppIndex
  },
  {
    path: '/app/page001',
    name: 'AppPage001',
    component: AppPage001
  },
  {
    path: '/app/page002',
    name: 'AppPage002',
    component: AppPage002
  }
]

const router = new VueRouter({
  routes
})

export default router
