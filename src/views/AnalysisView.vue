<template>
  <div class="container">
    <div class="main">
      <div class="top">
        <div>
          <Statistics></Statistics>
        </div>
        <div>
          <Map></Map>
        </div>
      </div>
      <div>
        <Segments :segments="segments"></Segments>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Map from '@/components/Map.vue'
import Segments from '@/components/SegmentsTable.vue'
import Statistics from '@/components/Statistics.vue'

import {
  // fetchRoutes,
  getStringDetails,
} from '@/services/apiServices'

 export default {
  name: 'AnalysisView',
  components: {
    Map,
    Segments,
    Statistics,
  },
  data: () => ({
    route: {},
    route_segments: [],
    // search: '',
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
    emitSearch() {
      // search segment code, name, address, start point, end point
      // if exactly one result, send it
      // not search for route number
    },
    listSegments() {
      this.route_segments = this.segments.filter((segment) => 
      segment.route[0] == this.route
      )
    }
  },
  computed: {
    ...mapGetters({
      segments: 'getStatSegments',
    })
  }
}
</script>

<style scoped>
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
  .main {
    width: 100%;
  }
  .top {
    display: flex;
    flex-direction: row;
  }
</style>