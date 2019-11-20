<template>
  <div>
    <h1>Product Catalog</h1>
    <p>
      <nuxt-link to="/">Back to Homepage</nuxt-link>
    </p>
    <ul>
      <li v-for="product in products" :key="product.id">
        <nuxt-link :to="`/products/${product.id}`"> {{ product.name }} ({{ product.id }})</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return { products: [] }
  },

  async asyncData({ $axios }) {
    const { data } = await $axios.get('/products')
    return { products: data }
  }
})
</script>

<style></style>
