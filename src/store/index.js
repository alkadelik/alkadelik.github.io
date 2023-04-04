import * as mutationTypes from './mutationTypes'

import { createStore } from 'vuex'

export default createStore({
  state: {
    roads: [],
  },
  getters: {
    getRoads: (state) => state.roads,
  },
  mutations: {
    [mutationTypes.SAVE_ROADS](state, data) {
      state.roads = data
    }
  },
  actions: {
  },
  modules: {
  }
})
