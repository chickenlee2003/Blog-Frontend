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
        {
          path: "posts",
          component: () => import("../views/CreatePostView.vue"),
        },
      ],
    },
    {
      path: "/",
      name: "client", 
      component: () => import("../views/ClientLayout.vue"),
    }
  ],
});

export default router;
