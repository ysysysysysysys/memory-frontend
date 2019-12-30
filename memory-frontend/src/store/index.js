import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'
import getters from './getter'
import mutations from './mutations'

export default new Vuex.Store({
  state: {
    user:{
      account:localStorage.account,
      password:localStorage.password,
      token:localStorage.token
    },
    tabState:false,
    memoryType:"",
    contentType:'FILE'
  },
  mutations,
  actions,
  getters,
  modules: {
  }
})
