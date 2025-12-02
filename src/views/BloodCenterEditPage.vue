<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBloodCentersStore } from '../store/useBloodCentersStore'
import type { BloodCenterUpdate } from '../models/BloodCenter'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const store = useBloodCentersStore()
const route = useRoute()
const router = useRouter()
const loading = ref(false)

const form = ref<BloodCenterUpdate>({
  name: '',
  address: '',
  phone: '',
})

onMounted(async () => {
  const center = await store.getCenterById(route.params.id as string)
  form.value = {
    name: center.name,
    address: center.address,
    phone: center.phone,
  }
})

const save = async () => {
  loading.value = true
  await store.updateCenter(route.params.id as string, form.value)
  loading.value = false
  router.push('/blood-centers')
}
</script>

<template>
  <div class="card p-4 shadow-2">
    <h2>Edit Blood Center</h2>

    <div class="mt-3">
      <label>Name</label>
      <InputText v-model="form.name" class="w-full" />
    </div>

    <div class="mt-3">
      <label>Address</label>
      <InputText v-model="form.address" class="w-full" />
    </div>

    <div class="mt-3">
      <label>Phone</label>
      <InputText v-model="form.phone" class="w-full" />
    </div>

    <Button
      label="Save"
      class="mt-3"
      :loading="loading"
      @click="save"
    />
  </div>
</template>
