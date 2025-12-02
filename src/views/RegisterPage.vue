<script setup lang="ts">
import {ref, watch} from 'vue'
import { useAuthStore } from '../store/useAuthStore'
import { useRouter } from 'vue-router'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Dropdown from 'primevue/dropdown'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'

const form = ref({
  email: '',
  password: '',
  fullName: '',
  phone: '',
  gender: 'male',
  dateOfBirth: null as Date | null,
  bloodType: '',
  address: '',
});

const genders = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
];

const bloodTypes = [
  'A+', 'A-',
  'B+', 'B-',
  'O+', 'O-',
  'AB+', 'AB-'
];

const errors = ref({
  fullName: '',
  email: '',
  password: '',
  phone: '',
  gender: '',
  dateOfBirth: '',
  bloodType: '',
  address: ''
});

const validate = () => {
  errors.value = {
    fullName: form.value.fullName ? '' : 'Full name is required',
    email: form.value.email ? '' : 'Email is required',
    password: form.value.password ? '' : 'Password is required',
    phone: form.value.phone ? '' : 'Phone is required',
    gender: form.value.gender ? '' : 'Gender is required',
    dateOfBirth: form.value.dateOfBirth ? '' : 'Birth date required',
    bloodType: form.value.bloodType ? '' : 'Select blood type',
    address: form.value.address ? '' : 'Address is required'
  };

  return Object.values(errors.value).every(v => v === '');
};

const loading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const touchedValidation = ref(false)

const register = async () => {
  touchedValidation.value = true;

  if (!validate()) return;

  loading.value = true;

  const payload = {
    ...form.value,
    dateOfBirth: form.value.dateOfBirth
      ? form.value.dateOfBirth.toISOString().slice(0, 10)
      : null
  };

  const success = await authStore.register(payload);
  loading.value = false;

  if (success) await router.push('/');
};

watch(form, () => {
  if (!touchedValidation.value) return;

  validate();
}, { deep: true });
</script>

<template>
  <div class="register-wrapper">
    <div class="surface-card p-5 shadow-3 border-round w-full" style="max-width: 420px">

      <h2 class="text-2xl font-bold mb-4 text-center">Register</h2>

      <div class="flex flex-column gap-3">

        <div>
          <label class="font-medium mb-1 block">Full Name</label>
          <InputText v-model="form.fullName" class="w-full" />
          <small v-if="errors.fullName" class="p-error">{{ errors.fullName }}</small>
        </div>

        <div>
          <label class="font-medium mb-1 block">Email</label>
          <InputText v-model="form.email" class="w-full" />
          <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
        </div>

        <div>
          <label class="font-medium mb-1 block">Password</label>
          <InputText
            v-model="form.password"
            type="password"
            class="w-full"
          />
          <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
        </div>

        <div>
          <label class="font-medium mb-1 block">Phone</label>
          <InputText v-model="form.phone" class="w-full" />
          <small v-if="errors.phone" class="p-error">{{ errors.phone }}</small>
        </div>

        <div>
          <label class="font-medium mb-1 block">Gender</label>
          <Dropdown
            v-model="form.gender"
            :options="genders"
            optionLabel="label"
            optionValue="value"
            class="w-full"
          />
          <small v-if="errors.gender" class="p-error">{{ errors.gender }}</small>
        </div>

        <div>
          <label class="font-medium mb-1 block">Date of Birth</label>
          <DatePicker
            v-model="form.dateOfBirth"
            class="w-full"
            dateFormat="yy-mm-dd"
            showIcon
            inputClass="pr-8"
          />
          <small v-if="errors.dateOfBirth" class="p-error">{{ errors.dateOfBirth }}</small>
        </div>

        <div>
          <label class="font-medium mb-1 block">Blood Type</label>
          <Dropdown
            v-model="form.bloodType"
            :options="bloodTypes"
            class="w-full"
            placeholder="Select blood type"
          />
          <small v-if="errors.bloodType" class="p-error">{{ errors.bloodType }}</small>
        </div>

        <div>
          <label class="font-medium mb-1 block">Address</label>
          <InputText v-model="form.address" class="w-full" />
          <small v-if="errors.address" class="p-error">{{ errors.address }}</small>
        </div>

        <Button
          label="Register"
          class="w-full mt-2"
          :loading="loading"
          @click="register"
        />

        <p class="text-center mt-3 text-sm">
          Already have an account?
          <router-link
            to="/login"
            class="text-primary hover:text-primary-300 transition-colors duration-150 font-medium"
          >
            Login
          </router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<style>
.register-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url('public/assets/bg-login.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  backdrop-filter: blur(4px);
}

.p-error {
  color: rgba(239, 68, 68, 0.9);
  font-size: 0.8rem;
  margin-top: 2px;
  display: block;
}
</style>
