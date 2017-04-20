// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/views/3d/webgl-engine/materials/internal/TexOnlyGLMaterial.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\r\n\r\n\x3csnippets\x3e\r\n\r\n\x3csnippet name\x3d"vertexShaderTexOnly"\x3e\x3c![CDATA[\r\n\tuniform mat4 proj;\r\n\tuniform mat4 view;\r\n\tuniform mat4 model;\r\n\tattribute vec3 $position;\r\n\tattribute vec2 $uv0;\r\n\tvarying vec2 vtc;\r\n\r\n\tvoid main(void) {\r\n\t\tgl_Position \x3d proj * view * vec4((model * vec4(position, 1.0)).xyz, 1.0);\r\n\t\tvtc \x3d $uv0;\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fragmentShaderTexOnly"\x3e\x3c![CDATA[\r\n\tprecision mediump float;\r\n\r\n\tuniform sampler2D tex;\r\n\tuniform vec4 color;\r\n\tvarying vec2 vtc;\r\n\r\n\tvoid main() {\r\n\t\tvec4 texColor \x3d texture2D(tex, vtc);\r\n\t\tgl_FragColor \x3d texColor * color;\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3c/snippets\x3e'}});
define("require exports dojo/text!./TexOnlyGLMaterial.xml ./MaterialUtil ../../lib/RenderSlot ../../lib/gl-matrix ../../../../webgl/Program ../../../../webgl/enums ../../lib/DefaultVertexAttributeLocations".split(" "),function(n,p,d,c,f,g,h,q,k){var l=g.vec4d.createFrom(1,1,1,1);return function(){function b(a,b,m,e,d){this.id=c.__GLMaterial_id++;this.program=a.get("texOnly");this.color=m;this.depthFunc=d;this.blend=e;this.texGLName=b}b.prototype.getId=function(){return this.id};b.prototype.beginSlot=
function(a){return a===f.INTERNAL_MATERIAL};b.prototype.getProgram=function(){return this.program};b.prototype.setColor=function(a){this.color=a};b.prototype.bind=function(a,b){a.bindProgram(this.program);this.program.setUniformMatrix4fv("model",c.IDENTITY);this.program.setUniformMatrix4fv("proj",b.proj);this.program.setUniform4fv("color",void 0!==this.color?this.color:l);this.program.setUniform1i("tex",0);a.bindTexture(this.texGLName,0);this.blend&&(a.setBlendingEnabled(!0),a.setBlendFunctionSeparate(a.gl.SRC_ALPHA,
a.gl.ONE_MINUS_SRC_ALPHA,a.gl.ONE,a.gl.ONE_MINUS_SRC_ALPHA));a.setDepthTestEnabled(!0);void 0!==this.depthFunc&&a.setDepthFunction(this.depthFunc)};b.prototype.release=function(a){void 0!==this.depthFunc&&a.setDepthFunction(513);this.blend&&a.setBlendingEnabled(!1)};b.prototype.bindView=function(a,b){c.bindView(b.origin,b.view,this.program)};b.prototype.bindInstance=function(a,b){this.program.setUniformMatrix4fv("model",b.transformation)};b.prototype.getDrawMode=function(a){return a.gl.TRIANGLES};
b.loadShaders=function(a,b,c,e){a._parse(d);a=new h(e,a.vertexShaderTexOnly,a.fragmentShaderTexOnly,k.Default3D);c.add("texOnly",a)};return b}()});