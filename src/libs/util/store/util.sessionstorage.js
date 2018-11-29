import {STORE_PREFIX} from '../../../Constant'
export default {
    set(key, value) {
        if (!key) return false
        window.sessionStorage.setItem(STORE_PREFIX + key, JSON.stringify(value || null))
    },
    get(key) {
        if (!key) return null
        return JSON.parse(window.sessionStorage.getItem(STORE_PREFIX + key))
    },
    remove(key) {
        window.sessionStorage.removeItem(STORE_PREFIX + key)
    },
    removeAll() {
        window.sessionStorage.clear()
    }
}
