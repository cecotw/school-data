import { ApiService } from '@/services/apiService';
import Vue from 'vue';
import Vuex from 'vuex';
import environment from './environment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: null,
    schools: null
  },
  mutations: {
    setApi (state, api) {
      state.api = api;
    },
    setSchools (state, schools) {
      state.schools = schools;
    }
  },
  actions: {
    initApi ({ commit }) {
      // TODO backend API should probably require a JWT token
      // TODO or some form of authentication
      commit('setApi', new ApiService(environment, null)); // ID token is null until we implement auth
    },
    async getSchools ({ commit, state }) {
      const res = await state.api.$get(`/interview_schools`);
      commit('setSchools', res);
      return res;
    },
    async createSchool ({ state, dispatch }, school) {
      await state.api.$post('/interview_schools/', school);
      const res = await dispatch('getSchools');
      return res;
    },
    async removeSchool ({ state, dispatch }, schoolId) {
      await state.api.$delete(`/interview_schools/${schoolId}`);
      const res = await dispatch('getSchools');
      return res;
    }
  }
});
