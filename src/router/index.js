import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminLayout.vue"),
      children: [
        {
          path: "tags",
          component: () => import("../views/TagView.vue"),
        },
      ],
    },
  ],
});

export default router;
