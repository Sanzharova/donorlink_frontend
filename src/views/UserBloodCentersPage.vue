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

    <div
      class="relative overflow-hidden border-round-xl shadow-1 mb-5"
      style="min-height: 220px;"
    >
      <div
        class="absolute top-0 left-0 w-full h-full bg-cover"
        style="
          background-image: url('/images/blood_center_choosing.png');
          background-position: right center;
        "
      ></div>

      <div
        class="absolute top-0 left-0 w-full h-full"
        style="
          background: linear-gradient(
            to right,
            rgba(255,255,255,0.95) 0%,
            rgba(255,255,255,0.8) 40%,
            rgba(255,255,255,0.2) 100%
          );
        "
      ></div>

      <div class="relative z-1 p-4 md:p-6 flex flex-column justify-content-center h-full">
        <div style="max-width: 30rem;">
          <h1 class="text-3xl font-bold mt-0 mb-3">
            Blood Centers
          </h1>
          <p class="text-color-secondary text-lg line-height-3 m-0">
            Choose a center to request a blood donation
          </p>
        </div>
      </div>
    </div>

    <div v-if="store.loading" class="flex justify-content-center p-6">
      <i class="pi pi-spin pi-spinner text-3xl text-primary"></i>
    </div>

    <div v-else class="grid">
      <div
        v-for="c in store.centers"
        :key="c._id"
        class="col-12 md:col-6 lg:col-4"
      >
        <div
          class="surface-card p-4 shadow-1 border-round-xl h-full flex flex-column justify-content-between relative overflow-hidden"
        >
          <img
            src="/images/blood_flower.png"
            alt=""
            class="absolute"
            style="
            right: 0;
            bottom: 0;
            width: 180px;
            opacity: 0.62;
            pointer-events: none;
            user-select: none;
          "
          />

          <div class="relative z-1">
            <h3 class="text-lg font-semibold mb-2">
              {{ c.name }}
            </h3>

            <div class="text-sm text-color-secondary mb-2">
              {{ c.address }}
            </div>

            <div class="text-sm flex align-items-center gap-2">
              <i class="pi pi-phone"></i>
              <span>{{ c.phone }}</span>
            </div>
          </div>

          <Button
            label="Request donation"
            icon="pi pi-heart"
            class="mt-4 mr-8"
            :disabled="c.archived"
            @click="requestDonation(c._id)"
          />
        </div>
      </div>
    </div>

  </div>
</template>
