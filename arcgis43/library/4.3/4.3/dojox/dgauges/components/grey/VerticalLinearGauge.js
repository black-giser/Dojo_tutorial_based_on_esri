//>>built
define("dojo/_base/lang dojo/_base/declare dojo/_base/Color ../../RectangularGauge ../../LinearScaler ../../RectangularScale ../../RectangularValueIndicator ../DefaultPropertiesMixin".split(" "),function(e,f,d,g,h,k,l,m){return f("dojox.dgauges.components.grey.VerticalLinearGauge",[g,m],{borderColor:[148,152,161],fillColor:[148,152,161],indicatorColor:[63,63,63],constructor:function(){this.orientation="vertical";this.borderColor=new d(this.borderColor);this.fillColor=new d(this.fillColor);this.indicatorColor=
new d(this.indicatorColor);this.addElement("background",e.hitch(this,this.drawBackground));var c=new h,b=new k;b.set("scaler",c);b.set("labelPosition","trailing");b.set("paddingTop",30);b.set("paddingBottom",30);b.set("paddingLeft",15);b.set("labelGap",4);b.set("font",{family:"Helvetica",weight:"bold",size:"7pt"});this.addElement("scale",b);var a=new l;a.set("interactionArea","gauge");a.set("value",c.minimum);a.set("paddingLeft",22);a.set("indicatorShapeFunc",e.hitch(this,function(a){a.createPath().moveTo(0,
0).lineTo(-10,-20).lineTo(10,-20).lineTo(0,0).closePath().setFill(this.indicatorColor);return a}));b.addIndicator("indicator",a)},drawBackground:function(c,b,a){c.createRect({x:0,y:0,width:50,height:a,r:13.5}).setFill(this.borderColor);c.createRect({x:2,y:2,width:46,height:a-4,r:11.5}).setFill({type:"linear",x1:-2,y1:0,x2:60,y2:0,colors:[{offset:0,color:"white"},{offset:1,color:this.fillColor}]});c.createPath().moveTo(25,2).hLineTo(38).smoothCurveTo(48,2,48,18).vLineTo(a-16).smoothCurveTo(48,a-2,
38,a-2).closePath().setFill({type:"linear",x1:-10,y1:0,x2:60,y2:0,colors:[{offset:0,color:this.fillColor},{offset:1,color:"white"}]})}})});