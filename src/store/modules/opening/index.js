export default {
  state: {
    opening1: {},
    opening2:{},
  },
  //
  actions: {},
  //
  mutations: {
    SET_OPENING1_DATA({opening1}, data) {
      opening1 = {
        opening1,
        ...data
      }
    },
    SET_OPENING2_DATA({opening2}, data) {
      opening2 = {
        opening2,
        ...data
      }
    }
  },
  getters: {
    GET_OPENING1_DATA(state) {
      return state.opening1
    }
  }
}