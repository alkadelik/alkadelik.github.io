<template>
  <div class="container">
    <div class="left selection">
      <button @click="clearAllFilters">Reset</button>
      <div>
        <input v-model="manual_input_search" @change="showManualSearchDetails" placeholder="Search">
        <select v-model="route_select" name="" id="" @change="showRouteDetails">
          <option disabled selected value="">Select route</option>
          <option v-for="route, i in routes" :key="i" :value="route">
            {{ route.route }}
          </option>
        </select>
        <select name="" id="">
          <option value="">Select state</option>
        </select>
      </div>
    </div>
    

    <div class="default all_segments right stats">
      <div class="basic_info">
        <h4>All roads</h4>
        <ul>
          <li>Total lenght: {{ this.allSegmentsLength }}</li>
          <li>No of routes: {{ this.noOfAllRoutes }}</li>
          <li>No of segments: {{ this.noOfAllSegments }}</li>
          <li>Good roads: <span>{{  }} ({{  }}%)</span></li>
          <li>Bad roads: <span>{{  }} ({{  }}%)</span></li>
        </ul>
      </div>
      <div class="A_roads">
        <h4>F roads</h4>
        <ul>
          <li>Total lenght: {{ this.allSegmentsLength }}</li>
          <li>No of routes: {{ this.noOfAllRoutes }}</li>
          <li>No of segments: {{ this.noOfAllSegments }}</li>
          <li>Good roads: <span>{{  }} ({{  }}%)</span></li>
          <li>Bad roads: <span>{{  }} ({{  }}%)</span></li>
        </ul>
      </div>
      <div class="F_roads">
        <h4>A roads</h4>
        <ul>
          <li>Total lenght: {{ this.allSegmentsLength }}</li>
          <li>No of routes: {{ this.noOfAllRoutes }}</li>
          <li>No of segments: {{ this.noOfAllSegments }}</li>
          <li>Good roads: <span>{{  }} ({{  }}%)</span></li>
          <li>Bad roads: <span>{{  }} ({{  }}%)</span></li>
        </ul>
      </div>
    </div>

    <div class="right stats" v-if="notset">
      <div class="basic_info">
        <ul v-for="segment, i in segmentSearch" :key="i">
          <li>Route: <span>{{ segment.route }}</span></li>
          <li>Code: <span>{{ segment.code }}</span></li>
          <li>Name: <span>{{ segment.name }}</span></li>
          <li>State: <span>{{ segment.state }}</span></li>
          <li>Start point: <span>{{ segment.start_point }}</span></li>
          <li>End point: <span>{{ segment.end_point }}</span></li>
        </ul> 
      </div>
      <div class="basic_info_2">
        <ul v-for="segment, i in segmentSearch" :key="i">
          <li>Length: <span>{{ segment.distance }}</span></li>
          <li>Time: <span>{{ segment.travel_time }}</span></li>
          <li>Speed: <span>{{ segment.avg_speed }}</span></li>
        </ul>
        <ul>
          <li>Road state: <span>Good</span></li>
          <li>Updated: <span>Monday, April 10</span></li>
          <li>Start point: <span>Mokola</span></li>
          <li>End point: <span>Ipin</span></li>
        </ul>
        <div class="graph">
          <p>This is the tail of a cat</p>
        </div>
      </div>
    </div>

    <div class="right stats" v-if="notset">
      <div class="basic_info">
        <ul v-for="segment, i in segmentSearch" :key="i">
          <li>Route: <span>{{ segment.route }}</span></li>
          <li>Code: <span>{{ segment.code }}</span></li>
          <li>Name: <span>{{ segment.name }}</span></li>
          <li>State: <span>{{ segment.state }}</span></li>
          <li>Start point: <span>{{ segment.start_point }}</span></li>
          <li>End point: <span>{{ segment.end_point }}</span></li>
        </ul> 
      </div>
      <div class="basic_info_2">
        <ul v-for="segment, i in segmentSearch" :key="i">
          <li>Length: <span>{{ segment.distance }}</span></li>
          <li>Time: <span>{{ segment.travel_time }}</span></li>
          <li>Speed: <span>{{ segment.avg_speed }}</span></li>
        </ul>
        <ul>
          <li>Road state: <span>Good</span></li>
          <li>Updated: <span>Monday, April 10</span></li>
          <li>Start point: <span>Mokola</span></li>
          <li>End point: <span>Ipin</span></li>
        </ul>
        <div class="graph">
          <p>This is the tail of a cat</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'StatisticsComp',
  props: [
    // 'segment',
  ],
  data: () => ({
    group_search: '', // should this share the search data point rather than be separate?
    group_length: 0,
    group_route_count: 0,
    group_segment_count: 0,
    route_select: '',
    search: '',
    segment_search: false,
    manual_input_search: '',
    state_select: '',
  }),
  methods: {
    clearAllFilters() {
      this.search = ''
      this.manual_input_search = ''
    },
    groupSearchComputations() {
      // total lenght
      this.group_length = this.groupSearch.reduce((total, road) => {
        return Number(total) + Number(road.distance)
      }, 0.0)
      // no of segments
      this.group_segment_count = this.groupSearch.length
      // no of routes
        // NA if searching a route (this would apply in state)
      // categories
      // good (length and %)
      // bad (length and %)
    },
    showManualSearchDetails() {
      // if there's a complete (not partial) segment match and only one
      this.search = this.manual_input_search
    },
    showRouteDetails() {
      this.group_search = this.route_select.route
      this.groupSearchComputations()
    },
    showStateDetails() {
      this.group_search = this.state_select.route
      this.groupSearchComputations()
    }
  },
  computed: {
    ...mapGetters({
      addresses: 'getAddresses',
      segments: 'getSegments',
      routes: 'getRoutes',
    }),
    // these filters are also in HomeView. Should be refactored
    groupSearch() {
      return this.segments.filter((segment) => {
        if (this.group_search != '') {
          return segment.code.toLowerCase().match(this.group_search.toLowerCase())
        }
      })
    },
    segmentSearch() {
      // search segment code, name, address, start point, end point
      return this.segments.filter((segment) => {
        if (this.search != '') {
          // let result = []
          return this.search.toLowerCase().match(segment.code.toLowerCase())

          // return segment.name.toLowerCase().match(this.search.toLowerCase())
          // return segment.start_point.toLowerCase().match(this.search.toLowerCase())
          // return segment.end_point.toLowerCase().match(this.search.toLowerCase())
        }
        // return // return some default value
      })
    },
    aRoutes() {
      return this.routes.filter((route) => {
        return route.category.toString().match('1')
      })
    },
    fRoutes() {
      return this.routes.filter((route) => {
        return route.category.toString().match('2')
      })
    },  
    routeCount() {
      return null
    },
    allSegmentsLength() {
      return this.segments.reduce((total, road) => {
        return Number(total) + Number(road.distance)
      }, 0.0)
    },
    noOfAllRoutes() {
      return this.routes.length
    },
    noOfAllSegments() {
      return this.segments.length
    },
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
.basic_info_2 {
  display: flex;
  flex-direction: column;
}
.selection, .stats {
  display: flex;
}
.stats {
  flex-direction: row;
}
.selection {
  flex-direction: column;
  width: 200px;
}
.selection select, .selection input {
  display: block;
}
.stats, .map, .main, .selection {
  padding: 10px;
}
ul li {
  text-align: left;
}
</style>
