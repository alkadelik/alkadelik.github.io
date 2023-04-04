<template>
  <div class="search">
    <div v-if="roads" class="roads">
      <form action="/search" method="get">
        <input type="text" id="search" name="q" placeholder="Enter road name">
        <button type="submit">Search</button>
      </form>
    </div>
    <div v-else class="directions">
      <form action="/search" method="get">
        <input type="text" id="search" name="q" placeholder="From">
        <input type="text" id="search" name="q" placeholder="To">
        <button type="submit">Search</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchComp',
  props: {
  },
  data: () => ({
    roads: true,
  })
}
</script>

<style scoped>
  .search {
    padding: 20px;
  }
</style>
