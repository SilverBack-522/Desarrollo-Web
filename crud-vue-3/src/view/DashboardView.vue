<template>
  <div class="vh-100 d-flex flex-column">
    <!-- Barra superior -->
    <SidebarComponent />

    <!-- Contenido principal -->
    <div class="flex-grow-1 p-4 bg-light">
      <router-view />
    </div>
  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue';

export default {
  name: 'DashboardView',
  components: { SidebarComponent }
}
</script>