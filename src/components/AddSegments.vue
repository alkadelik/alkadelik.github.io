<template>
  <div class="parent"> <!-- using container is linked to an external css causing issues, hence parent-->
    <h2>Upload segment</h2>
    <p>To upload one or more segments, select the Microsoft Excel file containing the base details of the segments to be uploaded. See below for the instructions and format of the excel file. Adhering to these instructions will reduce the likelyhood of encountering errors during the upload.</p>
    <p><ul>
      <li class="heading"><span>Rules for uploading segments</span></li>
      <li>1. All files uploaded should use the following formats/extensions: .xls or .xlsx</li>
      <li>2. The header row (top row of the excel sheet) should contain the following titles in UPPER_CASE font</li>
      <li>- ROUTE - this is the route the segment belongs to e.g. E1, A1, etc</li>
      <li>- SEGMENT_CODE - this is the segment code e.g. E1S1, E1S2</li>
      <li>- STATE - This is the state through which the segment traverses</li>
      <li>- SEGMENT_NAME - this is the local name of the segment</li>
      <li>- NORTHINGS - this is the longitude coordinate of the starting point of the segment</li>
      <li>- EASTINGS - this is the latitude coordinate of the starting point of the segment</li>
      <li>- START_NAME - this is the local name of the starting point of the segment</li>
      <li>- NORTHINGS2 - this is the longitude coordinate of the end point of the segment</li>
      <li>- EASTINGS2 - this is the longitude coordinate of the end point of the segment</li>
      <li>- END_NAME - this is the local name of the end point of the segment</li>
      <li><br></li>
      <li>Notes</li>
      <li>- The titles should be in UPPER_CASE.</li>
      <li>- There should be no spaces between words in the titles - use underscore to separate words.</li>
      <li>- All segments must have a ROUTE number - it can't be blank.</li>
      <li>- All segments must have a SEGMENT_CODE - it can't be blank.</li>
      <li>- All segments must have  NORTHINGS, EASTINGS, NORTHINGS2, EASTINGS2- they can't be blank.</li>
      <li>- Up to 100 segments can be uploaded at a time.</li>
    </ul></p>
    <div class="">
        <div></div>
          <input type="file" id="file" accept=".xls, .xlsx" @change="extractFile($event)" placeholder="Select segements file">
        </div>
      <div class="column table">
      <button @click="uploadSegments">Upload Segments</button>
    </div>
    <p><ul>
      <li class="heading"><span>Rules for updating segments</span></li>
      <li>1. All files uploaded should use the following formats/extensions: .xls or .xlsx</li>
      <li>2. Updating segments do not require all the columns to be present in the excel file. The only compulsory columns are the SEGMENT_CODE, which is used to identify the segment to be updated, and the actual columns to be updated, which contain the new values. Note that the SEGMENT_CODE is the current segment code</li>
      <li>
        <table>
          <thead>
            <tr>
              <th>What to update</th>
              <th>required COLUMN_TITLE(S)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Segment code</td>
              <td>NEW_CODE</td>
            </tr>
            <tr>
              <td>Segment state</td>
              <td>STATE</td>
            </tr>
            <tr>
              <td>Segment name</td>
              <td>SEGMENT_NAME</td>
            </tr>
            <tr>
              <td>Segment coordinates*</td>
              <td>NORTHINGS, EASTINGS, NORTHINGS2, EASTINGS2</td>
            </tr>
          </tbody>
        </table>
        *Still in development - might experience issues
      </li>
      <li><br></li>
      <li>Notes</li>
      <li>- The titles should be in UPPER_CASE.</li>
      <li>- There should be no spaces between words in the titles - use underscore to separate words.</li>
      <li>- All segments must have a SEGMENT_CODE - It is used to identify the segment to be updated.</li>
      <li>- The property to be updated must not be blank.</li>
    </ul></p>
    <div class="">
        <div>
          <!-- <input v-model="origin_lat">
          <input v-model="origin_lng">
          <input v-model="end_lat">
          <input v-model="end_lng"> -->
          <!-- <button @click="getRoadStatus">Get single status</button> -->
          <input type="file" id="file" accept=".xls, .xlsx" @change="extractFile($event)" placeholder="Select segements file">
        </div>
      <div class="column table">
      </div>
    </div>
    <div class="update">
      <hr>
      <button @click="updateAddress">Change Address</button>
      <button @click="changeSegmentCode">Update Segment Code</button>
      <button @click="changeSegmentState">Update Segment State</button>
      <button @click="changeSegmentName">Update Segment Name</button>
      <button @click="changeCoordinates">Update Coordinates</button>
      <!-- <button @click="updateStatus">Update Status</button> -->
    </div>
  </div>
</template>

<script>
import {
  fetchRoadStatus,
  bulkUpload,
  updateAddresses,
  updateCode,
  updateCoordinates,
  updateState,
  updateName,
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
    sheet: null,
    speed: 0,
  }),
  methods: {
    getFile(event) {
      this.file = event.target.files[0]
    },
    extractFile(event) {
      // ensure there's a file before submitting
      let file = event.target.files[0]
      const file_reader = new FileReader()
      file_reader.readAsBinaryString(file)
      file_reader.onload = (event) => {
        let binary_data = event.target.result 
        let workbook = XLSX.read(binary_data, {type: 'binary'})

        const sheet = workbook.SheetNames[0] // we know it's position [0] by looking in the workbook file
        console.log("const sheet ", sheet)
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        this.sheet = data
        console.log("sheet is ", this.sheet)
        // nodes_sheet = JSON.stringify(data, undefined, 4) // converts to string. Not necessary


        // bulkUpload(data) // enable for bulk upload. Also separate the extract part from the api part
        // updateAddresses(data)
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
    },
    updateAddress() {
      updateAddresses()
    },
    uploadSegments() {
      alert("Uploading")
      bulkUpload(this.sheet)
      .then((res) => { // does this depend on a response or does it fire immediately?
        console.log(res)
      })
    },
    changeCoordinates() {
      updateCoordinates(this.sheet)
    },
    changeSegmentCode() {
      updateCode(this.sheet)
    },
    changeSegmentState() {
      updateState(this.sheet)
    },
    changeSegmentName() {
      updateName(this.sheet)
    },
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
  .update {
    display: flex;
    flex-direction: column;
    width: 200px;
  }
  .heading {
    font-weight: bold;
  }
</style>
