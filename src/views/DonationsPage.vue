<script setup lang="ts">
import { onMounted } from 'vue'
import { useDonationsStore } from '../store/useDonationsStore'
import { useRouter } from 'vue-router'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'

const store = useDonationsStore()
const router = useRouter()

const load = async (page = 1) => {
  await store.fetchAllDonations(page, 10)
}

onMounted(() => load())

const edit = (id: string) => {
  router.push(`/donations/${id}`)
}

const statusSeverity = (status: string) => {
  switch (status) {
    case 'completed': return 'success'
    case 'cancelled': return 'danger'
    case 'scheduled': return 'info'
    default: return 'warning'
  }
}
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round">

    <div class="flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="text-2xl font-bold mb-1">Donations</h1>
        <small class="text-color-secondary">
          Total: {{ store.pagination?.total || 0 }}
        </small>
      </div>
    </div>

    <DataTable
      :value="store.donations"
      :loading="store.loading"
      dataKey="_id"
      responsiveLayout="scroll"
      stripedRows
      size="small"
      rowHover
      class="donations-table"
    >
      <Column header="Donor">
        <template #body="{ data }">
          <div class="font-medium">{{ data.userId.fullName }}</div>
          <small class="text-color-secondary">
            {{ data.userId.bloodType }}
          </small>
        </template>
      </Column>

      <Column header="Center">
        <template #body="{ data }">
          <div class="font-medium">{{ data.centerId.name }}</div>
        </template>
      </Column>

      <Column header="Status">
        <template #body="{ data }">
          <Tag
            :value="data.status"
            :severity="statusSeverity(data.status)"
            class="text-sm"
          />
        </template>
      </Column>

      <Column header="Scheduled">
        <template #body="{ data }">
          <span class="text-sm">
            {{ new Date(data.scheduledFor).toLocaleString() }}
          </span>
        </template>
      </Column>

      <Column header="Actions" style="width: 90px">
        <template #body="{ data }">
          <Button
            icon="pi pi-pencil"
            severity="secondary"
            text
            rounded
            class="action-btn"
            v-tooltip.bottom="'Edit donation'"
            @click="edit(data._id)"
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

<style scoped>
.donations-table .p-datatable-tbody > tr {
  transition: background-color 0.15s ease;
}

.donations-table .p-datatable-tbody > tr:hover {
  background-color: var(--surface-hover);
}

.donations-table .action-btn {
  opacity: 0.6;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.donations-table tr:hover .action-btn {
  opacity: 1;
  transform: translateX(1px);
}

.p-tag {
  font-weight: 500;
  letter-spacing: 0.2px;
}
</style>
