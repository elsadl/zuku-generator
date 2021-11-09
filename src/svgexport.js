(function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):(t="undefined"!=typeof globalThis?globalThis:t||self,e(t.svgExport=t.svgExport||{}))})(this,function(t){"use strict";function e(t){void 0!==typeof console&&"function"==typeof console.warn&&console.warn(t)}function n(t){var n=document.createElement("div");if(n.className="tempdiv-svg-exportJS","string"==typeof t&&(n.insertAdjacentHTML("beforeend",t.trim()),t=n.firstChild),!t.nodeType||1!==t.nodeType)return e("Error svg-export: The input svg was not recognized"),null;var i=t.cloneNode(!0);return i.style.display=null,n.appendChild(i),n.style.visibility="hidden",n.style.display="table",n.style.position="absolute",document.body.appendChild(n),i}function i(t){t&&t.pdfOptions&&(Object.keys(y.pdfOptions).forEach(function(e){if(t.pdfOptions.hasOwnProperty(e)&&typeof t.pdfOptions[e]==typeof y.pdfOptions[e]){if(""===t.pdfOptions[e])return;y.pdfOptions[e]=t.pdfOptions[e]}}),y.pdfOptions.pageLayout.margin||(y.pdfOptions.pageLayout.margin=50),y.pdfOptions.pageLayout.margins||(y.pdfOptions.pageLayout.margins={})),y.pdfOptions.pageLayout.margins.top=y.pdfOptions.pageLayout.margins.top||y.pdfOptions.pageLayout.margin,y.pdfOptions.pageLayout.margins.bottom=y.pdfOptions.pageLayout.margins.bottom||y.pdfOptions.pageLayout.margin,y.pdfOptions.pageLayout.margins.left=y.pdfOptions.pageLayout.margins.left||y.pdfOptions.pageLayout.margin,y.pdfOptions.pageLayout.margins.right=y.pdfOptions.pageLayout.margins.top||y.pdfOptions.pageLayout.margin,delete y.pdfOptions.pageLayout.margin,t&&y.pdfOptions.pageLayout.size||(y.pdfOptions.pageLayout.size=[Math.max(300,y.width)+y.pdfOptions.pageLayout.margins.left+y.pdfOptions.pageLayout.margins.right,Math.max(300,y.height)+y.pdfOptions.pageLayout.margins.top+y.pdfOptions.pageLayout.margins.bottom+(y.pdfOptions.addTitleToPage?2*y.pdfOptions.pdfTitleFontSize+10:0)+(""!==y.pdfOptions.chartCaption?4*y.pdfOptions.pdfCaptionFontSize+10:0)])}function o(t,e){y={originalWidth:100,originalHeight:100,width:100,height:100,scale:1,useCSS:!0,transparentBackgroundReplace:"white",allowCrossOriginImages:!1,pdfOptions:{customFonts:[],pageLayout:{margin:50,margins:{}},addTitleToPage:!0,chartCaption:"",pdfTextFontFamily:"Helvetica",pdfTitleFontSize:20,pdfCaptionFontSize:14}},y.originalHeight=-1!==t.style.getPropertyValue("height").indexOf("%")||t.getAttribute("height")&&-1!==t.getAttribute("height").indexOf("%")?t.getBBox().height*y.scale:t.getBoundingClientRect().height*y.scale,y.originalWidth=-1!==t.style.getPropertyValue("width").indexOf("%")||t.getAttribute("width")&&-1!==t.getAttribute("width").indexOf("%")?t.getBBox().width*y.scale:t.getBoundingClientRect().width*y.scale,e&&e.scale&&"number"==typeof e.scale&&(y.scale=e.scale),e&&e.height?"number"==typeof e.height&&(y.height=e.height*y.scale):y.height=y.originalHeight*y.scale,e&&e.width?"number"==typeof e.width&&(y.width=e.width*y.scale):y.width=y.originalWidth*y.scale,e&&!1===e.useCSS&&(y.useCSS=!1),e&&e.transparentBackgroundReplace&&(y.transparentBackgroundReplace=e.transparentBackgroundReplace),e&&e.allowCrossOriginImages&&(y.allowCrossOriginImages=e.allowCrossOriginImages),i(e)}function a(t,n){if("function"==typeof getComputedStyle){t.childNodes.forEach(function(t,e){1===t.nodeType&&a(t,n.childNodes[parseInt(e,10)])});var i=window.getComputedStyle(t);if(i.length>0)for(const t of i)-1===["width","height","inline-size","block-size"].indexOf(t)&&n.style.setProperty(t,i.getPropertyValue(t))}else e("Warning svg-export: this browser is not able to get computed styles")}function r(t,e,n){void 0===n&&(n=!0),y.useCSS&&"object"==typeof e&&(a(e,t),t.style.display=null),t.style.width=null,t.style.height=null,t.setAttribute("width",y.width),t.setAttribute("height",y.height),t.setAttribute("preserveAspectRatio","none"),t.setAttribute("viewBox","0 0 "+y.originalWidth+" "+y.originalHeight);for(var i=document.getElementsByClassName("tempdiv-svg-exportJS");i.length>0;)i[0].parentNode.removeChild(i[0]);if(n){var o=new XMLSerializer,r=o.serializeToString(t).replace(/currentColor/g,"black");return r.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)||(r=r.replace(/^<svg/,'<svg xmlns="http://www.w3.org/2000/svg"')),r.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)||(r=r.replace(/^<svg/,'<svg xmlns:xlink="http://www.w3.org/1999/xlink"')),r}return t}function p(t){return new Promise(function(e,n){var i=new Image;i.onload=function(){var n=document.createElement("canvas");n.width=this.naturalWidth||this.getAttribute("width")||this.style.getPropertyValue("width")||300,n.height=this.naturalHeight||this.getAttribute("height")||this.style.getPropertyValue("height")||300,n.getContext("2d").drawImage(this,0,0);var i=n.toDataURL("image/png");t.setAttribute("href",i),e()},y.allowCrossOriginImages&&(i.crossOrigin="anonymous"),i.src=t.getAttribute("href")||t.getAttributeNS("http://www.w3.org/1999/xlink","href")})}function s(t){var e=[];return t.forEach(function(t){var n=new Promise(function(e,n){var i=new XMLHttpRequest;i.onreadystatechange=function(){4===i.readyState&&200===i.status&&e(i.response)},i.open("GET",t,!0),i.responseType="arraybuffer",i.send(null)});e.push(n)}),e}function g(t,e,n){if(e=e.replace(/[/\\?%*:|"<>]/g,"_"),navigator.msSaveBlob){for(var i=decodeURIComponent(t.split(",")[1]),o=[],a=t.split(",")[0].split(":")[1].split(";")[0],r=0;r<i.length;r++)o.push(i.charCodeAt(r));var p=null;return p=null!=n?n.msToBlob():new Blob([new Uint8Array(o)],{type:a}),navigator.msSaveBlob(p,e)}var s=document.createElement("a");s.download=e,s.href=t,document.body.appendChild(s),s.click(),document.body.removeChild(s)}function d(t,e,i){var a=n(t);if(a){null==e&&(e="chart"),o(a,i);var s=a.getElementsByTagName("image"),d=[];if(s)for(var l of s)(l.getAttribute("href")&&-1===l.getAttribute("href").indexOf("data:")||l.getAttribute("xlink:href")&&-1===l.getAttribute("xlink:href").indexOf("data:"))&&d.push(p(l));Promise.all(d).then(function(){var n=r(a,t);n='<?xml version="1.0" standalone="no"?>\r\n'+n;var i="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(n);g(i,e+".svg")})}}function l(t,i,a,p){if("object"==typeof canvg){p=p.toLowerCase().replace("jpg","jpeg"),"png"!==p&&"jpeg"!==p&&(p="png");var s=n(t);if(s){null==i&&(i="chart");var d=document.createElement("canvas");a&&(a.width||a.height)||(a||(a={}),a.scale=10),o(s,a);var l=r(s,t);"jpeg"===p&&(l=l.replace(">",'><rect x="0" y="0" width="'+y.width+'" height="'+y.height+'" fill="'+y.transparentBackgroundReplace+'"/>'));var f=d.getContext("2d"),u=canvg.Canvg.fromString(f,l,{anonymousCrossOrigin:y.allowCrossOriginImages});u.start(),u.ready().then(function(){var t=d.toDataURL("image/"+p);g(t,i+"."+p,d)})}}else e("Error svg-export: PNG/JPEG export requires Canvg.js")}function f(t,e,n){l(t,e,n,"png")}function u(t,e,n){l(t,e,n,"jpeg")}function h(t,e,n){y.pdfOptions.addTitleToPage&&t.font(y.pdfOptions.pdfTextFontFamily).fontSize(y.pdfOptions.pdfTitleFontSize).text(e,{width:y.pdfOptions.pageLayout.size[0]-y.pdfOptions.pageLayout.margins.left-y.pdfOptions.pageLayout.margins.right}),SVGtoPDF(t,n,y.pdfOptions.pageLayout.margins.left,t.y+10,{width:y.width,height:y.height,preserveAspectRatio:"none",useCSS:y.useCSS}),""!==y.pdfOptions.chartCaption&&t.font(y.pdfOptions.pdfTextFontFamily).fontSize(y.pdfOptions.pdfCaptionFontSize).text(y.pdfOptions.chartCaption,y.pdfOptions.pageLayout.margins.left,y.pdfOptions.pageLayout.size[1]-y.pdfOptions.pageLayout.margins.bottom-4*y.pdfOptions.pdfCaptionFontSize,{width:y.pdfOptions.pageLayout.size[0]-y.pdfOptions.pageLayout.margins.left-y.pdfOptions.pageLayout.margins.right})}function c(t,i,a){if("function"==typeof PDFDocument&&"function"==typeof SVGtoPDF&&"function"==typeof blobStream){var d=n(t);if(d){null==i&&(i="chart"),o(d,a);var l=r(d,t,!1),f=new PDFDocument(y.pdfOptions.pageLayout),u=f.pipe(blobStream()),c=d.getElementsByTagName("image"),m=[];if(c)for(var O of c)(O.getAttribute("href")&&-1===O.getAttribute("href").indexOf("data:")||O.getAttribute("xlink:href")&&-1===O.getAttribute("xlink:href").indexOf("data:"))&&m.push(p(O));Promise.all(m).then(function(){if(y.pdfOptions.customFonts.length>0){var t=s(y.pdfOptions.customFonts.map(function(t){return t.url}));Promise.all(t).then(function(t){t.forEach(function(t,e){var n=y.pdfOptions.customFonts[parseInt(e,10)],i=l.querySelectorAll('[style*="'+n.fontName+'"]');i.forEach(function(t){t.style.fontFamily=n.fontName}),-1===n.url.indexOf(".ttc")&&-1===n.url.indexOf(".dfont")||!n.styleName?f.registerFont(n.fontName,t):f.registerFont(n.fontName,t,n.styleName)}),h(f,i,l),f.end()})}else h(f,i,l),f.end()}),u.on("finish",function(){var t=u.toBlobURL("application/pdf");g(t,i+".pdf")})}}else e("Error svg-export: PDF export requires PDFKit.js, blob-stream and SVG-to-PDFKit")}var m="1.2.0",y={};t.version=m,t.downloadSvg=d,t.downloadPng=f,t.downloadJpeg=u,t.downloadPdf=c,Object.defineProperty(t,"__esModule",{value:!0})});