// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("dojo/_base/lang ../../core/Accessor ../../core/lang ../../core/urlUtils ../../core/promiseUtils ../../request ../../geometry/Extent ../../geometry/SpatialReference ./PixelBlock ./rasterFormats/LercCodec ./rasterFormats/JpgPlus ./rasterFormats/Png ./rasterFormats/Raw".split(" "),function(l,p,q,r,k,t,u,v,w,x,m,n,g){return p.createSubclass({declaredClass:"esri.layers.support.Raster",validPixelTypes:"u1 u2 u4 u8 u16 u32 s8 s16 s32 f32".split(" "),validFormats:"lerc jpeg jpg jpgpng png png8 png24 png32 bip bsq".split(" "),
properties:{parsedUrl:{readOnly:!0,dependsOn:["url"],get:function(){return this.url?r.urlToObject(this.url):null}},url:null},read:function(a){if(!a.imageServiceParameters||!a.nBands)return k.reject(Error("Insufficient parameters to read data"));var b=q.clone(a.imageServiceParameters),c=a.nBands,d=a.pixelType||"f32";-1>=this.validPixelTypes.indexOf(d.toUpperCase())&&(b.pixelType="f32");b.format=b.format||"lerc";-1>=this.validFormats.indexOf(b.format.toLowerCase())&&(b.format="lerc");this._prepareGetImageParameters(b);
return t(this.parsedUrl.path+"/exportImage",{responseType:"array-buffer",query:l.mixin(b,{f:"image"})}).then(function(a){a=a.data;if(!this._isDataValid(a))return a=Error(String.fromCharCode.apply(null,new Uint8Array(a))),k.reject(a);var e=b.format.toUpperCase();"BSQ"!==e&&"BIP"!==e&&(e=this._getFormat(a));try{return-1<this.validFormats.indexOf(e.toLowerCase())?{pixelData:{pixelBlock:this._decodePixelBlock(a,{width:b.width,height:b.height,planes:c,pixelType:d,noDataValue:b.noData,format:e}),extent:b.extent},
params:b}:k.reject(Error("Cannot decode the pixelBlock. Unsupported Format: "+e))}catch(y){return k.reject(y)}}.bind(this))},_prepareGetImageParameters:function(a){if(a.size&&a.bbox){var b=a.size.split(",");a.width=parseFloat(b[0]);a.height=parseFloat(b[1]);a.extent||(b=a.bbox.split(","),a.extent=new u(parseFloat(b[0]),parseFloat(b[1]),parseFloat(b[2]),parseFloat(b[3]),new v(a.bboxSR)))}else{if(!a.width||Math.floor(a.width)!==a.width||!a.height||Math.floor(a.height)!==a.height)throw Error("Incorrect Image Dimensions");
if(!a.extent||"esri.geometry.Extent"!==a.extent.declaredClass)throw Error("Incorrect extent");var b=a.extent,c=b.spatialReference.wkid||JSON.stringify(b.spatialReference.toJSON());delete a._ts;l.mixin(a,{bbox:b.xmin+","+b.ymin+","+b.xmax+","+b.ymax,imageSR:c,bboxSR:c,size:a.width+","+a.height},a.disableClientCaching?{_ts:Date.now()}:{})}},_adjustExtent:function(a,b,c){var d=a.ymax-a.ymin,f=a.xmax-a.xmin;c>=b?a.ymax=a.ymin+f*b/c:a.xmax=a.xmin+d*c/b;return a},_getFormat:function(a){a=new Uint8Array(a,
0,10);var b="";255===a[0]&&216===a[1]?b="JPEG":137===a[0]&&80===a[1]&&78===a[2]&&71===a[3]?b="PNG":67===a[0]&&110===a[1]&&116===a[2]&&90===a[3]&&73===a[4]&&109===a[5]&&97===a[6]&&103===a[7]&&101===a[8]&&32===a[9]?b="LERC":-1<String.fromCharCode.apply(null,a).toLowerCase().indexOf("error")&&(b="ERROR");return b},_isDataValid:function(a){a=new Uint8Array(a,0,10);return-1<String.fromCharCode.apply(null,a).toLowerCase().indexOf("error")?!1:!0},_calculateBandStatistics:function(a){var b=Infinity,c=-Infinity,
d=a.length,f,e=0;for(f=0;f<d;f++)e=a[f],b=e<b?e:b,c=e>c?e:c;return{minValue:b,maxValue:c}},_verifyResult:function(a,b){return a&&a.height===b.height&&a.width===b.width?!0:!1},_getPixelTypeAndNoData:function(a){var b=a.noDataValue;a=a.pixelType;var c;"u1"===a||"u2"===a||"u4"===a||"u8"===a?(a="u8",b=Math.pow(2,8)-1,c=Uint8Array):"u16"===a?(b=b||Math.pow(2,16)-1,c=Uint16Array):"u32"===a?(b=b||Math.pow(2,32)-1,c=Uint32Array):"s8"===a?(b=b||0-Math.pow(2,7),c=Int8Array):"s16"===a?(b=b||0-Math.pow(2,15),
c=Int16Array):"s32"===a?(b=b||0-Math.pow(2,31),c=Int32Array):c=Float32Array;return{pixelType:a,pixelDataType:c,noDataValue:b}},_decodePixelBlock:function(a,b){if(!a||!b)throw Error("Cannot decode the pixelBlock. Invalid parameters provided for decoding.");if(!b.height||Math.floor(b.height)!==b.height)throw Error("Cannot decode the pixelBlock. Height is not provided.");if(!b.width||Math.floor(b.width)!==b.width)throw Error("Cannot decode the pixelBlock. Width is not provided.");var c=this._decodeLerc;
switch(b.format.toUpperCase()){case "JPEG":c=this._decodeJpeg;break;case "PNG":c=this._decodePng;break;case "BSQ":c=this._decodeBsq;break;case "BIP":c=this._decodeBip}c=c.bind(this);a=c(a,b);var c=a.statistics||[],d,f;if(0>=c.length)for(d=0;d<a.pixels.length;d++)f=a.pixels[d],c.push(this._calculateBandStatistics(f));return new w({width:b.width,height:b.height,pixels:a.pixels,pixelType:b.pixelType,mask:a.mask,statistics:c})},_decodeJpeg:function(a,b){if(!m)throw Error("The jpeg decoder module is not loaded.");
a=(new m).decode(a);if(!this._verifyResult(a,b))throw Error("Error in decoding the image. The decoded image dimensions are incorrect.");b.width=a.width;b.height=a.height;b.pixelType="U8";return a},_decodePng:function(a,b){if(!n)throw Error("The png decoder module is not loaded.");a=new Uint8Array(a);var c=new n(a);a=new Uint8Array(b.width*b.height*4);c.copyToImageData(a,c.decodePixels());for(var d=c=0,f,d=new Uint8Array(b.width*b.height),c=0;c<b.width*b.height;c++)d[c]=a[4*c+3];for(var e={pixels:[],
mask:d},c=0;3>c;c++){f=new Uint8Array(b.width*b.height);for(d=0;d<b.width*b.height;d++)f[d]=a[4*d+c];e.pixels.push(f)}b.pixelType="U8";return e},_decodeBsq:function(a,b){if(!g)throw Error("The bsq decoder module is not loaded.");var c=this._getPixelTypeAndNoData(b);return g.decodeBSQ(a,{bandCount:b.planes,width:b.width,height:b.height,pixelType:c.pixelDataType,noDataValue:c.noDataValue})},_decodeBip:function(a,b){if(!g)throw Error("The bsq decoder module is not loaded.");var c=this._getPixelTypeAndNoData(b);
return g.decodeBIP(a,{bandCount:b.planes,width:b.width,height:b.height,pixelType:c.pixelDataType,noDataValue:c.noDataValue})},_decodeLerc:function(a,b){var c=this._getPixelTypeAndNoData(b);b.pixelType=c.pixelType;for(var d=0,f,e=0,k=a.byteLength-10,g={pixels:[],statistics:[]};e<k;){var h=x.decode(a,{inputOffset:e,encodedMaskData:f,returnMask:0===d?!0:!1,returnEncodedMask:0===d?!0:!1,returnFileInfo:!0,pixelType:c.pixelDataType,noDataValue:c.noDataValue}),e=h.fileInfo.eofOffset;0===d&&(f=h.encodedMaskData,
g.mask=h.maskData);d++;if(!this._verifyResult(h,b))throw Error("Error in decoding the image. The decoded image dimensions are incorrect.");g.pixels.push(h.pixelData);g.statistics.push({minValue:h.minValue,maxValue:h.maxValue,noDataValue:h.noDataValue})}return g}})});