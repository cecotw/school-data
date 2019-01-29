import { ApiService } from '@/services/apiService';
import Vue from 'vue';
import Vuex from 'vuex';
import { environment } from './environment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: null
  },
  mutations: {
    setApi (state, api) {
      state.api = api;
    }
  },
  actions: {
    initApi ({ commit }) {
      // TODO backend API should probably require a JWT token
      // TODO or some form of authentication
      commit('setApi', new ApiService(environment, null)); // ID token is null until we implement auth
    }
  }
});
