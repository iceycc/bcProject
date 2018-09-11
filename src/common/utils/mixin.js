
import util from "../../common/utils/util";
import {LsName} from "../../Constant";
export const Mixin = {
    beforeCreate(){
        console.log('beforeCreate');
        if (util.storage.session.get(LsName.reload)) {
            util.storage.session.remove(LsName.reload)
            location.reload()
        }
    }
}