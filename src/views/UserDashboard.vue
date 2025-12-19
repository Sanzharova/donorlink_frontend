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
</script>

<template>
  <div
    v-if="loading"
    class="flex justify-content-center align-items-center p-6"
  >
    <i class="pi pi-spin pi-spinner text-3xl text-primary"></i>
  </div>

  <div v-else class="surface-card p-4 shadow-2 border-round">

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

    <div class="grid mb-4">
      <div class="col-12 md:col-4">
        <div class="surface-100 p-3 border-round text-center">
          <div class="text-sm text-color-secondary">Total donations</div>
          <div class="text-3xl font-bold">
            {{ auth.user?.donationCount ?? 0 }}
          </div>
        </div>
      </div>

      <div class="col-12 md:col-4">
        <div class="surface-100 p-3 border-round text-center">
          <div class="text-sm text-color-secondary">Last donation</div>
          <div class="text-xl font-medium">
            {{ lastDonationText }}
          </div>
        </div>
      </div>

      <div class="col-12 md:col-4">
        <div class="surface-100 p-3 border-round text-center">
          <div class="text-sm text-color-secondary">Next donation</div>
          <div class="text-xl font-medium">
            {{ nextDonationText }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-3">
      <Button
        label="Request Donation"
        icon="pi pi-heart"
        @click="router.push('/app/blood-centers')"
      />
      <Button
        label="My Donations"
        icon="pi pi-list"
        severity="secondary"
        @click="router.push('/app/my-donations')"
      />
    </div>

    <div
      v-if="auth.user?.status !== 'active'"
      class="mt-4 p-3 border-round surface-200"
    >
      <strong class="text-danger">Attention:</strong>
      Your account status is {{ auth.user?.status }}.
    </div>

  </div>
</template>
