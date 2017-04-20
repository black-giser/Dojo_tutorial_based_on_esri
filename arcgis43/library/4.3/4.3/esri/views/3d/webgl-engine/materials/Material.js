// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/views/3d/webgl-engine/materials/Material.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\r\n\r\n\x3csnippets\x3e\r\n\r\n\x3csnippet name\x3d"vsPhongSrc"\x3e\x3c![CDATA[\r\n\tuniform mat4 proj;\r\n\tuniform mat4 view;\r\n#ifdef INSTANCED\r\n    attribute mat4 model;\r\n    attribute mat4 modelNormal;\r\n#else\r\n\tuniform mat4 model;\r\n\tuniform mat4 modelNormal;\r\n#endif\r\n#ifdef INSTANCEDCOLOR\r\n\tattribute vec4 instanceColor;\r\n#endif\r\n\tattribute vec3 $position;\r\n\tattribute vec3 $normal;\r\n\tvarying vec3 vpos;\r\n\tvarying vec3 vnormal;\r\n\r\n#ifdef VERTEXCOLORS\r\n\tattribute vec4 $color;\r\n#endif\r\n\r\n#if defined(VV_SIZE) || defined(VV_COLOR) || defined(VV_ROTATION)\r\n\tattribute vec4 instanceFeatureAttribute;\r\n#endif\r\n\r\n$vvUniforms\r\n\r\n#if defined(VERTEXCOLORS)\r\n\tvarying vec4 vcolor;\r\n#endif\r\n\r\n#if defined(INSTANCEDCOLOR) || defined(VV_COLOR)\r\n\tuniform vec4 externalColor;\r\n\tvarying vec4 vcolorExt;\r\n#endif\r\n\r\n\t$vvFunctions\r\n\r\n\tvoid main(void) {\r\n#ifdef VV_CUSTOM_MODEL_MATRIX\r\n\t\tvpos \x3d (model * vvTransformPosition($position, instanceFeatureAttribute)).xyz;\r\n\t\tvnormal \x3d normalize((modelNormal * vvTransformNormal($normal, instanceFeatureAttribute)).xyz);\r\n#else\r\n\t\tvpos \x3d (model * vec4($position, 1.0)).xyz;\r\n\t\tvnormal \x3d normalize((modelNormal * vec4($normal, 1.0)).xyz);\r\n#endif\r\n\t\tgl_Position \x3d proj * view * vec4(vpos, 1.0);\r\n\r\n#ifdef VERTEXCOLORS\r\n\t\tvcolor \x3d $color * 0.003921568627451; // \x3d 1/255\r\n#endif\r\n\r\n#if defined(INSTANCEDCOLOR) || defined(VV_COLOR)\r\n\t\tvcolorExt \x3d externalColor;\r\n#endif\r\n#ifdef INSTANCEDCOLOR\r\n\t\tvcolorExt *\x3d instanceColor;\r\n#endif\r\n#ifdef VV_COLOR\r\n\t\tvcolorExt *\x3d vvGetColor(instanceFeatureAttribute, vvColorValues, vvColorColors);\r\n#endif\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsPhongSrc"\x3e\x3c![CDATA[\r\n\tuniform vec3 camPos;\r\n\tuniform vec4 lightAmbient;\r\n\tuniform vec4 lightDiffuse;\r\n\tuniform vec4 lightSpecular;\r\n\tuniform vec3 lightDirection;\r\n\tuniform vec3 ambient;\r\n\tuniform vec3 diffuse;\r\n\tuniform vec3 specular;\r\n\tuniform float shininess;\r\n\tuniform float opacity;\r\n\tuniform sampler2D depthTex;\r\n\tuniform int shadowMapNum;\r\n\tuniform vec4 shadowMapDistance;\r\n\tuniform mat4 shadowMapMatrix[4];\r\n\tuniform float depthHalfPixelSz;\r\n\tuniform sampler2D ssaoTex;\r\n\tuniform vec4 viewportPixelSz;\r\n\tuniform int externalColorMixMode;\r\n\tvarying vec3 vpos;\r\n\tvarying vec3 vnormal;\r\n#if defined(VERTEXCOLORS)\r\n\tvarying vec4 vcolor;\r\n#endif\r\n#if defined(INSTANCEDCOLOR) || defined(VV_COLOR)\r\n\tvarying vec4 vcolorExt;\r\n#else\r\n\tuniform vec4 externalColor;\r\n#endif\r\n\r\n#ifdef RECEIVE_SHADOWS\r\n\t$evalShadow\r\n#endif\r\n\r\n\t$externalColorMixMode\r\n\r\n\tvoid main() {\r\n\t\tvec3 a \x3d lightAmbient.rgb * lightAmbient.w;\r\n\r\n\t\tvec3 viewDir \x3d normalize(vpos - camPos);\r\n\r\n#ifndef DOUBLESIDED\r\n\t\tvec3 normal \x3d vnormal;\r\n#else\r\n\t\tvec3 normal \x3d dot(vnormal, viewDir)\x3e0.0?-vnormal:vnormal;\r\n#endif\r\n\r\n\t\tnormal \x3d normalize(normal);\r\n\t\tfloat shadow \x3d 0.0;\r\n#ifdef RECEIVE_SHADOWS\r\n\t\tshadow \x3d evalShadow(vpos, 1.0 / gl_FragCoord.w, depthTex, shadowMapNum, shadowMapDistance, shadowMapMatrix, depthHalfPixelSz);\r\n#endif\r\n\t\tvec3 d \x3d (1.0 - shadow) * lightDiffuse.rgb * lightDiffuse.w * clamp(dot(normal, lightDirection), .0, 1.0);\r\n\r\n\t\tvec3 reflDir \x3d normalize(reflect(viewDir, normal));\r\n\t\tfloat specDot \x3d max(dot(reflDir, lightDirection), .001);\r\n\t\tvec3 s \x3d (1.0 - shadow) * specular * lightSpecular.rgb * lightSpecular.w * pow(specDot, shininess);\r\n\r\n#ifdef RECEIVE_SSAO\r\n\t\tfloat ssao \x3d texture2D(ssaoTex, (gl_FragCoord.xy - viewportPixelSz.xy) * viewportPixelSz.zw).a;\r\n\t\tssao \x3d viewportPixelSz.z \x3c 0.0 ? 1.0 : ssao;\r\n#else\r\n\t\tfloat ssao \x3d 1.0;\r\n#endif\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"externalColorMixTexture"\x3e\x3c![CDATA[\r\n#if defined(VERTEXCOLORS) \x26\x26 (defined(INSTANCEDCOLOR) || defined(VV_COLOR))\r\n\t\t// Internal colors: varying vcolor + uniform ambient/diffuse, external colors: varying vcolorExt\r\n\t\ta \x3d a * mixExternalColor(vcolor.rgb * ambient, texColor.rgb, vcolorExt.rgb, externalColorMixMode);\r\n\t\td \x3d d * mixExternalColor(vcolor.rgb * diffuse, texColor.rgb, vcolorExt.rgb, externalColorMixMode);\r\n\t\tfloat opacity_ \x3d mixExternalOpacity(vcolor.a * opacity, texColor.a, vcolorExt.a, externalColorMixMode);\r\n#elif defined(VERTEXCOLORS)\r\n\t\t// Internal colors: varying vcolor + uniform ambient/diffuse, external colors: uniform externalColor\r\n\t\ta \x3d a * mixExternalColor(vcolor.rgb * ambient, texColor.rgb, externalColor.rgb, externalColorMixMode);\r\n\t\td \x3d d * mixExternalColor(vcolor.rgb * diffuse, texColor.rgb, externalColor.rgb, externalColorMixMode);\r\n\t\tfloat opacity_ \x3d mixExternalOpacity(vcolor.a * opacity, texColor.a, externalColor.a, externalColorMixMode);\r\n#elif defined(INSTANCEDCOLOR) || defined(VV_COLOR)\r\n\t\t// Internal colors: uniform ambient/diffuse, external colors: varying vcolorExt\r\n\t\ta \x3d a * mixExternalColor(ambient, texColor.rgb, vcolorExt.rgb, externalColorMixMode);\r\n\t\td \x3d d * mixExternalColor(diffuse, texColor.rgb, vcolorExt.rgb, externalColorMixMode);\r\n\t\tfloat opacity_ \x3d mixExternalOpacity(opacity, texColor.a, vcolorExt.a, externalColorMixMode);\r\n#else\r\n\t\t// Internal colors: uniform ambient/diffuse, external colors: uniform externalColor\r\n\t\ta \x3d a * mixExternalColor(ambient, texColor.rgb, externalColor.rgb, externalColorMixMode);\r\n\t\td \x3d d * mixExternalColor(diffuse, texColor.rgb, externalColor.rgb, externalColorMixMode);\r\n\t\tfloat opacity_ \x3d mixExternalOpacity(opacity, texColor.a, externalColor.a, externalColorMixMode);\r\n#endif\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"externalColorMix"\x3e\x3c![CDATA[\r\n\tvec4 texColor \x3d vec4(1,1,1,1);\r\n\t$externalColorMixTexture\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"vsPhong"\x3e\x3c![CDATA[\r\n\t$vsPhongSrc\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsPhong"\x3e\x3c![CDATA[\r\n\tprecision mediump float;\r\n\r\n\t$fsPhongSrc\r\n\t$externalColorMix\r\n\t\tgl_FragColor \x3d vec4(ssao * (a + d) + s, opacity_);\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"vsPhongTextured"\x3e\x3c![CDATA[\r\n\tattribute vec2 $uv0;\r\n\tvarying vec2 vtc;\r\n\t$vsPhongSrc\r\n#ifndef FLIPV\r\n\t\tvtc \x3d $uv0;\r\n#else\r\n\t\tvtc \x3d vec2($uv0.x, 1.0-$uv0.y);\r\n#endif\r\n\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsPhongTextured"\x3e\x3c![CDATA[\r\n\tprecision mediump float;\r\n\r\n\tuniform sampler2D tex;\r\n\tvarying vec2 vtc;\r\n\t$fsPhongSrc\r\n\t\tvec4 texColor \x3d texture2D(tex, vtc);\r\n\t\tif (texColor.a \x3c .33) discard;\r\n\t\t$externalColorMixTexture\r\n\t\tgl_FragColor \x3d vec4(ssao * (a + d) + s, opacity_);\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"vsPhongAtlasTextured"\x3e\x3c![CDATA[\r\n\tattribute vec4 $uv0;\r\n\tattribute vec4 $region;\r\n\tvarying vec2 vtc;\r\n\tvarying vec4 regionV;\r\n\t$vsPhongSrc\r\n#ifndef FLIPV\r\n\t\tvtc \x3d $uv0.xy;\r\n#else\r\n\t\tvtc \x3d vec2($uv0.x, 1.0-$uv0.y);\r\n#endif\r\n\t\tregionV \x3d $region/65535.0;\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsPhongAtlasTextured"\x3e\x3c![CDATA[\r\n\tprecision mediump float;\r\n\r\n\tuniform sampler2D tex;\r\n\tuniform vec2 texSize;\r\n\tvarying vec2 vtc;\r\n\tvarying vec4 regionV;\r\n\r\n\t float calcMipMapLevel(const vec2 ddx, const vec2 ddy) {\r\n\t\t// from:\r\n\t\t//   - OpenGLES Common Profile Specification Version 2.0.25, Section 3.7.7 - Texture Minification\r\n\t\t//   - https://www.opengl.org/discussion_boards/showthread.php/171485-Texture-LOD-calculation-(useful-for-atlasing)\r\n\t\t//   - http://www.linedef.com/virtual-texture-demo.html\r\n\t\tfloat deltaMaxSqr \x3d max(dot(ddx, ddx), dot(ddy, ddy));\r\n\t\treturn max(0.5 * log2(deltaMaxSqr), 0.0);\r\n\t}\r\n\r\n\t$fsPhongSrc\r\n\t\tvec2 uv \x3d vtc;\r\n\t\tuv \x3d fract(uv);\r\n\t\t//[umin, vmin, umax, vmax]\r\n\r\n\t\tvec2 atlasScale \x3d regionV.zw - regionV.xy;\r\n\t\tuv \x3d uv.xy * atlasScale + regionV.xy;\r\n\r\n\t\tvec4 texColor;\r\n\t\t#ifdef GL_OES_standard_derivatives\r\n\t\t\t#extension GL_OES_standard_derivatives : enable\r\n\r\n\t\t\t// calculate derivative of continuous texture coordinate\r\n\t\t\t// to avoid mipmapping artifacts caused by manual wrapping in shader\r\n\t\t\tvec2 dUVdx \x3d dFdx(vtc) * atlasScale;\r\n\t\t\tvec2 dUVdy \x3d dFdy(vtc) * atlasScale;\r\n\r\n\t\t\t#ifdef GL_EXT_shader_texture_lod\r\n\t\t\t\t#extension GL_EXT_shader_texture_lod : enable\r\n\r\n\t\t\t\t// workaround for artifacts in Windows 10 using Intel HD Graphics 4000 series\r\n\t\t\t\t// see: https://devtopia.esri.com/Zurich-R-D-Center/arcgis-js-api-canvas3d-issues/issues/768\r\n\t\t\t\tconst float epsilon \x3d 1.0E-32;\r\n\t\t\t\tfloat zeroUVShift \x3d uv.x \x3d\x3d 0.0 \x26\x26 uv.y \x3d\x3d 0.0 ? epsilon : 0.0;\r\n\r\n\t\t\t\ttexColor \x3d texture2DGradEXT(tex, uv + zeroUVShift, dUVdx, dUVdy);\r\n\t\t\t#else\r\n\t\t\t\t// use bias to compensate for difference in automatic vs desired mipmap level\r\n\t\t\t\tvec2 dUVdxAuto \x3d dFdx(uv);\r\n\t\t\t\tvec2 dUVdyAuto \x3d dFdy(uv);\r\n\t\t\t\tfloat mipMapLevel \x3d calcMipMapLevel(dUVdx * texSize, dUVdy * texSize);\r\n\t\t\t\tfloat autoMipMapLevel \x3d calcMipMapLevel(dUVdxAuto * texSize, dUVdyAuto * texSize);\r\n\t\t\t\ttexColor \x3d texture2D(tex, uv, mipMapLevel - autoMipMapLevel);\r\n\t\t\t#endif\r\n\t\t#else\r\n\t\t\ttexColor \x3d texture2D(tex, uv);\r\n\t\t#endif\r\n\r\n\t\tif (texColor.a \x3c .33) discard;\r\n\t\t$externalColorMixTexture\r\n\t\tgl_FragColor \x3d vec4(ssao * (a + d) + s, opacity_);\r\n\t\t//gl_FragColor \x3d regionV;\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsPhongTexturedRefl"\x3e\x3c![CDATA[\r\n\tprecision mediump float;\r\n\r\n\tuniform sampler2D tex;\r\n\tuniform sampler2D reflTex;\r\n\tuniform float reflectivity;\r\n\tvarying vec2 vtc;\r\n\r\n\t$normal2envTC\r\n\r\n\t$fsPhongSrc\r\n\t\tvec4 texColor \x3d texture2D(tex, vtc);\r\n\t\tif (texColor.a \x3c .33) discard;\r\n\t\tvec4 reflColor \x3d texture2D(reflTex, normal2envTC(reflDir));\r\n\t\t$externalColorMixTexture\r\n\t\tgl_FragColor \x3d vec4(ssao * mix(a + d, reflColor.rgb * lightAmbient.rgb * lightSpecular.w, reflectivity) + s, opacity_);\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"vsDepthSrc"\x3e\x3c![CDATA[\r\n\tuniform mat4 proj;\r\n\tuniform mat4 view;\r\n#ifdef INSTANCED\r\n\tattribute mat4 model;\r\n#else\r\n\tuniform mat4 model;\r\n#endif\r\n\tuniform vec2 nearFar;\r\n\tattribute vec3 $position;\r\n\tvarying float depth;\r\n\r\n\t$vvUniforms\r\n#if defined(VV_CUSTOM_MODEL_MATRIX)\r\n\tattribute vec4 instanceFeatureAttribute;\r\n#endif\r\n\t$vvFunctions\r\n\r\n\tvoid main(void) {\r\n#ifdef VV_CUSTOM_MODEL_MATRIX\r\n\t\tvec4 eye \x3d view * model * vvTransformPosition($position, instanceFeatureAttribute);\r\n#else\r\n\t\tvec4 eye \x3d view * model * vec4($position, 1.0);\r\n#endif\r\n\t\tgl_Position \x3d proj * eye;\r\n\t\tdepth \x3d (-eye.z - nearFar[0]) / (nearFar[1] - nearFar[0]) ;\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"vsDepth"\x3e\x3c![CDATA[\r\n\t$vsDepthSrc\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"vsDepthTextured"\x3e\x3c![CDATA[\r\n\tattribute vec2 $uv0;\r\n\tvarying vec2 vtc;\r\n\t$vsDepthSrc\r\n#ifndef FLIPV\r\n        vtc \x3d $uv0;\r\n#else\r\n        vtc \x3d vec2($uv0.x, 1.0-$uv0.y);\r\n#endif\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"vsNormalSrc"\x3e\x3c![CDATA[\r\n\tuniform mat4 proj;\r\n\tuniform mat4 view;\r\n#ifdef INSTANCED\r\n\tattribute mat4 model;\r\n\tattribute mat4 modelNormal;\r\n#else\r\n\tuniform mat4 model;\r\n\tuniform mat4 modelNormal;\r\n#endif\r\n\tuniform mat4 viewNormal;\r\n\tattribute vec3 $position;\r\n\tattribute vec3 $normal;\r\n\tvarying vec3 vnormal;\r\n\r\n\t$vvUniforms\r\n#if defined(VV_CUSTOM_MODEL_MATRIX)\r\n\tattribute vec4 instanceFeatureAttribute;\r\n#endif\r\n\t$vvFunctions\r\n\r\n\tvoid main(void) {\r\n#ifdef VV_CUSTOM_MODEL_MATRIX\r\n\t\tgl_Position \x3d proj * view * model * vvTransformPosition($position, instanceFeatureAttribute);\r\n\t\tvnormal \x3d normalize((viewNormal * modelNormal * vvTransformNormal($normal, instanceFeatureAttribute)).xyz);\r\n#else\r\n\t\tgl_Position \x3d proj * view * model * vec4($position, 1.0);\r\n\t\tvnormal \x3d normalize((viewNormal * modelNormal * vec4($normal, 1.0)).xyz);\r\n#endif\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"vsNormal"\x3e\x3c![CDATA[\r\n\t$vsNormalSrc\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"vsNormalTextured"\x3e\x3c![CDATA[\r\n\tattribute vec2 $uv0;\r\n\tvarying vec2 vtc;\r\n\t$vsNormalSrc\r\n#ifndef FLIPV\r\n\t\tvtc \x3d $uv0;\r\n#else\r\n\t\tvtc \x3d vec2($uv0.x, 1.0-$uv0.y);\r\n#endif\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"vsHighlightSrc"\x3e\x3c![CDATA[\r\n\tuniform mat4 proj;\r\n\tuniform mat4 view;\r\n#ifdef INSTANCED\r\n\tattribute mat4 model;\r\n#else\r\n\tuniform mat4 model;\r\n#endif\r\n\tattribute vec3 $position;\r\n\r\n\t$vvUniforms\r\n#if defined(VV_CUSTOM_MODEL_MATRIX)\r\n\tattribute vec4 instanceFeatureAttribute;\r\n#endif\r\n\t$vvFunctions\r\n\r\n\tvoid main(void) {\r\n#ifdef VV_CUSTOM_MODEL_MATRIX\r\n\t\tgl_Position \x3d proj * view * model * vvTransformPosition($position, instanceFeatureAttribute);\r\n#else\r\n\t\tgl_Position \x3d proj * view * model * vec4($position, 1.0);\r\n#endif\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"vsHighlight"\x3e\x3c![CDATA[\r\n\t$vsHighlightSrc\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"vsHighlightTextured"\x3e\x3c![CDATA[\r\n\tattribute vec2 $uv0;\r\n\tvarying vec2 vtc;\r\n\t$vsHighlightSrc\r\n#ifndef FLIPV\r\n\t\tvtc \x3d $uv0;\r\n#else\r\n\t\tvtc \x3d vec2($uv0.x, 1.0-$uv0.y);\r\n#endif\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsDepthSrc"\x3e\x3c![CDATA[\r\n\tvarying float depth;\r\n\r\n\tvoid main() {\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsDepth"\x3e\x3c![CDATA[\r\n\tprecision mediump float;\r\n\t$calcFragDepth\r\n\t$float2rgba\r\n\t$fsDepthSrc\r\n#ifndef BIAS_SHADOWMAP\r\n\t\tgl_FragColor \x3d float2rgba(depth);\r\n#else\r\n\t\tgl_FragColor \x3d float2rgba(calcFragDepth(depth));\r\n#endif\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsDepthTextured"\x3e\x3c![CDATA[\r\n\tprecision mediump float;\r\n\r\n\tuniform sampler2D tex;\r\n\tvarying vec2 vtc;\r\n\t$calcFragDepth\r\n\t$float2rgba\r\n\r\n\t$fsDepthSrc\r\n\t\tif (texture2D(tex, vtc).a \x3c .33) discard;\r\n#ifndef BIAS_SHADOWMAP\r\n\t\tgl_FragColor \x3d float2rgba(depth);\r\n#else\r\n\t\tgl_FragColor \x3d float2rgba(calcFragDepth(depth));\r\n#endif\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsNormal"\x3e\x3c![CDATA[\r\n\tprecision mediump float;\r\n\r\n\tvarying vec3 vnormal;\r\n\tvoid main() {\r\n\t\tvec3 normal \x3d normalize(vnormal);\r\n\t\tif (gl_FrontFacing \x3d\x3d false) normal \x3d -normal;\r\n\r\n#ifndef ALPHA_ZERO\r\n\t\tgl_FragColor \x3d vec4(vec3(.5) + .5 * normal, 1.0);\r\n#else\r\n\t\tgl_FragColor \x3d vec4(vec3(.5) + .5 * normal, 0.0);\r\n#endif\r\n\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsNormalTextured"\x3e\x3c![CDATA[\r\n\tprecision mediump float;\r\n\r\n\tvarying vec3 vnormal;\r\n\tvarying vec2 vtc;\r\n\tuniform sampler2D tex;\r\n\tvoid main() {\r\n\t\tif (texture2D(tex, vtc).a \x3c .33) discard;\r\n\t\tvec3 normal \x3d normalize(vnormal);\r\n\t\tif (gl_FrontFacing \x3d\x3d false) normal \x3d -normal;\r\n#ifndef ALPHA_ZERO\r\n\t\tgl_FragColor \x3d vec4(vec3(.5) + .5 * normal, 1.0);\r\n#else\r\n\t\tgl_FragColor \x3d vec4(vec3(.5) + .5 * normal, 0.0);\r\n#endif\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsHighlight"\x3e\x3c![CDATA[\r\n\tprecision mediump float;\r\n\r\n\tvoid main() {\r\n\t\tgl_FragColor \x3d vec4(1.0, 1.0, 1.0, 1.0);\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsHighlightTextured"\x3e\x3c![CDATA[\r\n\tprecision mediump float;\r\n\tvarying vec2 vtc;\r\n\tuniform sampler2D tex;\r\n\tvoid main() {\r\n\t\tif (texture2D(tex, vtc).a \x3c .33) discard;\r\n    gl_FragColor \x3d vec4(1.0, 1.0, 1.0, 1.0);\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3c/snippets\x3e\r\n'}});
define("dojo/_base/lang dojo/text!./Material.xml ./internal/MaterialUtil ../../../webgl/Program ../lib/ShaderVariations ../lib/Util ../lib/gl-matrix ../lib/RenderSlot ../lib/DefaultVertexAttributeLocations ../lib/DefaultVertexBufferLayouts ../../../webgl/Util ../../support/mathUtils".split(" "),function(v,K,h,k,w,t,G,x,m,L,n,H){function y(a,c){var e=c.vvSizeEnabled||c.vvRotationEnabled;c.vvSizeEnabled?(a.setUniform3fv("vvSizeMinSize",c.vvSizeMinSize),a.setUniform3fv("vvSizeMaxSize",c.vvSizeMaxSize),
a.setUniform3fv("vvSizeOffset",c.vvSizeOffset),a.setUniform3fv("vvSizeFactor",c.vvSizeFactor)):e&&a.setUniform3fv("vvSizeValue",c.vvSizeValue);e&&(a.setUniform3fv("vvAnchorValue",c.vvAnchorValue),c.vvRotationEnabled?a.setUniform1f("vvRotationValue",H.deg2rad(c.vvRotationValue)):a.setUniformMatrix4fv("vvRotationValue",M(c.vvRotationValue,N)));c.vvColorEnabled&&(a.setUniform1fv("vvColorValues",c.vvColorValues),a.setUniform4fv("vvColorColors",c.vvColorColors))}function z(a,c){a.vvSizeEnabled=c.vvSizeEnabled;
a.vvSizeMinSize=c.vvSizeMinSize;a.vvSizeMaxSize=c.vvSizeMaxSize;a.vvSizeOffset=c.vvSizeOffset;a.vvSizeFactor=c.vvSizeFactor;a.vvSizeValue=c.vvSizeValue;a.vvRotationValue=c.vvRotationValue;a.vvAnchorValue=c.vvAnchorValue}function M(a,c){E.identity(c);E.rotateZ(c,-H.deg2rad(a));return c}var I=t.assert,F=G.vec3,E=G.mat4,u,A=F.create(),N=E.create();t=function(a,c){h.basicMaterialConstructor(this,c);a=a||{};a.ambient=a.ambient||[.2,.2,.2];a.diffuse=a.diffuse||[.8,.8,.8];a.specular=a.specular||[0,0,0];
a.externalColor=a.externalColor||[1,1,1,1];a.externalColorMixMode=a.externalColorMixMode||h.externalColorMixModes.multiply;a.shininess=a.shininess||10;a.opacity=void 0!==a.opacity?a.opacity:1;a.blendModeOneOne=a.blendModeOneOne||!1;a.inverseWindingOrder=a.inverseWindingOrder||!1;a.vertexColors=a.vertexColors||!1;a.flipV=a.flipV||!1;a.doubleSided=a.doubleSided||!1;a.cullFace=a.cullFace||void 0;a.instanced=a.instanced||!1;this.instanced=!!a.instanced;a.writeStencil=a.writeStencil||!1;a.textureId||(a.reflTextureId=
void 0);a.receiveSSAO=void 0!==a.receiveSSAO?a.receiveSSAO:!0;a.vvSizeEnabled=a.vvSizeEnabled||!1;a.vvSizeMinSize=a.vvSizeMinSize||[1,1,1];a.vvSizeMaxSize=a.vvSizeMaxSize||[100,100,100];a.vvSizeOffset=a.vvSizeOffset||[0,0,0];a.vvSizeFactor=a.vvSizeFactor||[1,1,1];a.vvSizeValue=a.vvSizeValue||[1,1,1];a.vvAnchorValue=a.vvAnchorValue||[0,0,0];a.vvRotationEnabled=a.vvRotationEnabled||!1;a.vvRotationValue=a.vvRotationValue||0;a.vvColorEnabled=a.vvColorEnabled||!1;a.vvColorValues=a.vvColorValues||[0,0,
0,0,0,0,0,0];a.vvColorColors=a.vvColorColors||[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0];c=a.textureId?a.atlasRegions?"Pos3NormTexRegion":"Pos3NormTex":"Pos3Norm";a.vertexColors&&(c+="Col");var e=L[c],b=null;a.instanced&&(b=[],n.addDescriptor(b,"model",16,5126,!1,1),n.addDescriptor(b,"modelNormal",16,5126,!1,1),-1<a.instanced.indexOf("color")&&n.addDescriptor(b,"instanceColor",4,5126,!1,1),-1<a.instanced.indexOf("featureAttribute")&&n.addDescriptor(b,"instanceFeatureAttribute",
4,5126,!1,1));var d=this.isVisible.bind(this);this.isVisible=function(){return d()&&0<a.opacity};this.dispose=function(){};this.getParams=function(){return a};this.getParameterValues=function(){var b={ambient:a.ambient,diffuse:a.diffuse,specular:a.specular,externalColor:a.externalColor,externalColorMixMode:a.externalColorMixMode,shininess:a.shininess,opacity:a.opacity,transparent:a.transparent,polygonOffset:a.polygonOffset,reflectivity:a.reflectivity,atlasRegions:a.atlasRegions,flipV:a.flipV,doubleSided:a.doubleSided,
cullFace:a.cullFace,writeStencil:a.writeStencil,receiveSSAO:a.receiveSSAO,vvSizeEnabled:a.vvSizeEnabled,vvSizeMinSize:a.vvSizeMinSize,vvSizeMaxSize:a.vvSizeMaxSize,vvSizeOffset:a.vvSizeOffset,vvSizeFactor:a.vvSizeFactor,vvSizeValue:a.vvSizeValue,vvRotationEnabled:a.vvRotationEnabled,vvRotationValue:a.vvRotationValue,vvAnchorValue:a.vvAnchorValue,vvColorEnabled:a.vvColorEnabled,vvColorValues:a.vvColorValues,vvColorColors:a.vvColorColors};a.textureId&&(b.textureId=a.textureId,b.initTexture=a.initTexture);
return b};this.setParameterValues=function(b){for(var d in b)"textureId"===d&&I(a.textureId,"Can only change texture of material that already has a texture"),a[d]=b[d];this.notifyDirty("matChanged")};this.getOutputAmount=function(a){var b=n.getStride(e)/4;return a*b};this.getVertexBufferLayout=function(){return e};this.getInstanceBufferLayout=function(){return b};this.fillInterleaved=function(a,b,d,c,p,f,k){h.fillInterleaved(a,b,d,c,e,p,f,k)};this.intersect=h.intersectTriangleGeometry;this.getGLMaterials=
function(){return{color:O,depthShadowMap:P,normal:Q,depth:J,highlight:R}};this.getAllTextureIds=function(){var b=[];a.textureId&&b.push(a.textureId);a.reflTextureId&&b.push(a.reflTextureId);return b}};t.paramsFromOldConstructor=function(a,c,e,b,d,g,h,r,q,p,f,k,m){return{textureId:a,transparent:c,ambient:e,diffuse:b,specular:d,shininess:g,opacity:h,polygonOffset:r,initTexture:q,reflTextureId:p,reflectivity:f,flipV:k,doubleSided:m,cullFace:void 0}};var B=function(a,c){var e=a.gl;(c.cullFace?"none"===
c.cullFace:c.transparent)?a.setFaceCullingEnabled(!1):(a.setFaceCullingEnabled(!0),"front"===c.cullFace&&a.setCullFace(e.FRONT))},C=function(a,c){var e=a.gl;(c.cullFace?"none"===c.cullFace:c.transparent)?a.setFaceCullingEnabled(!0):(a.setFaceCullingEnabled(!1),"front"===c.cullFace&&a.setCullFace(e.BACK))},D=function(a,c){return a?x.TRANSPARENT_MATERIAL:c?x.STENCIL_MATERIAL:x.OPAQUE_MATERIAL},O=function(a,c,e){h.basicGLMaterialConstructor(this,a);var b=v.clone(a.getParams()),d=D(b.transparent,b.writeStencil);
h.singleTextureGLMaterialConstructor(this,e,b);var g=h.aquireIfNotUndefined(b.reflTextureId,b.reflInitTexture,e);g&&(g=g.getGLTexture());I(!(b.atlasRegions&&b.reflTextureId),"Atlas texture with reflection is not yet supported");var l=b.textureId?b.atlasRegions?"AtlasTextured":"Textured":"none";this.instanced=u&&b.instanced;var r=!!this.instanced&&-1<this.instanced.indexOf("color");this._loadProgram=function(a,d){return c.shaderVariators.Material.getProgram([l,!!b.reflTextureId,b.vertexColors,b.flipV,
b.doubleSided,!!this.instanced,r,a,d,!!b.vvSizeEnabled,!!b.vvColorEnabled,!!b.vvRotationEnabled])};var q=this._loadProgram(!1,b.receiveSSAO),p=this._loadProgram(!0,b.receiveSSAO),f=null,k="AtlasTextured"===l,m=this.dispose;this.dispose=function(){m();h.releaseIfNotUndefined(b.reflTextureId,e)};this.beginSlot=function(a){return d===a};this.getProgram=function(){return f||q};this.getAllPrograms=function(){return[p,q]};this.updateParameters=function(){var c=a.getParams();b.ambient=c.ambient;b.diffuse=
c.diffuse;b.specular=c.specular;b.externalColor=c.externalColor;b.externalColorMixMode=c.externalColorMixMode;b.shininess=c.shininess;b.opacity=c.opacity;b.polygonOffset=c.polygonOffset;b.reflectivity=c.reflectivity;b.flipV=c.flipV;b.doubleSided=c.doubleSided;b.cullFace=c.cullFace;b.receiveSSAO=c.receiveSSAO;z(b,c);b.vvColorEnabled=c.vvColorEnabled;b.vvColorValues=c.vvColorValues;b.vvColorColors=c.vvColorColors;b.transparent!=c.transparent&&(d=D(c.transparent),b.transparent=c.transparent);b.initTexture=
c.initTexture;this.updateTexture(c.textureId);c.atlasRegions&&(b.atlasRegions=c.atlasRegions);b.blendModeOneOne=c.blendModeOneOne;b.inverseWindingOrder=c.inverseWindingOrder;q=this._loadProgram(!1,b.receiveSSAO);p=this._loadProgram(!0,b.receiveSSAO)};this.bind=function(a,c){var d=a.gl;f=c.shadowMap&&c.shadowMap.getEnableState()?p:q;a.bindProgram(f);f.setUniform3fv("ambient",b.ambient);f.setUniform3fv("diffuse",b.diffuse);f.setUniform3fv("specular",b.specular);f.setUniform4fv("externalColor",b.externalColor);
f.setUniform1i("externalColorMixMode",b.externalColorMixMode);f.setUniform1f("shininess",b.shininess);f.setUniform1f("opacity",b.opacity);c.shadowMap||f.setUniform1f("depthHalfPixelSz",-1);y(f,b);this.bindTexture(a,f);k&&this.bindTextureSize(a,f);a.setBlendFunctionSeparate(d.SRC_ALPHA,d.ONE_MINUS_SRC_ALPHA,d.ONE,d.ONE_MINUS_SRC_ALPHA);void 0!==g&&(f.setUniform1i("reflTex",1),a.bindTexture(g,1),f.setUniform1f("reflectivity",b.reflectivity));b.inverseWindingOrder&&a.setFrontFace(d.CW);b.transparent?
(a.setBlendingEnabled(!0),b.blendModeOneOne?(a.setBlendFunction(d.ONE,d.ONE),a.setDepthWriteEnabled(!1)):a.setBlendFunctionSeparate(d.SRC_ALPHA,d.ONE_MINUS_SRC_ALPHA,d.ONE,d.ONE_MINUS_SRC_ALPHA)):a.setBlendingEnabled(!1);b.polygonOffset&&(a.setPolygonOffsetFillEnabled(!0),a.setPolygonOffset(2,2));B(a,b);a.setDepthTestEnabled(!0)};this.release=function(a,c){c=a.gl;a.setPolygonOffsetFillEnabled(!1);C(a,b);a.setBlendingEnabled(!1);a.setBlendFunctionSeparate(c.SRC_ALPHA,c.ONE_MINUS_SRC_ALPHA,c.ONE,c.ONE_MINUS_SRC_ALPHA);
a.setDepthWriteEnabled(!0);a.setFrontFace(c.CCW)};this.bindView=function(a,b){f=b.shadowMap&&b.shadowMap.getEnableState()?p:q;a=b.origin;h.bindView(a,b.view,f);h.bindCamPos(a,b.viewInvTransp,f);b.shadowMap&&b.shadowMap.bindView(f,a)};this.bindInstance=function(a,c){f.setUniformMatrix4fv("model",c.transformation);f.setUniformMatrix4fv("modelNormal",c.transformationNormal);r&&c.instanceParameters&&(a=c.instanceParameters.color)&&(F.multiply(b.ambient,a,A),f.setUniform3fv("ambient",A),F.multiply(b.diffuse,
a,A),f.setUniform3fv("diffuse",A),f.setUniform1f("opacity",b.opacity*a[3]))};this.getDrawMode=function(a){return a.gl.TRIANGLES}},J=function(a,c,e,b){h.basicGLMaterialConstructor(this,a);var d=v.clone(a.getParams());this.instanced=u&&d.instanced;var g=n.hasAttribute(a.getVertexBufferLayout(),"uv0")?"Textured":"none",l=c.shaderVariators.MaterialDepth.getProgram([g,d.flipV,!!this.instanced,!!b,!!d.vvSizeEnabled,!!d.vvRotationEnabled]),r=D(d.transparent,d.writeStencil);h.singleTextureGLMaterialConstructor(this,
e,d);this.beginSlot=function(a){return r===a};this.getProgram=function(){return l};this.updateParameters=function(){var b=a.getParams();d.initTexture=b.initTexture;d.cullFace=b.cullFace;d.inverseWindingOrder=b.inverseWindingOrder;d.flipV=b.flipV;z(d,b);this.updateTexture(b.textureId)};this.bind=function(a,b){var c=a.gl;a.bindProgram(l);l.setUniform2fv("nearFar",b.nearFar);d.inverseWindingOrder&&a.setFrontFace(c.CW);y(l,d);this.bindTexture(a,l);B(a,d);a.setDepthTestEnabled(!0)};this.release=function(a){var b=
a.gl;C(a,d);d.inverseWindingOrder&&a.setFrontFace(b.CCW)};this.bindView=function(a,b){h.bindView(b.origin,b.view,l)};this.bindInstance=function(a,b){l.setUniformMatrix4fv("model",b.transformation)};this.getDrawMode=function(a){return a.gl.TRIANGLES}},P=function(a,c,e){J.call(this,a,c,e,!0)},Q=function(a,c,e){h.basicGLMaterialConstructor(this,a);var b=v.clone(a.getParams()),d=n.hasAttribute(a.getVertexBufferLayout(),"uv0")?"Textured":"none";this.instanced=u&&b.instanced;var g=c.shaderVariators.MaterialNormal.getProgram([d,
b.flipV,!!this.instanced,!!b.vvSizeEnabled,!!b.vvRotationEnabled]),l=D(b.transparent,b.writeStencil);h.singleTextureGLMaterialConstructor(this,e,b);this.beginSlot=function(a){return l===a};this.getProgram=function(){return g};this.updateParameters=function(){var c=a.getParams();b.initTexture=c.initTexture;b.cullFace=c.cullFace;b.inverseWindingOrder=c.inverseWindingOrder;b.flipV=c.flipV;z(b,c);this.updateTexture(c.textureId)};this.bind=function(a,c){var d=a.gl;a.bindProgram(g);this.bindTexture(a,g);
g.setUniformMatrix4fv("viewNormal",c.viewInvTransp);y(g,b);B(a,b);b.inverseWindingOrder&&a.setFrontFace(d.CW);a.setDepthTestEnabled(!0)};this.release=function(a){var c=a.gl;C(a,b);b.inverseWindingOrder&&a.setFrontFace(c.CCW)};this.bindView=function(a,b){h.bindView(b.origin,b.view,g)};this.bindInstance=function(a,b){g.setUniformMatrix4fv("model",b.transformation);g.setUniformMatrix4fv("modelNormal",b.transformationNormal)};this.getDrawMode=function(a){return a.gl.TRIANGLES}},R=function(a,c,e,b){h.basicGLMaterialConstructor(this,
a);var d=v.clone(a.getParams());b=n.hasAttribute(a.getVertexBufferLayout(),"uv0")?"Textured":"none";this.instanced=u&&d.instanced;var g=c.shaderVariators.MaterialHighlight.getProgram([b,d.flipV,!!this.instanced,!!d.vvSizeEnabled,!!d.vvRotationEnabled]),l=x.OPAQUE_MATERIAL;h.singleTextureGLMaterialConstructor(this,e,d);this.beginSlot=function(a){return l===a};this.getProgram=function(){return g};this.updateParameters=function(){var b=a.getParams();d.initTexture=b.initTexture;d.cullFace=b.cullFace;
d.inverseWindingOrder=b.inverseWindingOrder;d.flipV=b.flipV;z(d,b);this.updateTexture(b.textureId)};this.bind=function(a,b){b=a.gl;a.bindProgram(g);this.bindTexture(a,g);y(g,d);B(a,d);d.inverseWindingOrder&&a.setFrontFace(b.CW);a.setDepthTestEnabled(!0)};this.release=function(a){var b=a.gl;C(a,d);d.inverseWindingOrder&&a.setFrontFace(b.CW)};this.bindView=function(a,b){h.bindView(b.origin,b.view,g)};this.bindInstance=function(a,b){g.setUniformMatrix4fv("model",b.transformation);g.setUniformMatrix4fv("modelNormal",
b.transformationNormal)};this.getDrawMode=function(a){return a.gl.TRIANGLES}};t.loadShaders=function(a,c,e,b){a._parse(K);u=b.extensions.angleInstancedArrays;b.extensions.shaderTextureLOD;b.extensions.standardDerivatives;var d=new w("phong",["vsPhong","fsPhong"],null,e,c,a,b);d.addNaryShaderSnippetSuffix([{value:"none",programNameSuffix:"",shaderSnippetSuffix:""},{value:"Textured"},{value:"AtlasTextured"}]);d.addBinaryShaderSnippetSuffix("Refl","Refl",[!1,!0]);d.addDefine("Color","VERTEXCOLORS");
d.addDefine("FlipV","FLIPV");d.addDefine("DoubleSided","DOUBLESIDED");d.addDefine("Instanced","INSTANCED");d.addDefine("InstColor","INSTANCEDCOLOR");d.addDefine("ReceiveShadows","RECEIVE_SHADOWS");d.addDefine("ReceiveSSAO","RECEIVE_SSAO");d.addDefine("vvSize","VV_SIZE");d.addDefine("vvColor","VV_COLOR");d.addDefine("vvRotation","VV_ROTATION");e.shaderVariators.Material=d;d=new w("depth",["vsDepth","fsDepth"],null,e,c,a,b);d.addNaryShaderSnippetSuffix([{value:"none",programNameSuffix:"",shaderSnippetSuffix:""},
{value:"Textured"},{value:"AtlasTextured"}]);d.addDefine("FlipV","FLIPV");d.addDefine("Instanced","INSTANCED");d.addDefine("ShadowMap","BIAS_SHADOWMAP");d.addDefine("vvSize","VV_SIZE");d.addDefine("vvRotation","VV_ROTATION");e.shaderVariators.MaterialDepth=d;d=new w("normal",["vsNormal","fsNormal"],null,e,c,a,b);d.addNaryShaderSnippetSuffix([{value:"none",programNameSuffix:"",shaderSnippetSuffix:""},{value:"Textured"},{value:"AtlasTextured"}]);d.addDefine("FlipV","FLIPV");d.addDefine("Instanced",
"INSTANCED");d.addDefine("vvSize","VV_SIZE");d.addDefine("vvRotation","VV_ROTATION");e.shaderVariators.MaterialNormal=d;d=new w("highlight",["vsNormal","fsNormal"],null,e,c,a,b);d.addNaryShaderSnippetSuffix([{value:"none",programNameSuffix:"",shaderSnippetSuffix:""},{value:"Textured"},{value:"AtlasTextured"}]);d.addDefine("FlipV","FLIPV");d.addDefine("Instanced","INSTANCED");d.addDefine("vvSize","VV_SIZE");d.addDefine("vvRotation","VV_ROTATION");e.shaderVariators.MaterialHighlight=d;var d=new k(b,
a.vsDepth,a.fsDepth,m.Default3D,["BIAS_SHADOWMAP 1"]),g=new k(b,a.vsDepthTextured,a.fsDepthTextured,m.Default3D,["BIAS_SHADOWMAP 1"]),h=new k(b,a.vsDepth,a.fsDepth,m.Default3D),n=new k(b,a.vsDepthTextured,a.fsDepthTextured,m.Default3D),q=new k(b,a.vsNormal,a.fsNormal,m.Default3D),p=new k(b,a.vsNormalTextured,a.fsNormalTextured,m.Default3D),f=new k(b,a.vsHighlight,a.fsHighlight,m.Default3D);b=new k(b,a.vsHighlightTextured,a.fsHighlightTextured,m.Default3D);e.add("depthShadowMap",d);e.add("depthTexturedShadowMap",
g);e.add("depth",h);e.add("depthTextured",n);e.add("normal",q);e.add("normalTextured",p);e.add("highlight",f);e.add("highlightTextured",b);c.add("fsDepth",{source:a.fsDepth});c.add("fsDepthTextured",{source:a.fsDepthTextured});c.add("fsDepthShadowMap",{source:a.fsDepthShadowMap,defines:["BIAS_SHADOWMAP 1"]});c.add("fsDepthTexturedShadowMap",{source:a.fsDepthTextured,defines:["BIAS_SHADOWMAP 1"]});c.add("vsDepth",{source:a.vsDepth});c.add("fsNormal",{source:a.fsNormal})};return t});