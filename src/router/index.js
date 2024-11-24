import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.Base_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/components/views/home/home.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/components/views/login/login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/components/views/register/register.vue"),
    },
  ],
});

export default router;
