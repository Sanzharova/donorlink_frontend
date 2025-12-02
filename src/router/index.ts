import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/store/useAuthStore.ts";
import AdminLayout from "@/layouts/AdminLayout.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import UsersPage from "@/views/UsersPage.vue";
import BloodCentersPage from "@/views/BloodCentersPage.vue";
import BloodCenterEditPage from "@/views/BloodCenterEditPage.vue";
import BloodCenterCreatePage from "@/views/BloodCenterCreatePage.vue";
import DonationsPage from "@/views/DonationsPage.vue";
import DonationEditPage from "@/views/DonationEditPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";

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
      component: AdminLayout,
      children: [
        { path: '', name: 'dashboard', component: DashboardPage },
      ]
    },
    {
      path: '/users',
      name: 'users',
      component: UsersPage
    },
    {
      path: '/blood-centers',
      name: 'blood-centers',
      component: BloodCentersPage
    },
    {
      path: '/blood-centers/create',
      name: 'blood-centers-create',
      component: BloodCenterCreatePage
    },
    {
      path: '/blood-centers/:id',
      name: 'blood-centers-edit',
      component: BloodCenterEditPage
    },
    {
      path: '/donations',
      name: 'donations',
      component: DonationsPage
    },
    {
      path: '/donations/:id',
      name: 'donation-edit',
      component: DonationEditPage
    }

  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (!to.meta.public && !auth.isAuthenticated) {
    return '/login'
  }
});

export default router
