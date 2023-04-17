<template>
  <div class="container">
    <div class="column menu">
      Welcome to the CPMS national road catalogue
      <router-link :to="{name: 'segments'}"><button>Enter</button></router-link>
    </div>
  </div>
</template>

<script>
 export default {
  name: 'LandingView',
  components: {
  },
  data: () => ({
  }),
}
</script>

<style scoped>

</style>