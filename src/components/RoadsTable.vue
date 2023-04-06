<template>
  <div class="tables">
    <div class="search">
        <div>
          <Directions></Directions>
          <!-- <input v-model="search" placeholder="Enter route no">
          <button type="submit">Search</button> -->
        </div>
      </div>
    <div class="column table">
      <h2>Segments</h2>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Segment</th>
            <th>Start point</th>
            <th>End point</th>
            <th>Distance (Km)</th>
            <th>Travel time (mins)</th>
            <th>Average speed (Km/hr)</th>
          </tr>
        </thead>
        <tbody>
          <tr class="details" v-for="road, i in filteredRoads" :key="i" @click="displayDetails(road.map, road.segment)">
            <td>{{ road.route }}</td>
            <td>{{ road.segment }}</td>
            <td>{{ road.start_point }}</td>
            <td>{{ road.end_point.slice(0, 30) }}</td>
            <td>{{ road.distance }}</td>
            <td>{{ road.travel_time }}</td>
            <td :style="{color: '#' + road.status}" style="font-weight: bold">{{ road.avg_speed }}</td>
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
import Directions from '@/components/DirectionsTable.vue'

export default {
  name: 'RoadsTable',
  components: {
    Directions,
  },
  props: {
    // msg: String
  },
  data: () => ({
    search: '',
  }),
  methods: {
    displayDetails(map, segment) {
      let data = {'map': map, 'segment': segment}
      store.commit(mutationTypes.CHANGE_MAP, data)
    }
  },
  computed: {
    ...mapGetters({
      roads: 'getRoads',
    }),
    filteredRoads() {
      return this.roads.filter((road) => {
        if (this.search != '') {
          return road.route.toLowerCase().match(this.search.toLowerCase())
        }
        return this.roads
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
</style>
