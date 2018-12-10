import {HOST_API} from "../Constant";

/**
 * 用于密码控件js的动态引入
 */
function libRender() {
    let BASE_HOST = HOST_API
    let arr = [
        BASE_HOST + "/static/finsuit/js/openapi/js/jquery-1.10.1.min.js",
        BASE_HOST + "/static/finsuit/js/openapi/js/jquery.base64.js",
        BASE_HOST + "/static/finsuit/js/openapi/js/login-password-widget.min.js",
        BASE_HOST + "/static/finsuit/js/openapi/js/password-widget.min.js"
    ]
    arr.forEach((item,index)=>{
        creactScript(item)
    })
}

function creactScript(src) {
    let script = document.createElement('script')
    script.src = src
    document.head.appendChild(script)
}

export default libRender
