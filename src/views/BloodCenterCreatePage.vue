<script setup lang="ts">
import { ref } from 'vue'
import { useBloodCentersStore } from '../store/useBloodCentersStore'
import type { BloodCenterCreate } from '../models/BloodCenter'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const form = ref<BloodCenterCreate>({
  name: '',
  address: '',
  phone: '',
  coordinates: { latitude: 0, longitude: 0 },
  operatingHours: {}
})

const loading = ref(false)
const store = useBloodCentersStore()
const router = useRouter()

const submit = async () => {
  loading.value = true
  await store.createCenter(form.value)
  loading.value = false
  router.push('/blood-centers')
}
</script>

<template>
  <div
    class="surface-card p-6 shadow-2 border-round w-full"
    style="max-width: 720px"
  >
    <div class="mb-5">
      <h2 class="text-2xl font-bold mb-1">Create Blood Center</h2>
      <small class="text-color-secondary">
        Add a new blood donation center
      </small>
    </div>

    <div class="grid">
      <div class="col-12 md:col-6">
        <label class="font-medium mb-1 block">Name</label>
        <InputText v-model="form.name" class="w-full" />
      </div>

      <div class="col-12 md:col-6">
        <label class="font-medium mb-1 block">Phone</label>
        <InputText v-model="form.phone" class="w-full" />
      </div>

      <div class="col-12">
        <label class="font-medium mb-1 block">Address</label>
        <InputText v-model="form.address" class="w-full" />
      </div>

      <div class="col-12 md:col-6">
        <label class="font-medium mb-1 block">Latitude</label>
        <InputText
          v-model.number="form.coordinates.latitude"
          class="w-full"
        />
      </div>

      <div class="col-12 md:col-6">
        <label class="font-medium mb-1 block">Longitude</label>
        <InputText
          v-model.number="form.coordinates.longitude"
          class="w-full"
        />
      </div>
    </div>

    <div class="flex justify-content-end gap-2 mt-6">
      <Button
        label="Cancel"
        severity="secondary"
        text
        :disabled="loading"
        @click="router.push('/blood-centers')"
      />

      <Button
        label="Create center"
        icon="pi pi-check"
        :loading="loading"
        @click="submit"
      />
    </div>
  </div>
</template>
