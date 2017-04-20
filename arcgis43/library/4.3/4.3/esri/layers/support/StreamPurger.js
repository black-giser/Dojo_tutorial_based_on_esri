// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("../../core/declare ../../core/promiseUtils ../../core/Accessor ../../core/Promise dojo/_base/lang dojo/Deferred".split(" "),function(l,m,n,p,q,k){return l([n,p],{constructor:function(){this._featuresByTime={};this._lastEndTimeCheck=null;this._trackIds={};this._affectedTrackIds=[];this._doTrackPurge=this._doTimePurge=!1;this._watchHandlers=[];this._processQueue=[];this._flushQueueTimer=null},normalizeCtorArgs:function(a){a=a||{};a.controller||(a={controller:a});return a},getDefaults:function(){return q.mixin(this.inherited(arguments),
{idField:"uid",parentField:"parent"})},initialize:function(){var a;if(this.controller&&this.controller.layer)try{this.graphics=this.controller.graphics;this.layer=this.controller.layer;if(a=this.get("layer.trackIdField"))this.trackIdField=a,this._doTrackPurge=!0;this.maximumTrackPoints=this.get("layer.maximumTrackPoints");this._watchHandlers.push(this.layer.watch("maximumTrackPoints",function(a){this.set("maximumTrackPoints",a)}.bind(this)));this.get("layer.purgeOptions.age")&&this.set("maxFeatureAge",
this.layer.purgeOptions.age);if(this.get("layer.timeInfo.endTimeField")||this.maxFeatureAge)this._doTimePurge=!0,this._lastEndTimeCheck=1E3*Math.ceil(Date.now()/1E3);this.displayCount=this.get("layer.purgeOptions.displayCount");this._watchHandlers.push(this.layer.watch("purgeOptions",function(a){a.hasOwnProperty("displayCount")&&this.set("displayCount",a.displayCount);a.hasOwnProperty("age")&&this.set("maxFeatureAge",a.age)}.bind(this)))}catch(b){a=new k,this.addResolvingPromise(a.promise),a.reject(b)}else a=
new k,this.addResolvingPromise(a.promise),a.reject(Error("A controller with a layer is required for StreamPurger constructor"))},destroy:function(){this._flushQueueTimer&&(clearTimeout(this._flushQueueTimer),this._flushQueueTimer=null);this._affectedTrackIds=this._processQueue=null;for(var a=0,b=this._watchHandlers.length;a<b;a++)this._watchHandlers[a].remove()},properties:{graphics:null,layer:null,trackIdField:null,maximumTrackPoints:{set:function(a){var b=this.maximumTrackPoints;b!==a&&(this._set("maximumTrackPoints",
a),this._doTrackPurge&&(0===b||0!==a&&a<b)&&this._purgeByTracks())}},displayCount:{set:function(a){var b=this.displayCount;b!==a&&(this._set("displayCount",a),a<b&&this._purgeByDisplayCount())}},maxFeatureAge:{value:0,set:function(a){this.maxFeatureAge!==a&&(this._set("maxFeatureAge",Math.ceil(6E4*a)),this.maxFeatureAge?(this._doTimePurge=!0,this._lastEndTimeCheck=1E3*Math.ceil(Date.now()/1E3)):this._doTimePurge=!1)}}},addMany:function(a){var b,c,d,f,e,g,h=this._featuresByTime;b=0;for(c=a.length;b<
c;b++)e=null,d=a[b],this._doTrackPurge&&(e=d.attributes[this.trackIdField],d[this.parentField]=e,this._trackIds.hasOwnProperty(e)?this._trackIds[e]+=1:this._trackIds[e]=1,-1===this._affectedTrackIds.indexOf(e)&&this._affectedTrackIds.push(e)),this._doTimePurge&&(g=this._getExpireTimeOfItem(d))&&(f={id:d[this.idField]},null!==e&&(f.trackId=e),g=1E3*Math.ceil(g/1E3),h[g]?h[g].push(f):h[g]=[f]),this._processQueue.push(d);this._flushQueueTimer||(this._flushQueueTimer=setTimeout(this._flushProcessQueue.bind(this),
200))},purge:function(a){this._doTimePurge&&this._purgeByTime();this._doTrackPurge&&this._purgeByTracks(a);this._purgeByDisplayCount()},_flushProcessQueue:function(){clearTimeout(this._flushQueueTimer);this._flushQueueTimer=null;return m.resolve(this._processQueue.splice(0)).then(function(a){this.graphics.addMany(a);a=this._affectedTrackIds.splice(0);return this.purge(a)}.bind(this))},_getExpireTimeOfItem:function(a){var b=this.layer.timeInfo||{},c;c=b.endTimeField&&a.attributes[b.endTimeField];!c&&
this.maxFeatureAge&&(c=b.startTimeField&&a.attributes[b.startTimeField]?a.attributes[b.startTimeField]+this.maxFeatureAge:Date.now()+this.maxFeatureAge);return c},_getIndexOfItem:function(a){var b,c=this.idField;b="object"===typeof a?a[c]:a;return this.graphics.findIndex(function(a){return a[c]===b},this)},_getItemsByParent:function(a){return this.graphics.filter(function(b){return b[this.parentField]===a},this)},_processRemovedTrackFeatures:function(a){if(this._doTrackPurge&&a&&a.length)for(var b,
c=0,d=a.length;c<d;c++)b=a[c],--this._trackIds[b],0===this._trackIds[b]&&delete this._trackIds[b]},_purgeByDisplayCount:function(){var a,b,c=[];a=this.graphics.length-this.displayCount;if(0<a){for(var d=0;d<a;d++)this._doTrackPurge&&(b=this.graphics.getItemAt(0)[this.parentField],c.push(b)),this.graphics.removeAt(0);this._processRemovedTrackFeatures(c)}},_purgeByTime:function(){if(this._featuresByTime&&0!==Object.getOwnPropertyNames(this._featuresByTime).length){var a,b,c,d=[],f=[];if((this.layer.timeInfo||
{}).endTimeField||this.maxFeatureAge)if(a=1E3*Math.floor(this._lastEndTimeCheck/1E3),this._lastEndTimeCheck=b=1E3*Math.ceil(Date.now()/1E3),a&&a!==b){for(c=this._featuresByTime;a<=b;a+=1E3)c[a]&&(d=d.concat(c[a]),delete c[a]);b=0;for(c=d.length;b<c;b++){a=d[b];var e=this._getIndexOfItem(a.id);-1!==e&&(this.graphics.removeAt(e),(a.trackId||0===a.trackId)&&f.push(a.trackId))}this._processRemovedTrackFeatures(f)}}},_purgeByTracks:function(a){function b(a){var b,c;b=this._getItemsByParent(a);c=b.length-
d;if(0<c){for(var e=0;e<c;e++)this._removeItemFromCollection(b.getItemAt(e));this._trackIds[a]=d}}a=a||[];if(this.maximumTrackPoints){var c,d=this.maximumTrackPoints;if(a.length)for(var f=0,e=a.length;f<e;f++)c=a[f],this._trackIds[c]>d&&b.call(this,c);else for(c in a=this._trackIds,a)a[c]>d&&b.call(this,c)}},_removeItemFromCollection:function(a){var b=a[this.idField],c;if(void 0!==b)return c=this._getIndexOfItem(a),-1!==c&&this.graphics.removeAt(c),{index:c,id:b,parent:a[this.parentField]}}})});