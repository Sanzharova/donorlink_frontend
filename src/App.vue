<script setup lang="ts">

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { registerToast } from './utils/toast';

const toast = useToast();
registerToast(toast);
</script>

<template>
  <Toast/>
  <router-view/>
</template>

<style>
</style>
