(function(t, e) {
  "use strict";
  // var host = 'http://192.168.100.247:11050/getPasswordKeyboard'
  var host = 'https://finsuitdev.udomedia.com.cn/finsuit/openapi/zzh/biz/apiPasswordKeyboard'

  var i = {};
  var reset = {
    scrollTop : 0
  };
  //lzh
  var sixCue = false;
  jQuery.fn.extend({
    showKBD: function(e) {
      var r = {
        areaId: "area",
        pageId: "page",
        maxLen: 10,
        exponent_hex: "10001",
        cursor: true,
        mask: true,
        /*lzh*/
        sixCue : false
      };
      var n = $.extend({}, r, e || {});
      var s = n.areaId,
        o = n.pageId,
        a = n.maxLen,
        h = n.exponent_hex,
        p = n.cursor,
        d = n.mask;
      /*lzh*/
      sixCue = n.sixCue;
      var u = this,
        f = u.attr("modulus-hex"),
        c = u.attr("action"),
        g = new RSAKey();
      var l = this.attr("id") + "PwdArr";
      //添加隐藏域
      var that_pwd = this;
      if (!i[l]){
        i[l] = [];
      };
      u.pwdArr = i[l];
      p ? u.text(jQuery.dataToAsterisk(u.attr("data-passwordlength")) + "|") : u.text(jQuery.dataToAsterisk(u.attr("data-passwordlength")));

      f ? g.setPublic(f, h) : alert("please set modulus_hex!");
      if (this.attr("disabled")) {
        return
      }

      d && $(".kbd-mask").show() && $(".kbd-mask").on("touchstart", function(t) {
        u.hideKBD();
        t.preventDefault()
      }).on("touchmove touchend touchcancel", function(t) {
        t.preventDefault()
      });
      $(".kbd-bar").on("touchstart touchmove touchend touchcancel", function(t) {
        t.preventDefault()
      });
      var b = $("#" + this.attr("kbdtype") + "KBD");
      b.find(".kbd-key div").off("touchstart").on("touchstart", function(t) {
        $(this).css({
          background: "gray",
          opacity: "0.5"
        });
        t.preventDefault()
      }).off("touchmove").on("touchmove", function(t) {
        t.preventDefault()
      }).off("touchend").on("touchend", function(t) {
        $(this).css({
          background: "gray",
          opacity: "0"
        });
        var e = $(this).attr("index");
        if (/^F.*$/.test(e)) {
          switch (e) {
            case "FDO":
              u.hideKBD();
              t.preventDefault();
              break;
            case "FDE":
              u.pwdArr.pop();
              u.attr("data-passwordlength", u.pwdArr.length);
              u.attr("data-ciphertext", g.encrypt(u.pwdArr.join(",")));
              p ? u.text(jQuery.dataToAsterisk(u.attr("data-passwordlength")) + "|") : u.text(jQuery.dataToAsterisk(u.attr("data-passwordlength")));

              break;
            case "FST":
              b.find("." + jQuery.switchType($(this).parent().parent().hide().attr("class"))).show();
              break;
            case "FSP":
              b.find("." + jQuery.switchPage($(this).parent().parent().hide().attr("class"))).show();
              break;
            default:
              break
          }
        } else if ("SPACE" == e) {} else {
          if (u.pwdArr.length < a) {
            u.pwdArr.push(e)
          }
          u.attr("data-passwordlength", u.pwdArr.length);
          u.attr("data-ciphertext", g.encrypt(u.pwdArr.join(",")));
          p ? u.text(jQuery.dataToAsterisk(u.attr("data-passwordlength")) + "|") : u.text(jQuery.dataToAsterisk(u.attr("data-passwordlength")))

        }
        //lzh
        that_pwd.validKBD();
      });
      var v;
      b.find(".kbd-key div[index='FDE']").on("touchstart", function() {
        v = setInterval(function() {
          u.pwdArr.pop();
          u.attr("data-passwordlength", u.pwdArr.length);
          u.attr("data-ciphertext", g.encrypt(u.pwdArr.join(",")));
          p ? u.text(jQuery.dataToAsterisk(u.attr("data-passwordlength")) + "|") : u.text(jQuery.dataToAsterisk(u.attr("data-passwordlength")));
          /*i = {};
            u.pwdArr = [];
            u.attr("data-passwordlength", u.pwdArr.length);
            u.attr("data-ciphertext", g.encrypt(u.pwdArr.join(",")));
            p ? u.text(jQuery.dataToAsterisk(u.attr("data-passwordlength")) + "|") : u.text(jQuery.dataToAsterisk(u.attr("data-passwordlength")))*/

        }, 200)
      }).on("touchend", function() {
        clearInterval(v)
        //lzh
        that_pwd.validKBD();
      });
      document.addEventListener("touchcancel", function() {
        b.find(".kbd-key div").each(function() {
          if ($(this).css("opacity") == "0.5") {
            $(this).css("opacity", "0")
          }
        })
      });
      function m() {
        //lzh
        reset.scrollTop = $("#pwdkbdwrap").parent().scrollTop();

        if ($(t).width() > $(t).height()) {
          var e = $(t).width() * 0.6;
          e <= 640 ? b.css("width", e + "px") : b.css("width", "640px")
        } else {
          var e = $(t).width();
          b.css("width", e + "px")
        }
        b.height(b.width() * 470 / 640);
        $(".kbd-bar").height(b.width() * 470 / 640);
        var i = $("#" + s);
        var r = b.height();
        // if ($(t).height() + $(t).scrollTop() - i.offset().top - i.height() <= r) {   //暂时性注掉
        var n = i.offset().top + i.height() + r - $(t).height();
        //lzh添加
        //n=n*414/320;
        try{
          $("#pwdkbdwrap").height(r);
          $("#pwdkbdwrap").parent().scrollTop($("#pwdkbdwrap").parent().scrollTop() + n);
        }catch(e){

        }
        //end
        // }   //暂时性注掉
      }
      $(t).off("resize").on("resize", function() {
        m()
      });
      $("#PWDKBD").show();
      m();
      b.show().children(":first").show();
      /*lzh*/
      if(sixCue){
        u.addCcue(sixCue);
      }
    },
    validKBD : function(){
      //callback
    },
    /*lzh*/
    addCcue : function(id){
      $(id).html("").css({overflow:'hidden'});
      var str = '<span style="float:left;margin-left:5%;width:15%;height:100%;"><b style="display:block;border:1px solid #DADADA;border-right:none;height:100%"></b></span>'+
        '<span style="float:left;width:15%;height:100%;"><b style="display:block;border:1px solid #DADADA;border-right:none;height:100%"></b></span>'+
        '<span style="float:left;width:15%;height:100%;"><b style="display:block;border:1px solid #DADADA;border-right:none;height:100%"></b></span>'+
        '<span style="float:left;width:15%;height:100%;"><b style="display:block;border:1px solid #DADADA;border-right:none;height:100%"></b></span>'+
        '<span style="float:left;width:15%;height:100%;"><b style="display:block;border:1px solid #DADADA;border-right:none;height:100%"></b></span>'+
        '<span style="float:left;margin-right:5%;width:15%;height:100%;"><b style="display:block;border:1px solid #DADADA;height:100%"></b></span>';
      $(id).append(str);
    },
    /*end*/
    hideKBD: function() {
      //lzh
      this.validKBD();

      $("#PWDKBD").hide();
      $(".kbd-mask").hide();
      $("#" + this.attr("kbdtype") + "KBD").hide().children().hide();
      this.text(jQuery.dataToAsterisk(this.attr("data-passwordlength")));

      //lzh恢复原来状态
      try{
        $("#pwdkbdwrap").height(0);
        $("#pwdkbdwrap").parent().scrollTop(reset.scrollTop);
      }catch(e){

      }

      //暂时属于没用的东西
      /*$(".pwdkbdwrap").detach();
      $(t).scrollTop(0)*/
    },
    loadKBD: function() {
      i = {};
      $("body").append("<div id='PWDKBD' style='display:none;'></div>");
      $("#PWDKBD").append('<div class="kbd-mask" style="z-index:8999;"></div>');
      $("#PWDKBD").append('<div class="kbd-bar" style="z-index:8999;"></div>');
      $(".kbd-mask").css({
        position: "fixed",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0",
        background: "#999",
        opacity: "0.2",
        "z-index": "8998",
        display: "none"
      });
      $(".kbd-bar").css({
        position: "fixed",
        width: "100%",
        left: "0",
        bottom: "0",
        background: "#d1d5da",
        opacity: "1",
        "z-index": "8999"
      });
      if ($("div[kbdtype='Graph']").length > 0) {
        $("div[kbdtype='Graph']").text("").attr("disabled", true);
        $.get(host+"?style=Graph&shuffle=2", function(t) {
          $("#PWDKBD").append(t.biz_data.data.kbdhtml);
          window.sessionStorage.setItem('KEY_T',t.biz_data.data.prefix);
          $("div[kbdtype='Graph']").text("").attr("disabled", false);
          var e = $("#GraphKBD");
          e.css({
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            "z-index": "9000"
          }).hide();
          e.children().css({
            background: "#d1d5da",
            width: "100%",
            height: "100%",
            display: "none"
          });
          e.find(".kbd-key div").css({
            "border-radius": "5px",
            "box-shadow": "0px 1px 1px #888b8e"
          });
          e.find(".kbd-key div.common-char-bg").css({
            background: "#fff"
          });
          e.find(".kbd-key div.common-char-space-bg").css({
            background: "#fff"
          });
          e.find(".kbd-key div.function-delete-bg").css({
            background: "#abb2bd"
          });
          e.find(".kbd-key div.function-switch-page-bg").css({
            background: "#abb2bd"
          });
          e.find(".kbd-key div.function-switch-type-bg").css({
            background: "#abb2bd"
          });
          e.find(".kbd-key div.function-done-bg").css({
            background: "#abb2bd"
          })

        },"json")
      }
      if ($("div[kbdtype='Alnum']").length > 0) {
        $("div[kbdtype='Alnum']").text("").attr("disabled", true);
        $.get(host+"?style=Alnum&shuffle=2", function(t) {
          $("#PWDKBD").append(t.biz_data.data.kbdhtml);
          window.sessionStorage.setItem('KEY_T',t.biz_data.data.prefix);
          $("div[kbdtype='Alnum']").text("").attr("disabled", false);
          var e = $("#AlnumKBD");
          e.css({
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            "z-index": "9000"
          }).hide();
          e.children().css({
            background: "#d1d5da",
            width: "100%",
            height: "100%",
            display: "none"
          });
          e.find(".kbd-key div").css({
            "border-radius": "5px",
            "box-shadow": "0px 1px 1px #888b8e"
          });
          e.find(".kbd-key div.common-char-bg").css({
            background: "#fff"
          });
          e.find(".kbd-key div.common-char-space-bg").css({
            background: "#fff"
          });
          e.find(".kbd-key div.function-switch-page-bg").css({
            background: "#abb2bd"
          });
          e.find(".kbd-key div.function-switch-type-bg").css({
            background: "#abb2bd"
          });
          e.find(".kbd-key div.function-delete-bg").css({
            background: "#abb2bd"
          });
          e.find(".kbd-key div.function-done-bg").css({
            background: "#abb2bd"
          });
          e.find(".kbd-key div.number-common-char-bg").css({
            background: "#fff"
          });
          e.find(".kbd-key div.number-function-switch-type-bg").css({
            background: "#abb2bd"
          });
          e.find(".kbd-key div.number-function-delete-bg").css({
            background: "#abb2bd"
          });
          e.find(".kbd-key div.number-function-done-bg").css({
            background: "#abb2bd"
          });
        },"json")
      }
      if ($("div[kbdtype='Number']").length > 0) {
        $("div[kbdtype='Number']").text("").attr("disabled", true);
        $.get(host+"?type=Number", function(t) {
          console.log(t);
          $("#PWDKBD").append(t.biz_data.data.kbdhtml);
          // $("#PWDKBD").append(t.data.kbdhtml);
          window.sessionStorage.setItem('KEY_T',t.biz_data.data.prefix);
          $("div[kbdtype='Number']").text("").attr("disabled", false);
          var e = $("#NumberKBD");
          e.css({
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            "z-index": "9000"
          }).hide();
          e.children().css({
            background: "#d1d5da",
            width: "100%",
            height: "100%",
            display: "none"
          });
          e.find(".kbd-key div").css({
            "border-radius": "5px",
            "box-shadow": "0px 1px 1px #888b8e"
          });
          e.find(".kbd-key div.number-common-char-bg").css({
            background: "#fff"
          });
          e.find(".kbd-key div.number-function-switch-type-bg").css({
            background: "#abb2bd"
          });
          e.find(".kbd-key div.number-function-delete-bg").css({
            background: "#abb2bd"
          });
          e.find(".kbd-key div.number-function-done-bg").css({
            background: "#abb2bd"
          })

        }, "json")
      }
    },
    getKBD: function() {
      if (this.attr("data-passwordlength") && this.attr("data-passwordlength") != "0"){
        return this.attr("data-ciphertext");
      }else{
        return null
      }
    },
    getLenKBD: function() {
      return this.attr("data-passwordlength") || 0
    },
    // wby自己添加
    getBDCode:function(){
      return window.sessionStorage.getItem('KEY_T') || null
    },
    reloadPWD:function(){
      i={};
      this.text("").removeAttr('data-passwordlength').removeAttr('data-ciphertext');
      return this;
    },
    checkPWD: function(t) {
      var e = this.attr("id") + "PwdArr";
      var r = t + "PwdArr";
      var n = false
        , s = false;
      if (i[e] && i[e].length){
        n = true;
      }
      if (i[r] && i[r].length){
        s = true;
      }
      if (n && s) {
        if (i[e].toString() == i[r].toString()) {
          return 1
        } else {
          return 2
        }
      } else {
        if (!n && !s) {
          return 5
        } else if (!s) {
          return 4
        } else if (!n) {
          return 3
        }
      }
    }
  });
  jQuery.extend({
    switchPage: function(t) {
      if (/^(.*)(Lower)(.*)$/.test(t)){
        return RegExp.$1 + "Upper" + RegExp.$3;
      }
      if (/^(.*)(Upper)(.*)$/.test(t)){
        return RegExp.$1 + "Lower" + RegExp.$3;
      }
      if (/^(.*)(One)(.*)$/.test(t)){
        return RegExp.$1 + "Two" + RegExp.$3;
      }
      if (/^(.*)(Two)(.*)$/.test(t)){
        return RegExp.$1 + "One" + RegExp.$3
      }
    },
    switchType: function(t) {
      if (/^(Graph)(AlphaCaseLower)(.*)$/.test(t)){
        return RegExp.$1 + "DigitSymbolPageOne" + RegExp.$3;
      }
      if (/^(Graph)(AlphaCaseUpper)(.*)$/.test(t)){
        return RegExp.$1 + "DigitSymbolPageOne" + RegExp.$3;
      }
      if (/^(.*)(DigitSymbolPageOne)(.*)$/.test(t)){
        return RegExp.$1 + "AlphaCaseLower" + RegExp.$3;
      }
      if (/^(.*)(DigitSymbolPageTwo)(.*)$/.test(t)){
        return RegExp.$1 + "AlphaCaseLower" + RegExp.$3;
      }
      if (/^(Alnum)(AlphaCaseLower)(.*)$/.test(t)){
        return RegExp.$1 + "Digit" + RegExp.$3;
      }
      if (/^(Alnum)(AlphaCaseUpper)(.*)$/.test(t)){
        return RegExp.$1 + "Digit" + RegExp.$3;
      }
      if (/^(Alnum)(Digit)(.*)$/.test(t)){
        return RegExp.$1 + "AlphaCaseLower" + RegExp.$3
      }
    },
    dataToAsterisk: function(t) {
      t = parseInt(t);
      /*lzh*/
      if(sixCue){
        $(sixCue).find("span").find("b").text("");
        for(var num = 0;num<t;num++){
          $(sixCue).find("span").eq(num).find("b").text("*");
        }
      }
      /*end*/
      if (t == 0) {
        return ""
      } else {
        var e = "";
        while (t--) {
          e += "*"
        }
        return e
      }
    }
  })
})(window, window.jQuery);
var dbits;
var canary = 0xdeadbeefcafe;
var j_lm = (canary & 16777215) == 15715070;
function BigInteger(t, e, i) {
  if(t != null ){
    if("number" == typeof t){
      this.fromNumber(t, e, i);
    }else if(e == null  && "string" != typeof t){
      this.fromString(t, 256);
    }else{
      this.fromString(t, e)
    }
  }
}
function nbi() {
  return new BigInteger(null )
}
function am1(t, e, i, r, n, s) {
  while (--s >= 0) {
    var o = e * this[t++] + i[r] + n;
    n = Math.floor(o / 67108864);
    i[r++] = o & 67108863
  }
  return n
}
function am2(t, e, i, r, n, s) {
  var o = e & 32767
    , a = e >> 15;
  while (--s >= 0) {
    var h = this[t] & 32767;
    var p = this[t++] >> 15;
    var d = a * h + p * o;
    h = o * h + ((d & 32767) << 15) + i[r] + (n & 1073741823);
    n = (h >>> 30) + (d >>> 15) + a * p + (n >>> 30);
    i[r++] = h & 1073741823
  }
  return n
}
function am3(t, e, i, r, n, s) {
  var o = e & 16383
    , a = e >> 14;
  while (--s >= 0) {
    var h = this[t] & 16383;
    var p = this[t++] >> 14;
    var d = a * h + p * o;
    h = o * h + ((d & 16383) << 14) + i[r] + n;
    n = (h >> 28) + (d >> 14) + a * p;
    i[r++] = h & 268435455
  }
  return n
}
if (j_lm && navigator.appName == "Microsoft Internet Explorer") {
  BigInteger.prototype.am = am2;
  dbits = 30
} else if (j_lm && navigator.appName != "Netscape") {
  BigInteger.prototype.am = am1;
  dbits = 26
} else {
  BigInteger.prototype.am = am3;
  dbits = 28
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv){
  BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv){
  BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv){
  BI_RC[rr++] = vv;
}
function int2char(t) {
  return BI_RM.charAt(t)
}
function intAt(t, e) {
  var i = BI_RC[t.charCodeAt(e)];
  return i == null  ? -1 : i
}
function bnpCopyTo(t) {
  for (var e = this.t - 1; e >= 0; --e){
    t[e] = this[e];
  }
  t.t = this.t;
  t.s = this.s
}
function bnpFromInt(t) {
  this.t = 1;
  this.s = t < 0 ? -1 : 0;
  if(t > 0){
    this[0] = t;
  }else if (t < -1){
    this[0] = t + this.DV;
  }else{
    this.t = 0
  }
}
function nbv(t) {
  var e = nbi();
  e.fromInt(t);
  return e
}
function bnpFromString(t, e) {
  var i;
  if (e == 16){
    i = 4;
  }
  else if (e == 8){
    i = 3;
  }
  else if (e == 256){
    i = 8;
  }
  else if (e == 2){
    i = 1;
  }
  else if (e == 32){
    i = 5;
  }
  else if (e == 4){
    i = 2;
  }
  else {
    this.fromRadix(t, e);
    return
  }
  this.t = 0;
  this.s = 0;
  var r = t.length,
    n = false,
    s = 0;
  while (--r >= 0) {
    var o = i == 8 ? t[r] & 255 : intAt(t, r);
    if (o < 0) {
      if (t.charAt(r) == "-"){
        n = true;
      }
      continue
    }
    n = false;
    if (s == 0){
      this[this.t++] = o;
    }
    else if (s + i > this.DB) {
      this[this.t - 1] |= (o & (1 << this.DB - s) - 1) << s;
      this[this.t++] = o >> this.DB - s
    } else{
      this[this.t - 1] |= o << s;
    }
    s += i;
    if (s >= this.DB){
      s -= this.DB
    }
  }
  if (i == 8 && (t[0] & 128) != 0) {
    this.s = -1;
    if (s > 0){
      this[this.t - 1] |= (1 << this.DB - s) - 1 << s
    }
  }
  this.clamp();
  if (n){
    BigInteger.ZERO.subTo(this, this)
  }
}
function bnpClamp() {
  var t = this.s & this.DM;
  while (this.t > 0 && this[this.t - 1] == t){
    --this.t
  }
}
function bnToString(t) {
  if (this.s < 0){
    return "-" + this.negate().toString(t);
  }
  var e;
  if (t == 16){
    e = 4;
  }
  else if (t == 8){
    e = 3;
  }
  else if (t == 2){
    e = 1;
  }
  else if (t == 32){
    e = 5;
  }
  else if (t == 4){
    e = 2;
  }
  else{
    return this.toRadix(t);
  }
  var i = (1 << e) - 1, r, n = false, s = "", o = this.t;
  var a = this.DB - o * this.DB % e;
  if (o-- > 0) {
    if (a < this.DB && (r = this[o] >> a) > 0) {
      n = true;
      s = int2char(r)
    }
    while (o >= 0) {
      if (a < e) {
        r = (this[o] & (1 << a) - 1) << e - a;
        r |= this[--o] >> (a += this.DB - e)
      } else {
        r = this[o] >> (a -= e) & i;
        if (a <= 0) {
          a += this.DB;
          --o
        }
      }
      if (r > 0){
        n = true;
      }
      if (n){
        s += int2char(r)
      }
    }
  }
  return n ? s : "0"
}
function bnNegate() {
  var t = nbi();
  BigInteger.ZERO.subTo(this, t);
  return t
}
function bnAbs() {
  return this.s < 0 ? this.negate() : this
}
function bnCompareTo(t) {
  var e = this.s - t.s;
  if (e != 0){
    return e;
  }
  var i = this.t;
  e = i - t.t;
  if (e != 0){
    return this.s < 0 ? -e : e;
  }
  while (--i >= 0){
    if ((e = this[i] - t[i]) != 0){
      return e;
    }
  }
  return 0
}
function nbits(t) {
  var e = 1, i;
  if ((i = t >>> 16) != 0) {
    t = i;
    e += 16
  }
  if ((i = t >> 8) != 0) {
    t = i;
    e += 8
  }
  if ((i = t >> 4) != 0) {
    t = i;
    e += 4
  }
  if ((i = t >> 2) != 0) {
    t = i;
    e += 2
  }
  if ((i = t >> 1) != 0) {
    t = i;
    e += 1
  }
  return e
}
function bnBitLength() {
  if (this.t <= 0)
    return 0;
  return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}
