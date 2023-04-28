<template>
  <div class="autocomplete">
    <input
      class="search" 
      v-model="search" 
      @input="onChange" 
      @keydown.esc="escapeSearch"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      placeholder="Search segment code">
    <div>
      <ul class="results" v-show="isOpen">
        <li
          class="result"
          :class="{ 'is-active': i === arrowCounter }"
          v-for="result, i in results" :key="i"
          @click="setResult(result)"
        >
          {{ result }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'searchAutocomplete',
  props: {
    directory: {
      type: Array,
      required: false,
      default: () => [],
    },
    clear_search: {
      type: Number
    }
  },
  data: () => ({
    arrowCounter: -1,
    isOpen: false,
    results: [],
    search: '',
  }),
  methods: {
    escapeSearch() {
      this.isOpen = false
      this.search = ''
    },
    filterResults() {
      this.results = this.directory.filter(code => code.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    onChange() {
      this.filterResults()
      this.isOpen = true
    },
    onEnter() {
      this.search = this.results[this.arrowCounter]
      this.arrowCounter = -1
      this.isOpen = false
      this.$emit('setSegment', this.search)
    },
    setResult(result) {
      this.isOpen = false
      this.search = result
      this.$emit('setSegment', result)
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  computed: {
    ...mapGetters({
      // directory: 'getDirectory',
    }),
  },
  watch: {
    clear_search() {
      this.search = ''
    }
  }
}
</script>

<style scoped>
.search{
  width: 100%;
  /* font-size: 20px; */
  padding: 5px;
  margin-bottom: 10px;
}
.autocomplete {
  position: relative;
}

.results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  background-color: #eeeeee;
  min-height: 1em;
  max-height: 6em;    
  overflow: auto;
}

.result {
  list-style: none;
  text-align: left;
  font-size: 16px;
  padding: 4px 2px;
  cursor: pointer;
}
.result.is-active,
.result:hover {
  background-color: #036ffc;
  color: white;
}
</style>
