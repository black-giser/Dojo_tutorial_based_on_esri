// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(d,e){return function(){function c(a,b){void 0===a&&(a=0);this.sizeOfFunction=function(){return 1};this._sizeOf=0;this._cache=new Map;this._queue=[];if(0>=a)throw Error("LRU cache size must be bigger than zero!");this._maxSize=a;b&&(b.disposeFunction&&(this.disposeFunction=b.disposeFunction),b.sizeOfFunction&&(this.sizeOfFunction=b.sizeOfFunction))}Object.defineProperty(c.prototype,"length",{get:function(){return this._cache.size},enumerable:!0,configurable:!0});
Object.defineProperty(c.prototype,"size",{get:function(){return this._sizeOf},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"keys",{get:function(){return this._queue.slice()},enumerable:!0,configurable:!0});c.prototype.clear=function(){var a=this;this._queue.length=0;this.disposeFunction&&this._cache.forEach(function(b,c){a.disposeFunction(c,b)});this._cache.clear();this._sizeOf=0};c.prototype.delete=function(a){var b=this._cache.get(a);return this._cache.delete(a)?(this._sizeOf-=
this.sizeOfFunction(b),this.disposeFunction&&this.disposeFunction(a,b),this._queue.splice(this._queue.indexOf(a),1),!0):!1};c.prototype.forEach=function(a,b){this._cache.forEach(a,b)};c.prototype.get=function(a){var b=this._cache.get(a);if(void 0!==b)return this._queue.splice(this._queue.indexOf(a),1),this._queue.unshift(a),b};c.prototype.has=function(a){return this._cache.has(a)};c.prototype.set=function(a,b){var c=this.get(a);void 0!==c?this._sizeOf-=this.sizeOfFunction(c):this._queue.unshift(a);
this._sizeOf+=this.sizeOfFunction(b);this._cache.set(a,b);this._collect();return this};c.prototype._collect=function(){for(;this._queue.length&&this._sizeOf>this._maxSize;){var a=this._queue.pop(),b=this._cache.get(a);this._cache.delete(a)&&(this._sizeOf-=this.sizeOfFunction(b),this.disposeFunction&&this.disposeFunction(a,b))}};return c}()});