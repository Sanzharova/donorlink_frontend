<script setup lang="ts">
import {useAuthStore} from "@/store/useAuthStore.ts";
import {useRouter} from "vue-router";
import {ref} from "vue";
import Button from "primevue/button";
import Divider from "primevue/divider";

const authStore = useAuthStore()
const router = useRouter()

const sidebarOpen = ref(true)

const logout = async () => {
  await authStore.logout()
  await router.push('/login')
}
</script>

<template>
  <div class="flex min-h-screen bg-surface-100">

    <aside
      v-if="sidebarOpen"
      class="sidebar surface-card shadow-2 flex flex-column"
    >
      <router-link to="/" class="logo">
        <img src="/public/logo.png" alt="DonorLink" />
        <span>DonorLink</span>
      </router-link>

      <ul class="list-none p-0 m-0 flex-1">

        <li>
          <router-link to="/app" class="sidebar-item">
            <i class="pi pi-home"></i>
            <span>Dashboard</span>
          </router-link>
        </li>

        <li>
          <router-link to="/app/blood-centers" class="sidebar-item">
            <i class="pi pi-building"></i>
            <span>Blood Centers</span>
          </router-link>
        </li>

        <li>
          <router-link to="/app/my-donations" class="sidebar-item">
            <i class="pi pi-heart"></i>
            <span>My donations</span>
          </router-link>
        </li>

        <li>
          <router-link to="/app/my-profile" class="sidebar-item">
            <i class="pi pi-user"></i>
            <span>Profile</span>
          </router-link>
        </li>
      </ul>

      <Divider />

      <Button
        label="Logout"
        icon="pi pi-sign-out"
        severity="danger"
        class="w-full"
        @click="logout"
      />
    </aside>

    <main class="flex-1 p-4">
      <router-view />
    </main>

  </div>
</template>

<style scoped>
.sidebar {
  width: 260px;
  padding: 1.25rem;
  border-radius: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text-color);
  text-decoration: none;
}

.logo img {
  width: 28px;
  height: 28px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.65rem 0.8rem;
  border-radius: 8px;
  color: var(--text-color);
  text-decoration: none;
  transition: background-color 0.15s ease, color 0.15s ease;
  margin-bottom: 0.25rem;
}

.sidebar-item:hover {
  background: var(--surface-hover);
}

.router-link-active {
  background: var(--primary-100);
  color: var(--primary-700) !important;
}
</style>
