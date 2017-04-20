// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/watchUtils ../../core/Accessor ../../core/HandleRegistry".split(" "),function(a,l,f,e,d,g,h,k){a=function(a){function c(b){b=a.call(this,b)||this;b._handles=new k;b.navigationMode="pan";b.view=null;b.toggle=b.toggle.bind(b);return b}f(c,a);c.prototype.initialize=function(){this._handles.add(g.when(this,"view.inputManager",this._setNavigationMode.bind(this)))};
c.prototype.destroy=function(){this._handles.destroy();this.view=this._handles=null};Object.defineProperty(c.prototype,"state",{get:function(){return this.get("view.ready")&&"3d"===this.view.type?"ready":"disabled"},enumerable:!0,configurable:!0});c.prototype.toggle=function(){"disabled"!==this.state&&(this.navigationMode="pan"!==this.navigationMode?"pan":"rotate",this._setNavigationMode())};c.prototype._setNavigationMode=function(){this.get("view.inputManager").primaryDragAction="pan"===this.navigationMode?
"pan":"rotate"};return c}(d.declared(h));e([d.property({dependsOn:["view.ready"],readOnly:!0})],a.prototype,"state",null);e([d.property()],a.prototype,"navigationMode",void 0);e([d.property()],a.prototype,"view",void 0);return a=e([d.subclass("esri.widgets.NavigationToggleViewModel")],a)});