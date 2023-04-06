<template>
  <div class="">
    <img :src="'https://alkadelik.pythonanywhere.com' + map" alt="" width="200px">

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
    width: 300px;
    margin-top: 100px;
  }

</style>
