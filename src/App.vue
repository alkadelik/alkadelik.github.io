<template>
  <router-view/>
</template>

<script>
import {
  fetchSegments,
} from '@/services/apiServices'
export default {
  created: function(){
    fetchSegments() // put this in App.vue level
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
