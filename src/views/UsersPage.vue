<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsersStore } from '../store/useUsersStore'
import type { User } from '../models/User'

import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Paginator from 'primevue/paginator'
import {useAuthStore} from "@/store/useAuthStore.ts";

const store = useUsersStore()

const load = async (page = 1) => {
  await store.fetchUsers(page, 10)
}

onMounted(() => load())

const toggleBan = async (u: User) => {
  try {
    store.loading = true;
    await store.toggleBan(u._id)
    await load(store.pagination?.page ?? 1)
  } finally {
    store.loading = false;
  }
}

const isAdmin = (u: User) => u.roles.includes('admin');

const toggleAdmin = async (u: User) => {
  try {
    store.loading = true
    await store.toggleAdmin(u._id)
    await load(store.pagination?.page ?? 1)
  } finally {
    store.loading = false
  }
}
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="flex align-items-center justify-content-between mb-4">
      <div>
        <h1 class="text-2xl font-bold m-0">Users</h1>
        <h1 v-if="useAuthStore().isAdmin"> Users </h1>
        <span class="text-sm text-500">Manage platform users</span>
      </div>
    </div>

    <DataTable
      :value="store.users"
      :loading="store.loading"
      showGridlines
      stripedRows
      class="p-datatable-sm"
    >
      <Column field="fullName" header="Full Name" />
      <Column field="email" header="Email" />
      <Column field="phone" header="Phone" />

      <Column header="Gender" style="width:120px">
        <template #body="{ data }">
          <Tag
            :value="data.gender"
            severity="info"
            class="capitalize"
          />
        </template>
      </Column>

      <Column header="Status" style="width:120px">
        <template #body="{ data }">
          <Tag
            :value="data.status"
            :severity="data.status === 'active' ? 'success' : 'danger'"
          />
        </template>
      </Column>

      <Column header="Role" style="width:120px">
        <template #body="{ data }">
          <Tag
            :value="isAdmin(data) ? 'Admin' : 'User'"
            :severity="isAdmin(data) ? 'warning' : 'info'"
          />
        </template>
      </Column>

      <Column header="Actions" style="width: 140px">
        <template #body="{ data }">
          <div class="flex gap-2">

            <Button
              :icon="isAdmin(data) ? 'pi pi-shield-slash' : 'pi pi-shield'"
              :severity="isAdmin(data) ? 'contrast' : 'info'"
              text
              rounded
              v-tooltip.bottom="isAdmin(data) ? 'Revoke admin' : 'Make admin'"
              @click="toggleAdmin(data)"
            />

            <Button
              :icon="data.status === 'active' ? 'pi pi-ban' : 'pi pi-undo'"
              :severity="data.status === 'active' ? 'danger' : 'success'"
              text
              rounded
              v-tooltip.bottom="data.status === 'active' ? 'Ban user' : 'Unban user'"
              @click="toggleBan(data)"
            />

          </div>
        </template>
      </Column>
    </DataTable>

    <Paginator
      v-if="store.pagination"
      :rows="store.pagination.limit"
      :totalRecords="store.pagination.total"
      @page="e => load(e.page + 1)"
      class="mt-3"
    />
  </div>
</template>
