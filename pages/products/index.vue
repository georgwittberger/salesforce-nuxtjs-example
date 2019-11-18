<template>
  <div>
    <h1>Product Catalog</h1>
    <p>
      <nuxt-link to="/">Back to Homepage</nuxt-link>
    </p>
    <ul>
      <li v-for="product in products" :key="product.id">
        <nuxt-link :to="`/products/${product.id}`">{{ product.name }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  async asyncData({ env }) {
    const { data } = await axios.get(`${env.apiBaseUrl}/products`)
    return { products: data }
  }
})
export default class ProductList extends Vue {
  products = []
}
</script>

<style></style>
