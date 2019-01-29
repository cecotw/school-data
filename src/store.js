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
    /**
     * Inits the API
     * @param {object} helpers
     */
    initApi ({ commit }) {
      // TODO backend API should probably require a JWT token
      // TODO or some form of authentication
      commit('setApi', new ApiService(environment, null)); // ID token is null until we implement auth
    },
    /**
     * Gets the list of schools
     * @param {object} helpers
     */
    async getSchools ({ commit, state }) {
      const res = await state.api.$get(`/interview_schools`);
      commit('setSchools', res);
      return res;
    },
    /**
     * Creates a new school entry
     * @param {object} helpers
     * @param {object} school
     */
    async createSchool ({ state, dispatch }, school) {
      await state.api.$post('/interview_schools/', school);
      const res = await dispatch('getSchools');
      return res;
    },
    /**
     * Updates the specified school
     * @param {object} helpers
     * @param {object} school
     */
    async updateSchool ({ state, dispatch }, school) {
      await state.api.$patch(`/interview_schools/${school.id}`, school);
      const res = await dispatch('getSchools');
      return res;
    },
    /**
     * Removes the school
     * @param {object} helpers
     * @param {string} schoolId
     */
    async removeSchool ({ state, dispatch }, schoolId) {
      await state.api.$delete(`/interview_schools/${schoolId}`);
      const res = await dispatch('getSchools');
      return res;
    }
  }
});
