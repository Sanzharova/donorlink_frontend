<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
import { donationsApi } from '@/api/donationsApi'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Tag from 'primevue/tag'

const auth = useAuthStore()
const router = useRouter()

const nextDonation = ref<any | null>(null)
const loading = ref(false)

onMounted(async () => {
  try {
    loading.value = true

    const res = await donationsApi.getMyDonations(1, 50)
    const donations = res.data.donations ?? []
    const now = Date.now()

    nextDonation.value =
      donations
        .filter(d =>
          (d.status === 'requested' || d.status === 'confirmed') &&
          new Date(d.scheduledFor).getTime() > now
        )
        .sort(
          (a, b) =>
            new Date(a.scheduledFor).getTime() -
            new Date(b.scheduledFor).getTime()
        )[0] ?? null
  } finally {
    loading.value = false
  }
})

const lastDonationText = computed(() => {
  if (!auth.user?.lastDonationDate) return '—'
  return new Date(auth.user.lastDonationDate).toLocaleDateString()
})

const nextDonationText = computed(() => {
  if (!nextDonation.value) return '—'
  return new Date(nextDonation.value.scheduledFor).toLocaleString()
})

const whyImportantItems = [
  {
    icon: 'pi pi-heart-fill',
    iconClass: 'text-red-500',
    title: 'Real Impact',
    text: 'Every donation helps save lives.',
  },
  {
    icon: 'pi pi-clock',
    iconClass: 'text-primary',
    title: '15–20 Minutes',
    text: 'Minimal time commitment - maximum impact.',
  },
  {
    icon: 'pi pi-shield',
    iconClass: 'text-primary',
    title: 'Safe Process',
    text: 'Fully supervised by medical professionals.',
  },
] as const
</script>

<template>
  <div
    v-if="loading"
    class="flex justify-content-center align-items-center p-6"
  >
    <i class="pi pi-spin pi-spinner text-3xl text-primary"></i>
  </div>

  <div v-else class="surface-card p-4 shadow-2 border-round">

    <div class="relative overflow-hidden border-round-xl shadow-2 mb-5" style="min-height: 450px;">

      <div
        class="absolute top-0 left-0 w-full h-full bg-cover"
        style="background-image: url('/images/about-1.jpg'); background-position: 80% center;"
      ></div>

      <div class="absolute top-0 left-0 w-full h-full" style="background: linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%);"></div>

      <div class="relative z-1 p-4 md:p-6 flex flex-column justify-content-center h-full">
        <div class="max-w-30rem">
          <h2 class="text-4xl font-bold mt-0 mb-3 text-white">Become a Hero</h2>
          <p class="text-white opacity-90 text-xl mb-5 line-height-3">
            Blood donation is a simple act that saves lives. Join our community and help those in need today.
          </p>

          <div class="flex flex-column gap-3" style="max-width: 280px;">
            <Button
              label="Request Donation"
              icon="pi pi-heart"
              class="p-button-raised p-button-lg font-bold w-full"
              @click="router.push('/app/blood-centers')"
            />

            <Button
              label="How it works"
              icon="pi pi-info-circle"
              class="p-button-lg font-bold surface-0 text-900 border-none w-full hover:surface-200 transition-colors transition-duration-150"
              @click="router.push('/app/rules')"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mb-4">
      <h1 class="text-2xl font-bold mb-1">
        Hello, {{ auth.user?.fullName }}
      </h1>
      <div class="flex gap-2 align-items-center">
        <span class="text-sm text-color-secondary">
          Your blood type:
        </span>
        <Tag :value="auth.user?.bloodType" />
      </div>
    </div>

    <div class="grid mb-2">
      <div class="col-12 md:col-4">
        <div class="surface-100 p-3 border-round text-center h-full flex flex-column justify-content-center">
          <div class="text-sm text-color-secondary mb-1">Total donations</div>
          <div class="text-3xl font-bold text-primary">
            {{ auth.user?.donationCount ?? 0 }}
          </div>
        </div>
      </div>

      <div class="col-12 md:col-4">
        <div class="surface-100 p-3 border-round text-center h-full flex flex-column justify-content-center">
          <div class="text-sm text-color-secondary mb-1">Last donation</div>
          <div class="text-xl font-medium">
            {{ lastDonationText }}
          </div>
        </div>
      </div>

      <div class="col-12 md:col-4">
        <div class="surface-100 p-3 border-round text-center h-full flex flex-column justify-content-center">
          <div class="text-sm text-color-secondary mb-1">Next donation</div>
          <div class="text-xl font-medium">
            {{ nextDonationText }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <h2 class="text-xl font-bold mb-3">Why it matters</h2>

      <div class="grid">
        <div
          v-for="item in whyImportantItems"
          :key="item.title"
          class="col-12 md:col-4"
        >
          <div class="surface-0 p-4 border-1 surface-border border-round-lg h-full">
            <div class="flex align-items-start gap-3">
              <div class="flex align-items-center justify-content-center border-circle surface-100"
                   style="width: 44px; height: 44px;">
                <i :class="[item.icon, item.iconClass]" style="font-size: 18px;"></i>
              </div>

              <div class="flex-1">
                <div class="font-semibold text-color mb-1">
                  {{ item.title }}
                </div>
                <div class="text-sm text-color-secondary line-height-3">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="auth.user?.status !== 'active'"
      class="mt-4 p-3 border-round bg-red-50 border-left-3 border-red-500"
    >
      <strong class="text-red-700">Attention:</strong>
      <span class="text-red-700"> Your account status is {{ auth.user?.status }}.</span>
    </div>

  </div>
</template>
