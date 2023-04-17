<template>
  <div class="summary">
    <div>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Segments</th>
            <th>Total length</th>
            <th>Good</th>
            <th>Bad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E1</td>
            <td>6 (% of A roads)</td>
            <td>150Km (6%)</td>
            <td>90Km (70%)</td>
            <td>60% (30%)</td>
          </tr>
        </tbody>
      </table>

      
      <tr>
        <td>Total no of routes, segments, lenght, good, bad</td>
        <td>Last update (of table)</td>
        <td>Last repair</td>
        <td>{{ totalRoadsLength }}Km</td>
      </tr>
      <tr>
        <td>Good roads</td>
        <td>82%</td>
      </tr>
      <tr>
        <td>Bad roads</td>
        <td>18%</td>
      </tr>    
    </div>
    <h2>Roads requiring maintenance</h2>
    Road name/segment | length | speed | 
    Lenght of time the road has been bad
    Lenght of time the road has been good
    Notification when the status of a road drops or improves
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: '',
  props: {
    // msg: String
  },
  data: () => ({

  }),
  computed: {
    ...mapGetters({
      segments: 'getSegments',
      routes: 'getRoutes',
    }),
    routeCount() {
      return 
    },
    totalRoadsLength() {
      return this.segments.reduce((total, road) => {
        return Number(total) + Number(road.distance)
      }, 0.0)
    }
  }
}
</script>

<style scoped>
.summary {
  width: 100%;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 10px;
}
.summary h2 {
  text-align: left;
}
td {
  text-align: left;
  padding-right: 50px;
}
</style>
