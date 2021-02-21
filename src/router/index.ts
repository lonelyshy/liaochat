import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
// import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Register",
    component: () => {
      return import(
        /* webpackChunkName: "about" */ "../views/register/index.vue"
      )
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {
      return import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
  },
  {
    path: "/ChatRoom",
    name: "ChatRoom",
    component: () => {
      return import(
        /* webpackChunkName: "ChatRoom" */ "../views/ChatRoom/index.vue"
      )
    }
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
