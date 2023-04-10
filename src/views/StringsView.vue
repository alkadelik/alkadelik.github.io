<template>
  <div class="container">
    <div class="column menu">
      <Menu></Menu>
    </div>
    <div class="column main">
      <div class="column">
        <Strings></Strings>
      </div>
      <div>
        <select v-model="route" @change="listSegments">
          <option disabled>Please select a route</option>
          <option v-for="route, i in routes" :key="i" :value="route.id">{{ route.route }}</option>
        </select>
        <ul>
          <li v-for="segment, i in route_segments" :key="i" @click="checkString(segment.start_point, segment.end_point, i)">
            {{ segment.code }}
          </li>
        </ul>
        <button @click="clearSegments">Clear</button>
        display route below (fetch route or use saved route image)
      </div>
    </div>
    <!-- <div id="map" class="column" v-show="display_map">
      <div id="mapmove">
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Menu from '@/components/Menu.vue'
import Strings from '@/components/Strings.vue'

import {
  fetchRoutes,
  getStringDetails,
} from '@/services/apiServices'

 export default {
  name: 'StringsView',
  components: {
    Menu,
    Strings,
  },
  data: () => ({
    route: {},
    route_segments: [],
    seg1_start: '',
    seg1_end: '',
    seg2_start: '',
    seg2_end: '',
    seg1_position: null,
  }),
  methods: {
    checkString(start, end, i) {
      if (this.seg1_start != '') {
        // ensure not clicking the same thing. Perhaps disable the first click sef
        let seg2_start = this.addresses.filter((address) => 
          address.address == start
        )
        this.seg2_start = seg2_start[0].lat + ',' + seg2_start[0].lng

        let seg2_end = this.addresses.filter((address) => 
          address.address == end
        )
        this.seg2_end = seg2_end[0].lat + ',' + seg2_end[0].lng

        i > this.seg1_position 
          ? getStringDetails(this.seg1_start, this.seg2_end)
          : getStringDetails(this.seg2_start, this.seg1_end)

      // Highlight all the arrays inbetween including selected arrays
      // send start and end point to google to get map / details
        // display details
      // if the same segment, do nothing

      } else {
        let seg1_start = this.addresses.filter((address) => 
          address.address == start
        )
        this.seg1_start = seg1_start[0].lat + ',' + seg1_start[0].lng

        let seg1_end = this.addresses.filter((address) => 
          address.address == end
        )
        this.seg1_end = seg1_end[0].lat + ',' + seg1_end[0].lng

        this.seg1_position = i
      }
    },
    clearSegments() {
      this.seg1_start = ''
      this.seg1_end = ''
      this.seg2_start = ''
      this.seg2_end = ''
      this.seg1_position = null
    },
    listSegments() {
      this.route_segments = this.segments.filter((segment) => 
      segment.route[0] == this.route
      )
    }
  },
  computed: {
    ...mapGetters({
      addresses: 'getAddresses',
      segments: 'getSegments',
      routes: 'getRoutes',
    })
  },
  created: function(){
    fetchRoutes() // optimise to only fetch at the first load or if a new route has been added
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
    /* max-width: 1200px; */
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
  li {
    display: inline-block;
    border: 1px solid grey;
    padding: 10px;
    cursor: pointer;
    margin-right: 5px;
  }
</style>