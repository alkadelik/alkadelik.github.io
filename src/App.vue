<template>
  <Menu></Menu>
  <router-view/>
</template>

<script>
import * as mutationTypes from '@/store/mutationTypes'
import Menu from '@/components/Menu.vue'
import {
  fetchSegments,
} from '@/services/apiServices'
export default {
  components: {
    Menu,
  },
  created: function(){
    fetchSegments()
    .then((response) => {
      this.$store.commit(mutationTypes.SAVE_ADDRESSES, response.data.addresses)
      this.$store.commit(mutationTypes.SAVE_ROUTES, response.data.routes)
      this.$store.commit(mutationTypes.SAVE_DIRECTORY, response.data.directory)
      this.$store.commit(mutationTypes.SAVE_SEGMENTS, response.data.segments)
    })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: b;
}
* {
  box-sizing: border-box;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
ul {
  list-style-type: none;
}
</style>
