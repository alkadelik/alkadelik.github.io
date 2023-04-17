<template>
  <AddSegment></AddSegment>
</template>

<script>
import AddSegment from '@/components/AddSegments.vue'
import {
  // fetchRoutes,
  // getStringDetails,
} from '@/services/apiServices'

 export default {
  name: 'StringsView',
  components: {
    AddSegment
  },
  data: () => ({
    
  }),
  methods: {
    updateAddress() {
      
    },
  },
}
</script>

<style scoped>
 
</style>