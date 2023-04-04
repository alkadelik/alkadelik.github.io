<template>
  <div class="container">
    <div class="column menu">
      <ul>
        <router-link to="/roads">Roads</router-link>
        <router-link to="/directions">Directions</router-link>
      </ul>
    </div>
    <div class="column column-2">
      <div class="column search">
        <form action="/search" method="get">
          <input type="text" id="search" name="q" placeholder="Enter road name">
          <button type="submit">Search</button>
        </form>

      </div>
      <div class="column table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Distance</th>
              <th>Speed</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Column 1</td>
              <td>Row 1, Column 2</td>
              <td>Row 1, Column 3</td>
              <td>Row 1, Column 4</td>
              <td>Row 1, Column 5</td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
              <td>Row 2, Column 4</td>
              <td>Row 2, Column 5</td>
            </tr>
            <tr>
              <td>Row 3, Column 1</td>
              <td>Row 3, Column 2</td>
              <td>Row 3, Column 3</td>
              <td>Row 3, Column 4</td>
              <td>Row 3, Column 5</td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="column stats">
        <h2>Stats</h2>
      </div>
    </div>
    <div class="column map">
      map component
    </div>
  </div>
</template>

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
    flex-wrap: wrap;
    background-color: pink;
  }
 
  .column {
    /* width: 100%; */
    padding: 10px;
    box-sizing: border-box;
  }
  .column-2 {
    width: 40%;
  }
  .map {
    width: 30%;
    background-color: steelblue;
  }
  /* .column h2 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0;
  }
  .column p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 0;
  } */
</style>