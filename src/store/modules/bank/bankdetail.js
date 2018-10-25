

export default {
  state:{
    moneyCanSee:true
  },
  actions:{
    changeMoneyCanSee(state){
      state.moneyCanSee = !state.moneyCanSee
    },
  },
  mutations:{
    changeMoneyCanSee({commit}){
      commit.commit('changeMoneyCanSee')
    }
  },
  getters:{

  }

}