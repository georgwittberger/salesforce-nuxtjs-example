<template>
  <div>
    <div>
      <span v-if="user">Logged in as: {{ user.firstName }} {{ user.lastName }} ({{ user.username }})</span>
      <span v-if="!user"><a href="/login">Login</a></span>
    </div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return { user: null }
  },

  async created() {
    try {
      const { data } = await this.$axios.get('/users/current')
      this.user = data
    } catch (error) {
      this.user = null
    }
  }
})
</script>

<style></style>
