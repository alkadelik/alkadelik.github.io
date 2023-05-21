<template>
  <div class="container statistics">
    <div class="left selection">
      <button @click.prevent="clearAllFilters">Reset</button>
      <div>
        <Autocomplete 
          :directory="directory" class="position"
          :clear_search="clear_manual_search"
          @set-segment="setSegment"
        ></Autocomplete>
        <select v-model="selected_route" @change="showGroupDetails('route')">
          <option disabled selected value="">Select route</option>
          <option v-for="route, i in routes" :key="i" :value="route">
            {{ route.route }}
          </option>
        </select>

        <select v-model="selected_state" @change="showGroupDetails('state')">
          <option disabled selected value="">Select state</option>
          <option v-for="state, i in states" :key="i" :value="state">
            {{ state }}
          </option>
        </select>
      </div>
    </div>
    
    <div class="right stats" v-if="!search_segment"><!-- multiple segments search -->
      <div v-if="all_segments">
        <div class="basic_info">
          <h4>All segments</h4>
          <ul>
            <li>Total lenght: {{ this.allSegmentsLength }}Km</li>
            <li>No of routes: {{ this.noOfAllRoutes }}</li>
            <li>No of segments: {{ this.noOfAllSegments }}</li>
              <li>Good: <span>{{ all_conditions.good }}Km ({{ all_conditions_percentage.good }}%)</span></li>
              <li>Tolerable: <span>{{ all_conditions.tolerable }}Km ({{ all_conditions_percentage.tolerable }}%)</span></li>
              <li>Intolerable: <span>{{ all_conditions.intolerable }}Km ({{ all_conditions_percentage.intolerable }}%)</span></li>
              <li>Failed: <span>{{ all_conditions.failed }}Km ({{ all_conditions_percentage.failed }}%)</span></li>
          </ul>
        </div>
      </div> <!-- end all_segments -->

      <div v-else><!-- route or state search-->
        <div>
          <div class="basic_info">
            <h4 v-if="search_route">{{ selected_route.route }} segments</h4>
            <h4 v-else>{{ selected_state }} segments</h4>
            <ul>
              <li>Total lenght: {{ this.group_length }}</li>
              <li>No of segments: {{ this.group_segment_count }}</li>
              <li>Good: <span>{{ group_condition.good }}Km ({{ group_condition_percentage.good }}%)</span></li>
              <li>Tolerable: <span>{{ group_condition.tolerable }}Km ({{ group_condition_percentage.tolerable }}%)</span></li>
              <li>Intolerable: <span>{{ group_condition.intolerable }}Km ({{ group_condition_percentage.intolerable }}%)</span></li>
              <li>Failed: <span>{{ group_condition.failed }}Km ({{ group_condition_percentage.failed }}%)</span></li>
            </ul>
            <button v-if="search_route" @click="refreshMotorability">Update motorability for route</button><!-- put warning not to because cost -->
            <button v-else @click="refreshMotorability">Update motorability for state</button><!-- put warning not to because cost -->
          </div>
        </div>
      </div>
    </div> <!-- end group search -->

    <div class="right stats" v-else><!-- single segment search -->
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
          <li>Road condition: <span :style="{background: '#' + segment.status}">{{ segment_condition }}</span></li>
          <!-- <li>Updated: <span>Monday, April 10</span></li> -->
        </ul>
        <button @click="refreshMotorability">Update segment motorability</button><!-- put warning not to because cost -->
        <div class="graph">
        </div>
      </div>
    </div> <!-- end segment search -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as mutationTypes from '@/store/mutationTypes'
import store from '@/store/index'
import Autocomplete from '@/components/Autocomplete.vue'
import {updateMotorability} from '@/services/apiServices'

