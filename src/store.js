import { ApiService } from '@/services/apiService';
import Vue from 'vue';
import Vuex from 'vuex';
import { environment } from './environment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: null,
    schools: [
      {
        id: 1,
        name: 'Colorado State University',
        city: 'Phoenix',
        state: 'AZ',
        zip_code: '30495',
        created_at: '2019-01-17 23:26:44',
        updated_at: '2019-01-25 17:10:39'
      },
      {
        id: 3,
        name: 'Arizona State University',
        city: '',
        state: '',
        zip_code: '',
        created_at: '2019-01-25 17:06:09',
        updated_at: '2019-01-25 17:06:09'
      },
      {
        id: 4,
        name: 'Arizona State University',
        city: 'Phoenix',
        state: 'AZ',
        zip_code: '30495',
        created_at: '2019-01-25 17:06:32',
        updated_at: '2019-01-25 17:12:50'
      },
      {
        id: 5,
        name: 'Arizona State University',
        city: '',
        state: '',
        zip_code: '',
        created_at: '2019-01-25 17:08:02',
        updated_at: '2019-01-25 17:08:02'
      }
    ]
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
