<template>
  <div class="menu">
    <ul>
        <router-link to="/">Segments</router-link>
        <router-link to="/string_segments">Strings</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuComp',
  props: {
    // msg: String
  },
  data: () => ({
    roads: true,
  }),
  methods: {
    changeView(view) {
      if (view == 'roads') {
        this.roads = true
      } else {
        this.roads = false
      }
      this.$emit('viewRoadsOrDirections', this.roads)
    }
  }
}
</script>

<style scoped>
 .menu {
    width: 100%;
    max-width: 150px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #f2f2f2;
  }
  .menu ul {
    list-style: none;
    padding: 0;
    padding-top: 15px;
    margin: 0;
    text-align: left;
  }
  .menu li {
    margin-bottom: 5px;
  }
  .menu a {
    display: block;
    padding: 5px 10px;
    color: #333;
    text-decoration: none;
    border-radius: 5px;
  }
  .menu a:hover {
    background-color: #333;
    color: #fff;
  }
</style>
