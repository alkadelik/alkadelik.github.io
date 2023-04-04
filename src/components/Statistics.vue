<template>
  <div class="summary">
    <h2>Summary</h2>
    <div>
      <tr>
        <td>Total lenght of roads</td>
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
  name: 'StatisticsComp',
  props: {
    // msg: String
  },
  data: () => ({

  }),
  computed: {
    ...mapGetters({
      roads: 'getRoads',
    }),
    totalRoadsLength() {
      return this.roads.reduce((total, road) => {
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
