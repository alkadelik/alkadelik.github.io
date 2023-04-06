import * as mutationTypes from './mutationTypes'

import { createStore } from 'vuex'

export default createStore({
  state: {
    roads: [],
    // segment_map: null,
    map_segment: '',
    segment_map: {
      'map': null,
      'segment': '',
    }
  },

  getters: {
    getRoads: (state) => state.roads,
    getMap: (state) => state.segment_map,
  },

  mutations: {
    [mutationTypes.SAVE_ROADS](state, data) {
      state.roads = data
    },
    [mutationTypes.CHANGE_MAP](state, data) {
      state.segment_map = data
    }
  },

  actions: {
  },

  modules: {
  }
})
