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
  <div class="surface-card p-4 shadow-2 border-round relative overflow-hidden">

    <img
      src="/images/table_flowers.png"
      alt=""
      class="absolute top-0 left-0 w-full h-full"
      style="
        object-fit: cover;
        object-position: center 95%;
        opacity: 0.35;
        pointer-events: none;
        user-select: none;
        z-index: 0;
      "
    />
    <div
      class="absolute top-0 left-0 w-full h-full"
      style="
        background: rgba(255,255,255,0.68);
        pointer-events: none;
        z-index: 0;
      "
    ></div>

    <div class="relative" style="z-index: 1;">

      <div class="mb-4">
        <div class="flex align-items-center gap-2 flex-wrap">
          <h1 class="text-2xl font-bold m-0">
            {{ auth.user?.fullName }}
          </h1>

          <Tag :value="auth.user?.bloodType" />
          <Tag
            :value="auth.user?.status"
            :severity="auth.user?.status === 'active' ? 'success' : 'danger'"
          />
        </div>
      </div>

      <div class="grid mb-4">
        <div class="col-12 md:col-4">
          <div class="p-3 border-round-xl text-center stat-card">
            <div class="flex justify-content-center mb-2">
              <i class="pi pi-heart-fill text-red-500"></i>
            </div>
            <div class="text-sm text-color-secondary">Total donations</div>
            <div class="text-3xl font-bold text-primary">
              {{ auth.user?.donationCount ?? 0 }}
            </div>
          </div>
        </div>

        <div class="col-12 md:col-4">
          <div class="p-3 border-round-xl text-center stat-card">
            <div class="flex justify-content-center mb-2">
              <i class="pi pi-clock text-primary"></i>
            </div>
            <div class="text-sm text-color-secondary">Last donation</div>
            <div class="text-xl font-medium">
              {{ lastDonationText }}
            </div>
          </div>
        </div>

        <div class="col-12 md:col-4">
          <div class="p-3 border-round-xl text-center stat-card">
            <div class="flex justify-content-center mb-2">
              <i class="pi pi-envelope text-primary"></i>
            </div>
            <div class="text-sm text-color-secondary">Email</div>
            <div class="text-sm font-medium">
              {{ auth.user?.email }}
            </div>
          </div>
        </div>
      </div>

      <div class="surface-card p-4 shadow-1 border-round-xl mb-4">
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

      <div class="surface-card p-4 shadow-1 border-round-xl" style="max-width: 30rem;">
        <h3 class="text-lg font-semibold mb-3">Change password</h3>

        <div class="flex flex-column gap-4">
          <div>
            <label class="block mb-1">Old password</label>
            <Password
              v-model="passwordForm.oldPassword"
              :feedback="false"
              class="w-full"
              toggleMask
            />
          </div>

          <div>
            <label class="block mb-1">New password</label>
            <Password
              v-model="passwordForm.newPassword"
              :feedback="false"
              class="w-full"
              toggleMask
            />
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
        class="mt-4 p-3 border-round bg-red-50 border-left-3 border-red-500"
      >
        <strong class="text-red-700">Attention:</strong>
        <span class="text-red-700">
          Your account status is {{ auth.user?.status }}. Some actions may be restricted.
        </span>
      </div>

    </div>
  </div>
</template>

<style scoped>
.stat-card {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 18px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
}
</style>
