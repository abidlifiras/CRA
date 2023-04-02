import { createRouter, createWebHashHistory } from "vue-router";
import formserver from "../views/formServer";

const routes = [
  {
    path: "/",
    name: "form",
    component: formserver,
  },
  {
    path: "/table",
    name: "tableServer",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/tableServer.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
