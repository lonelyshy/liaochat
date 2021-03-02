import store from "@/store"
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
    path: "/UserName",
    name: "UserName",
    component: () => {
      return import(
        /* webpackChunkName: "about" */ "../views/userInfo/UserName.vue"
      )
    }
  },
  {
    path: "/UserPic",
    name: "UserPic",
    component: () => {
      return import(
        /* webpackChunkName: "about" */ "../views/userInfo/UserPic.vue"
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
router.beforeEach((to, from, next) => {
  //全局前置守卫  为避免出现死循环 应该关注判断条件
  console.log("进入beforeEach")
  if (to.name === "UserName") {
    //
    next()
  } else if ((store.state as any).userInfo.userName === "") {
    console.log("当前还没有注册")
    next({ path: "/UserName" })
  } else {
    next()
  }
})

export default router
