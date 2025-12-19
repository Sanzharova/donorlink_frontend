<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
import { usersApi } from '@/api/usersApi'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Tag from 'primevue/tag'
import Password from 'primevue/password'
import {toastError} from "@/utils/toast.ts";

const auth = useAuthStore()

const savingProfile = ref(false)
const savingPassword = ref(false)

const profileForm = ref({
  phone: auth.user?.phone || '',
  address: auth.user?.address || '',
  medicalHistory: auth.user?.medicalHistory || '',
})

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
})

const lastDonationText = computed(() => {
  if (!auth.user?.lastDonationDate) return '—'
  return new Date(auth.user.lastDonationDate).toLocaleDateString()
})

const saveProfile = async () => {
  if (!auth.user) return

  try {
    savingProfile.value = true

    const res = await usersApi.updateUser(auth.user._id, profileForm.value)

    auth.user = res.data
    localStorage.setItem('user', JSON.stringify(res.data))

  } catch (e: any) {
    toastError(e.message);
  } finally {
    savingProfile.value = false
  }
}

const changePassword = async () => {
  if (!auth.user) return
  try {
    savingPassword.value = true
    await usersApi.resetPassword(auth.user._id, passwordForm.value)
    passwordForm.value.oldPassword = ''
    passwordForm.value.newPassword = ''
  } finally {
    savingPassword.value = false
  }
}
</script>

<template>
  <div class="flex flex-column gap-4">

    <div class="surface-card p-4 shadow-2 border-round">
      <h1 class="text-2xl font-bold mb-2">
        {{ auth.user?.fullName }}
      </h1>

      <div class="flex gap-2 align-items-center mb-3">
        <Tag :value="auth.user?.bloodType" />
        <Tag
          :value="auth.user?.status"
          :severity="auth.user?.status === 'active' ? 'success' : 'danger'"
        />
      </div>

      <div class="grid">
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
            <div class="text-sm text-color-secondary">Email</div>
            <div class="text-sm font-medium">
              {{ auth.user?.email }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="surface-card p-4 shadow-2 border-round">
      <h3 class="text-lg font-semibold mb-3">Personal information</h3>

      <div class="grid">
        <div class="col-12 md:col-6">
          <label class="block mb-1">Phone</label>
          <InputText v-model="profileForm.phone" class="w-full" />
        </div>

        <div class="col-12 md:col-6">
          <label class="block mb-1">Address</label>
          <InputText v-model="profileForm.address" class="w-full" />
        </div>

        <div class="col-12">
          <label class="block mb-1">Medical history</label>
          <Textarea
            v-model="profileForm.medicalHistory"
            rows="3"
            class="w-full"
          />
        </div>
      </div>

      <Button
        label="Save profile"
        class="mt-3"
        :loading="savingProfile"
        @click="saveProfile"
      />
    </div>

    <div class="surface-card p-4 shadow-2 border-round max-w-30rem">

      <div class="flex flex-column gap-4">

        <div>
          <label class="block mb-1">Old password</label>
          <div class="p-inputgroup w-full">
            <Password
              v-model="passwordForm.oldPassword"
              :feedback="false"
              class="w-full"
            />
          </div>
        </div>

        <div>
          <label class="block mb-1">New password</label>
          <div class="p-inputgroup w-full">
            <Password
              v-model="passwordForm.newPassword"
              :feedback="false"
              class="w-full"
            />
          </div>
        </div>

      </div>

      <Button
        label="Change password"
        severity="secondary"
        class="mt-4"
        style="width: 200px"
        :loading="savingPassword"
        @click="changePassword"
      />
    </div>

    <div
      v-if="auth.user?.status !== 'active'"
      class="surface-200 p-3 border-round"
    >
      <strong class="text-danger">Attention:</strong>
      Your account status is {{ auth.user?.status }}.
      Some actions may be restricted.
    </div>

  </div>
</template>
