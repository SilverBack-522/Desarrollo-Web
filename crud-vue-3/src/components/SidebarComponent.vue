<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="navbar-brand ps-3">Panel</div>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'ProductList' }">Productos</router-link>
      </li>
      <li class="nav-item">
        <a @click="logout" class="nav-link">Cerrar sesión</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "SidebarComponent",
  methods: {
    logout() {
      localStorage.removeItem('logueado')
      this.$router.push('/')
    }
  },
};
</script>