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
      }

    ]
  }
  , {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
