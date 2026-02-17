import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/useAuthStore'

import DashboardPage from '@/views/DashboardPage.vue'
import UsersPage from '@/views/UsersPage.vue'
import BloodCentersPage from '@/views/BloodCentersPage.vue'
import BloodCenterEditPage from '@/views/BloodCenterEditPage.vue'
import BloodCenterCreatePage from '@/views/BloodCenterCreatePage.vue'
import DonationsPage from '@/views/DonationsPage.vue'
import DonationEditPage from '@/views/DonationEditPage.vue'

import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import UserLayout from "@/layouts/UserLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import UserDashboard from "@/views/UserDashboard.vue";
import MyDonationsPage from "@/views/MyDonationsPage.vue";
import RequestDonationPage from "@/views/RequestDonationPage.vue";
import UserBloodCentersPage from "@/views/UserBloodCentersPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import RulesPage from "@/views/RulesPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginPage,
      meta: { public: true }
    },
    {
      path: '/register',
      component: RegisterPage,
      meta: { public: true }
    },

    {
      path: '/',
      component: AdminLayout,
      meta: { requiresAdmin: true },
      children: [
        { path: '', component: DashboardPage },
        { path: 'users', component: UsersPage },
        { path: 'blood-centers', component: BloodCentersPage },
        { path: 'blood-centers/create', component: BloodCenterCreatePage },
        { path: 'blood-centers/:id', component: BloodCenterEditPage },
        { path: 'donations', component: DonationsPage },
        { path: 'donations/:id', component: DonationEditPage }
      ]
    },

    {
      path: '/app',
      component: UserLayout,
      children: [
        { path: '', component: UserDashboard },
        { path: 'blood-centers', component: UserBloodCentersPage },
        { path: 'my-donations', component: MyDonationsPage },
        { path: 'request-donation', component: RequestDonationPage },
        { path: 'my-profile', component: ProfilePage },
        { path: 'rules', component: RulesPage }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (!to.meta.public && !auth.isAuthenticated) {
    return '/login'
  }

  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return '/app'
  }
})

export default router
