<template>
  <div class="tables">
    <div class="search">
      </div>
    <div class="table">
      <h2>Segments
      </h2>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Code</th>
            <th>Name</th>
            <th>State</th>
            <th>Start name</th>
            <th>Northings</th>
            <th>Eastings</th>
            <th>End name</th>
            <th>Northings2</th>
            <th>Eastings2</th>
            <th>Distance</th>
            <th>Travel time</th>
            <th>Average speed</th>
          </tr>
        </thead>
        <tbody>
          <tr class="details" v-for="segment, i in segments" :key="i" @click="displayDetails(segment.map, segment.code)">
            <td>{{ segment.route }}</td>
            <td>{{ segment.code }}</td>
            <td class="capitalise">{{ segment.name.toLowerCase() }}</td>
            <td class="capitalise">{{ segment.state.toLowerCase() }}</td>
            <td class="capitalise">{{ segment.start_point.toLowerCase() }}</td>
            <td class="">{{ segment.northings }}</td>
            <td class="">{{ segment.eastings }}</td>
            <td class="capitalise">{{ segment.end_point.toLowerCase() }}</td>
            <td class="">{{ segment.northings2 }}</td>
            <td class="capitalise">{{ segment.eastings2 }}</td>
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
  props: [
    'segments',
  ],
  data: () => ({
    search: '',
    unordered_segments: [],
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
      this.search = route
    }
  },
  computed: {
    ...mapGetters({
      routes: 'getRoutes'
    }),
  },
}
</script>

<style scoped>
table {
  width: 100%;
}
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
  .pagination ul {
    display: flex;
    justify-content: center;
    align-content: space-between;
    flex-wrap: wrap;
    max-width: 1100px;
  }
  .routes li {
    /* display: inline-block; */
    padding: 3px; 
    margin-right: 7px;
    cursor: pointer;
  }
</style>
