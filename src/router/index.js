import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/home";
import minio from "@/components/minio";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect:'/minio',
    children:[
      {
        path: '/minio',
        name: 'minio',
        component:minio
      }, {
        path: '/upload',
        name: 'upload',
        component:()=>import("@/components/main/upload")
      },{
        path: '/test',
        name: 'test',
        component:()=>import("@/components/main/test")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
