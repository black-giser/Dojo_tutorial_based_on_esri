// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/Accessor ../../core/Error ../../core/Logger ../../core/requireUtils ../../core/promiseUtils ../../core/urlUtils ../../portal/PortalItem ../../portal/Portal".split(" "),function(g,a,h,f,e,k,l,m,n,p,q,r,t){var u=m.getLogger("esri.layers.Layer");a=function(a){function d(){return null!==a&&a.apply(this,arguments)||this}h(d,a);Object.defineProperty(d.prototype,
"portalItem",{set:function(b){b!==this._get("portalItem")&&(this.removeOrigin("portal-item"),this._set("portalItem",b))},enumerable:!0,configurable:!0});d.prototype.writePortalItem=function(b,c){b&&b.id&&(c.itemId=b.id)};d.prototype.loadFromPortal=function(b){var c=this;return this.portalItem&&this.portalItem.id?n.when(g,"../../portal/support/layersLoader").then(function(a){return a.load({instance:c,supportedTypes:b.supportedTypes,validateItem:b.validateItem,supportsData:b.supportsData}).otherwise(function(a){u.warn("Failed to load layer ("+
c.title+", "+c.id+") portal item ("+c.portalItem.id+")\n  "+a);throw a;})}):p.resolve()};d.prototype.write=function(a,c){var b=c&&c.portal,d=this.portalItem&&this.portalItem.id&&(this.portalItem.portal||t.getDefault());return b&&d&&!q.hasSamePortal(d.restUrl,b.restUrl)?(c.messages&&c.messages.push(new l("layer:cross-portal","The layer '"+this.title+" ("+this.id+")' cannot be persisted because it refers to an item on a different portal than the one being saved to. To save the scene, set the layer.portalItem to null or save the scene to the same portal as the item associated with the layer",
{layer:this})),null):this.inherited(arguments)};return d}(e.declared(k));f([e.property({type:r})],a.prototype,"portalItem",null);f([e.writer("portalItem")],a.prototype,"writePortalItem",null);return a=f([e.subclass("esri.layers.mixins.PortalLayer")],a)});