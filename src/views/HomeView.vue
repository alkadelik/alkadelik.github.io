<template>
  <div class="container">
    <div class="column menu">
      <Menu
      @viewRoadsOrDirections="isRoads"
      ></Menu>
    </div>
    <div class="column main">
      <div class="column stats">
        <Statistics></Statistics>
      </div>
      <div>
        <Roads v-if="is_roads"></Roads>
        <Directions v-else></Directions>
      </div>
    </div>
    <div class="column map">
      <!-- <Map></Map> -->
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Roads from '@/components/RoadsTable.vue'
import Directions from '@/components/DirectionsTable.vue'
import Statistics from '@/components/Statistics.vue'
// import Map from '@/components/Map.vue'

import {
  fetchRoads,
} from '@/services/apiServices'

 export default {
  name: 'DirectionsView',
  components: {
    Menu,
    Roads,
    Directions,
    Statistics,
    // Map,
  },
  data: () => ({
    is_roads: true,
    street: '',
  }),
  methods: {
    isRoads(value) {
      this.is_roads = value
    }
  },
  created: function(){
    fetchRoads() // don't fetch road every time this view loads. Instead, only fetch at the first load or if a new road has been added. Use a data point in the store to indicate if a new road has been added or not
  },
 }
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .menu {
    width: 100%;
    max-width: 150px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #f2f2f2;
  }
  .column {
    /* width: 100%; */
    padding: 10px;
    box-sizing: border-box;
  }
  .main {
    /* width: 40%; */
  }
  .map {
    /* width: 30%; */
    background-color: lightgray;
  }
</style>