export default {
  name: 'StatisticsComp',
  props: [
    // 'segment',
  ],
  components: {
    Autocomplete,
  },
  data: () => ({
    all_segments: true,
    all_conditions: {
      good: 0,
      tolerable: 0,
      intolerable: 0,
      failed: 0,
    },
    all_conditions_percentage: {
      good: 0,
      tolerable: 0,
      intolerable: 0,
      failed: 0,
    },
    group_condition: {
      good: 0,
      tolerable: 0,
      intolerable: 0,
      failed: 0,
    },
    group_condition_percentage: {
      good: 0,
      tolerable: 0,
      intolerable: 0,
      failed: 0,
    },
    group_search: '', // should this share the search data point rather than be separate?
    group_length: 0,
    group_route_count: 0,
    group_segment_count: 0,
    selected_route: '',
    selected_state: '',
    search: '',
    search_segment: false,
    search_route: false,
    segment_condition: '',
    clear_manual_search: 0,
  }),
  methods: {
    clearAllFilters() {
      this.search = ''
      this.clear_manual_search += 1
      this.selected_route = ''
      this.selected_state = ''
      this.all_segments = true
      this.search_segment = false
      this.clearGroupConditions()
      // store.commit(mutationTypes.CHANGE_STAT_SEGMENTS, this.segments)
    },
    clearGroupConditions() {
      this.group_condition.good = 0
      this.group_condition.tolerable = 0
      this.group_condition.intolerable = 0
      this.group_condition.failed = 0

      this.group_condition_percentage.good = 0
      this.group_condition_percentage.tolerable = 0
      this.group_condition_percentage.intolerable = 0
      this.group_condition_percentage.failed = 0
    },
    groupSearchComputations() {
      this.group_length = this.groupSearch.reduce((total, road) => {
        return Math.round(Number(total) + Number(road.distance))
      }, 0.0)

      this.group_segment_count = this.groupSearch.length
    },
    refreshMotorability() {
      if (this.search_segment) {
        updateMotorability(this.segmentSearch[0].id)
      } else if (this.search_route) {
        updateMotorability({'route': this.selected_route.id})
      } else {
        updateMotorability({'state': this.selected_state})
      }
    },
    roadCondition(segment_array) { // using all_conditions here, separate from group_condition becuase "allSegments" properties are computed thus sharing methods (in order to be DRY) requires reactivity but achieving that gets complex.
      // for (let i=0; i<segment_array.length; i++) {
      //     let speed = Number(segment_array[i].avg_speed)
      //     let distance = Number(segment_array[i].distance)
      //     if (speed < 50) {
      //       this.all_conditions.failed += Math.round(distance)
      //       this.all_conditions_percentage.failed = Math.round(this.all_conditions.failed / this.allSegmentsLength * 1000)/10
      //     } else if (speed < 60) {
      //       this.all_conditions.intolerable += Math.round(distance)
      //       this.all_conditions_percentage.intolerable = Math.round(this.all_conditions.intolerable / this.allSegmentsLength * 1000)/10
      //     } else if (speed < 70) {
      //       this.all_conditions.tolerable += Math.round(distance)
      //       this.all_conditions_percentage.tolerable = Math.round(this.all_conditions.tolerable / this.allSegmentsLength * 1000)/10
      //     } else {
      //       this.all_conditions.good += Math.round(distance)
      //       this.all_conditions_percentage.good = Math.round(this.all_conditions.good / this.allSegmentsLength * 1000)/10
      //     }
      //   }
      if (segment_array) {
        null
      }
    },
    setSegment(seg) {
      this.search = seg
      this.selected_route = ''
      this.selected_state = ''
      this.search_segment = true
    },
    showGroupDetails(option) {
      this.clear_manual_search += 1
      this.search_segment = false
      this.all_segments = false
      if (option === 'route') {
        this.selected_state = ''
        this.search_route = true
        this.group_search = this.selected_route.route
      } else {
        this.selected_route = ''
        this.search_route = false
        this.group_search = this.selected_state
      }
      this.groupSearchComputations()
    },
  },
  computed: {
    ...mapGetters({
      addresses: 'getAddresses',
      directory: 'getDirectory',
      segments: 'getSegments',
      states: 'getStates',
      routes: 'getRoutes',
    }),
    allSegmentsLength() {
      return this.segments.reduce((total, road) => {
        return Number(total) + Math.round(road.distance)
      }, 0.0)
    },
    groupSearch() {    
      return this.segments.filter((segment) => {
        if (this.group_search != '') {
          if (this.search_route) {
            return segment.code.toLowerCase().match(this.group_search.toLowerCase())
          }
          return segment.state.toLowerCase().match(this.group_search.toLowerCase())
        }
      })
    },
    noOfAllRoutes() {
      return this.routes.length
    },
    noOfAllSegments() {
      return this.segments.length
    },
    routeCount() {
      return null
    },
    segmentSearch() {
      // search segment code, (name, address, start point, end point)
      return this.segments.filter((segment) => {
        if (this.search != '') {
          return this.search.toLowerCase().match(segment.code.toLowerCase())
        }
      })
    },
  },
  watch: {
    allSegmentsLength() {
      for (let i=0; i<this.segments.length; i++) {
        let speed = Number(this.segments[i].avg_speed)
        let distance = Number(this.segments[i].distance)
        if (speed < 50) {
          this.all_conditions.failed += Math.round(distance)
          this.all_conditions_percentage.failed = Math.round(this.all_conditions.failed / this.allSegmentsLength * 1000)/10
        } else if (speed < 60) {
          this.all_conditions.intolerable += Math.round(distance)
          this.all_conditions_percentage.intolerable = Math.round(this.all_conditions.intolerable / this.allSegmentsLength * 1000)/10
        } else if (speed < 70) {
          this.all_conditions.tolerable += Math.round(distance)
          this.all_conditions_percentage.tolerable = Math.round(this.all_conditions.tolerable / this.allSegmentsLength * 1000)/10
        } else {
          this.all_conditions.good += Math.round(distance)
          this.all_conditions_percentage.good = Math.round(this.all_conditions.good / this.allSegmentsLength * 1000)/10
        }
      }
    },
    segmentSearch() {
      store.commit(mutationTypes.CHANGE_STAT_SEGMENTS, this.segmentSearch)

      try {
        let speed = this.segmentSearch[0].avg_speed
        if (speed < 50) {
          this.segment_condition = 'Failed'
        } else if (speed < 60) {
          this.segment_condition = 'Intolerable'
        } else if (speed < 70) {
          this.segment_condition = 'Tolerable'
        } else {
          this.segment_condition = 'Good'
        }
      } catch {
        null
      }
    },
    groupSearch() {
      this.clearGroupConditions()
      
      // if('route') {null}
      // console.log(this.selected_route.route)
      // console.log(this.selected_route.route.length)
      // let double_filter = this.groupSearch.search(segment => {segment.route.length == this.selected_route.route.length})
      // console.log(double_filter)


      let ordered_search = this.groupSearch.sort((a, b) => a.index - b.index)
      store.commit(mutationTypes.CHANGE_STAT_SEGMENTS, ordered_search)

      if (this.groupSearch != 0) {
        // I tried to make the for loop below a method (see roadCondition()) but it became semi unreactive. Hence using the long form below
        for (let i=0; i<this.groupSearch.length; i++) {
          let speed = Number(this.groupSearch[i].avg_speed)
          let distance = Number(this.groupSearch[i].distance)

          if (speed < 50) {
            // Getting a weird result when I do this:
            // this.group_condition.failed += Math.round(distance *10)/10
            // The resutls get inexplicably long decimal points whereas the intent is to get one decimal point - like when calculating the percentages.
            this.group_condition.failed += Math.round(distance)
            this.group_condition_percentage.failed = Math.round(this.group_condition.failed / this.group_length * 1000)/10
          } else if (speed < 60) {
            this.group_condition.intolerable += Math.round(distance)
            this.group_condition_percentage.intolerable = Math.round(this.group_condition.intolerable / this.group_length * 1000)/10
          } else if (speed < 70) {
            this.group_condition.tolerable += Math.round(distance)
            this.group_condition_percentage.tolerable = Math.round(this.group_condition.tolerable / this.group_length * 1000)/10
          } else {
            this.group_condition.good += Math.round(distance)
            this.group_condition_percentage.good = Math.round(this.group_condition.good / this.group_length * 1000)/10
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
.statistics {
  font-size: 20px;
}
.basic_info_2 {
  display: flex;
  flex-direction: column;
}
.position {
  z-index: 100;
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
