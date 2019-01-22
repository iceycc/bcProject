import {mapGetters, mapMutations} from "vuex";

export default {
  methods: {
    ...mapMutations({
      setComState: 'SET_COMMON_STATE',
      removeComState: 'REMOVE_COMMON_STATE',
      setOpenState: 'SET_OPEN_STATE',
      setAccState: 'SET_ACCOUNT_STATE',
      setBankState: 'SET_BANK_STATE'
    })
  },
  computed: {
    ...mapGetters({
      getComState: 'GET_COMMON_STATE',
      getOpenState: 'GET_OPEN_STATE',
      getAccState: 'GET_ACCOUNT_STATE',
      getBankState: 'GET_BANK_STATE'
    })
  }
}
