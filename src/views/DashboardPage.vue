<script setup lang="ts">
const stats = [
  { label: 'Users', value: '-' },
  { label: 'Blood Centers', value: '-' },
  { label: 'Donations', value: '-' },
]
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>

    <div class="grid">
      <div v-for="s in stats" :key="s.label" class="col-12 md:col-4">
        <div class="card p-4 shadow-2 text-center">
          <h2 class="text-xl">{{ s.label }}</h2>
          <p class="text-3xl font-bold mt-2">{{ s.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
