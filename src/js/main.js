var parm ='';
$('.share-btn,#share-btn').on('click', function(event) {
    $('.page').hide();
    $('.page3').show();
    parm='share'
    event.preventDefault();
    /* Act on the event */
});
$('#startbtn').on('click', function(event) {
    $('.page').hide();
    $('.page2').show();
     parm='phone';
    event.preventDefault();
    /* Act on the event */
});
$('#sava-btn').on('click', function(event) {
     Coupon.save();
    event.preventDefault();
    /* Act on the event */
});


var Coupon = {
    actId: null,

    //保存
    save: function() {
        var mydata = {
            israndom: 1,
         };
     var phoneNumber = $("#phoneNumber").val();
        if (phoneNumber.length == 0) {
            $("#errorInfo").html("<font color='#fff'>请填写手机号码</font>");
            return;
        }
        if (phoneNumber.length != 11) {
            $("#errorInfo").html("<font color='#fff'>请填写有效的手机号码</font>");
            return;
        }
        var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
        if (!reg.test(phoneNumber)) {
            $("#errorInfo").html("<font color='#fff'>请填写有效的手机号码</font>");
            return;
        }
        $('#save_btn').attr('disabled', 'disabled').html('获得中...');
        $.post('/morecoupon/save/' + Coupon.actId + "-" + phoneNumber, mydata, function(data) {
            $(".page2").hide();

            console.log(data.robstatus);
            if (data.status == -1 || data.robstatus == 2) {
                //活动结束页面
                $(".end").show();
            } else {
                parm = result;
                //成功页面
                if (data.robstatus == 1) {
                    //新用户抢码成功

                    
                    window.location.href ='http://t.cn/R5CctNI';
                }
                if (data.robstatus == 0) {
                  // 老用户抢码成功
                }
              

            }
        });
    }
}

$(document).ready(function() {
    var request = GetRequest();
    Coupon.actId = request['id'];
    if (Coupon.actId) {
        Event.sendEvent("counpon_" + Coupon.actId+parm);
    } else {
        //结束界面
        $("#page1").hide();
        $(".end").show();
    }
});

// var musicurl = '../js/TobuSunburst.mp3';
//     var musicobj = {
//        init: function() {
//             $(document.body).append('<audio id="theaudio" loop="loop" autoplay="autoplay" src="' + musicurl + '"></audio>');
//             $('.muscis').addClass('rotate');
//         },
//         musicplay: function() {
//             if (audio.paused) {
//                 audio.play();
//                 $('.muscis').addClass('rotate');
               

//             } else {
//                 audio.pause();
//                 $('.muscis').removeClass('rotate');
//                }
//         }
//     }
//     musicobj.init();
//     var audio = document.getElementById('theaudio');
//     $('.muscis').bind('click', function() {
//         musicobj.musicplay();
//     });