// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.3/esri/copyright.txt for details.
//>>built
define("require exports dojo/_base/lang ../../../core/promiseUtils ./summaryStatistics ../../../tasks/support/StatisticDefinition ../../../tasks/support/GenerateRendererParameters ./support/utils ../support/utils".split(" "),function(G,H,u,k,p,v,w,f,m){function x(a){if(!(a&&a.layer&&(a.field||a.valueExpression||a.sqlExpression)))return k.reject(f.createError("histogram:missing-parameters","'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required"));var b=u.mixin({},a);b.normalizationType=
f.getNormalizationType(b);b.layer=m.createLayerAdapter(b.layer);return b.layer?b.layer.load().then(function(){var a=b.layer,c=b.valueExpression||b.sqlExpression,e=b.field,g=e?a.getField(e):null,e=g?"date"===g.type:!1,h=!b.classificationMethod||"equal-interval"===b.classificationMethod,l=m.getFieldsList({field:b.field,normalizationField:b.normalizationField,valueExpression:b.valueExpression});if(l=f.verifyBasicFieldValidity(a,l,"histogram:invalid-parameters"))return k.reject(l);if(g){if(a=f.verifyFieldType(a,
g,"histogram:invalid-parameters",y))return k.reject(a);if(e){if(b.normalizationType)return k.reject(f.createError("histogram:invalid-parameters","Normalization is not allowed for date fields"));if(!h)return k.reject(f.createError("histogram:invalid-parameters","'classificationMethod' other than 'equal-interval' is not allowed for date fields"))}}else if(c){if(b.normalizationType)return k.reject(f.createError("histogram:invalid-parameters","Normalization is not allowed when 'valueExpression' or 'sqlExpression' is specified"));
if(!h)return k.reject(f.createError("histogram:invalid-parameters","'classificationMethod' other than 'equal-interval' is not allowed when 'valueExpression' or 'sqlExpression' is specified"))}return b}):k.reject(f.createError("histogram:invalid-parameters","'layer' must be one of these types: "+z))}function q(a,b,d){b=(b-a)/d;for(var c=[],e,f=1;f<=d;f++)e=a+b,e=Number(e.toFixed(16)),c.push([a,e]),a=e;return c}function A(a,b){var d=[],c=b.length;b.forEach(function(b,g){b=f.mergeWhereClauses(a+" \x3e\x3d "+
b[0],a+(g===c-1?" \x3c\x3d ":" \x3c ")+b[1]);d.push("WHEN ("+b+") THEN "+(g+1))});return["CASE",d.join(" "),"ELSE 0 END"].join(" ")}function B(a,b,d){var c=a.layer;if(c.supportsSQLExpression){var e=q(b,d,a.numBins||10),g=A(a.sqlExpression,e);a={outStatistics:[new v({statisticType:"count",outStatisticFieldName:"countOFExpr",onStatisticField:"*"})],groupByFieldsForStatistics:[g],orderByFields:[g],where:a.sqlWhere,sqlFormat:"standard"};return c.queryStatistics(a).then(function(a){var c={};a&&a.features&&
a.features.forEach(function(a){var b=a.attributes;a=f.getCustomExprVal(b,"countOFExpr");b=f.getAttributeVal(b,"countOFExpr");0!==a&&(c[a]=b)});var g=[];e.forEach(function(a,b){b=(b+1).toString();g.push({minValue:a[0],maxValue:a[1],count:c.hasOwnProperty(b)?c[b]:0})});return{bins:g,minValue:b,maxValue:d}})}return k.reject(f.createError("histogram:not-supported","Layer does not support standardized SQL expression for queries"))}function r(a,b,d){return(null!=b&&null!=d?k.resolve({min:b,max:d}):p(a)).then(function(b){return B(a,
b.min,b.max)})}function C(a,b){var d=a.layer;return("percent-of-total"===a.normalizationType?p({layer:d,field:a.field}).then(function(a){return a.sum}):k.resolve()).then(function(c){c={layer:d,numBins:a.numBins,sqlExpression:b?f.msSinceUnixEpochSQL(d,a.field):f.getFieldExpr(a,c),sqlWhere:b?null:f.getSQLFilterForNormalization(a)};return r(c,a.minValue,a.maxValue)})}function D(a,b,d){var c=[],e=a.classBreakInfos,g=e[0].minValue,h=e[e.length-1].maxValue;e.forEach(function(a){c.push([a.minValue,a.maxValue])});
return{min:g,max:h,intervals:c,sqlExpr:f.getFieldExpr(d,a.normalizationTotal),excludeZerosExpr:b,normTotal:a.normalizationTotal}}function t(a,b){var d=a.layer,c=f.getSQLFilterForNormalization(a);b=new w({classificationDefinition:f.createCBDefn(a,a.numBins||10),where:f.mergeWhereClauses(c,b)});return d.generateRenderer(b).then(function(b){return D(b,c,a)})}function E(a,b,d,c){for(var e=[],g=c.length,h=0;h<g;h++){var l=f.mergeWhereClauses(d,f.mergeWhereClauses(b+" \x3e\x3d "+c[h][0],null!==c[h][1]?
b+(h===g-1?" \x3c\x3d ":" \x3c ")+c[h][1]:""));e.push(l)}return k.eachAlways(e.map(function(b){return a.queryFeatureCount(b)}))}function n(a,b){var d=a.layer,c=a.field,e=c?d.getField(c):null,e=e?"date"===e.type:!1;a=a.numBins||10;var g=b.min,h=b.max,l=b.intervals||q(g,h,a),n=b.normTotal,c=b&&b.sqlExpr||c;b=b&&b.excludeZerosExpr;return d.hasLocalSource||e?k.reject(f.createError("histogram:not-implemented","Client-side calculation is not implemented yet")):E(d,c,b,l).then(function(a){return{bins:a.map(function(a,
b){return{minValue:l[b][0],maxValue:l[b][1],count:a.value}}),minValue:g,maxValue:h,normalizationTotal:n}})}function F(a){var b=a.layer,d=a.minValue,c=a.maxValue,e=a.valueExpression||a.sqlExpression,g=b.supportsSQLExpression,h=null!=d&&null!=c,l=a.field?b.getField(a.field):null,l=l?"date"===l.type:!1,m=!a.classificationMethod||"equal-interval"===a.classificationMethod;return e&&!b.hasLocalSource?r(a,d,c):g&&m&&!b.hasLocalSource?C(a,l):a.normalizationType||!m?t(a).then(function(b){if(h){if(d>b.max||
c<b.min)return k.reject(f.createError("histogram:insufficient-data","Range defined by 'minValue' and 'maxValue' does not intersect available data range of the field"));var e=f.getFieldExpr(a,b.normTotal),e=f.getRangeExpr(e,d,c);return m?n(a,{min:d,max:c,sqlExpr:b.sqlExpr,excludeZerosExpr:b.excludeZerosExpr}):t(a,e).then(function(b){return n(a,b)})}return n(a,b)}):h?n(a,{min:d,max:c}):p(a).then(function(b){return b.count?n(a,{min:b.min,max:b.max}):k.reject(f.createError("histogram:insufficient-data",
"Either the layer has no features or none of the features have data for the field"))})}var y=[].concat(["integer","small-integer","single","double"]).concat("date"),z=m.supportedLayerTypes.join(", ");return function(a){return x(a).then(function(a){return F(a)})}});