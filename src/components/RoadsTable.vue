<template>
  <div class="tables">
    <div class="search">
        <div>
          <input v-model="search" placeholder="Enter route no">
          <button type="submit">Search</button>
        </div>
      </div>
    <div class="column table">
      <h2>List of roads</h2>
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
          <tr v-for="road, i in filteredRoads" :key="i">
            <td>{{ road.route }}</td>
            <td>{{ road.segment }}</td>
            <td>{{ road.start_point }}</td>
            <td>{{ road.end_point.slice(0, 30) }}</td>
            <td>{{ road.distance }}</td>
            <td>{{ road.travel_time }}</td>
            <td>{{ road.avg_speed }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DirectionsTable',
  props: {
    // msg: String
  },
  data: () => ({
    search: '',
    roadCondition: {
      // good: ,
      // ok: ,
      // bad: ,
      // very_bad: ,
    },
  }),
  computed: {
    ...mapGetters({
      roads: 'getRoads',
    }),
    filteredRoads() {
      return this.roads.filter((road) => {
        if (this.search != '') {
          return road.route.toLowerCase().match(this.search.toLowerCase())
        }
        // road.status == '1' ? red
        //   : road.status == '2' ? pink
        //   : road.status == '2' ? pink
        //   : road.status == '2' ? pink

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
</style>
