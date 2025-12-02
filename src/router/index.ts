import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/store/useAuthStore.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { public: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: { public: true },
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage,
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (!to.meta.public && !auth.isAuthenticated) {
    return '/login'
  }
});

export default router