function bnpDLShiftTo(t, e) {
  var i;
  for (i = this.t - 1; i >= 0; --i)
    e[i + t] = this[i];
  for (i = t - 1; i >= 0; --i)
    e[i] = 0;
  e.t = this.t + t;
  e.s = this.s
}
function bnpDRShiftTo(t, e) {
  for (var i = t; i < this.t; ++i)
    e[i - t] = this[i];
  e.t = Math.max(this.t - t, 0);
  e.s = this.s
}
function bnpLShiftTo(t, e) {
  var i = t % this.DB;
  var r = this.DB - i;
  var n = (1 << r) - 1;
  var s = Math.floor(t / this.DB), o = this.s << i & this.DM, a;
  for (a = this.t - 1; a >= 0; --a) {
    e[a + s + 1] = this[a] >> r | o;
    o = (this[a] & n) << i
  }
  for (a = s - 1; a >= 0; --a)
    e[a] = 0;
  e[s] = o;
  e.t = this.t + s + 1;
  e.s = this.s;
  e.clamp()
}
function bnpRShiftTo(t, e) {
  e.s = this.s;
  var i = Math.floor(t / this.DB);
  if (i >= this.t) {
    e.t = 0;
    return
  }
  var r = t % this.DB;
  var n = this.DB - r;
  var s = (1 << r) - 1;
  e[0] = this[i] >> r;
  for (var o = i + 1; o < this.t; ++o) {
    e[o - i - 1] |= (this[o] & s) << n;
    e[o - i] = this[o] >> r
  }
  if (r > 0)
    e[this.t - i - 1] |= (this.s & s) << n;
  e.t = this.t - i;
  e.clamp()
}
function bnpSubTo(t, e) {
  var i = 0
    , r = 0
    , n = Math.min(t.t, this.t);
  while (i < n) {
    r += this[i] - t[i];
    e[i++] = r & this.DM;
    r >>= this.DB
  }
  if (t.t < this.t) {
    r -= t.s;
    while (i < this.t) {
      r += this[i];
      e[i++] = r & this.DM;
      r >>= this.DB
    }
    r += this.s
  } else {
    r += this.s;
    while (i < t.t) {
      r -= t[i];
      e[i++] = r & this.DM;
      r >>= this.DB
    }
    r -= t.s
  }
  e.s = r < 0 ? -1 : 0;
  if (r < -1)
    e[i++] = this.DV + r;
  else if (r > 0)
    e[i++] = r;
  e.t = i;
  e.clamp()
}
function bnpMultiplyTo(t, e) {
  var i = this.abs()
    , r = t.abs();
  var n = i.t;
  e.t = n + r.t;
  while (--n >= 0)
    e[n] = 0;
  for (n = 0; n < r.t; ++n)
    e[n + i.t] = i.am(0, r[n], e, n, 0, i.t);
  e.s = 0;
  e.clamp();
  if (this.s != t.s)
    BigInteger.ZERO.subTo(e, e)
}
function bnpSquareTo(t) {
  var e = this.abs();
  var i = t.t = 2 * e.t;
  while (--i >= 0)
    t[i] = 0;
  for (i = 0; i < e.t - 1; ++i) {
    var r = e.am(i, e[i], t, 2 * i, 0, 1);
    if ((t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV) {
      t[i + e.t] -= e.DV;
      t[i + e.t + 1] = 1
    }
  }
  if (t.t > 0)
    t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1);
  t.s = 0;
  t.clamp()
}
function bnpDivRemTo(t, e, i) {
  var r = t.abs();
  if (r.t <= 0)
    return;
  var n = this.abs();
  if (n.t < r.t) {
    if (e != null )
      e.fromInt(0);
    if (i != null )
      this.copyTo(i);
    return
  }
  if (i == null )
    i = nbi();
  var s = nbi()
    , o = this.s
    , a = t.s;
  var h = this.DB - nbits(r[r.t - 1]);
  if (h > 0) {
    r.lShiftTo(h, s);
    n.lShiftTo(h, i)
  } else {
    r.copyTo(s);
    n.copyTo(i)
  }
  var p = s.t;
  var d = s[p - 1];
  if (d == 0)
    return;
  var u = d * (1 << this.F1) + (p > 1 ? s[p - 2] >> this.F2 : 0);
  var f = this.FV / u
    , c = (1 << this.F1) / u
    , g = 1 << this.F2;
  var l = i.t
    , b = l - p
    , v = e == null  ? nbi() : e;
  s.dlShiftTo(b, v);
  if (i.compareTo(v) >= 0) {
    i[i.t++] = 1;
    i.subTo(v, i)
  }
  BigInteger.ONE.dlShiftTo(p, v);
  v.subTo(s, s);
  while (s.t < p)
    s[s.t++] = 0;
  while (--b >= 0) {
    var m = i[--l] == d ? this.DM : Math.floor(i[l] * f + (i[l - 1] + g) * c);
    if ((i[l] += s.am(0, m, i, b, 0, p)) < m) {
      s.dlShiftTo(b, v);
      i.subTo(v, i);
      while (i[l] < --m)
        i.subTo(v, i)
    }
  }
  if (e != null ) {
    i.drShiftTo(p, e);
    if (o != a)
      BigInteger.ZERO.subTo(e, e)
  }
  i.t = p;
  i.clamp();
  if (h > 0)
    i.rShiftTo(h, i);
  if (o < 0)
    BigInteger.ZERO.subTo(i, i)
}
function bnMod(t) {
  var e = nbi();
  this.abs().divRemTo(t, null , e);
  if (this.s < 0 && e.compareTo(BigInteger.ZERO) > 0)
    t.subTo(e, e);
  return e
}
function Classic(t) {
  this.m = t
}
function cConvert(t) {
  if (t.s < 0 || t.compareTo(this.m) >= 0)
    return t.mod(this.m);
  else
    return t
}
function cRevert(t) {
  return t
}
function cReduce(t) {
  t.divRemTo(this.m, null , t)
}
function cMulTo(t, e, i) {
  t.multiplyTo(e, i);
  this.reduce(i)
}
function cSqrTo(t, e) {
  t.squareTo(e);
  this.reduce(e)
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
function bnpInvDigit() {
  if (this.t < 1)
    return 0;
  var t = this[0];
  if ((t & 1) == 0)
    return 0;
  var e = t & 3;
  e = e * (2 - (t & 15) * e) & 15;
  e = e * (2 - (t & 255) * e) & 255;
  e = e * (2 - ((t & 65535) * e & 65535)) & 65535;
  e = e * (2 - t * e % this.DV) % this.DV;
  return e > 0 ? this.DV - e : -e
}
function Montgomery(t) {
  this.m = t;
  this.mp = t.invDigit();
  this.mpl = this.mp & 32767;
  this.mph = this.mp >> 15;
  this.um = (1 << t.DB - 15) - 1;
  this.mt2 = 2 * t.t
}
function montConvert(t) {
  var e = nbi();
  t.abs().dlShiftTo(this.m.t, e);
  e.divRemTo(this.m, null , e);
  if (t.s < 0 && e.compareTo(BigInteger.ZERO) > 0)
    this.m.subTo(e, e);
  return e
}
function montRevert(t) {
  var e = nbi();
  t.copyTo(e);
  this.reduce(e);
  return e
}
function montReduce(t) {
  while (t.t <= this.mt2)
    t[t.t++] = 0;
  for (var e = 0; e < this.m.t; ++e) {
    var i = t[e] & 32767;
    var r = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
    i = e + this.m.t;
    t[i] += this.m.am(0, r, t, e, 0, this.m.t);
    while (t[i] >= t.DV) {
      t[i] -= t.DV;
      t[++i]++
    }
  }
  t.clamp();
  t.drShiftTo(this.m.t, t);
  if (t.compareTo(this.m) >= 0)
    t.subTo(this.m, t)
}
function montSqrTo(t, e) {
  t.squareTo(e);
  this.reduce(e)
}
function montMulTo(t, e, i) {
  t.multiplyTo(e, i);
  this.reduce(i)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnpIsEven() {
  return (this.t > 0 ? this[0] & 1 : this.s) == 0
}
function bnpExp(t, e) {
  if (t > 4294967295 || t < 1)
    return BigInteger.ONE;
  var i = nbi()
    , r = nbi()
    , n = e.convert(this)
    , s = nbits(t) - 1;
  n.copyTo(i);
  while (--s >= 0) {
    e.sqrTo(i, r);
    if ((t & 1 << s) > 0)
      e.mulTo(r, n, i);
    else {
      var o = i;
      i = r;
      r = o
    }
  }
  return e.revert(i)
}
function bnModPowInt(t, e) {
  var i;
  if (t < 256 || e.isEven())
    i = new Classic(e);
  else
    i = new Montgomery(e);
  return this.exp(t, i)
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
function Arcfour() {
  this.i = 0;
  this.j = 0;
  this.S = new Array
}
function ARC4init(t) {
  var e, i, r;
  for (e = 0; e < 256; ++e)
    this.S[e] = e;
  i = 0;
  for (e = 0; e < 256; ++e) {
    i = i + this.S[e] + t[e % t.length] & 255;
    r = this.S[e];
    this.S[e] = this.S[i];
    this.S[i] = r
  }
  this.i = 0;
  this.j = 0
}
function ARC4next() {
  var t;
  this.i = this.i + 1 & 255;
  this.j = this.j + this.S[this.i] & 255;
  t = this.S[this.i];
  this.S[this.i] = this.S[this.j];
  this.S[this.j] = t;
  return this.S[t + this.S[this.i] & 255]
}
Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;
function prng_newstate() {
  return new Arcfour
}
var rng_psize = 256;
var rng_state;
var rng_pool;
var rng_pptr;
function rng_seed_int(t) {
  rng_pool[rng_pptr++] ^= t & 255;
  rng_pool[rng_pptr++] ^= t >> 8 & 255;
  rng_pool[rng_pptr++] ^= t >> 16 & 255;
  rng_pool[rng_pptr++] ^= t >> 24 & 255;
  if (rng_pptr >= rng_psize)
    rng_pptr -= rng_psize
}
function rng_seed_time() {
  rng_seed_int((new Date).getTime())
}
if (rng_pool == null ) {
  rng_pool = new Array;
  rng_pptr = 0;
  var t;
  if (window.crypto && window.crypto.getRandomValues) {
    var ua = new Uint8Array(32);
    window.crypto.getRandomValues(ua);
    for (t = 0; t < 32; ++t)
      rng_pool[rng_pptr++] = ua[t]
  }
  if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
    var z = window.crypto.random(32);
    for (t = 0; t < z.length; ++t)
      rng_pool[rng_pptr++] = z.charCodeAt(t) & 255
  }
  while (rng_pptr < rng_psize) {
    t = Math.floor(65536 * Math.random());
    rng_pool[rng_pptr++] = t >>> 8;
    rng_pool[rng_pptr++] = t & 255
  }
  rng_pptr = 0;
  rng_seed_time()
}
function rng_get_byte() {
  if (rng_state == null ) {
    rng_seed_time();
    rng_state = prng_newstate();
    rng_state.init(rng_pool);
    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
      rng_pool[rng_pptr] = 0;
    rng_pptr = 0
  }
  return rng_state.next()
}
function rng_get_bytes(t) {
  var e;
  for (e = 0; e < t.length; ++e)
    t[e] = rng_get_byte()
}
function SecureRandom() {}
SecureRandom.prototype.nextBytes = rng_get_bytes;
function parseBigInt(t, e) {
  return new BigInteger(t,e)
}
function linebrk(t, e) {
  var i = "";
  var r = 0;
  while (r + e < t.length) {
    i += t.substring(r, r + e) + "\n";
    r += e
  }
  return i + t.substring(r, t.length)
}
function byte2Hex(t) {
  if (t < 16)
    return "0" + t.toString(16);
  else
    return t.toString(16)
}
function pkcs1pad2(t, e) {
  if (e < t.length + 11) {
    alert("Message too long for RSA");
    return null
  }
  var i = new Array;
  var r = t.length - 1;
  while (r >= 0 && e > 0) {
    var n = t.charCodeAt(r--);
    if (n < 128) {
      i[--e] = n
    } else if (n > 127 && n < 2048) {
      i[--e] = n & 63 | 128;
      i[--e] = n >> 6 | 192
    } else {
      i[--e] = n & 63 | 128;
      i[--e] = n >> 6 & 63 | 128;
      i[--e] = n >> 12 | 224
    }
  }
  i[--e] = 0;
  var s = new SecureRandom;
  var o = new Array;
  while (e > 2) {
    o[0] = 0;
    while (o[0] == 0)
      s.nextBytes(o);
    i[--e] = o[0]
  }
  i[--e] = 2;
  i[--e] = 0;
  return new BigInteger(i)
}
function RSAKey() {
  this.n = null ;
  this.e = 0;
  this.d = null ;
  this.p = null ;
  this.q = null ;
  this.dmp1 = null ;
  this.dmq1 = null ;
  this.coeff = null
}
function RSASetPublic(t, e) {
  if (t != null  && e != null  && t.length > 0 && e.length > 0) {
    this.n = parseBigInt(t, 16);
    this.e = parseInt(e, 16)
  } else
    alert("Invalid RSA public key")
}
function RSADoPublic(t) {
  return t.modPowInt(this.e, this.n)
}
function RSAEncrypt(t) {
  var e = pkcs1pad2(t, this.n.bitLength() + 7 >> 3);
  if (e == null )
    return null ;
  var i = this.doPublic(e);
  if (i == null )
    return null ;
  var r = i.toString(16);
  if ((r.length & 1) == 0)
    return r;
  else
    return "0" + r
}
RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
