<template>
  <div class="">
    <img :src="'https://alkadelik.pythonanywhere.com' + map.map" alt="segment map">
    <h4>{{ map.segment }}</h4>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MapComp',
  props: {
    // msg: String
  },
  computed: {
    ...mapGetters({
      map: 'getMap',
    })
  }
}
</script>

<style scoped>
  img {
    width: 400px;
    /* margin-top: 100px; */
  }

</style>
