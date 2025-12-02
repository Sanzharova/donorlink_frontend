<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsersStore } from '../store/useUsersStore'
import type { User } from '../models/User'

import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Paginator from 'primevue/paginator'

const store = useUsersStore();

const load = async (page = 1) => {
  await store.fetchUsers(page, 10);
}

onMounted(async () => {
  await load();
})

const toggleBan = async (u: User) => {
  await store.toggleBan(u._id);
  await load(store.pagination?.page ?? 1);
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Users</h1>

    <DataTable
      :value="store.users"
      class="p-datatable-sm shadow-2"
      :loading="store.loading"
      showGridlines
    >
      <Column field="fullName" header="Full Name" />
      <Column field="email" header="Email" />
      <Column field="phone" header="Phone" />

      <Column header="Gender">
        <template #body="{ data }">
          <Tag :value="data.gender" severity="info" />
        </template>
      </Column>

      <Column header="Status">
        <template #body="{ data }">
          <Tag
            :value="data.status"
            :severity="data.status === 'active' ? 'success' : 'danger'"
          />
        </template>
      </Column>

      <Column header="Actions" style="width:150px">
        <template #body="{ data }">
          <Button
            label="Ban/Unban"
            size="small"
            severity="warning"
            @click="toggleBan(data)"
            class="mr-2"
          />
          <Button
            label="Edit"
            size="small"
            severity="secondary"
            disabled
          />
        </template>
      </Column>
    </DataTable>

    <div class="mt-3">
      <Paginator
        v-if="store.pagination"
        :rows="store.pagination.limit"
        :totalRecords="store.pagination.total"
        @page="(e) => load(e.page + 1)"
      />
    </div>
  </div>
</template>
