(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,function(t,e,r){t.exports=r(20)},,,,,,,,function(t,e,r){},function(t,e,r){},function(t,e,r){},function(t,e,r){},function(t,e,r){},function(t,e,r){"use strict";r.r(e);var n=r(0),o=r.n(n),a=r(5),i=function(t){t&&t instanceof Function&&r.e(3).then(r.bind(null,21)).then(function(e){var r=e.getCLS,n=e.getFID,o=e.getFCP,a=e.getLCP,i=e.getTTFB;r(t),n(t),o(t),a(t),i(t)})},c=(r(15),r(2)),l=r(1),u=r(6);r(16),r(17);function s(){s=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",a=n.asyncIterator||"@@asyncIterator",i=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(O){c=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof h?e:h,a=Object.create(o.prototype),i=new S(n||[]);return a._invoke=function(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return N()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=E(i,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var l=u(t,e,r);if("normal"===l.type){if(n=r.done?"completed":"suspendedYield",l.arg===f)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n="completed",r.method="throw",r.arg=l.arg)}}}(t,r,i),a}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(O){return{type:"throw",arg:O}}}t.wrap=l;var f={};function h(){}function p(){}function d(){}var m={};c(m,o,function(){return this});var v=Object.getPrototypeOf,g=v&&v(v(I([])));g&&g!==e&&r.call(g,o)&&(m=g);var y=d.prototype=h.prototype=Object.create(m);function w(t){["next","throw","return"].forEach(function(e){c(t,e,function(t){return this._invoke(e,t)})})}function b(t,e){var n;this._invoke=function(o,a){function i(){return new e(function(n,i){!function n(o,a,i,c){var l=u(t[o],t,a);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then(function(t){n("next",t,i,c)},function(t){n("throw",t,i,c)}):e.resolve(f).then(function(t){s.value=t,i(s)},function(t){return n("throw",t,i,c)})}c(l.arg)}(o,a,n,i)})}return n=n?n.then(i,i):i()}}function E(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var n=u(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,f;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function I(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:N}}function N(){return{value:void 0,done:!0}}return p.prototype=d,c(y,"constructor",d),c(d,"constructor",p),p.displayName=c(d,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,c(t,i,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},w(b.prototype),c(b.prototype,a,function(){return this}),t.AsyncIterator=b,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new b(l(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then(function(t){return t.done?t.value:i.next()})},w(y),c(y,i,"Generator"),c(y,o,function(){return this}),c(y,"toString",function(){return"[object Generator]"}),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=I,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),x(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;x(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:I(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function f(t){var e=[1,2,3,4,5,6,7,8,9,10][t.cardNo-1],r=o.a.useState([]),n=Object(l.a)(r,2),a=n[0],i=n[1];function u(){return(u=Object(c.a)(s().mark(function t(){var e,r;return s().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.unsplash.com/photos/?client_id=yFMXUTNpe9ZjDVqNOSQJxC4WiW_hJFdNEviXNlu_Vso");case 2:return e=t.sent,t.next=5,e.json();case 5:r=t.sent,i(r);case 7:case"end":return t.stop()}},t)}))).apply(this,arguments)}o.a.useEffect(function(){!function(){u.apply(this,arguments)}()},[]);var f="";return f=0!==a.length?a[e-1].urls.regular:"",o.a.createElement("div",{className:"cards"},o.a.createElement("img",{src:f,className:"cards-images",id:e,onClick:t.handleClick,alt:"Random element, which player have to remember to play the game."}))}r(18);function h(t){var e=o.a.useState(0),r=Object(l.a)(e,2),n=r[0],a=r[1],i=o.a.useState(!1),c=Object(l.a)(i,2),u=c[0],s=c[1];return!0===t.run&&!0!==u&&s(!0),!1===t.run&&!1!==u&&s(!1),!0===t.reset&&!0!==u&&a(0),o.a.useEffect(function(){var t;return u?t=setInterval(function(){a(function(t){return t+10})},10):u||clearInterval(t),function(){return clearInterval(t)}},[u]),o.a.createElement("div",{className:"stopwatch"},o.a.createElement("div",{className:"numbers"},o.a.createElement("span",{id:"minutes"},("0"+Math.floor(n/6e4%60)).slice(-2)),o.a.createElement("p",null,":"),o.a.createElement("span",{id:"seconds"},("0"+Math.floor(n/1e3%60)).slice(-2)),o.a.createElement("p",null,":"),o.a.createElement("span",{id:"milliseconds"},("0"+n/10%100).slice(-2))))}r(19);function p(){var t,e,r,n;return localStorage.getItem("best-minutes")?(e=2===localStorage.getItem("best-minutes").length?localStorage.getItem("best-minutes"):"0".concat(localStorage.getItem("best-minutes")),r=2===localStorage.getItem("best-seconds").length?localStorage.getItem("best-seconds"):"0".concat(localStorage.getItem("best-seconds")),n=2===localStorage.getItem("best-milliseconds").length?localStorage.getItem("best-milliseconds"):"0".concat(localStorage.getItem("best-milliseconds")),t=o.a.createElement("p",null,e,":",r,":",n)):t=o.a.createElement("p",null,"de"===localStorage.Language?"noch keine Beszeit":"no current best-time"),o.a.createElement("div",{className:"best-time-div"},o.a.createElement("h3",null,"de"===localStorage.Language?"Bestzeit":"Best time:"),t)}function d(t,e){var r="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"===typeof t)return m(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return m(t,e)}(t))||e&&t&&"number"===typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return i=t.done,t},e:function(t){c=!0,a=t},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw a}}}}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function v(){v=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",a=n.asyncIterator||"@@asyncIterator",i=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(O){c=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof f?e:f,a=Object.create(o.prototype),i=new S(n||[]);return a._invoke=function(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return N()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=E(i,r);if(c){if(c===s)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var l=u(t,e,r);if("normal"===l.type){if(n=r.done?"completed":"suspendedYield",l.arg===s)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n="completed",r.method="throw",r.arg=l.arg)}}}(t,r,i),a}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(O){return{type:"throw",arg:O}}}t.wrap=l;var s={};function f(){}function h(){}function p(){}var d={};c(d,o,function(){return this});var m=Object.getPrototypeOf,g=m&&m(m(I([])));g&&g!==e&&r.call(g,o)&&(d=g);var y=p.prototype=f.prototype=Object.create(d);function w(t){["next","throw","return"].forEach(function(e){c(t,e,function(t){return this._invoke(e,t)})})}function b(t,e){var n;this._invoke=function(o,a){function i(){return new e(function(n,i){!function n(o,a,i,c){var l=u(t[o],t,a);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==typeof f&&r.call(f,"__await")?e.resolve(f.__await).then(function(t){n("next",t,i,c)},function(t){n("throw",t,i,c)}):e.resolve(f).then(function(t){s.value=t,i(s)},function(t){return n("throw",t,i,c)})}c(l.arg)}(o,a,n,i)})}return n=n?n.then(i,i):i()}}function E(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method))return s;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var n=u(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,s;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,s):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,s)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function I(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:N}}function N(){return{value:void 0,done:!0}}return h.prototype=p,c(y,"constructor",p),c(p,"constructor",h),h.displayName=c(p,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,c(t,i,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},w(b.prototype),c(b.prototype,a,function(){return this}),t.AsyncIterator=b,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new b(l(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then(function(t){return t.done?t.value:i.next()})},w(y),c(y,i,"Generator"),c(y,o,function(){return this}),c(y,"toString",function(){return"[object Generator]"}),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=I,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,s):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),s},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),x(r),s}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;x(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:I(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),s}},t}function g(){var t=o.a.useState([]),e=Object(l.a)(t,2),r=e[0],n=e[1],a=o.a.useState(10),i=Object(l.a)(a,2),s=i[0],m=i[1],g=[1,2,3,4,5,6,7,8,9,10].map(function(t){return{value:t,sort:Math.random()}}).sort(function(t,e){return t.sort-e.sort}).map(function(t){return t.value});function y(t){t.preventDefault(),-1===r.indexOf(t.target.id)?m(function(t){return t-1}):m(10),n(function(e){for(var r=[],n=0;n<e.length;n++)r.push(e[n]);return r.push(t.target.id),r})}var w=o.a.useState(!0),b=Object(l.a)(w,2),E=b[0],L=b[1],x=o.a.useState(!1),S=Object(l.a)(x,2),I=S[0],N=S[1],O=o.a.useState([]),j=Object(l.a)(O,2),k=j[0],_=j[1];if(localStorage.getItem("best-minutes")&&k[0]!==parseInt(localStorage.getItem("best-minutes"))&&0!==k.length&&_([localStorage.getItem("best-minutes"),localStorage.getItem("best-seconds"),localStorage.getItem("best-milliseconds")]),9===s){L(!1);var G=parseInt(document.getElementById("minutes").innerText),T=parseInt(document.getElementById("seconds").innerText),F=parseInt(document.getElementById("milliseconds").innerText);(function(){var t=Object(c.a)(v().mark(function t(){var e,r,n;return v().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=parseInt("".concat(G).concat(T).concat(F)),r=parseInt("".concat(k[0]).concat(k[1]).concat(k[2])),n="",e<r||0===k.length?(_([G,T,F]),localStorage.setItem("best-minutes",G),localStorage.setItem("best-seconds",T),localStorage.setItem("best-milliseconds",F),n="de"===localStorage.Language?"Gratulation, du hats das Spiel in ".concat(G,":").concat(T,":").concat(F," gewonnen UND eine neue Bestzeit erreicht !"):"Congratulations, you won the game in ".concat(G,":").concat(T,":").concat(F," AND its a new best-time !")):n="de"===localStorage.Language?"Gratulation, du hats das Spiel in ".concat(G,":").concat(T,":").concat(F," gewonnen! (Aber leider keine Bestzeit, das n\xe4chste mal schaffst du es!)"):"Congratulations, you won the game in ".concat(G,":").concat(T,":").concat(F," ! ( But unfortunately no best time, next time you can do it!)"),t.next=7,Object(u.confirm)(n);case 7:N(!0),L(!0);case 9:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}})()(),m(0),N(!1)}return o.a.useEffect(function(){!0===!I?document.querySelector(".startstop-btn").classList.add("startstop-animation"):document.querySelector(".startstop-btn").classList.remove("startstop-animation")},[I]),o.a.useEffect(function(){document.querySelector(".startstop-btn").click()},[]),o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"header"},o.a.createElement("div",{className:"main-title-div"},o.a.createElement("h1",null,"Memory-Card-Game"),o.a.createElement("h4",null,"de"===localStorage.Language?"Klicke auf die 10 Bilder so schnell du kannst, klicke aber auf keines 2 mal oder du beginnst von vorne!":"Click all 10 images as fast as you can, but don't click on any twice or you have to restart!")),o.a.createElement("div",{className:"stats"},o.a.createElement("div",{className:"header-points"},o.a.createElement("p",{className:"points-text"},"de"===localStorage.Language?"Noch zu klicken":"Remaining to click",":"),o.a.createElement("p",{className:"points-counter"},s)),o.a.createElement("div",{className:"timeWrapper"},o.a.createElement(h,{run:E,reset:I}),o.a.createElement(p,null),o.a.createElement("div",{className:"start-stop-reset"},o.a.createElement("input",{type:"button",value:E?"stop":"start",className:"startstop-btn",onClick:function(t){t.preventDefault(),L(!E),10!==s&&m(10),N(!E);var e=document.querySelectorAll(".cards-images");if(E){var r,n=d(e);try{for(n.s();!(r=n.n()).done;){var o=r.value;o.style.pointerEvents="none",o.style.filter="blur(.4rem)",o.style.transform="rotate(180deg )"}}catch(l){n.e(l)}finally{n.f()}}if(!E){var a,i=d(e);try{for(i.s();!(a=i.n()).done;){var c=a.value;c.style.pointerEvents="all",c.style.filter="blur(0rem)",c.style.transform="rotate(0deg )"}}catch(l){i.e(l)}finally{i.f()}}}}),o.a.createElement("input",{type:"button",value:"reset",className:"reset-btn",onClick:function(t){t.preventDefault(),_([]),localStorage.removeItem("best-minutes"),localStorage.removeItem("best-seconds"),localStorage.removeItem("best-milliseconds")}}))))),o.a.createElement("main",{className:"cardboard"},g.map(function(t){return o.a.createElement(f,{cardNo:t,key:t,handleClick:y})})))}var y=localStorage.language||navigator.language;/de/gi.test(y)?localStorage.setItem("Language","de"):localStorage.setItem("Language","en");var w=document.getElementById("root");Object(a.createRoot)(w).render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(g,null))),i()}],[[7,1,2]]]);
//# sourceMappingURL=main.8eaa9d8c.chunk.js.map