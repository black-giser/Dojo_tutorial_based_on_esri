// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../webgl/Texture","../../../webgl/enums"],function(v,p,q,w){function f(b){return b.charCodeAt(0)+(b.charCodeAt(1)<<8)+(b.charCodeAt(2)<<16)+(b.charCodeAt(3)<<24)}var r=f("DXT1"),t=f("DXT3"),u=f("DXT5");p.createDDSTexture=function(b,d,f,e){var a=new Int32Array(f,0,31);if(542327876!==a[0])return console.error("Invalid magic number in DDS header"),null;if(!(a[20]&4))return console.error("Unsupported format, must contain a FourCC code"),null;var c=a[21],k;switch(c){case r:c=
8;k=33776;break;case t:c=16;k=33778;break;case u:c=16;k=33779;break;default:return console.error("Unsupported FourCC code:",String.fromCharCode(c&255,c>>8&255,c>>16&255,c>>24&255)),null}var g=1;a[2]&131072&&!1!==e&&(g=Math.max(1,a[7]));e=a[4];var h=a[3],m=a[1]+4,n,l;d.samplingMode=1<g?9987:9729;d.hasMipmap=1<g;d.width=a[4];d.height=a[3];d=new q(b,d);b.bindTexture(d);for(a=0;;++a){a<g&&(l=Math.floor((e+3)/4)*Math.floor((h+3)/4)*c,n=new Uint8Array(f,m,l));b.gl.compressedTexImage2D(b.gl.TEXTURE_2D,a,
k,e,h,0,n);m+=l;if(1===e&&1===h||1===g)break;e=Math.max(1,e>>1);h=Math.max(1,h>>1)}return d}});