<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useDonationsStore} from '@/store/useDonationsStore'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Paginator from 'primevue/paginator'
import {useBloodCentersStore} from "@/store/useBloodCentersStore.ts";

const store = useDonationsStore()
const centersStore = useBloodCentersStore()

const load = async (page = 1) => {
  await store.fetchMyDonations(page, 10);
  await centersStore.fetchCenters(1, 500);
}

const centerById = computed(() => {
  const m = new Map<string, string>()
  for (const c of centersStore.centers) m.set(c._id, c.name)
  return m
})

const getCenterName = (centerId: string | any) => {
  if (!centerId) return '-'
  if (typeof centerId === 'object' && centerId.name) return centerId.name
  return centerById.value.get(String(centerId)) ?? String(centerId)
}

onMounted(() => load());
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="mb-4">
      <h1 class="text-2xl font-bold">My Donations</h1>
      <small class="text-color-secondary">
        Total: {{ store.pagination?.total || 0 }}
      </small>
    </div>

    <DataTable
      :value="store.donations"
      :loading="store.loading"
      stripedRows
      size="small"
    >
      <Column header="Center">
        <template #body="{ data }">
          {{ getCenterName(data.centerId) }}
        </template>
      </Column>

      <Column header="Status">
        <template #body="{ data }">
          <Tag :value="data.status"/>
        </template>
      </Column>

      <Column header="Scheduled">
        <template #body="{ data }">
          {{ new Date(data.scheduledFor).toLocaleString() }}
        </template>
      </Column>

      <Column header="Notes" style="max-width: 220px">
        <template #body="{ data }">
            <span
              class="text-sm text-color-secondary text-overflow-ellipsis block"
              v-tooltip.bottom="data.notes"
            >
            {{ data.notes || '-' }}
          </span>
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
