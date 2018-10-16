export default {
    /**
     *
     * 金额自动补小数点后两位,碰到3的倍数则加上“,”号
     */
    formatNum (str) {
        if(!str) return str
        // if(str == '' || !str) return
        var newStr = "";
        var count = 0;
        if (str.indexOf(".") == -1) {
            for (var i = str.length - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            str = newStr + ".00"; //自动补小数点后两位
            return str
        }
        else {
            for (var i = str.indexOf(".") - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
                } else {
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
            return str
        }
    },

    /**
     * 图片压缩
     */
    imgScale(imgUrl, fileList, quality) {
        return new Promise(function (resolve, reject) {
            let img = new Image();

            let _this = this;
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let base64 = null;
            img.src = imgUrl;

            img.onload = function () {
                // let s = util.getPhotoOrientation(fileList)
                // console.log(s);
                if ((fileList.size / 1024 / 1024) > 0) { //质量大于1m
                    //缩放后图片的宽高
                    // 500 k  800 x 500
                    let rateW = img.naturalWidth / 400
                    let rateH = img.naturalHeight / 250
                    console.log(img.naturalWidth, img.naturalHeight)
                    let width, height
                    width = img.naturalWidth / rateW;
                    height = img.naturalHeight / rateW;
                    console.log(width, height)
                    canvas.width = width;
                    canvas.height = height;
                    if (img.naturalWidth < img.naturalHeight) {
                        console.log(1);
                        canvas.height = width;
                        canvas.width = height;
                        ctx.rotate(-Math.PI/2);
                        ctx.translate(-width,0);
                    }
                    ctx.drawImage(this, 0, 0, width, height);

                    base64 = canvas.toDataURL('image/jpeg', 0.8);
                    resolve(base64);
                } else {
                    console.log(2);
                    var expectWidth = img.naturalWidth;
                    var expectHeight = img.naturalHeight;
                    if (img.naturalWidth > img.naturalHeight && img.naturalWidth > 800) {
                        expectWidth = 1200;
                        expectHeight = expectWidth * img.naturalHeight / img.naturalWidth;
                    } else if (img.naturalHeight > img.naturalWidth && img.naturalHeight > 1200) {
                        expectHeight = 900;
                        expectWidth = expectHeight * img.naturalWidth / img.naturalHeight;
                    }
                    canvas.width = expectWidth;
                    canvas.height = expectHeight;
                    cxt.drawImage(img, 0, 0, expectWidth, expectHeight);
                    base64 = canvas.toDataURL("image/jpeg", 0.4);
                    resolve(base64);
                }
            }
        })
    },


    /**
     * 获取url查询字符串
     */
    getQuery(url) {
        url = decodeURIComponent(url);
        var theRequest = {};
        if (url.indexOf("?") !== -1) {
            var strs = url.substr(1).split("&");
            for (var i = 0, len = strs.length; i < len; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },

    /**
     * 设置url查询字符串
     */
    setQuery: function (params) {
        if (Object.prototype.toString.call(params) !== "[object Object]") {
            return "";
        }
        var url = "?";
        for (var i in params) {
            url += i + "=" + params[i] + "&";
        }
        url = url.replace(/\&$/g, "").replace(/^\?$/g, "");
        return url;
    },


}