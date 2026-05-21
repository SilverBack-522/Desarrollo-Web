<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label class="form-label">Nombre</label>
      <input v-model="local.name" required class="form-control" />
    </div>

    <div class="mb-3 row">
      <div class="col">
        <label class="form-label">Precio</label>
        <input v-model.number="local.price" type="number" step="0.01" min="0" required class="form-control" />
      </div>
      <div class="col">
        <label class="form-label">Categoría</label>
        <input v-model="local.category" class="form-control" />
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">Descripción</label>
      <textarea v-model="local.description" rows="3" class="form-control"></textarea>
    </div>

    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-secondary me-2" @click="$emit('cancel')">Cancelar</button>
      <button type="submit" class="btn btn-primary" :disabled="saving">
        <span v-if="saving" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Guardar
      </button>
    </div>
  </form>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'

export default {
  props: {
    product: {
      type: Object,
      default: null
    },
    saving: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const local = reactive({
      title: '',
      price: null,
      category: '',
      description: ''
    })

    const resetFromProps = () => {
      if (props.product) {
        local.name = props.product.name ?? ''
        local.price = props.product.price ?? null
        local.category = props.product.category ?? ''
        local.description = props.product.description ?? ''
      } else {
        local.name = ''
        local.price = null
        local.category = ''
        local.description = ''
      }
    }

    watch(() => props.product, resetFromProps, { immediate: true })

    function onSubmit() {
      // validaciones adicionales si se requieren
      emit('submit', { ...local })
    }

    return { ...toRefs(local), local, onSubmit }
  }
}
</script>