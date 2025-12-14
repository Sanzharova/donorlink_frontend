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

const pageLoading = ref(true)
const saving = ref(false)

onMounted(async () => {
  try {
    pageLoading.value = true

    const center = await store.getCenterById(route.params.id as string)

    form.value = {
      name: center.name,
      address: center.address,
      phone: center.phone,
    }
  } finally {
    pageLoading.value = false
  }
})

const save = async () => {
  saving.value = true
  await store.updateCenter(route.params.id as string, form.value)
  saving.value = false
  await router.push('/blood-centers')
}

</script>

<template>
  <div
    v-if="pageLoading"
    class="flex justify-content-center align-items-center min-h-[400px]"
  >
    <i class="pi pi-spin pi-spinner text-4xl text-primary opacity-80"></i>
  </div>

  <div
    v-else
    class="surface-card p-6 shadow-2 border-round w-full"
    style="max-width: 720px"
  >
    <div class="mb-5">
      <h2 class="text-2xl font-bold mb-1">Edit Blood Center</h2>
      <small class="text-color-secondary">
        Update blood center information
      </small>
    </div>

    <div class="grid">
      <div class="col-12">
        <label class="font-medium mb-1 block">Name</label>
        <InputText
          v-model="form.name"
          class="w-full"
          :disabled="saving"
        />
      </div>

      <div class="col-12">
        <label class="font-medium mb-1 block">Address</label>
        <InputText
          v-model="form.address"
          class="w-full"
          :disabled="saving"
        />
      </div>

      <div class="col-12 md:col-6">
        <label class="font-medium mb-1 block">Phone</label>
        <InputText
          v-model="form.phone"
          class="w-full"
          :disabled="saving"
        />
      </div>
    </div>

    <div class="flex justify-content-end gap-2 mt-6">
      <Button
        label="Cancel"
        severity="secondary"
        text
        :disabled="saving"
        @click="router.push('/blood-centers')"
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

