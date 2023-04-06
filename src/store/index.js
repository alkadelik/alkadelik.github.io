import * as mutationTypes from './mutationTypes'

import { createStore } from 'vuex'

export default createStore({
  state: {
    roads: [],
    display_map: false,
    segment_map: {
      'map': null,
      'segment': '',
    }
  },

  getters: {
    getRoads: (state) => state.roads,
    getMap: (state) => state.segment_map,
    getMapDisplayStatus: (state) => state.display_map
  },

  mutations: {
    [mutationTypes.CHANGE_MAP](state, data) {
      state.segment_map = data
      state.display_map = true
    },
    [mutationTypes.HIDE_MAP](state, data) {
      state.display_map = data
    },
    [mutationTypes.SAVE_ROADS](state, data) {
      state.roads = data
    },
  },

  actions: {
  },

  modules: {
  }
})
