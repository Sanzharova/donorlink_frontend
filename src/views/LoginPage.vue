<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/useAuthStore'
import { useRouter } from 'vue-router'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const email = ref('');
const password = ref('');

const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  loading.value = true

  const ok = await authStore.login({ email: email.value, password: password.value })

  loading.value = false

  if (ok) {
    await router.push('/')
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="surface-card p-5 shadow-3 border-round w-full" style="max-width: 360px">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

      <div class="flex flex-column gap-3">
        <div>
          <label class="font-medium mb-1 block">Email</label>
          <InputText v-model="email" class="w-full" />
        </div>

        <div>
          <label class="font-medium mb-1 block">Password</label>
          <InputText
            v-model="password"
            class="w-full"
            type="password"
            :feedback="false"
          />
        </div>

        <Button
          label="Login"
          class="w-full mt-2"
          :loading="loading"
          @click="login"
        />

        <p class="text-center mt-3 text-sm">
          No account?
          <router-link
            to="/register"
            class="text-primary hover:text-primary-300 transition-colors duration-150 font-medium"
          >
            Register
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
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
</style>
