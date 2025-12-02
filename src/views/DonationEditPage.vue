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

const loading = ref(false)
const centerOptions = ref([])

const form = ref({
  status: '',
  scheduledFor: '',
  notes: '',
  centerId: '',
})

onMounted(async () => {
  const id = route.params.id as string

  // load donation
  const data = await donationStore.getDonation(id)

  form.value = {
    status: data.status,
    scheduledFor: data.scheduledFor,
    notes: data.notes ?? '',
    centerId: typeof data.centerId === 'string' ? data.centerId : data.centerId._id,
  }

  // load centers
  await centersStore.fetchCenters(1, 100)
  centerOptions.value = centersStore.centers.map(c => ({
    label: c.name,
    value: c._id,
  }))
})

const statuses = ['requested', 'confirmed', 'completed', 'canceled']

const save = async () => {
  loading.value = true
  await donationStore.updateDonation(route.params.id as string, form.value)
  loading.value = false
  router.push('/donations')
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
          class="w-full"
        />
      </div>

      <div class="col-12 md:col-6">
        <label>Scheduled For</label>
        <InputText
          v-model="form.scheduledFor"
          type="datetime-local"
          class="w-full"
        />
      </div>

      <div class="col-12">
        <label>Notes</label>
        <InputText
          v-model="form.notes"
          class="w-full"
        />
      </div>

      <div class="col-12">
        <label>Blood Center</label>
        <Dropdown
          v-model="form.centerId"
          :options="centerOptions"
          class="w-full"
          optionLabel="label"
          optionValue="value"
        />
      </div>
    </div>

    <Button
      label="Save"
      class="mt-3"
      :loading="loading"
      @click="save"
    />
  </div>
</template>
