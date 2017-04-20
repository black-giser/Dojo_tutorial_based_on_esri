// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/tsSupport/paramHelper ../../core/accessorSupport/decorators dojo/io-query ../../core/Collection ../../core/JSONSupport ../../core/Logger ../../core/lang ../../core/accessorSupport/ensureType ../../core/accessorSupport/write ../../renderers/support/jsonUtils ../../tasks/QueryTask ../../tasks/support/Query ../../PopupTemplate ./LabelClass ./layerSourceUtils".split(" "),function(b,D,p,f,q,
e,r,t,u,v,l,w,m,x,y,n,z,A,h){var B=v.getLogger("esri.layers.support.Sublayer"),C=0;b=k=function(b){function c(){var a=null!==b&&b.apply(this,arguments)||this;a._sublayersHandles=null;return a}p(c,b);Object.defineProperty(c.prototype,"definitionExpression",{get:function(){return this._get("definitionExpression")},set:function(a){this._setAndNotifyLayer("definitionExpression",a)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"id",{get:function(){var a=this._get("id");return null==
a?C++:a},set:function(a){this._set("id",a)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"labelingInfo",{get:function(){return this._get("labelingInfo")},set:function(a){this._setAndNotifyLayer("labelingInfo",a)},enumerable:!0,configurable:!0});c.prototype.writeLabelingInfo=function(a,g,b,d){(!d||d.writeAsDynamic)&&a&&a.length&&(g.layerDefinition={drawingInfo:{labelingInfo:a.map(function(a){return a.write({},d)})}})};Object.defineProperty(c.prototype,"labelsVisible",{get:function(){return this._get("labelsVisible")},
set:function(a){this._setAndNotifyLayer("labelsVisible",a)},enumerable:!0,configurable:!0});c.prototype.writeLabelsVisible=function(a,g,b,d){if(!d||d.writeAsDynamic)g.showLabels=a};Object.defineProperty(c.prototype,"legendEnabled",{get:function(){return this._get("legendEnabled")},set:function(a){this._set("legendEnabled",a)},enumerable:!0,configurable:!0});c.prototype.writeLegendEnabled=function(a,g,b,d){a||(g.showLegend=!1)};Object.defineProperty(c.prototype,"layer",{set:function(a){this._set("layer",
a);this.sublayers&&this.sublayers.forEach(function(g){return g.layer=a})},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"minScale",{get:function(){return this._get("minScale")},set:function(a){this._set("minScale",a)},enumerable:!0,configurable:!0});c.prototype.readMinScale=function(a,g){return g.minScale||g.layerDefinition&&g.layerDefinition.minScale||0};c.prototype.writeMinScale=function(a,g,b,d){if(d&&d.writeOverridesOnly&&(b=d&&d.serviceSublayer)&&b.minScale===a&&b.maxScale===
this.maxScale)return;g.minScale=a};Object.defineProperty(c.prototype,"maxScale",{get:function(){return this._get("maxScale")},set:function(a){this._set("maxScale",a)},enumerable:!0,configurable:!0});c.prototype.readMaxScale=function(a,g){return g.maxScale||g.layerDefinition&&g.layerDefinition.maxScale||0};c.prototype.writeMaxScale=function(a,g,b,d){if(d&&d.writeOverridesOnly&&(b=d&&d.serviceSublayer)&&b.maxScale===a&&b.minScale===this.minScale)return;g.maxScale=a};Object.defineProperty(c.prototype,
"opacity",{get:function(){return this._get("opacity")},set:function(a){this._setAndNotifyLayer("opacity",a)},enumerable:!0,configurable:!0});c.prototype.readOpacity=function(a,g){return 1-.01*g.layerDefinition.drawingInfo.transparency};c.prototype.writeOpacity=function(a,g,b,d){if(!d||d.writeAsDynamic)g.layerDefinition={drawingInfo:{transparency:100-100*a}}};c.prototype.writeParent=function(a,g,b,d){d&&d.writeOverridesOnly||(g.parentLayerId=this.parent&&this.parent!==this.layer?this.parent.id:-1)};
Object.defineProperty(c.prototype,"popupTemplate",{get:function(){return this._get("popupTemplate")},set:function(a){this._set("popupTemplate",a)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"renderer",{get:function(){return this._get("renderer")},set:function(a){this._setAndNotifyLayer("renderer",a)},enumerable:!0,configurable:!0});c.prototype.readRenderer=function(a,g,b){if(a=g.layerDefinition.drawingInfo.renderer||void 0)(a=x.read(a,g,b)||void 0)||B.error("Failed to create renderer",
{rendererDefinition:g.drawingInfo.renderer,layer:this,context:b});return a};c.prototype.writeRenderer=function(a,b,c,d){if(!d||d.writeAsDynamic)b.layerDefinition={drawingInfo:{renderer:a.toJSON()}}};Object.defineProperty(c.prototype,"source",{get:function(){return this._get("source")||{mapLayerId:this.id,type:h.MAPLAYER}},set:function(a){this._setAndNotifyLayer("source",a)},enumerable:!0,configurable:!0});c.prototype.writeSource=function(a,b,c,d){d&&!d.writeAsDynamic&&d.writeOverridesOnly||(b.layerDefinition=
{source:h.sourceToJSON(a)})};Object.defineProperty(c.prototype,"sublayers",{set:function(a){var b=this,c=this._get("sublayers");c&&(c.forEach(function(a){a.parent=null;a.layer=null}),this._sublayersHandles.forEach(function(a){return a.remove()}),this._sublayersHandles=null);a&&(a.forEach(function(a){a.parent=b;a.layer=b.layer}),this._sublayersHandles=[a.on("after-add",function(a){a=a.item;a.parent=b;a.layer=b.layer}),a.on("after-remove",function(a){a=a.item;a.parent=null;a.layer=null})]);this._set("sublayers",
a)},enumerable:!0,configurable:!0});c.prototype.castSublayers=function(a){return w.default(t.ofType(k),a)};c.prototype.writeSublayers=function(a,b,c,d){d&&d.writeOverridesOnly||(b.subLayerIds=this.get("sublayers.length")?this.sublayers.map(function(a){return a.id}).toArray().reverse():null)};Object.defineProperty(c.prototype,"title",{get:function(){return this._get("title")},set:function(a){this._set("title",a)},enumerable:!0,configurable:!0});c.prototype.writeTitle=function(a,b,c,d){if(d&&d.writeOverridesOnly&&
(c=d&&d.serviceSublayer)&&c.title===a)return;b.name=a};Object.defineProperty(c.prototype,"url",{get:function(){var a=this.layer,b=this.source;if(!a)return null;if(h.isMapLayerSource(b))return a.parsedUrl.path+"/"+b.mapLayerId;b={layer:JSON.stringify({source:h.sourceToJSON(this.source)})};return a.parsedUrl.path+"/dynamicLayer?"+r.objectToQuery(b)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"visible",{get:function(){return this._get("visible")},set:function(a){this._setAndNotifyLayer("visible",
a)},enumerable:!0,configurable:!0});c.prototype.writeVisible=function(a,b,c,d){if(d&&d.writeOverridesOnly&&(c=d&&d.serviceSublayer)&&c.visible===a)return;b.defaultVisibility=a};c.prototype.clone=function(){var a=new k;this.hasOwnProperty("definitionExpression")&&(a.definitionExpression=this.definitionExpression);this.hasOwnProperty("id")&&(a.id=this.id);this.hasOwnProperty("labelingInfo")&&(a.labelingInfo=l.clone(this.labelingInfo));this.hasOwnProperty("labelsVisible")&&(a.labelsVisible=this.labelsVisible);
this.hasOwnProperty("legendEnabled")&&(a.legendEnabled=this.legendEnabled);this.hasOwnProperty("visible")&&(a.visible=this.visible);this.hasOwnProperty("layer")&&(a.layer=this.layer);this.hasOwnProperty("minScale")&&(a.minScale=this.minScale);this.hasOwnProperty("maxScale")&&(a.maxScale=this.maxScale);this.hasOwnProperty("opacity")&&(a.opacity=this.opacity);this.hasOwnProperty("parent")&&(a.parent=this.parent);this.hasOwnProperty("popupTemplate")&&(a.popupTemplate=this.popupTemplate.clone());this.hasOwnProperty("renderer")&&
(a.renderer=this.renderer.clone());this.hasOwnProperty("source")&&(a.source=l.clone(this.source));this.hasOwnProperty("sublayers")&&(a.sublayers=this.sublayers.clone());this.hasOwnProperty("title")&&(a.title=this.title);return a};c.prototype.createQuery=function(){return new n({returnGeometry:!0,where:this.definitionExpression||"1\x3d1"})};c.prototype.queryFeatures=function(a){var b=this;void 0===a&&(a=this.createQuery());return(new y({url:this.url})).execute(a).then(function(a){a&&a.features&&a.features.forEach(function(a){a.popupTemplate=
b.popupTemplate});return a})};c.prototype.toExportImageJSON=function(){var a={id:this.id,source:h.sourceToJSON(this.source)};this.definitionExpression&&(a.definitionExpression=this.definitionExpression);if(this.renderer||this.labelingInfo||null!=this.opacity||null!=this.labelsVisible){var b=a.drawingInfo={};this.renderer&&(b.renderer=this.renderer.toJSON());null!=this.labelsVisible&&(b.showLabels=this.labelsVisible);!1!==this.labelsVisible&&this.labelingInfo&&(b.labelingInfo=this.labelingInfo);null!=
this.opacity&&(b.transparency=100-100*this.opacity)}return a};c.prototype._setAndNotifyLayer=function(a,b){var c=this.layer;this._get(a)!==b&&(this._set(a,b),c&&c.emit("sublayer-update",{propertyName:a}))};return c}(e.declared(u));f([e.property({value:null,json:{read:{source:"layerDefinition.definitionExpression"},write:{target:"layerDefinition.definitionExpression"}}})],b.prototype,"definitionExpression",null);f([e.property({json:{write:{ignoreOrigin:!0}}})],b.prototype,"id",null);f([e.property({value:null,
type:[A],json:{read:{source:"layerDefinition.drawingInfo.labelingInfo"}}})],b.prototype,"labelingInfo",null);f([e.writer("labelingInfo")],b.prototype,"writeLabelingInfo",null);f([e.property({json:{read:{source:"showLabels"}}})],b.prototype,"labelsVisible",null);f([e.writer("labelsVisible")],b.prototype,"writeLabelsVisible",null);f([e.property({value:!0,type:Boolean,json:{read:{source:"showLegend"}}})],b.prototype,"legendEnabled",null);f([e.writer("showLegend")],b.prototype,"writeLegendEnabled",null);
f([e.property({value:null})],b.prototype,"layer",null);f([e.property({value:0,json:{write:{overridePolicy:function(b,c,a){if(m.willPropertyWrite(this,"maxScale",{},a))return{ignoreOrigin:!0}}}}})],b.prototype,"minScale",null);f([e.reader("portal-item","minScale",["minScale","layerDefinition.minScale"])],b.prototype,"readMinScale",null);f([e.writer("minScale")],b.prototype,"writeMinScale",null);f([e.property({value:0,json:{write:{overridePolicy:function(b,c,a){if(m.willPropertyWrite(this,"minScale",
{},a))return{ignoreOrigin:!0}}}}})],b.prototype,"maxScale",null);f([e.reader("portal-item","maxScale",["maxScale","layerDefinition.maxScale"])],b.prototype,"readMaxScale",null);f([e.writer("maxScale")],b.prototype,"writeMaxScale",null);f([e.property()],b.prototype,"opacity",null);f([e.reader("opacity",["layerDefinition.drawingInfo.transparency"])],b.prototype,"readOpacity",null);f([e.writer("opacity")],b.prototype,"writeOpacity",null);f([e.property({json:{write:{allowNull:!0}}})],b.prototype,"parent",
void 0);f([e.writer("parent")],b.prototype,"writeParent",null);f([e.property({value:null,type:z,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],b.prototype,"popupTemplate",null);f([e.property({value:null,json:{write:{target:"layerDefinition.drawingInfo.renderer"}}})],b.prototype,"renderer",null);f([e.reader("renderer",["layerDefinition.drawingInfo.renderer"])],b.prototype,"readRenderer",null);f([e.writer("renderer")],b.prototype,"writeRenderer",null);f([e.property({cast:h.castSource,
json:{read:{source:"layerDefinition.source",reader:h.sourceFromJSON}}})],b.prototype,"source",null);f([e.writer("source")],b.prototype,"writeSource",null);f([e.property({value:null,json:{write:{allowNull:!0}}})],b.prototype,"sublayers",null);f([e.cast("sublayers")],b.prototype,"castSublayers",null);f([e.writer("sublayers")],b.prototype,"writeSublayers",null);f([e.property({value:null,json:{read:{source:"name"},write:{allowNull:!0,ignoreOrigin:!0}}})],b.prototype,"title",null);f([e.writer("title")],
b.prototype,"writeTitle",null);f([e.property({readOnly:!0,dependsOn:["layer","source"]})],b.prototype,"url",null);f([e.property({value:!0,json:{read:{source:"defaultVisibility"}}})],b.prototype,"visible",null);f([e.writer("visible")],b.prototype,"writeVisible",null);f([q(0,e.cast(n))],b.prototype,"queryFeatures",null);b=k=f([e.subclass("esri.layers.support.Sublayer")],b);var k;return b});