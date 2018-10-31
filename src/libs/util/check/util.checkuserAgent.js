/**
 * 判断终端
 * @returns {{isAndroid: (*|boolean), isIOS: (*|boolean), isMobile: (*|boolean), isApp: boolean, isWeixin: (*|boolean), isQQ: (*|boolean), isPC: boolean, isWeibo: (*|boolean)}}
 */
var isEquipment = function () {
    let UA = navigator.userAgent,
            isAndroid = /android|adr|linux/gi.test(UA),
            isIOS = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,
            isBlackBerry = /BlackBerry/i.test(UA),
            isWindowPhone = /IEMobile/i.test(UA),
            isApp = /besharp/gi.test(UA), // UA.indexOf('besharp') > -1, // 自己的app
            isMobile = isAndroid || isIOS || isBlackBerry || isWindowPhone,
            isDingTalk = /DingTalk/gi.test(UA);
    return {
        isAndroid: isAndroid,
        isIOS: isIOS,
        isMobile: isMobile,
        isApp: isApp,
        isWeixin: /MicroMessenger/gi.test(UA),
        isQQ: /QQ/gi.test(UA),
        isPC: !isMobile,
        isWeibo: /WeiBo/gi.test(UA),
        isDingTalk: isDingTalk
    }
}

export default isEquipment
