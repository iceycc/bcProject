(function(window){var svgSprite='<svg><symbol id="icon-xiangyou" viewBox="0 0 1024 1024"><path d="M249.311159 881.975333 619.286492 512 249.311159 142.024667 327.012845 64.322981 774.688841 512 327.012845 959.677019Z"  ></path></symbol><symbol id="icon-xiangxia" viewBox="0 0 1024 1024"><path d="M553.1392 778.88512l451.61472-451.61472c22.64576-22.64576 22.64576-59.4176 0-82.14016-22.64576-22.64576-59.4176-22.64576-82.14016 0l-410.5472 410.61888-410.61888-410.624c-22.64576-22.64576-59.4176-22.64576-82.14016 0-22.64576 22.64576-22.64576 59.4176 0 82.14016l451.69152 451.69152a58.08128 58.08128 0 0 0 82.14016-0.07168z" fill="" ></path></symbol><symbol id="icon-xiangzuo" viewBox="0 0 1024 1024"><path d="M245.01248 555.52512l447.0784 447.0784c22.42048 22.42048 58.81856 22.42048 81.31584 0 22.42048-22.42048 22.42048-58.81856 0-81.31584l-406.49216-406.4256 406.49728-406.49216c22.42048-22.42048 22.42048-58.81856 0-81.31584-22.42048-22.42048-58.81856-22.42048-81.31584 0L244.9408 474.20928c-22.43584 22.47168-22.40512 58.88 0.07168 81.31584 0-0.00512 0 0 0 0z" fill="" ></path></symbol><symbol id="icon-eye" viewBox="0 0 1024 1024"><path d="M506.838611 641.119227a128.468 128.468 0 1 0 3.623258-256.910451 128.468 128.468 0 1 0-3.623258 256.910451Z"  ></path><path d="M941.314 468.847c-51.714-60.895-114.262-109.28-185.907-143.811-74.21-35.768-153.904-54.498-236.87-55.67-86.925-1.244-170.593 16.833-248.676 53.685-74.371 35.1-141.548 87.226-194.269 150.743-20.26 24.41-20.08 59.654 0.427 83.804 51.714 60.896 114.262 109.28 185.907 143.812 74.21 35.769 153.905 54.498 236.87 55.671 2.775 0.039 5.533 0.059 8.301 0.059 83.948 0 164.786-18.068 240.376-53.743 74.37-35.101 141.548-87.227 194.269-150.745 20.26-24.411 20.08-59.655-0.428-83.805z m-48.819 42.928c-95.892 115.529-236.072 181.369-385.588 181.361-2.392 0-4.811-0.017-7.207-0.051-144.506-2.041-281.151-66.524-374.898-176.915-0.349-0.411-0.333-1.057 0.036-1.502 97.425-117.376 240.599-183.465 392.794-181.309 144.507 2.042 281.152 66.525 374.898 176.915 0.35 0.411 0.334 1.056-0.035 1.501z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)