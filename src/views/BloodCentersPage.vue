<script setup lang="ts">
import { onMounted } from 'vue'
import { useBloodCentersStore } from '../store/useBloodCentersStore'
import type { BloodCenter } from '../models/BloodCenter'

import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Paginator from 'primevue/paginator'
import { useRouter } from 'vue-router'

const store = useBloodCentersStore()
const router = useRouter()

const load = async (page = 1) => {
  await store.fetchCenters(page, 10)
}

onMounted(() => load())

const toggleArchive = async (center: BloodCenter) => {
  await store.toggleArchive(center._id)
  load(store.pagination?.page ?? 1)
}

const goEdit = (id: string) => {
  router.push(`/blood-centers/${id}`)
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Blood Centers</h1>

    <div class="mb-3">
      <Button label="Add Center" icon="pi pi-plus" @click="router.push('/blood-centers/create')" />
    </div>

    <DataTable :value="store.centers" :loading="store.loading" showGridlines>
      <Column field="name" header="Name" />
      <Column field="address" header="Address" />
      <Column field="phone" header="Phone" />

      <Column header="Status">
        <template #body="{ data }">
          <Tag :value="data.archived ? 'Archived' : 'Active'" :severity="data.archived ? 'danger' : 'success'" />
        </template>
      </Column>

      <Column header="Actions">
        <template #body="{ data }">
          <Button
            icon="pi pi-pencil"
            class="mr-2"
            severity="secondary"
            @click="goEdit(data._id)"
          />
          <Button
            :label="data.archived ? 'Unarchive' : 'Archive'"
            severity="warning"
            @click="toggleArchive(data)"
          />
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
