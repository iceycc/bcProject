export default {
  state: {
    opening: {},
    opening1: {},
    opening2: {},
  },
  //
  actions: {},
  //
  mutations: {
    SET_OPEN_STATE(state, {type, value}) {
      state[type] = value
    },
    SET_OPENING_DATA({opening}, data) {
      console.log('SET_OPENING_DATA',data);
      opening =data
    },
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
    GET_OPEN_STATE(state) {
      return state
    }
  }
}
