// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define([],function(){var l={};(function(){function l(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var d=Object.prototype.toString.call(a);if("[object Window]"==d)return"object";if("[object Array]"==d||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==d||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&
!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function g(a,b){a=a.split(".");var d=p;a[0]in d||!d.execScript||d.execScript("var "+a[0]);for(var c;a.length&&(c=a.shift());)a.length||void 0===b?d=d[c]?d[c]:d[c]={}:d[c]=b}function k(a,b){this.d=a;this.b=b}function m(a){if("array"!=l(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0}function f(a){this.a=[];if(a)a:{var b,d;if(a instanceof f){b=a.a;d=[];
for(var c=b.length,h=0;h<c;h++)d.push(b[h].getKey());b=d;d=a.a;for(var c=[],h=d.length,e=0;e<h;e++)c.push(d[e].b);d=c;if(0>=a.a.length){a=this.a;for(c=0;c<b.length;c++)a.push(new k(b[c],d[c]));break a}}else{b=[];c=0;for(h in a)b[c++]=h;c=[];h=0;for(d in a)c[h++]=a[d];d=c}for(c=0;c<b.length;c++)n(this,b[c],d[c])}}function n(a,b,d){var c=a.a;c.push(new k(b,d));b=c.length-1;a=a.a;for(d=a[b];0<b;)if(c=b-1>>1,a[c].getKey()>d.getKey())a[b]=a[c],b=c;else break;a[b]=d}function e(){f.call(this)}var p=this;
k.prototype.getKey=function(){return this.d};k.prototype.c=function(){return new k(this.d,this.b)};f.prototype.remove=function(){var a=this.a,b=a.length,d=a[0];if(!(0>=b)){if(1==b)m(a);else{a[0]=a.pop();for(var a=0,b=this.a,c=b.length,e=b[a];a<c>>1;){var f=2*a+1,g=2*a+2,f=g<c&&b[g].getKey()<b[f].getKey()?g:f;if(b[f].getKey()>e.getKey())break;b[a]=b[f];a=f}b[a]=e}return d.b}};f.prototype.c=function(){return new f(this)};f.prototype.g=function(){return this.a.length};f.prototype.h=function(){return 0==
this.a.length};f.prototype.clear=function(){m(this.a)};(function(){function a(){}a.prototype=f.prototype;e.i=f.prototype;e.prototype=new a})();e.prototype.f=function(a,b){n(this,a,b)};e.prototype.e=function(){return this.remove()};g("goog.structs.PriorityQueue",e);g("goog.structs.PriorityQueue.prototype.enqueue",e.prototype.f);g("goog.structs.PriorityQueue.prototype.dequeue",e.prototype.e);g("goog.structs.PriorityQueue.prototype.isEmpty",e.prototype.h);g("goog.structs.PriorityQueue.prototype.clear",
e.prototype.clear);g("goog.structs.PriorityQueue.prototype.clone",e.prototype.c);g("goog.structs.PriorityQueue.prototype.getCount",e.prototype.g)}).call(l);return l});