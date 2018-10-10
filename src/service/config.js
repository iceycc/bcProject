
import {HOST} from "../Constant";
export default {
    method: 'post',
    baseURL:HOST,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    timeout: 30000,
};
