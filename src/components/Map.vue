<template>
  <div class="">
    <p><span @click="hideMap">x</span></p>
    <img :src="'http://127.0.0.1:8000' + map.map" alt="segment map">
    <h4>{{ map.segment }}</h4>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store/index'
import * as mutationTypes from '@/store/mutationTypes'

export default {
  name: 'MapComp',
  props: {
    // msg: String
  },
  methods: {
    hideMap() {
      store.commit(mutationTypes.HIDE_MAP, false)
    }
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
  p {
    text-align: right;
    margin: 0;
    font-size: 24px;
  }
  span {
    font-weight: bold;
    cursor: pointer;
  }
  h4 {
    margin-top: 0;
  }

</style>
