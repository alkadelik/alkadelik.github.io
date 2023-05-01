import * as mutationTypes from './mutationTypes'

import { createStore } from 'vuex'

export default createStore({
  state: {
    addresses: [],
    segments: [],
    directory: [],
    display_map: false,
    routes: [],
    segment_map: {
      'map': null,
      'segment': '',
    },
    states: [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "FCT",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nasarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara"
    ],
    stat_segments: [],
  },

  getters: {
    getAddresses: (state) => state.addresses,
    getDirectory: (state) => state.directory,
    getMap: (state) => state.segment_map,
    getMapDisplayStatus: (state) => state.display_map,
    getRoutes: (state) => state.routes,
    getSegments: (state) => state.segments,
    getStates: (state) => state.states,
    getStatSegments: (state) => state.stat_segments,
  },

  mutations: {
    [mutationTypes.CHANGE_MAP](state, data) {
      state.segment_map = data
      state.display_map = true
    },
    [mutationTypes.CHANGE_STAT_SEGMENTS](state, data) {
      state.stat_segments = data
    },
    [mutationTypes.HIDE_MAP](state, data) {
      state.display_map = data
    },
    [mutationTypes.SAVE_ADDRESSES](state, data) {
      state.addresses = data
    },
    [mutationTypes.SAVE_DIRECTORY](state, data) {
      state.directory = data
    },
    [mutationTypes.SAVE_SEGMENTS](state, data) {
      state.segments = data
    },
    [mutationTypes.SAVE_ROUTES](state, data) {
      state.routes = data
    },
  },

  actions: {
  },

  modules: {
  }
})
