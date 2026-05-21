<template>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Nombre</th><th>Precio</th><th>Categoría</th><th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in products" :key="p.id">
        <td>{{p.name}}</td>
        <td>{{p.price}}</td>
        <td>{{p.category}}</td>
        <td>
          <button class="btn btn-primary btn-sm" @click="$emit('edit',p.id)">Editar</button>
          <button class="btn btn-danger btn-sm ms-2" @click="$emit('delete',p.id)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default { props:['products'] }
</script>