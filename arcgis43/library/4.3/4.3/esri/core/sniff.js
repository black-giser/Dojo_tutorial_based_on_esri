// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define(["dojo/_base/window","dojo/sniff","../kernel"],function(d,a,n){var c=a("ff"),f=a("ie"),l=void 0===f&&7<=a("trident"),k=a("webkit"),h=a("opera"),m=a("chrome"),p=a("safari"),g=d.global;d=navigator.userAgent;var e;(e=d.match(/(iPhone|iPad|CPU)\s+OS\s+(\d+\_\d+)/i))&&a.add("esri-iphone",parseFloat(e[2].replace("_",".")));(e=d.match(/Android\s+(\d+\.\d+)/i))&&a.add("esri-android",parseFloat(e[1]));(e=d.match(/Fennec\/(\d+\.\d+)/i))&&a.add("esri-fennec",parseFloat(e[1]));0<=d.indexOf("BlackBerry")&&
0<=d.indexOf("WebKit")&&a.add("esri-blackberry",1);a.add("esri-touch",a("esri-iphone")||a("esri-android")||a("esri-blackberry")||6<=a("esri-fennec")||(c||k)&&document.createTouch?!0:!1);(e=d.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i))&&a.add("esri-mobile",e);a.add("esri-pointer",navigator.pointerEnabled||navigator.msPointerEnabled);n._getDOMAccessor=function(a){var b="";c?b="Moz":k?b="Webkit":f?b="ms":h&&(b="O");return b+a.charAt(0).toUpperCase()+a.substr(1)};a.add("esri-phonegap",
!!g.cordova);a.add("esri-cors",a("esri-phonegap")||"XMLHttpRequest"in g&&"withCredentials"in new XMLHttpRequest);if(a("host-webworker"))return a;a.add("esri-file-upload",g.FormData&&g.FileList?!0:!1);a.add("esri-workers",g.Worker?!0:!1);a.add("esri-transforms",l||9<=f||3.5<=c||4<=m||3.1<=p||10.5<=h||3.2<=a("esri-iphone")||2.1<=a("esri-android"));a.add("esri-transitions",l||10<=f||4<=c||4<=m||3.1<=p||10.5<=h||3.2<=a("esri-iphone")||2.1<=a("esri-android"));a.add("esri-transforms3d",l||10<=c||12<=m||
4<=p||3.2<=a("esri-iphone")||3<=a("esri-android"));a.add("esri-url-encodes-apostrophe",function(){var a=g.document.createElement("a");a.href="?'";return-1<a.href.indexOf("?%27")});3>a("esri-android")&&(a.add("esri-transforms",!1,!1,!0),a.add("esri-transitions",!1,!1,!0),a.add("esri-transforms3d",!1,!1,!0));n._css=function(q){var b=a("esri-transforms3d");void 0!==q&&null!==q?b=q:b&&(m||p&&!a("esri-iphone"))&&(b=!1);var d=b?"translate3d(":"translate(",e=b?m?",-1px)":",0px)":")",g=b?"scale3d(":"scale(",
l=b?",1)":")",n=b?"rotate3d(0,0,1,":"rotate(",r=b?"matrix3d(":"matrix(",t=b?",0,0,":",",u=b?",0,0,0,0,1,0,":",",v=b?",0,1)":")";return{names:{transition:k&&"-webkit-transition"||c&&"MozTransition"||h&&"OTransition"||f&&"msTransition"||"transition",transform:k&&"-webkit-transform"||c&&"MozTransform"||h&&"OTransform"||f&&"msTransform"||"transform",transformName:k&&"-webkit-transform"||c&&"-moz-transform"||h&&"-o-transform"||f&&"-ms-transform"||"transform",origin:k&&"-webkit-transform-origin"||c&&"MozTransformOrigin"||
h&&"OTransformOrigin"||f&&"msTransformOrigin"||"transformOrigin",endEvent:k&&"webkitTransitionEnd"||c&&"transitionend"||h&&"oTransitionEnd"||f&&"MSTransitionEnd"||"transitionend"},translate:function(a,b){return d+a+"px,"+b+"px"+e},scale:function(a){return g+a+","+a+l},rotate:function(a){return n+a+"deg)"},matrix:function(a){return a.m?(a=a.m,r+a[0].toFixed(10)+","+a[1].toFixed(10)+t+a[2].toFixed(10)+","+a[3].toFixed(10)+u+a[4].toFixed(10)+(c?"px,":",")+a[5].toFixed(10)+(c?"px":"")+v):r+a.xx.toFixed(10)+
","+a.yx.toFixed(10)+t+a.xy.toFixed(10)+","+a.yy.toFixed(10)+u+a.dx.toFixed(10)+(c?"px,":",")+a.dy.toFixed(10)+(c?"px":"")+v},matrix3d:function(a){a=a.m;return"matrix3d("+a[0].toFixed(10)+","+a[1].toFixed(10)+",0,0,"+a[2].toFixed(10)+","+a[3].toFixed(10)+",0,0,0,0,1,0,"+a[4].toFixed(10)+","+a[5].toFixed(10)+",0,1)"},getScaleFromMatrix:function(a){if(!a)return 1;a=a.toLowerCase();var b=-1<a.indexOf("matrix3d")?"matrix3d(":"matrix(";return Number(a.substring(b.length,a.indexOf(",")))}}};a.add("esri-webgl",
function(){var a;try{if(!g.WebGLRenderingContext)throw 0;a=document.createElement("canvas")}catch(w){return!1}for(var b=["webgl","experimental-webgl","webkit-3d","moz-webgl"],c=null,d=0;d<b.length;++d){try{c=a.getContext(b[d])}catch(w){}if(c)break}a=c;if(!a)return!1;a=a.getParameter(a.VERSION);return a?(a=a.match(/^WebGL\s+([\d.]*)/))&&.91<parseFloat(a[1]):!1});return a});