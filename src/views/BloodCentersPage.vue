<script setup lang="ts">
import { onMounted } from 'vue'
import { useBloodCentersStore } from '../store/useBloodCentersStore'
import type { BloodCenter } from '../models/BloodCenter'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Paginator from 'primevue/paginator'

const store = useBloodCentersStore()
const router = useRouter()

const load = async (page = 1) => {
  await store.fetchCenters(page, 10)
}

onMounted(() => load())

const toggleArchive = async (center: BloodCenter) => {
  await store.toggleArchive(center._id)
  await load(store.pagination?.page ?? 1)
}

const goEdit = (id: string) => {
  router.push(`/blood-centers/${id}`)
}
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round">

    <div class="flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="text-2xl font-bold mb-1">Blood Centers</h1>
        <small class="text-color-secondary">
          Total: {{ store.pagination?.total || 0 }}
        </small>
      </div>

      <Button
        label="Add Center"
        icon="pi pi-plus"
        @click="router.push('/blood-centers/create')"
      />
    </div>

    <DataTable
      :value="store.centers"
      :loading="store.loading"
      dataKey="_id"
      responsiveLayout="scroll"
      stripedRows
      size="small"
    >
      <Column header="Center">
        <template #body="{ data }">
          <div class="font-medium">{{ data.name }}</div>
          <small class="text-color-secondary">
            {{ data.phone }}
          </small>
        </template>
      </Column>

      <Column header="Address">
        <template #body="{ data }">
          <span class="text-sm">{{ data.address }}</span>
        </template>
      </Column>

      <Column header="Status">
        <template #body="{ data }">
          <Tag
            :value="data.archived ? 'Archived' : 'Active'"
            :severity="data.archived ? 'danger' : 'success'"
          />
        </template>
      </Column>

      <Column header="Actions" style="width: 150px">
        <template #body="{ data }">
          <Button
            icon="pi pi-pencil"
            severity="secondary"
            text
            rounded
            class="mr-2"
            v-tooltip.bottom="'Edit'"
            @click="goEdit(data._id)"
          />

          <Button
            :icon="data.archived ? 'pi pi-undo' : 'pi pi-ban'"
            :severity="data.archived ? 'success' : 'danger'"
            text
            rounded
            v-tooltip.bottom="data.archived ? 'Unarchive' : 'Archive'"
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
