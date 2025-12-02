<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/useAuthStore'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Divider from 'primevue/divider'

const authStore = useAuthStore();
const router = useRouter();

const sidebarOpen = ref(true);

const logout = async () => {
  await authStore.logout();
  await router.push('/login');
}
</script>

<template>
  <div class="flex min-h-screen">

    <aside
      v-if="sidebarOpen"
      class="surface-50 border-right-1 surface-border p-4 flex flex-column"
      style="width: 250px"
    >
      <h2 class="font-bold text-xl mb-5">DonorLink</h2>

      <ul class="list-none p-0 m-0 flex-1">
        <li class="mb-2">
          <router-link
            to="/"
            class="sidebar-item"
          >
            <i class="pi pi-home mr-2"></i>
            Dashboard
          </router-link>
        </li>

        <li class="mb-2">
          <router-link
            to="/users"
            class="sidebar-item"
          >
            <i class="pi pi-users mr-2"></i>
            Users
          </router-link>
        </li>

        <li class="mb-2">
          <router-link
            to="/blood-centers"
            class="sidebar-item"
          >
            <i class="pi pi-building mr-2"></i>
            Blood Centers
          </router-link>
        </li>

        <li class="mb-2">
          <router-link
            to="/donations"
            class="sidebar-item"
          >
            <i class="pi pi-heart mr-2"></i>
            Donations
          </router-link>
        </li>
      </ul>

      <Divider />

      <Button
        label="Logout"
        icon="pi pi-sign-out"
        class="p-button-danger w-full"
        @click="logout"
      />
    </aside>

    <div class="flex-1 p-4">
      <router-view />
    </div>

  </div>
</template>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  padding: 0.7rem 0.8rem;
  border-radius: 6px;
  color: var(--text-color);
  text-decoration: none;
  transition: background 0.15s;
}

.sidebar-item:hover {
  background: var(--surface-hover);
}

.router-link-active {
  background: var(--primary-100);
  color: var(--primary-700) !important;
}
</style>
