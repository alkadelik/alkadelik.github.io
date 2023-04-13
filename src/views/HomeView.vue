<template>
  <div class="container">
    <div class="column menu">
      <Menu></Menu>
    </div>
    <div class="column main">
      <div class="column stats">
        <!-- <Statistics></Statistics> -->
      </div>
      <div>
        <!-- <UploadFile></UploadFile> -->
        <Segments></Segments>
      </div>
    </div>
    <div id="map" class="column" v-show="display_map">
      <div id="mapmove">
        <Map></Map>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Menu from '@/components/Menu.vue'
// import UploadFile from '@/components/AddSegments.vue'
import Segments from '@/components/SegmentsTable.vue'
// import Statistics from '@/components/Statistics.vue'
import Map from '@/components/Map.vue'

 export default {
  name: 'DirectionsView',
  components: {
    Menu,
    // UploadFile,
    Segments,
    // Statistics,
    Map,
  },
  data: () => ({
  }),
  methods: {
  },
  computed: {
    ...mapGetters({
      display_map: 'getMapDisplayStatus',
    })
  },
  mounted() {
    // Make the DIV element draggable:
    dragElement(document.getElementById("map"))

    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "move")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "move").onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  }
 }
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
  .container {
    width: 100%;
    /* max-width: 1200px; */
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .menu {
    display: none;
    width: 100%;
    max-width: 150px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #f2f2f2;
  }
  .column {
    /* width: 100%; */
    padding: 10px;
    box-sizing: border-box;
  }
  .main {
    /* width: 40%; */
  }
  #map {
    position: absolute;
    /* float: left; */
    z-index: 100;
    /* cursor: move; */
    height: 420px;
    width: 420px;
    right: 10px;
    /* width: 30%; */
    background-color: lightgray;
  }
  #mapmove {
    z-index: 101;
    cursor: move;
  }
</style>