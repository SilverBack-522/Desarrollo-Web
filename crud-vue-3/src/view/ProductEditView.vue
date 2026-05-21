<template>
  <!-- Barra superior -->
    <SidebarComponent />
  <div class="flex-grow-1 p-4 bg-light">
   <h3>Editar producto</h3>

<div v-if="loading" class="mb-3">Cargando...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <ProductForm
      v-if="product"
      :product="product"
      :saving="saving"
      @submit="submit"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue';
import { ref, onMounted } from 'vue'
import productService from '@/services/ProductService'
import ProductForm from '@/components/ProductForm.vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  components: { ProductForm, SidebarComponent },
  setup() {
    const product = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const saving = ref(false)

    const router = useRouter()
    const route = useRoute()
    const id = route.params.id

    const load = async () => {
      loading.value = true
      error.value = null
      try {
        const res = await productService.getProductById(id)
        product.value = res.data
      } catch (err) {
        error.value = 'Error cargando el producto'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    const submit = async (payload) => {
      saving.value = true
      error.value = null
      try {
        await productService.updateProduct(id, payload)
        router.push({ name: 'ProductList' })
      } catch (err) {
        error.value = 'Error actualizando producto'
        console.error(err)
      } finally {
        saving.value = false
      }
    }

    const cancel = () => {
      router.push({ name: 'ProductList' })
    }

    onMounted(load)

    return { product, loading, error, saving, submit, cancel }
  }
}
</script>