parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
"use strict";function e(e,t,n,r,i,o,a){try{var u=e[o](a),s=u.value}catch(c){return void n(c)}u.done?t(s):Promise.resolve(s).then(r,i)}function t(t){return function(){var n=this,r=arguments;return new Promise(function(i,o){var a=t.apply(n,r);function u(t){e(a,i,o,u,s,"next",t)}function s(t){e(a,i,o,u,s,"throw",t)}u(void 0)})}}var n=600,r=500,i="#FF0000",o="#1E90FF",a={point:function(e,t,n,r,i){e.beginPath(),e.arc(n,t,r,0,2*Math.PI),e.fillStyle=i,e.fill()},keyPoints:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,u=e.find(function(e){return"leftWrist"===e.part}),s=e.find(function(e){return"rightWrist"===e.part});if(u.score>t){var c=u.position,p=c.y,d=c.x;a.point(n,p*r,d*r,10,i)}if(s.score>t){var f=s.position,l=f.y,h=f.x;a.point(n,l*r,h*r,10,o)}}},u={algorithm:"single-pose",input:{architecture:"MobileNetV1",outputStride:16,inputResolution:513,multiplier:.75,quantBytes:2},singlePoseDetection:{minPoseConfidence:.1,minPartConfidence:.5},output:{showVideo:!0,showPoints:!0}},s=function(){return/Android/i.test(navigator.userAgent)||/iPhone|iPad|iPod/i.test(navigator.userAgent)},c=function(){var e=t(regeneratorRuntime.mark(function e(){var t,i,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){e.next=2;break}throw new Error("Browser API navigator.mediaDevices.getUserMedia not available");case 2:return t=s(),(i=document.getElementById("video")).width=n,i.height=r,e.next=8,navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"user",width:t?void 0:n,height:t?void 0:r}});case 8:return o=e.sent,i.srcObject=o,e.abrupt("return",new Promise(function(e){i.onloadedmetadata=function(){return e(i)}}));case 11:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),p=function(){var e=t(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c();case 2:return(t=e.sent).play(),e.abrupt("return",t);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),d=function(e,i){var o=document.getElementById("output"),s=o.getContext("2d"),c=!0;function p(){return d.apply(this,arguments)}function d(){return(d=t(regeneratorRuntime.mark(function t(){var o,d,f,l;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:o=[],t.t0=u.algorithm,t.next="single-pose"===t.t0?4:11;break;case 4:return t.next=6,i.estimatePoses(e,{flipHorizontal:c,decodingMethod:"single-person"});case 6:return l=t.sent,o=o.concat(l),d=+u.singlePoseDetection.minPoseConfidence,f=+u.singlePoseDetection.minPartConfidence,t.abrupt("break",11);case 11:s.clearRect(0,0,n,r),u.output.showVideo&&(s.save(),s.scale(-1,1),s.translate(-n,0),s.restore()),o.forEach(function(e){var t=e.score,n=e.keypoints;t>=d&&u.output.showPoints&&a.keyPoints(n,f,s)}),requestAnimationFrame(p);case 15:case"end":return t.stop()}},t)}))).apply(this,arguments)}o.width=n,o.height=r,p()};function f(){return l.apply(this,arguments)}function l(){return(l=t(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,posenet.load({architecture:u.input.architecture,outputStride:u.input.outputStride,inputResolution:u.input.inputResolution,multiplier:u.input.multiplier,quantBytes:u.input.quantBytes});case 2:return t=e.sent,e.prev=3,e.next=6,p();case 6:n=e.sent,d(n,t),e.next=13;break;case 10:throw e.prev=10,e.t0=e.catch(3),e.t0;case 13:case"end":return e.stop()}},e,null,[[3,10]])}))).apply(this,arguments)}f().catch(console.error);
},{}]},{},["Focm"], null)
//# sourceMappingURL=/posenet_base.16cc3c15.js.map