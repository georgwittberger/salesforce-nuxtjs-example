<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>
      <nuxt-link to="/products">Back to Product Catalog</nuxt-link>
    </p>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  async asyncData({ env, params }) {
    const { data } = await axios.get(`${env.apiBaseUrl}/products/${params.id}`)
    return { product: data }
  }
})
export default class ProductList extends Vue {
  product = null
}
</script>

<style></style>
