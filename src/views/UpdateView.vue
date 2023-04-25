<template>
  <div class="container">
    <Menu></Menu>
    <AddSegment></AddSegment>
  </div>
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
.container {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* background-color: aquamarine; */
  }
  .menu {
    /* display: none; */
    width: 100%;
    max-width: 150px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #f2f2f2;
  }
</style>