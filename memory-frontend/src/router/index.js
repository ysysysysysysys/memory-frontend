import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const login = () => import('@views/login/login')
const regist = () => import('@views/regist/regist')
const home = () => import('@views/home/home')
const self = () => import('@views/self/self')
const picture = () => import('@views/image/picture')
const videos = () => import('@views/video/videos')
const file = () => import('@views/file/file')
const videoLoad = () => import('@views/video/videoLoad')
const fileLoad = () => import('@views/file/fileLoad')
const pictureLoad = () => import('@views/image/pictureLoad')
const routes = [
  {
    path:'/',
    name:'login',
    component:login
  },
  {
    path:'/regist',
    name:'regist',
    component:regist
  },
  {
    path:'/home',
    name:'home',
    component:home
  },
  {
    path:'/self',
    name:'self',
    component:self
  },
  {
    path:'/videos',
    name:'videos',
    component:videos
  },
  {
    path:'/picture',
    name:'picture',
    component:picture
  },
  {
    path:'/file',
    name:'file',
    component:file
  },
  {
    path:'/videoLoad',
    name:'videoLoad',
    component:videoLoad
  },
  {
    path:'/fileLoad',
    name:'fileLoad',
    component:fileLoad
  },
  {
    path:'/pictureLoad',
    name:'pictureLoad',
    component:pictureLoad
  }

]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
