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
  <div class="card p-4 shadow-2">
    <h2>Create Blood Center</h2>

    <div class="grid mt-3">
      <div class="col-12 md:col-6">
        <label>Name</label>
        <InputText v-model="form.name" class="w-full" />
      </div>

      <div class="col-12 md:col-6">
        <label>Phone</label>
        <InputText v-model="form.phone" class="w-full" />
      </div>

      <div class="col-12">
        <label>Address</label>
        <InputText v-model="form.address" class="w-full" />
      </div>

      <div class="col-12 md:col-6">
        <label>Latitude</label>
        <InputText v-model.number="form.coordinates.latitude" class="w-full" />
      </div>

      <div class="col-12 md:col-6">
        <label>Longitude</label>
        <InputText v-model.number="form.coordinates.longitude" class="w-full" />
      </div>
    </div>

    <Button
      label="Create"
      class="mt-3"
      :loading="loading"
      @click="submit"
    />
  </div>
</template>
