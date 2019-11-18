<template>
  <div>
    <h1>Salesforce Nuxt.js Example</h1>
    <p>
      <nuxt-link to="/products">Show Product Catalog</nuxt-link>
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Homepage extends Vue {}
</script>

<style></style>
