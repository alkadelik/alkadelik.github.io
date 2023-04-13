<template>
  <div class="tables">
      <div>
        <input v-model="origin_lat">
        <input v-model="origin_lng">
        <input v-model="end_lat">
        <input v-model="end_lng">
        <button @click="getRoadStatus">Get single status</button>
        <input type="file" id="file" accept=".xls, .xlsx" @change="getFile($event)">
        <button @click="extractFile">Upload file</button>
      </div>
    <div class="column table">
    </div>
  </div>
</template>

<script>
import {
  fetchRoadStatus,
  bulkUpload,
} from '@/services/apiServices'
import * as XLSX from 'xlsx'

export default {
  name: 'UploadFile',
  props: {
  },
  data: () => ({
    origin_lat: '6.442241641259771',
    origin_lng: '3.5093921398959615',
    end_lat:'6.461577576603757',
    end_lng:'3.3845290778723403',
    file: null,
    start_address: '',
    end_address: '',
    distance: '',
    duration: '',
    speed: 0,
  }),
  methods: {
    getFile(event) {
      this.file = event.target.files[0]
    },
    extractFile() {
      // ensure there's a file before submitting
      const file_reader = new FileReader()
      file_reader.readAsBinaryString(this.file)
      file_reader.onload = (event) => {
        let binary_data = event.target.result 
        let workbook = XLSX.read(binary_data, {type: 'binary'})

        const sheet = workbook.SheetNames[0] // we know it's position [0] by looking in the workbook file
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        console.log(data)
        // nodes_sheet = JSON.stringify(data, undefined, 4) // converts to string. Not necessary
        bulkUpload(data)
      }      
    },
    getRoadStatus() {
      let data = {
        start_lat: this.origin_lat,
        start_lng: this.origin_lng,
        end_lat: this.end_lat,
        end_lng: this.end_lng
      }
      fetchRoadStatus(data)
        .then((response) => {
          console.log(response)
          // code situation where empty response is set
          let res = response.data.data
          this.start_address = res.origin_addresses[0]
          this.end_address = res.destination_addresses[0]
          this.distance = res.rows[0].elements[0].distance.text
          this.duration = res.rows[0].elements[0].duration.text
          this.speed = 0
            // store.commit(mutationTypes.ADD_ROAD, response.data)
        })
        .catch(error => {
            console.error(error)
        })
    }
  },
  computed: {
  },
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
  label {
    display: block;
  }
  ul {
    list-style-type: none;
    text-align: left;
  }
</style>
