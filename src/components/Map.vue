<template>
  <div class="">
<<<<<<< HEAD
    <img :src="'https://alkadelik.pythonanywhere.com' + map.map" alt="segment map">
    <h4>{{ map.segment }}</h4>
=======
    <img :src="'https://alkadelik.pythonanywhere.com' + map" alt="" width="200px">
>>>>>>> f821de361ec4a8d942a546aafd8da7a69016d31b

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
