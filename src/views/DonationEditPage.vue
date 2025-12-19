<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useDonationsStore } from '@/store/useDonationsStore'
import { useBloodCentersStore } from '@/store/useBloodCentersStore'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import DatePicker from 'primevue/datepicker'

const donationStore = useDonationsStore()
const centersStore = useBloodCentersStore()

const route = useRoute()
const router = useRouter()

const pageLoading = ref(true)
const saving = ref(false)

const centerOptions = ref<
  { label: string; value: string }[]
>([])

const form = ref({
  status: '',
  scheduledFor: null as Date | null,
  notes: '',
  centerId: '',
})

const statuses = [
  'requested',
  'confirmed',
  'completed',
  'canceled',
]

onMounted(async () => {
  try {
    pageLoading.value = true

    const id = route.params.id as string
    const data = await donationStore.getDonation(id)

    form.value = {
      status: data.status,
      scheduledFor: data.scheduledFor
        ? new Date(data.scheduledFor)
        : null,
      notes: data.notes ?? '',
      centerId:
        typeof data.centerId === 'string'
          ? data.centerId
          : data.centerId._id,
    }

    await centersStore.fetchCenters(1, 100)
    centerOptions.value = centersStore.centers.map(c => ({
      label: c.name,
      value: c._id,
    }))
  } finally {
    pageLoading.value = false
  }
})

const save = async () => {
  if (!form.value.scheduledFor) return

  saving.value = true

  await donationStore.updateDonation(
    route.params.id as string,
    {
      status: form.value.status,
      scheduledFor: form.value.scheduledFor.toISOString(),
      notes: form.value.notes,
      centerId: form.value.centerId,
    }
  )

  saving.value = false
  router.push('/donations')
}
</script>

<template>
  <div
    v-if="pageLoading"
    class="flex justify-content-center align-items-center p-6"
  >
    <i class="pi pi-spin pi-spinner text-3xl text-primary"></i>
  </div>

  <div
    v-else
    class="surface-card p-4 shadow-2 border-round"
    style="max-width: 720px"
  >
    <div class="mb-4">
      <h2 class="text-xl font-bold mb-1">Edit Donation</h2>
      <small class="text-color-secondary">
        Update donation details and status
      </small>
    </div>

    <div class="grid">
      <div class="col-12 md:col-6">
        <label>Status</label>
        <Dropdown
          v-model="form.status"
          :options="statuses"
          class="w-full"
        />
      </div>

      <div class="col-12 md:col-6">
        <label>Scheduled For</label>
        <DatePicker
          v-model="form.scheduledFor"
          showTime
          hourFormat="24"
          class="w-full"
        />
      </div>

      <div class="col-12">
        <label>Blood Center</label>
        <Dropdown
          v-model="form.centerId"
          :options="centerOptions"
          optionLabel="label"
          optionValue="value"
          class="w-full"
        />
      </div>

      <div class="col-12">
        <label>Notes</label>
        <InputText
          v-model="form.notes"
          class="w-full"
          placeholder="Optional notes"
        />
      </div>
    </div>

    <div class="flex justify-content-end mt-4 gap-2">
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        @click="router.push('/donations')"
      />

      <Button
        label="Save changes"
        icon="pi pi-check"
        :loading="saving"
        @click="save"
      />
    </div>
  </div>
</template>
