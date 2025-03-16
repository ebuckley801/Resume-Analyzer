"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[27],{5478:function(e,t,n){n.d(t,{Ry:function(){return l}});var r=new WeakMap,o=new WeakMap,a={},c=0,u=function(e){return e&&(e.host||u(e.parentNode))},i=function(e,t,n,i){var l=(Array.isArray(e)?e:[e]).map(function(e){if(t.contains(e))return e;var n=u(e);return n&&t.contains(n)?n:(console.error("aria-hidden",e,"in not contained inside",t,". Doing nothing"),null)}).filter(function(e){return!!e});a[n]||(a[n]=new WeakMap);var d=a[n],s=[],f=new Set,v=new Set(l),h=function(e){!e||f.has(e)||(f.add(e),h(e.parentNode))};l.forEach(h);var m=function(e){!e||v.has(e)||Array.prototype.forEach.call(e.children,function(e){if(f.has(e))m(e);else try{var t=e.getAttribute(i),a=null!==t&&"false"!==t,c=(r.get(e)||0)+1,u=(d.get(e)||0)+1;r.set(e,c),d.set(e,u),s.push(e),1===c&&a&&o.set(e,!0),1===u&&e.setAttribute(n,"true"),a||e.setAttribute(i,"true")}catch(t){console.error("aria-hidden: cannot operate on ",e,t)}})};return m(t),f.clear(),c++,function(){s.forEach(function(e){var t=r.get(e)-1,a=d.get(e)-1;r.set(e,t),d.set(e,a),t||(o.has(e)||e.removeAttribute(i),o.delete(e)),a||e.removeAttribute(n)}),--c||(r=new WeakMap,r=new WeakMap,o=new WeakMap,a={})}},l=function(e,t,n){void 0===n&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),o=t||("undefined"==typeof document?null:(Array.isArray(e)?e[0]:e).ownerDocument.body);return o?(r.push.apply(r,Array.from(o.querySelectorAll("[aria-live]"))),i(r,o,n,"aria-hidden")):function(){return null}}},79205:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(2265);let o=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),a=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((e,t,n)=>!!e&&n.indexOf(e)===t).join(" ")};var c={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let u=(0,r.forwardRef)((e,t)=>{let{color:n="currentColor",size:o=24,strokeWidth:u=2,absoluteStrokeWidth:i,className:l="",children:d,iconNode:s,...f}=e;return(0,r.createElement)("svg",{ref:t,...c,width:o,height:o,stroke:n,strokeWidth:i?24*Number(u)/Number(o):u,className:a("lucide",l),...f},[...s.map(e=>{let[t,n]=e;return(0,r.createElement)(t,n)}),...Array.isArray(d)?d:[d]])}),i=(e,t)=>{let n=(0,r.forwardRef)((n,c)=>{let{className:i,...l}=n;return(0,r.createElement)(u,{ref:c,iconNode:t,className:a("lucide-".concat(o(e)),i),...l})});return n.displayName="".concat(e),n}},99376:function(e,t,n){var r=n(35475);n.o(r,"usePathname")&&n.d(t,{usePathname:function(){return r.usePathname}}),n.o(r,"useRouter")&&n.d(t,{useRouter:function(){return r.useRouter}}),n.o(r,"useSearchParams")&&n.d(t,{useSearchParams:function(){return r.useSearchParams}})},99157:function(e,t,n){n.d(t,{Z:function(){return V}});var r,o,a,c,u,i,l,d=function(){return(d=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function s(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)0>t.indexOf(r[o])&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n}"function"==typeof SuppressedError&&SuppressedError;var f=n(2265),v="right-scroll-bar-position",h="width-before-scroll-bar";function m(e,t){return"function"==typeof e?e(t):e&&(e.current=t),e}var p="undefined"!=typeof window?f.useLayoutEffect:f.useEffect,g=new WeakMap,y=(void 0===o&&(o={}),(void 0===a&&(a=function(e){return e}),c=[],u=!1,i={read:function(){if(u)throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return c.length?c[c.length-1]:null},useMedium:function(e){var t=a(e,u);return c.push(t),function(){c=c.filter(function(e){return e!==t})}},assignSyncMedium:function(e){for(u=!0;c.length;){var t=c;c=[],t.forEach(e)}c={push:function(t){return e(t)},filter:function(){return c}}},assignMedium:function(e){u=!0;var t=[];if(c.length){var n=c;c=[],n.forEach(e),t=c}var r=function(){var n=t;t=[],n.forEach(e)},o=function(){return Promise.resolve().then(r)};o(),c={push:function(e){t.push(e),o()},filter:function(e){return t=t.filter(e),c}}}}).options=d({async:!0,ssr:!1},o),i),E=function(){},b=f.forwardRef(function(e,t){var n,r,o,a,c=f.useRef(null),u=f.useState({onScrollCapture:E,onWheelCapture:E,onTouchMoveCapture:E}),i=u[0],l=u[1],v=e.forwardProps,h=e.children,b=e.className,w=e.removeScrollBar,S=e.enabled,C=e.shards,k=e.sideCar,A=e.noIsolation,N=e.inert,L=e.allowPinchZoom,M=e.as,R=e.gapMode,x=s(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),T=(n=[c,t],r=function(e){return n.forEach(function(t){return m(t,e)})},(o=(0,f.useState)(function(){return{value:null,callback:r,facade:{get current(){return o.value},set current(value){var e=o.value;e!==value&&(o.value=value,o.callback(value,e))}}}})[0]).callback=r,a=o.facade,p(function(){var e=g.get(a);if(e){var t=new Set(e),r=new Set(n),o=a.current;t.forEach(function(e){r.has(e)||m(e,null)}),r.forEach(function(e){t.has(e)||m(e,o)})}g.set(a,n)},[n]),a),P=d(d({},x),i);return f.createElement(f.Fragment,null,S&&f.createElement(k,{sideCar:y,removeScrollBar:w,shards:C,noIsolation:A,inert:N,setCallbacks:l,allowPinchZoom:!!L,lockRef:c,gapMode:R}),v?f.cloneElement(f.Children.only(h),d(d({},P),{ref:T})):f.createElement(void 0===M?"div":M,d({},P,{className:b,ref:T}),h))});b.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1},b.classNames={fullWidth:h,zeroRight:v};var w=function(e){var t=e.sideCar,n=s(e,["sideCar"]);if(!t)throw Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw Error("Sidecar medium not found");return f.createElement(r,d({},n))};w.isSideCarExport=!0;var S=function(){var e=0,t=null;return{add:function(o){if(0==e&&(t=function(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=r||n.nc;return t&&e.setAttribute("nonce",t),e}())){var a,c;(a=t).styleSheet?a.styleSheet.cssText=o:a.appendChild(document.createTextNode(o)),c=t,(document.head||document.getElementsByTagName("head")[0]).appendChild(c)}e++},remove:function(){--e||!t||(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},C=function(){var e=S();return function(t,n){f.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},k=function(){var e=C();return function(t){return e(t.styles,t.dynamic),null}},A={left:0,top:0,right:0,gap:0},N=function(e){return parseInt(e||"",10)||0},L=function(e){var t=window.getComputedStyle(document.body),n=t["padding"===e?"paddingLeft":"marginLeft"],r=t["padding"===e?"paddingTop":"marginTop"],o=t["padding"===e?"paddingRight":"marginRight"];return[N(n),N(r),N(o)]},M=function(e){if(void 0===e&&(e="margin"),"undefined"==typeof window)return A;var t=L(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},R=k(),x="data-scroll-locked",T=function(e,t,n,r){var o=e.left,a=e.top,c=e.right,u=e.gap;return void 0===n&&(n="margin"),"\n  .".concat("with-scroll-bars-hidden"," {\n   overflow: hidden ").concat(r,";\n   padding-right: ").concat(u,"px ").concat(r,";\n  }\n  body[").concat(x,"] {\n    overflow: hidden ").concat(r,";\n    overscroll-behavior: contain;\n    ").concat([t&&"position: relative ".concat(r,";"),"margin"===n&&"\n    padding-left: ".concat(o,"px;\n    padding-top: ").concat(a,"px;\n    padding-right: ").concat(c,"px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(u,"px ").concat(r,";\n    "),"padding"===n&&"padding-right: ".concat(u,"px ").concat(r,";")].filter(Boolean).join(""),"\n  }\n  \n  .").concat(v," {\n    right: ").concat(u,"px ").concat(r,";\n  }\n  \n  .").concat(h," {\n    margin-right: ").concat(u,"px ").concat(r,";\n  }\n  \n  .").concat(v," .").concat(v," {\n    right: 0 ").concat(r,";\n  }\n  \n  .").concat(h," .").concat(h," {\n    margin-right: 0 ").concat(r,";\n  }\n  \n  body[").concat(x,"] {\n    ").concat("--removed-body-scroll-bar-size",": ").concat(u,"px;\n  }\n")},P=function(){var e=parseInt(document.body.getAttribute(x)||"0",10);return isFinite(e)?e:0},W=function(){f.useEffect(function(){return document.body.setAttribute(x,(P()+1).toString()),function(){var e=P()-1;e<=0?document.body.removeAttribute(x):document.body.setAttribute(x,e.toString())}},[])},I=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,o=void 0===r?"margin":r;W();var a=f.useMemo(function(){return M(o)},[o]);return f.createElement(R,{styles:T(a,!t,o,n?"":"!important")})},O=!1;if("undefined"!=typeof window)try{var F=Object.defineProperty({},"passive",{get:function(){return O=!0,!0}});window.addEventListener("test",F,F),window.removeEventListener("test",F,F)}catch(e){O=!1}var j=!!O&&{passive:!1},B=function(e,t){if(!(e instanceof Element))return!1;var n=window.getComputedStyle(e);return"hidden"!==n[t]&&!(n.overflowY===n.overflowX&&"TEXTAREA"!==e.tagName&&"visible"===n[t])},D=function(e,t){var n=t.ownerDocument,r=t;do{if("undefined"!=typeof ShadowRoot&&r instanceof ShadowRoot&&(r=r.host),K(e,r)){var o=_(e,r);if(o[1]>o[2])return!0}r=r.parentNode}while(r&&r!==n.body);return!1},K=function(e,t){return"v"===e?B(t,"overflowY"):B(t,"overflowX")},_=function(e,t){return"v"===e?[t.scrollTop,t.scrollHeight,t.clientHeight]:[t.scrollLeft,t.scrollWidth,t.clientWidth]},X=function(e,t,n,r,o){var a,c=(a=window.getComputedStyle(t).direction,"h"===e&&"rtl"===a?-1:1),u=c*r,i=n.target,l=t.contains(i),d=!1,s=u>0,f=0,v=0;do{var h=_(e,i),m=h[0],p=h[1]-h[2]-c*m;(m||p)&&K(e,i)&&(f+=p,v+=m),i instanceof ShadowRoot?i=i.host:i=i.parentNode}while(!l&&i!==document.body||l&&(t.contains(i)||t===i));return s&&(o&&1>Math.abs(f)||!o&&u>f)?d=!0:!s&&(o&&1>Math.abs(v)||!o&&-u>v)&&(d=!0),d},Y=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},Z=function(e){return[e.deltaX,e.deltaY]},H=function(e){return e&&"current"in e?e.current:e},q=0,z=[],U=(l=function(e){var t=f.useRef([]),n=f.useRef([0,0]),r=f.useRef(),o=f.useState(q++)[0],a=f.useState(k)[0],c=f.useRef(e);f.useEffect(function(){c.current=e},[e]),f.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var t=(function(e,t,n){if(n||2==arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))})([e.lockRef.current],(e.shards||[]).map(H),!0).filter(Boolean);return t.forEach(function(e){return e.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),t.forEach(function(e){return e.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var u=f.useCallback(function(e,t){if("touches"in e&&2===e.touches.length||"wheel"===e.type&&e.ctrlKey)return!c.current.allowPinchZoom;var o,a=Y(e),u=n.current,i="deltaX"in e?e.deltaX:u[0]-a[0],l="deltaY"in e?e.deltaY:u[1]-a[1],d=e.target,s=Math.abs(i)>Math.abs(l)?"h":"v";if("touches"in e&&"h"===s&&"range"===d.type)return!1;var f=D(s,d);if(!f)return!0;if(f?o=s:(o="v"===s?"h":"v",f=D(s,d)),!f)return!1;if(!r.current&&"changedTouches"in e&&(i||l)&&(r.current=o),!o)return!0;var v=r.current||o;return X(v,t,e,"h"===v?i:l,!0)},[]),i=f.useCallback(function(e){if(z.length&&z[z.length-1]===a){var n="deltaY"in e?Z(e):Y(e),r=t.current.filter(function(t){var r;return t.name===e.type&&(t.target===e.target||e.target===t.shadowParent)&&(r=t.delta)[0]===n[0]&&r[1]===n[1]})[0];if(r&&r.should){e.cancelable&&e.preventDefault();return}if(!r){var o=(c.current.shards||[]).map(H).filter(Boolean).filter(function(t){return t.contains(e.target)});(o.length>0?u(e,o[0]):!c.current.noIsolation)&&e.cancelable&&e.preventDefault()}}},[]),l=f.useCallback(function(e,n,r,o){var a={name:e,delta:n,target:r,should:o,shadowParent:function(e){for(var t=null;null!==e;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}(r)};t.current.push(a),setTimeout(function(){t.current=t.current.filter(function(e){return e!==a})},1)},[]),d=f.useCallback(function(e){n.current=Y(e),r.current=void 0},[]),s=f.useCallback(function(t){l(t.type,Z(t),t.target,u(t,e.lockRef.current))},[]),v=f.useCallback(function(t){l(t.type,Y(t),t.target,u(t,e.lockRef.current))},[]);f.useEffect(function(){return z.push(a),e.setCallbacks({onScrollCapture:s,onWheelCapture:s,onTouchMoveCapture:v}),document.addEventListener("wheel",i,j),document.addEventListener("touchmove",i,j),document.addEventListener("touchstart",d,j),function(){z=z.filter(function(e){return e!==a}),document.removeEventListener("wheel",i,j),document.removeEventListener("touchmove",i,j),document.removeEventListener("touchstart",d,j)}},[]);var h=e.removeScrollBar,m=e.inert;return f.createElement(f.Fragment,null,m?f.createElement(a,{styles:"\n  .block-interactivity-".concat(o," {pointer-events: none;}\n  .allow-interactivity-").concat(o," {pointer-events: all;}\n")}):null,h?f.createElement(I,{gapMode:e.gapMode}):null)},y.useMedium(l),w),$=f.forwardRef(function(e,t){return f.createElement(b,d({},e,{ref:t,sideCar:U}))});$.classNames=b.classNames;var V=$},86097:function(e,t,n){n.d(t,{EW:function(){return a}});var r=n(2265),o=0;function a(){r.useEffect(()=>{var e,t;let n=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",null!==(e=n[0])&&void 0!==e?e:c()),document.body.insertAdjacentElement("beforeend",null!==(t=n[1])&&void 0!==t?t:c()),o++,()=>{1===o&&document.querySelectorAll("[data-radix-focus-guard]").forEach(e=>e.remove()),o--}},[])}function c(){let e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.outline="none",e.style.opacity="0",e.style.position="fixed",e.style.pointerEvents="none",e}},99103:function(e,t,n){let r;n.d(t,{M:function(){return f}});var o=n(2265),a=n(98575),c=n(66840),u=n(26606),i=n(57437),l="focusScope.autoFocusOnMount",d="focusScope.autoFocusOnUnmount",s={bubbles:!1,cancelable:!0},f=o.forwardRef((e,t)=>{let{loop:n=!1,trapped:r=!1,onMountAutoFocus:f,onUnmountAutoFocus:g,...y}=e,[E,b]=o.useState(null),w=(0,u.W)(f),S=(0,u.W)(g),C=o.useRef(null),k=(0,a.e)(t,e=>b(e)),A=o.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;o.useEffect(()=>{if(r){let e=function(e){if(A.paused||!E)return;let t=e.target;E.contains(t)?C.current=t:m(C.current,{select:!0})},t=function(e){if(A.paused||!E)return;let t=e.relatedTarget;null===t||E.contains(t)||m(C.current,{select:!0})};document.addEventListener("focusin",e),document.addEventListener("focusout",t);let n=new MutationObserver(function(e){if(document.activeElement===document.body)for(let t of e)t.removedNodes.length>0&&m(E)});return E&&n.observe(E,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",e),document.removeEventListener("focusout",t),n.disconnect()}}},[r,E,A.paused]),o.useEffect(()=>{if(E){p.add(A);let e=document.activeElement;if(!E.contains(e)){let t=new CustomEvent(l,s);E.addEventListener(l,w),E.dispatchEvent(t),t.defaultPrevented||(function(e){let{select:t=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=document.activeElement;for(let r of e)if(m(r,{select:t}),document.activeElement!==n)return}(v(E).filter(e=>"A"!==e.tagName),{select:!0}),document.activeElement===e&&m(E))}return()=>{E.removeEventListener(l,w),setTimeout(()=>{let t=new CustomEvent(d,s);E.addEventListener(d,S),E.dispatchEvent(t),t.defaultPrevented||m(null!=e?e:document.body,{select:!0}),E.removeEventListener(d,S),p.remove(A)},0)}}},[E,w,S,A]);let N=o.useCallback(e=>{if(!n&&!r||A.paused)return;let t="Tab"===e.key&&!e.altKey&&!e.ctrlKey&&!e.metaKey,o=document.activeElement;if(t&&o){let t=e.currentTarget,[r,a]=function(e){let t=v(e);return[h(t,e),h(t.reverse(),e)]}(t);r&&a?e.shiftKey||o!==a?e.shiftKey&&o===r&&(e.preventDefault(),n&&m(a,{select:!0})):(e.preventDefault(),n&&m(r,{select:!0})):o===t&&e.preventDefault()}},[n,r,A.paused]);return(0,i.jsx)(c.WV.div,{tabIndex:-1,...y,ref:k,onKeyDown:N})});function v(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>{let t="INPUT"===e.tagName&&"hidden"===e.type;return e.disabled||e.hidden||t?NodeFilter.FILTER_SKIP:e.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function h(e,t){for(let n of e)if(!function(e,t){let{upTo:n}=t;if("hidden"===getComputedStyle(e).visibility)return!0;for(;e&&(void 0===n||e!==n);){if("none"===getComputedStyle(e).display)return!0;e=e.parentElement}return!1}(n,{upTo:t}))return n}function m(e){let{select:t=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(e&&e.focus){var n;let r=document.activeElement;e.focus({preventScroll:!0}),e!==r&&(n=e)instanceof HTMLInputElement&&"select"in n&&t&&e.select()}}f.displayName="FocusScope";var p=(r=[],{add(e){let t=r[0];e!==t&&(null==t||t.pause()),(r=g(r,e)).unshift(e)},remove(e){var t;null===(t=(r=g(r,e))[0])||void 0===t||t.resume()}});function g(e,t){let n=[...e],r=n.indexOf(t);return -1!==r&&n.splice(r,1),n}},99255:function(e,t,n){n.d(t,{M:function(){return i}});var r,o=n(2265),a=n(61188),c=(r||(r=n.t(o,2)))["useId".toString()]||(()=>void 0),u=0;function i(e){let[t,n]=o.useState(c());return(0,a.b)(()=>{e||n(e=>e??String(u++))},[e]),e||(t?`radix-${t}`:"")}}}]);