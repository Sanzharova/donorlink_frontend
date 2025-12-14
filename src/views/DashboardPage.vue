<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsersStore } from '@/store/useUsersStore'
import { useBloodCentersStore } from '@/store/useBloodCentersStore'
import { useDonationsStore } from '@/store/useDonationsStore'

const usersStore = useUsersStore()
const centersStore = useBloodCentersStore()
const donationsStore = useDonationsStore()

onMounted(async () => {
  await Promise.all([
    usersStore.fetchUsers(1, 1),
    centersStore.fetchCenters(1, 1),
    donationsStore.fetchAllDonations(1, 1)
  ])
})
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round">

    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <div class="grid">
      <div class="col-12 md:col-4">
        <div class="surface-card p-4 shadow-1 border-round text-center">
          <div class="text-color-secondary mb-2">Users</div>
          <div class="text-3xl font-bold">
            {{ usersStore.pagination?.total ?? '-' }}
          </div>
        </div>
      </div>

      <div class="col-12 md:col-4">
        <div class="surface-card p-4 shadow-1 border-round text-center">
          <div class="text-color-secondary mb-2">Blood Centers</div>
          <div class="text-3xl font-bold">
            {{ centersStore.pagination?.total ?? '-' }}
          </div>
        </div>
      </div>

      <div class="col-12 md:col-4">
        <div class="surface-card p-4 shadow-1 border-round text-center">
          <div class="text-color-secondary mb-2">Donations</div>
          <div class="text-3xl font-bold">
            {{ donationsStore.pagination?.total ?? '-' }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
