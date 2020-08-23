import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('@/views/home/home')
const Vpn = () => import('@/views/vpn/vpn')
const TeacherLogin = () => import('@/views/login/teacherLogin')
const StudentLogin = () => import('@/views/login/studentLogin')
const NextLogin = () => import('@/views/login/nextLogin')
const SystemLogin = () => import('@/views/login/systemLogin')
const UserInformation = () => import('@/views/login/nextLoginChildViews/userInformation')
const ConnectManage = () => import('@/views/login/nextLoginChildViews/connectManage')
const SelectUsers = () => import('@/views/termStart/selectUsers')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/vpn',
    name: 'vpn',
    component: Vpn
  },
  {
    path: '/login/teacher',
    name: 'teacherlogin',
    component: TeacherLogin
  },
  {
    path: '/login/student',
    name: 'studentlogin',
    component: StudentLogin
  },
  {
    path: '/login/next',
    name: 'nextlogin',
    component: NextLogin
  },
  {
    path: '/login/system',
    name: 'systemlogin',
    component: SystemLogin
  },
  {
    path: '/login/next/user',
    name: 'userInformation',
    component: UserInformation
  },
  {
    path: '/login/next/connect-manage',
    name: 'connectManage',
    component: ConnectManage
  },
  {
    path: 'login/AdminSelect',
    name: 'AdminSelect',
    component: SelectUsers
  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
