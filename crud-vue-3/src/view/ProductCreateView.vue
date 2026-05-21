<template>
  <!-- Barra superior -->
    <SidebarComponent />
  <div class="flex-grow-1 p-4 bg-light">
    <h3>Crear producto</h3>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <ProductForm :saving="saving" @submit="submit" @cancel="cancel" />
  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue';
import { ref } from 'vue'
import productService from '@/services/ProductService'
import ProductForm from '@/components/ProductForm.vue'
import { useRouter } from 'vue-router'

export default {
  components: { ProductForm, SidebarComponent },
  setup() {
    const saving = ref(false)
    const error = ref(null)
    const router = useRouter()

    const submit = async (payload) => {
      saving.value = true
      error.value = null
      try {
        await productService.createProduct(payload)
        router.push({ name: 'ProductList' })
      } catch (err) {
        error.value = 'Error creando producto'+err
        console.error(err)
      } finally {
        saving.value = false
      }
    }

    const cancel = () => {
      router.push({ name: 'ProductList' })
    }

    return { saving, error, submit, cancel }
  }
}
</script>