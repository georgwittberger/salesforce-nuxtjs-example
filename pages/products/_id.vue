<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>Code: {{ product.id }}</p>
    <p>{{ product.description }}</p>
    <p>
      <nuxt-link to="/products">Back to Product Catalog</nuxt-link>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return { product: null }
  },

  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/products/${params.id}`)
    return { product: data }
  }
})
</script>

<style></style>
