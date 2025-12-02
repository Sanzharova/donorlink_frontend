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
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-3">Donations</h1>

    <DataTable
      :value="store.donations"
      :loading="store.loading"
      showGridlines
    >
      <Column
        header="Donor"
        field="userId.fullName"
      />

      <Column
        header="Blood Type"
        field="userId.bloodType"
      />

      <Column
        header="Center"
        field="centerId.name"
      />

      <Column header="Status">
        <template #body="{ data }">
          <Tag
            :value="data.status"
            :severity="
              data.status === 'completed'
                ? 'success'
                : data.status === 'cancelled'
                ? 'danger'
                : 'info'
            "
          />
        </template>
      </Column>

      <Column header="Scheduled For">
        <template #body="{ data }">
          {{ new Date(data.scheduledFor).toLocaleString() }}
        </template>
      </Column>

      <Column header="Actions">
        <template #body="{ data }">
          <Button
            icon="pi pi-pencil"
            severity="secondary"
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
