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
    displayDetails(map, segment) {
      let data = {'map': map, 'segment': segment}
      store.commit(mutationTypes.CHANGE_MAP, data)
    }
  },
  computed: {
    ...mapGetters({
      segment: 'getSegments',
    }),
    filteredSegments() {
      return this.segment.filter((segment) => {
        if (this.search != '') {
          return segment.route.toLowerCase().match(this.search.toLowerCase())
        }
        return this.segment
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
</style>
