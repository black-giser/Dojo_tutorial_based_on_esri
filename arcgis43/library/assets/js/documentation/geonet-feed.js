/*! ArcGIS API for JavaScript 4.3 | Copyright (c) 2017 Esri. All rights reserved. | http://www.esri.com/legal/privacy | https://developers.arcgis.com/terms/faq */
require(["dojo/query","dojo/dom-construct","dojo/date/locale","dojo/dom-attr","esri/config","esri/request"],function(e,t,r,n,o,a){function l(e){var t=document.createElement("div");t.className="flexible-block-group-item flexible-block-group-item-white trailer-1";var r=e.resources.html.ref;return t.innerHTML=['<div class="flexible-block-group-item-header">',"<small>"+i(e.published)+"</small>","</div>",'<div class="flexible-block-group-item-content">','<h4 class="leader-half">','<a href="'+r+'">',e.subject+"</a>","</h4>","<p>"+s(e)+"</p>","</div>",'<div class="flexible-block-group-item-footer">','<a href="'+r+'">Continue reading <span class="icon-ui-right icon-ui-small"></span></a>',"</div>"].join("\n"),t}function i(e){var t="";if(e){var n=e.slice(0,-2)+":"+e.slice(-2);t=r.format(new Date(n),{selector:"date",formatLength:"long"})}return t}function s(e){var t=e.content.text.replace(/(<([^>]+)>)/gi,"");return c(t,100)}function c(e,t){return e=e.replace(/[\n]/g," "),e=e.substr(0,t),e=e.substr(0,Math.min(e.length,e.lastIndexOf(" ")))}function u(e){return a(e,{responseType:"json"})}function f(e){for(var t=[],r=0;r<e.length;r++){var n=e[r];n.subject.length&&n.resources.html.ref.length&&n.content.text.length&&t.push(n)}return t}o.request.corsEnabledServers.push("webappsproxy.esri.com"),e("[data-geonet-feed-url]").forEach(function(r){var o=e(r)[0],a=n.get(o,"data-geonet-feed-url"),i=parseInt(n.get(o,"data-post-limit"),10)||10;u(a).then(function(e){for(var r=f(e.data.list),n=0;n<Math.min(r.length,i);n++)t.place(l(r[n]),o)})})});