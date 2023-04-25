<template>
  <div class="container">
    <div class="left selection">
      <button @click="clearAllFilters">Reset</button>
      <div>
        <input v-model="manual_input_search" @input="showManualSearchDetails" placeholder="Search segment">

        <select v-model="selected_route" @change="showGroupDetails('route')">
          <option disabled selected value="">Select route</option>
          <option v-for="route, i in routes" :key="i" :value="route">
            {{ route.route }}
          </option>
        </select>

        <select v-model="selected_state" @change="showGroupDetails('state')">
          <option disabled selected value="">Select state</option>
          <option v-for="state, i in states" :key="i" :value="state">
            {{  state }}
          </option>
        </select>
      </div>
    </div>
    

    <div class="right stats" v-if="!search_segment">
      <div v-if="all_segments">
        <div class="basic_info">
          <h4>All segments</h4>
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
      </div> <!-- end all_segments -->

      <div v-else>
        <div v-if="search_route">
          <div class="basic_info">
            <h4>{{ selected_route.route }} segments</h4>
            <ul>
              <li>Total lenght: {{ this.group_length }}</li>
              <li>No of segments: {{ this.group_segment_count }}</li>
              <li>Good roads: <span>{{  }} ({{  }}%)</span></li>
              <li>Bad roads: <span>{{  }} ({{  }}%)</span></li>
            </ul>
          </div>
        </div> <!-- end search_route -->

        <div v-else>
          <div class="basic_info">
            <h4>{{ selected_state }} segments</h4>
            <ul>
              <li>Total lenght: {{ this.group_length }}</li>
              <li>No of segments: {{ this.group_segment_count }}</li>
              <li>Good roads: <span>{{  }} ({{  }}%)</span></li>
              <li>Bad roads: <span>{{  }} ({{  }}%)</span></li>
            </ul>
          </div>
        </div> <!-- end state search -->
      </div>
    </div> <!-- end group search -->

    <div class="right stats" v-else>
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
    </div> <!-- end segment search -->
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
    all_segments: true,
    group_search: '', // should this share the search data point rather than be separate?
    group_length: 0,
    group_route_count: 0,
    group_segment_count: 0,
    selected_route: '',
    selected_state: '',
    search: '',
    search_segment: false,
    search_route: false, 
    manual_input_search: '',
  }),
  methods: {
    clearAllFilters() {
      this.search = ''
      this.manual_input_search = ''
      this.selected_route = ''
      this.selected_state = ''
      this.all_segments = true
      this.search_segment = false
    },
    groupSearchComputations() {
      this.group_length = this.groupSearch.reduce((total, road) => {
        return Number(total) + Number(road.distance)
      }, 0.0)

      this.group_segment_count = this.groupSearch.length

      // categories
      // good (length and %)
      // bad (length and %)
    },
    showManualSearchDetails() {
      // if there's a complete (not partial) segment match and only one
      if (this.manual_input_search.length > 3) {
        this.search = this.manual_input_search
        // if there's a match. clear other searches
        this.selected_route = ''
        this.selected_state = ''
        this.search_segment = true
      }
    },
    showGroupDetails(option) {
      this.search_segment = false
      this.all_segments = false
      if (option === 'route') {
        this.search_route = true
        this.group_search = this.selected_route.route
      } else {
        this.search_route = false
        this.group_search = this.selected_state
      }
      this.groupSearchComputations()
    },
  },
  computed: {
    ...mapGetters({
      addresses: 'getAddresses',
      segments: 'getSegments',
      states: 'getStates',
      routes: 'getRoutes',
    }),
    // these filters are also in HomeView. Should be refactored
    groupSearch() {
      return this.segments.filter((segment) => {
        if (this.group_search != '') {
          if (this.search_route) {
            return segment.code.toLowerCase().match(this.group_search.toLowerCase()) 
          }
          return segment.state.toLowerCase().match(this.group_search.toLowerCase()) 
        }

      // no of segments
      // no of routes
      // all segments lenght
      // no of routes
      })
    },
    segmentSearch() {
      // search segment code, name, address, start point, end point
      return this.segments.filter((segment) => {
        if (this.search != '') {
          return this.search.toLowerCase().match(segment.code.toLowerCase())
        }
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
  /* padding: 15px; */
  background-color: bisque;
}
.stats, .map, .main, .selection {
  padding: 10px;
}
.selection button, .selection input, .selection select {
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}
ul li {
  text-align: left;
}
</style>
