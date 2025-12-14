<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useDonationsStore } from '../store/useDonationsStore'
import { useBloodCentersStore } from '../store/useBloodCentersStore'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'

const donationStore = useDonationsStore()
const centersStore = useBloodCentersStore()

const route = useRoute()
const router = useRouter()

const centerOptions = ref([])

const form = ref({
  status: '',
  scheduledFor: '',
  notes: '',
  centerId: '',
})

const pageLoading = ref(true)
const saving = ref(false)

onMounted(async () => {
  try {
    pageLoading.value = true

    const id = route.params.id as string

    const data = await donationStore.getDonation(id)

    form.value = {
      status: data.status,
      scheduledFor: data.scheduledFor,
      notes: data.notes ?? '',
      centerId: typeof data.centerId === 'string'
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

const statuses = ['requested', 'confirmed', 'completed', 'canceled']

const save = async () => {
  saving.value = true
  await donationStore.updateDonation(route.params.id as string, form.value)
  saving.value = false
  await router.push('/donations')
}
</script>

<template>
  <div class="card p-4 shadow-2">
    <h2>Edit Donation</h2>

    <div class="grid mt-3">
      <div class="col-12 md:col-6">
        <label>Status</label>
        <Dropdown
          v-model="form.status"
          :options="statuses"
          :loading="pageLoading"
          :disabled="pageLoading"
          class="w-full"
        />
      </div>

      <div class="col-12 md:col-6">
        <label>Scheduled For</label>
        <InputText
          v-model="form.scheduledFor"
          :loading="pageLoading"
          :disabled="pageLoading"
          type="datetime-local"
          class="w-full"
        />
      </div>

      <div class="col-12">
        <label>Notes</label>
        <InputText
          v-model="form.notes"
          :loading="pageLoading"
          :disabled="pageLoading"
          class="w-full"
        />
      </div>

      <div class="col-12">
        <label>Blood Center</label>
        <Dropdown
          v-model="form.centerId"
          :options="centerOptions"
          :loading="pageLoading"
          :disabled="pageLoading"
          class="w-full"
          optionLabel="label"
          optionValue="value"
        />
      </div>
    </div>

    <Button
      label="Save"
      class="mt-3"
      :loading="saving"
      :disabled="pageLoading"
      @click="save"
    />
  </div>
</template>
