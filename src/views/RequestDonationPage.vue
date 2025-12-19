<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useDonationsStore } from '@/store/useDonationsStore'
import { useBloodCentersStore } from '@/store/useBloodCentersStore'

import Dropdown from 'primevue/dropdown'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'

const router = useRouter()
const donationsStore = useDonationsStore()
const centersStore = useBloodCentersStore()

const route = useRoute();

const form = ref({
  centerId: '',
  scheduledFor: null as Date | null,
  notes: ''
})

const centers = ref<any[]>([])
const loading = ref(false)

onMounted(async () => {
  await centersStore.fetchCenters(1, 100)
  centers.value = centersStore.centers.map(c => ({
    label: c.name,
    value: c._id,
    address: c.address,
    phone: c.phone
  }))
})

const submit = async () => {
  if (!form.value.centerId || !form.value.scheduledFor) return

  loading.value = true
  await donationsStore.createDonation({
    centerId: form.value.centerId,
    scheduledFor: form.value.scheduledFor.toISOString(),
    notes: form.value.notes
  })
  loading.value = false

  await router.push('/app/my-donations')
}

onMounted(async () => {
  await centersStore.fetchCenters(1, 100)

  centers.value = centersStore.centers.map(c => ({
    label: c.name,
    value: c._id
  }))

  const preselectedCenterId = route.query.centerId as string | undefined
  if (preselectedCenterId) {
    form.value.centerId = preselectedCenterId
  }
})
</script>

<template>
  <div class="flex justify-content-center">
    <div class="surface-card p-5 shadow-2 border-round w-full md:w-8 lg:w-6">
      <div class="mb-4">
        <h2 class="text-2xl font-bold mb-1">Request a Donation</h2>
        <span class="text-color-secondary text-sm">
          Choose a blood center and schedule your donation
        </span>
      </div>

      <div class="flex flex-column gap-4">
        <div>
          <label class="block mb-2 font-medium">Blood Center</label>
          <Dropdown
            v-model="form.centerId"
            :options="centers"
            optionLabel="label"
            optionValue="value"
            placeholder="Select blood center"
            class="w-full"
          >
            <template #option="{ option }">
              <div class="flex flex-column">
                <span class="font-medium">{{ option.label }}</span>
                <small class="text-color-secondary">
                  {{ option.address }} · {{ option.phone }}
                </small>
              </div>
            </template>
          </Dropdown>
        </div>

        <div>
          <label class="block mb-2 font-medium">Date & Time</label>
          <DatePicker
            v-model="form.scheduledFor"
            showTime
            hourFormat="24"
            class="w-full"
          />
        </div>

        <div>
          <label class="block mb-2 font-medium">Notes</label>
          <Textarea
            v-model="form.notes"
            rows="3"
            class="w-full"
            placeholder="Optional notes for the blood center"
          />
        </div>

        <Button
          label="Submit Request"
          class="mt-2"
          :loading="loading"
          :disabled="!form.centerId || !form.scheduledFor"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>
