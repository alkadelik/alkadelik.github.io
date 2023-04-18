<template>
  <Menu></Menu>
  <AddSegment></AddSegment>
</template>

<script>
import AddSegment from '@/components/AddSegments.vue'
import Menu from '@/components/Menu.vue'
import {
  // fetchRoutes,
  // getStringDetails,
} from '@/services/apiServices'

 export default {
  name: 'StringsView',
  components: {
    AddSegment,
    Menu,
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