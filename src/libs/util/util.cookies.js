import {STORE_PREFIX} from '../../Constant'
export default {
    getPrefix: () => STORE_PREFIX,
    get(sKey){
        if(!sKey) return null
        sKey = this.getPrefix() + sKey
        return decodeURIComponent()
    }

}