<template>
  <div class="tables">
    <div class="search">
        <div>
          <!-- <Segments></Segments> -->
          <!-- <input v-model="search" placeholder="Enter route no">
          <button type="submit">Search</button> -->
        </div>
      </div>
    <div class="column table">
      <h2>Segments</h2>
      <ul class="routes">
        <li @click="clearSearch">All</li>
        <li
          v-for="route, i in routes" :key="i"
          @click="filterRoute(route.route)"
          >
          {{ route.route }}
        </li>
      </ul>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Code</th>
            <th>Name</th>
            <th>State</th>
            <th>Start point</th>
            <th>End point</th>
            <th>Distance</th>
            <th>Travel time</th>
            <th>Average speed</th>
          </tr>
        </thead>
        <tbody>
          <tr class="details" v-for="segment, i in filteredSegments" :key="i" @click="displayDetails(segment.map, segment.segment)">
            <td>{{ segment.route }}</td>
            <td>{{ segment.code }}</td>
            <td class="capitalise">{{ segment.name.toLowerCase() }}</td>
            <td class="capitalise">{{ segment.state.toLowerCase() }}</td>
            <td class="capitalise">{{ segment.start_point.toLowerCase() }}</td>
            <td class="capitalise">{{ segment.end_point.toLowerCase() }}</td>
            <td>{{ segment.distance }} Km</td>
            <td>{{ segment.travel_time }} mins</td>
            <td class="status" :style="{background: '#' + segment.status}" style="font-weight: bold;">{{ segment.avg_speed }} Km/hr</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store/index'
import * as mutationTypes from '@/store/mutationTypes'
// import Segments from '@/components/SegmentsTable.vue'

export default {
  name: 'SegmentsTable',
  components: {
    // Segments,
  },
  props: {
    // msg: String
  },
  data: () => ({
    search: '',
  }),
  methods: {
    clearSearch() {
      this.search = ''
    },
    displayDetails(map, segment) {
      let data = {'map': map, 'segment': segment}
      store.commit(mutationTypes.CHANGE_MAP, data)
    },
    filterRoute(route) {
      console.log(route)
      this.search = route
    }
  },
  computed: {
    ...mapGetters({
      segments: 'getSegments',
      routes: 'getRoutes'
    }),
    filteredSegments() {
      return this.segments.filter((segment) => {
        if (this.search != '') {
          return segment.route.toLowerCase().match(this.search.toLowerCase())
        }
        return this.segments
      })
    }
  }
}
</script>

<style scoped>
  th {
    padding: 5px 15px;
  }
  td {
    text-align: left;
    padding: 10px;
  }
  tr:nth-child(odd) {
    background-color: #F2F2F2;
  }
  .good {
    color: green;
  }
  .ok {
    color: greenyellow;
  }
  .bad {
    color: pink;
  }
  .very_bad {
    color: red;
  }
  tr.details {
    cursor: pointer;
  }
  .capitalise {
    text-transform: capitalize;
  }
  .routes ul {
    /* display: block; */
  }
  .routes li {
    display: inline-block;
    padding: 3px; 
    margin-right: 7px;
    cursor: pointer;
  }
</style>
