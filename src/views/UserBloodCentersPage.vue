<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBloodCentersStore } from '@/store/useBloodCentersStore'

import Button from 'primevue/button'

const store = useBloodCentersStore()
const router = useRouter()

onMounted(async () => {
  await store.fetchCenters(1, 100)
})

const requestDonation = (centerId: string) => {
  router.push({
    path: '/app/request-donation',
    query: { centerId }
  })
}
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="mb-4">
      <h1 class="text-2xl font-bold mb-1">Blood Centers</h1>
      <small class="text-color-secondary">
        Choose a center to request a blood donation
      </small>
    </div>

    <div
      v-if="store.loading"
      class="flex justify-content-center p-6"
    >
      <i class="pi pi-spin pi-spinner text-3xl text-primary"></i>
    </div>

    <div
      v-else
      class="grid"
    >
      <div
        v-for="c in store.centers"
        :key="c._id"
        class="col-12 md:col-6 lg:col-4"
      >
        <div class="surface-card p-4 shadow-1 border-round h-full flex flex-column justify-content-between">
          <div>
            <div class="flex justify-content-between align-items-start mb-2">
              <h3 class="text-lg font-semibold m-0">
                {{ c.name }}
              </h3>

            </div>

            <div class="text-sm text-color-secondary mb-2">
              {{ c.address }}
            </div>

            <div class="text-sm">
              <i class="pi pi-phone mr-2"></i>
              {{ c.phone }}
            </div>
          </div>

          <Button
            label="Request donation"
            icon="pi pi-heart"
            class="mt-4"
            :disabled="c.archived"
            @click="requestDonation(c._id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
