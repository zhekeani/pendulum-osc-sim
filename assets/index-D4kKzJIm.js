var Mi=Object.defineProperty;var Si=(t,e,n)=>e in t?Mi(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var z=(t,e,n)=>Si(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const Bn=t=>{let e=an(t.clientWidth),n=an(t.clientHeight);return t.width!=e||t.height!=n?(t.width=e,t.height=n,!0):!1},an=t=>{const e=window.devicePixelRatio||1;return Math.floor(t*e)},ln=(t,e)=>{let n=e.drawingBufferWidth/e.drawingBufferHeight;n<1&&(n=1/n);let i=Math.round(t),r=Math.round(t*n);return e.drawingBufferWidth>e.drawingBufferHeight?{width:r,height:i}:{width:i,height:r}},$i=t=>{const e={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},n=t.getContext("webgl2",e);if(!n)return null;n.getExtension("EXT_color_buffer_float");const i=!!n.getExtension("OES_texture_float_linear");n.clearColor(0,0,0,1);const r=n.HALF_FLOAT,o=Mt(n,n.RGBA16F,n.RGBA,r),s=Mt(n,n.RG16F,n.RG,r),a=Mt(n,n.R16F,n.RED,r);return{gl:n,ext:{formatRGBA:o,formatRG:s,formatR:a,halfFloatTexType:r,supportLinearFiltering:i}}};function Mt(t,e,n,i){if(!Ci(t,e,n,i))switch(e){case t.R16F:return Mt(t,t.RG16F,t.RG,i);case t.RG16F:return Mt(t,t.RGBA16F,t.RGBA,i);default:return null}return{internalFormat:e,format:n}}function Ci(t,e,n,i){let r=t.createTexture();t.bindTexture(t.TEXTURE_2D,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,e,4,4,0,n,i,null);let o=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,o),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0),t.checkFramebufferStatus(t.FRAMEBUFFER)==t.FRAMEBUFFER_COMPLETE}const Ti=t=>{const e=t.getContext("2d");e&&(e.clearRect(0,0,t.width,t.height),e.font="20px Arial",e.fillStyle="red",e.fillText("WebGL2 is not supported in your browser.",20,50)),alert(`
    WebGL2 is not supported in your browser or on your machine. 
    Possible reasons include:
    - Your browser is outdated. Please update to the latest version.
    - WebGL2 might be disabled in your browser settings.
    - Your GPU drivers are outdated. Please update to the latest drivers.
    - Your machine's hardware may not support WebGL2.
    
    You can try using a different browser such as Chrome or Firefox, or update your current one.
  `),console.error("WebGL2 is not supported. Please check browser and hardware compatibility.")};function Yt(t,e){return t==null||e==null?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function Ri(t,e){return t==null||e==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function Un(t){let e,n,i;t.length!==2?(e=Yt,n=(a,u)=>Yt(t(a),u),i=(a,u)=>t(a)-u):(e=t===Yt||t===Ri?t:Fi,n=t,i=t);function r(a,u,l=0,c=a.length){if(l<c){if(e(u,u)!==0)return c;do{const f=l+c>>>1;n(a[f],u)<0?l=f+1:c=f}while(l<c)}return l}function o(a,u,l=0,c=a.length){if(l<c){if(e(u,u)!==0)return c;do{const f=l+c>>>1;n(a[f],u)<=0?l=f+1:c=f}while(l<c)}return l}function s(a,u,l=0,c=a.length){const f=r(a,u,l,c-1);return f>l&&i(a[f-1],u)>-i(a[f],u)?f-1:f}return{left:r,center:s,right:o}}function Fi(){return 0}function ki(t){return t===null?NaN:+t}const Li=Un(Yt),Pi=Li.right;Un(ki).center;const Ii=Math.sqrt(50),Ni=Math.sqrt(10),Di=Math.sqrt(2);function Kt(t,e,n){const i=(e-t)/Math.max(0,n),r=Math.floor(Math.log10(i)),o=i/Math.pow(10,r),s=o>=Ii?10:o>=Ni?5:o>=Di?2:1;let a,u,l;return r<0?(l=Math.pow(10,-r)/s,a=Math.round(t*l),u=Math.round(e*l),a/l<t&&++a,u/l>e&&--u,l=-l):(l=Math.pow(10,r)*s,a=Math.round(t/l),u=Math.round(e/l),a*l<t&&++a,u*l>e&&--u),u<a&&.5<=n&&n<2?Kt(t,e,n*2):[a,u,l]}function Bi(t,e,n){if(e=+e,t=+t,n=+n,!(n>0))return[];if(t===e)return[t];const i=e<t,[r,o,s]=i?Kt(e,t,n):Kt(t,e,n);if(!(o>=r))return[];const a=o-r+1,u=new Array(a);if(i)if(s<0)for(let l=0;l<a;++l)u[l]=(o-l)/-s;else for(let l=0;l<a;++l)u[l]=(o-l)*s;else if(s<0)for(let l=0;l<a;++l)u[l]=(r+l)/-s;else for(let l=0;l<a;++l)u[l]=(r+l)*s;return u}function Re(t,e,n){return e=+e,t=+t,n=+n,Kt(t,e,n)[2]}function Ui(t,e,n){e=+e,t=+t,n=+n;const i=e<t,r=i?Re(e,t,n):Re(t,e,n);return(i?-1:1)*(r<0?1/-r:r)}function Oi(t){return t}var we=1,_e=2,Fe=3,_t=4,un=1e-6;function zi(t){return"translate("+t+",0)"}function Hi(t){return"translate(0,"+t+")"}function Vi(t){return e=>+t(e)}function Gi(t,e){return e=Math.max(0,t.bandwidth()-e*2)/2,t.round()&&(e=Math.round(e)),n=>+t(n)+e}function Yi(){return!this.__axis}function On(t,e){var n=[],i=null,r=null,o=6,s=6,a=3,u=typeof window<"u"&&window.devicePixelRatio>1?0:.5,l=t===we||t===_t?-1:1,c=t===_t||t===_e?"x":"y",f=t===we||t===Fe?zi:Hi;function h(d){var g=i??(e.ticks?e.ticks.apply(e,n):e.domain()),v=r??(e.tickFormat?e.tickFormat.apply(e,n):Oi),w=Math.max(o,0)+a,m=e.range(),p=+m[0]+u,x=+m[m.length-1]+u,A=(e.bandwidth?Gi:Vi)(e.copy(),u),b=d.selection?d.selection():d,T=b.selectAll(".domain").data([null]),C=b.selectAll(".tick").data(g,e).order(),L=C.exit(),P=C.enter().append("g").attr("class","tick"),R=C.select("line"),_=C.select("text");T=T.merge(T.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),C=C.merge(P),R=R.merge(P.append("line").attr("stroke","currentColor").attr(c+"2",l*o)),_=_.merge(P.append("text").attr("fill","currentColor").attr(c,l*w).attr("dy",t===we?"0em":t===Fe?"0.71em":"0.32em")),d!==b&&(T=T.transition(d),C=C.transition(d),R=R.transition(d),_=_.transition(d),L=L.transition(d).attr("opacity",un).attr("transform",function(M){return isFinite(M=A(M))?f(M+u):this.getAttribute("transform")}),P.attr("opacity",un).attr("transform",function(M){var y=this.parentNode.__axis;return f((y&&isFinite(y=y(M))?y:A(M))+u)})),L.remove(),T.attr("d",t===_t||t===_e?s?"M"+l*s+","+p+"H"+u+"V"+x+"H"+l*s:"M"+u+","+p+"V"+x:s?"M"+p+","+l*s+"V"+u+"H"+x+"V"+l*s:"M"+p+","+u+"H"+x),C.attr("opacity",1).attr("transform",function(M){return f(A(M)+u)}),R.attr(c+"2",l*o),_.attr(c,l*w).text(v),b.filter(Yi).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===_e?"start":t===_t?"end":"middle"),b.each(function(){this.__axis=A})}return h.scale=function(d){return arguments.length?(e=d,h):e},h.ticks=function(){return n=Array.from(arguments),h},h.tickArguments=function(d){return arguments.length?(n=d==null?[]:Array.from(d),h):n.slice()},h.tickValues=function(d){return arguments.length?(i=d==null?null:Array.from(d),h):i&&i.slice()},h.tickFormat=function(d){return arguments.length?(r=d,h):r},h.tickSize=function(d){return arguments.length?(o=s=+d,h):o},h.tickSizeInner=function(d){return arguments.length?(o=+d,h):o},h.tickSizeOuter=function(d){return arguments.length?(s=+d,h):s},h.tickPadding=function(d){return arguments.length?(a=+d,h):a},h.offset=function(d){return arguments.length?(u=+d,h):u},h}function Xi(t){return On(Fe,t)}function Wi(t){return On(_t,t)}var qi={value:()=>{}};function zn(){for(var t=0,e=arguments.length,n={},i;t<e;++t){if(!(i=arguments[t]+"")||i in n||/[\s.]/.test(i))throw new Error("illegal type: "+i);n[i]=[]}return new Xt(n)}function Xt(t){this._=t}function Ki(t,e){return t.trim().split(/^|\s+/).map(function(n){var i="",r=n.indexOf(".");if(r>=0&&(i=n.slice(r+1),n=n.slice(0,r)),n&&!e.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:i}})}Xt.prototype=zn.prototype={constructor:Xt,on:function(t,e){var n=this._,i=Ki(t+"",n),r,o=-1,s=i.length;if(arguments.length<2){for(;++o<s;)if((r=(t=i[o]).type)&&(r=Ji(n[r],t.name)))return r;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++o<s;)if(r=(t=i[o]).type)n[r]=cn(n[r],t.name,e);else if(e==null)for(r in n)n[r]=cn(n[r],t.name,null);return this},copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice();return new Xt(t)},call:function(t,e){if((r=arguments.length-2)>0)for(var n=new Array(r),i=0,r,o;i<r;++i)n[i]=arguments[i+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(o=this._[t],i=0,r=o.length;i<r;++i)o[i].value.apply(e,n)},apply:function(t,e,n){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var i=this._[t],r=0,o=i.length;r<o;++r)i[r].value.apply(e,n)}};function Ji(t,e){for(var n=0,i=t.length,r;n<i;++n)if((r=t[n]).name===e)return r.value}function cn(t,e,n){for(var i=0,r=t.length;i<r;++i)if(t[i].name===e){t[i]=qi,t=t.slice(0,i).concat(t.slice(i+1));break}return n!=null&&t.push({name:e,value:n}),t}var ke="http://www.w3.org/1999/xhtml";const hn={svg:"http://www.w3.org/2000/svg",xhtml:ke,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function ue(t){var e=t+="",n=e.indexOf(":");return n>=0&&(e=t.slice(0,n))!=="xmlns"&&(t=t.slice(n+1)),hn.hasOwnProperty(e)?{space:hn[e],local:t}:t}function Zi(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===ke&&e.documentElement.namespaceURI===ke?e.createElement(t):e.createElementNS(n,t)}}function Qi(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function Hn(t){var e=ue(t);return(e.local?Qi:Zi)(e)}function ji(){}function Ye(t){return t==null?ji:function(){return this.querySelector(t)}}function tr(t){typeof t!="function"&&(t=Ye(t));for(var e=this._groups,n=e.length,i=new Array(n),r=0;r<n;++r)for(var o=e[r],s=o.length,a=i[r]=new Array(s),u,l,c=0;c<s;++c)(u=o[c])&&(l=t.call(u,u.__data__,c,o))&&("__data__"in u&&(l.__data__=u.__data__),a[c]=l);return new B(i,this._parents)}function er(t){return t==null?[]:Array.isArray(t)?t:Array.from(t)}function nr(){return[]}function Vn(t){return t==null?nr:function(){return this.querySelectorAll(t)}}function ir(t){return function(){return er(t.apply(this,arguments))}}function rr(t){typeof t=="function"?t=ir(t):t=Vn(t);for(var e=this._groups,n=e.length,i=[],r=[],o=0;o<n;++o)for(var s=e[o],a=s.length,u,l=0;l<a;++l)(u=s[l])&&(i.push(t.call(u,u.__data__,l,s)),r.push(u));return new B(i,r)}function Gn(t){return function(){return this.matches(t)}}function Yn(t){return function(e){return e.matches(t)}}var or=Array.prototype.find;function sr(t){return function(){return or.call(this.children,t)}}function ar(){return this.firstElementChild}function lr(t){return this.select(t==null?ar:sr(typeof t=="function"?t:Yn(t)))}var ur=Array.prototype.filter;function cr(){return Array.from(this.children)}function hr(t){return function(){return ur.call(this.children,t)}}function fr(t){return this.selectAll(t==null?cr:hr(typeof t=="function"?t:Yn(t)))}function dr(t){typeof t!="function"&&(t=Gn(t));for(var e=this._groups,n=e.length,i=new Array(n),r=0;r<n;++r)for(var o=e[r],s=o.length,a=i[r]=[],u,l=0;l<s;++l)(u=o[l])&&t.call(u,u.__data__,l,o)&&a.push(u);return new B(i,this._parents)}function Xn(t){return new Array(t.length)}function pr(){return new B(this._enter||this._groups.map(Xn),this._parents)}function Jt(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}Jt.prototype={constructor:Jt,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function mr(t){return function(){return t}}function gr(t,e,n,i,r,o){for(var s=0,a,u=e.length,l=o.length;s<l;++s)(a=e[s])?(a.__data__=o[s],i[s]=a):n[s]=new Jt(t,o[s]);for(;s<u;++s)(a=e[s])&&(r[s]=a)}function vr(t,e,n,i,r,o,s){var a,u,l=new Map,c=e.length,f=o.length,h=new Array(c),d;for(a=0;a<c;++a)(u=e[a])&&(h[a]=d=s.call(u,u.__data__,a,e)+"",l.has(d)?r[a]=u:l.set(d,u));for(a=0;a<f;++a)d=s.call(t,o[a],a,o)+"",(u=l.get(d))?(i[a]=u,u.__data__=o[a],l.delete(d)):n[a]=new Jt(t,o[a]);for(a=0;a<c;++a)(u=e[a])&&l.get(h[a])===u&&(r[a]=u)}function xr(t){return t.__data__}function yr(t,e){if(!arguments.length)return Array.from(this,xr);var n=e?vr:gr,i=this._parents,r=this._groups;typeof t!="function"&&(t=mr(t));for(var o=r.length,s=new Array(o),a=new Array(o),u=new Array(o),l=0;l<o;++l){var c=i[l],f=r[l],h=f.length,d=wr(t.call(c,c&&c.__data__,l,i)),g=d.length,v=a[l]=new Array(g),w=s[l]=new Array(g),m=u[l]=new Array(h);n(c,f,v,w,m,d,e);for(var p=0,x=0,A,b;p<g;++p)if(A=v[p]){for(p>=x&&(x=p+1);!(b=w[x])&&++x<g;);A._next=b||null}}return s=new B(s,i),s._enter=a,s._exit=u,s}function wr(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function _r(){return new B(this._exit||this._groups.map(Xn),this._parents)}function Ar(t,e,n){var i=this.enter(),r=this,o=this.exit();return typeof t=="function"?(i=t(i),i&&(i=i.selection())):i=i.append(t+""),e!=null&&(r=e(r),r&&(r=r.selection())),n==null?o.remove():n(o),i&&r?i.merge(r).order():r}function br(t){for(var e=t.selection?t.selection():t,n=this._groups,i=e._groups,r=n.length,o=i.length,s=Math.min(r,o),a=new Array(r),u=0;u<s;++u)for(var l=n[u],c=i[u],f=l.length,h=a[u]=new Array(f),d,g=0;g<f;++g)(d=l[g]||c[g])&&(h[g]=d);for(;u<r;++u)a[u]=n[u];return new B(a,this._parents)}function Er(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var i=t[e],r=i.length-1,o=i[r],s;--r>=0;)(s=i[r])&&(o&&s.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(s,o),o=s);return this}function Mr(t){t||(t=Sr);function e(f,h){return f&&h?t(f.__data__,h.__data__):!f-!h}for(var n=this._groups,i=n.length,r=new Array(i),o=0;o<i;++o){for(var s=n[o],a=s.length,u=r[o]=new Array(a),l,c=0;c<a;++c)(l=s[c])&&(u[c]=l);u.sort(e)}return new B(r,this._parents).order()}function Sr(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function $r(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function Cr(){return Array.from(this)}function Tr(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var i=t[e],r=0,o=i.length;r<o;++r){var s=i[r];if(s)return s}return null}function Rr(){let t=0;for(const e of this)++t;return t}function Fr(){return!this.node()}function kr(t){for(var e=this._groups,n=0,i=e.length;n<i;++n)for(var r=e[n],o=0,s=r.length,a;o<s;++o)(a=r[o])&&t.call(a,a.__data__,o,r);return this}function Lr(t){return function(){this.removeAttribute(t)}}function Pr(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Ir(t,e){return function(){this.setAttribute(t,e)}}function Nr(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function Dr(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttribute(t):this.setAttribute(t,n)}}function Br(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}function Ur(t,e){var n=ue(t);if(arguments.length<2){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((e==null?n.local?Pr:Lr:typeof e=="function"?n.local?Br:Dr:n.local?Nr:Ir)(n,e))}function Wn(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function Or(t){return function(){this.style.removeProperty(t)}}function zr(t,e,n){return function(){this.style.setProperty(t,e,n)}}function Hr(t,e,n){return function(){var i=e.apply(this,arguments);i==null?this.style.removeProperty(t):this.style.setProperty(t,i,n)}}function Vr(t,e,n){return arguments.length>1?this.each((e==null?Or:typeof e=="function"?Hr:zr)(t,e,n??"")):vt(this.node(),t)}function vt(t,e){return t.style.getPropertyValue(e)||Wn(t).getComputedStyle(t,null).getPropertyValue(e)}function Gr(t){return function(){delete this[t]}}function Yr(t,e){return function(){this[t]=e}}function Xr(t,e){return function(){var n=e.apply(this,arguments);n==null?delete this[t]:this[t]=n}}function Wr(t,e){return arguments.length>1?this.each((e==null?Gr:typeof e=="function"?Xr:Yr)(t,e)):this.node()[t]}function qn(t){return t.trim().split(/^|\s+/)}function Xe(t){return t.classList||new Kn(t)}function Kn(t){this._node=t,this._names=qn(t.getAttribute("class")||"")}Kn.prototype={add:function(t){var e=this._names.indexOf(t);e<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function Jn(t,e){for(var n=Xe(t),i=-1,r=e.length;++i<r;)n.add(e[i])}function Zn(t,e){for(var n=Xe(t),i=-1,r=e.length;++i<r;)n.remove(e[i])}function qr(t){return function(){Jn(this,t)}}function Kr(t){return function(){Zn(this,t)}}function Jr(t,e){return function(){(e.apply(this,arguments)?Jn:Zn)(this,t)}}function Zr(t,e){var n=qn(t+"");if(arguments.length<2){for(var i=Xe(this.node()),r=-1,o=n.length;++r<o;)if(!i.contains(n[r]))return!1;return!0}return this.each((typeof e=="function"?Jr:e?qr:Kr)(n,e))}function Qr(){this.textContent=""}function jr(t){return function(){this.textContent=t}}function to(t){return function(){var e=t.apply(this,arguments);this.textContent=e??""}}function eo(t){return arguments.length?this.each(t==null?Qr:(typeof t=="function"?to:jr)(t)):this.node().textContent}function no(){this.innerHTML=""}function io(t){return function(){this.innerHTML=t}}function ro(t){return function(){var e=t.apply(this,arguments);this.innerHTML=e??""}}function oo(t){return arguments.length?this.each(t==null?no:(typeof t=="function"?ro:io)(t)):this.node().innerHTML}function so(){this.nextSibling&&this.parentNode.appendChild(this)}function ao(){return this.each(so)}function lo(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function uo(){return this.each(lo)}function co(t){var e=typeof t=="function"?t:Hn(t);return this.select(function(){return this.appendChild(e.apply(this,arguments))})}function ho(){return null}function fo(t,e){var n=typeof t=="function"?t:Hn(t),i=e==null?ho:typeof e=="function"?e:Ye(e);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})}function po(){var t=this.parentNode;t&&t.removeChild(this)}function mo(){return this.each(po)}function go(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function vo(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function xo(t){return this.select(t?vo:go)}function yo(t){return arguments.length?this.property("__data__",t):this.node().__data__}function wo(t){return function(e){t.call(this,e,this.__data__)}}function _o(t){return t.trim().split(/^|\s+/).map(function(e){var n="",i=e.indexOf(".");return i>=0&&(n=e.slice(i+1),e=e.slice(0,i)),{type:e,name:n}})}function Ao(t){return function(){var e=this.__on;if(e){for(var n=0,i=-1,r=e.length,o;n<r;++n)o=e[n],(!t.type||o.type===t.type)&&o.name===t.name?this.removeEventListener(o.type,o.listener,o.options):e[++i]=o;++i?e.length=i:delete this.__on}}}function bo(t,e,n){return function(){var i=this.__on,r,o=wo(e);if(i){for(var s=0,a=i.length;s<a;++s)if((r=i[s]).type===t.type&&r.name===t.name){this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=o,r.options=n),r.value=e;return}}this.addEventListener(t.type,o,n),r={type:t.type,name:t.name,value:e,listener:o,options:n},i?i.push(r):this.__on=[r]}}function Eo(t,e,n){var i=_o(t+""),r,o=i.length,s;if(arguments.length<2){var a=this.node().__on;if(a){for(var u=0,l=a.length,c;u<l;++u)for(r=0,c=a[u];r<o;++r)if((s=i[r]).type===c.type&&s.name===c.name)return c.value}return}for(a=e?bo:Ao,r=0;r<o;++r)this.each(a(i[r],e,n));return this}function Qn(t,e,n){var i=Wn(t),r=i.CustomEvent;typeof r=="function"?r=new r(e,n):(r=i.document.createEvent("Event"),n?(r.initEvent(e,n.bubbles,n.cancelable),r.detail=n.detail):r.initEvent(e,!1,!1)),t.dispatchEvent(r)}function Mo(t,e){return function(){return Qn(this,t,e)}}function So(t,e){return function(){return Qn(this,t,e.apply(this,arguments))}}function $o(t,e){return this.each((typeof e=="function"?So:Mo)(t,e))}function*Co(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var i=t[e],r=0,o=i.length,s;r<o;++r)(s=i[r])&&(yield s)}var jn=[null];function B(t,e){this._groups=t,this._parents=e}function Pt(){return new B([[document.documentElement]],jn)}function To(){return this}B.prototype=Pt.prototype={constructor:B,select:tr,selectAll:rr,selectChild:lr,selectChildren:fr,filter:dr,data:yr,enter:pr,exit:_r,join:Ar,merge:br,selection:To,order:Er,sort:Mr,call:$r,nodes:Cr,node:Tr,size:Rr,empty:Fr,each:kr,attr:Ur,style:Vr,property:Wr,classed:Zr,text:eo,html:oo,raise:ao,lower:uo,append:co,insert:fo,remove:mo,clone:xo,datum:yo,on:Eo,dispatch:$o,[Symbol.iterator]:Co};function $t(t){return typeof t=="string"?new B([[document.querySelector(t)]],[document.documentElement]):new B([[t]],jn)}function We(t,e,n){t.prototype=e.prototype=n,n.constructor=t}function ti(t,e){var n=Object.create(t.prototype);for(var i in e)n[i]=e[i];return n}function It(){}var Ct=.7,Zt=1/Ct,gt="\\s*([+-]?\\d+)\\s*",Tt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",q="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Ro=/^#([0-9a-f]{3,8})$/,Fo=new RegExp(`^rgb\\(${gt},${gt},${gt}\\)$`),ko=new RegExp(`^rgb\\(${q},${q},${q}\\)$`),Lo=new RegExp(`^rgba\\(${gt},${gt},${gt},${Tt}\\)$`),Po=new RegExp(`^rgba\\(${q},${q},${q},${Tt}\\)$`),Io=new RegExp(`^hsl\\(${Tt},${q},${q}\\)$`),No=new RegExp(`^hsla\\(${Tt},${q},${q},${Tt}\\)$`),fn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};We(It,ht,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:dn,formatHex:dn,formatHex8:Do,formatHsl:Bo,formatRgb:pn,toString:pn});function dn(){return this.rgb().formatHex()}function Do(){return this.rgb().formatHex8()}function Bo(){return ei(this).formatHsl()}function pn(){return this.rgb().formatRgb()}function ht(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=Ro.exec(t))?(n=e[1].length,e=parseInt(e[1],16),n===6?mn(e):n===3?new D(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):n===8?Ot(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):n===4?Ot(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=Fo.exec(t))?new D(e[1],e[2],e[3],1):(e=ko.exec(t))?new D(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=Lo.exec(t))?Ot(e[1],e[2],e[3],e[4]):(e=Po.exec(t))?Ot(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=Io.exec(t))?xn(e[1],e[2]/100,e[3]/100,1):(e=No.exec(t))?xn(e[1],e[2]/100,e[3]/100,e[4]):fn.hasOwnProperty(t)?mn(fn[t]):t==="transparent"?new D(NaN,NaN,NaN,0):null}function mn(t){return new D(t>>16&255,t>>8&255,t&255,1)}function Ot(t,e,n,i){return i<=0&&(t=e=n=NaN),new D(t,e,n,i)}function Uo(t){return t instanceof It||(t=ht(t)),t?(t=t.rgb(),new D(t.r,t.g,t.b,t.opacity)):new D}function Le(t,e,n,i){return arguments.length===1?Uo(t):new D(t,e,n,i??1)}function D(t,e,n,i){this.r=+t,this.g=+e,this.b=+n,this.opacity=+i}We(D,Le,ti(It,{brighter(t){return t=t==null?Zt:Math.pow(Zt,t),new D(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?Ct:Math.pow(Ct,t),new D(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new D(ct(this.r),ct(this.g),ct(this.b),Qt(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:gn,formatHex:gn,formatHex8:Oo,formatRgb:vn,toString:vn}));function gn(){return`#${ut(this.r)}${ut(this.g)}${ut(this.b)}`}function Oo(){return`#${ut(this.r)}${ut(this.g)}${ut(this.b)}${ut((isNaN(this.opacity)?1:this.opacity)*255)}`}function vn(){const t=Qt(this.opacity);return`${t===1?"rgb(":"rgba("}${ct(this.r)}, ${ct(this.g)}, ${ct(this.b)}${t===1?")":`, ${t})`}`}function Qt(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function ct(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function ut(t){return t=ct(t),(t<16?"0":"")+t.toString(16)}function xn(t,e,n,i){return i<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new G(t,e,n,i)}function ei(t){if(t instanceof G)return new G(t.h,t.s,t.l,t.opacity);if(t instanceof It||(t=ht(t)),!t)return new G;if(t instanceof G)return t;t=t.rgb();var e=t.r/255,n=t.g/255,i=t.b/255,r=Math.min(e,n,i),o=Math.max(e,n,i),s=NaN,a=o-r,u=(o+r)/2;return a?(e===o?s=(n-i)/a+(n<i)*6:n===o?s=(i-e)/a+2:s=(e-n)/a+4,a/=u<.5?o+r:2-o-r,s*=60):a=u>0&&u<1?0:s,new G(s,a,u,t.opacity)}function zo(t,e,n,i){return arguments.length===1?ei(t):new G(t,e,n,i??1)}function G(t,e,n,i){this.h=+t,this.s=+e,this.l=+n,this.opacity=+i}We(G,zo,ti(It,{brighter(t){return t=t==null?Zt:Math.pow(Zt,t),new G(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?Ct:Math.pow(Ct,t),new G(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,i=n+(n<.5?n:1-n)*e,r=2*n-i;return new D(Ae(t>=240?t-240:t+120,r,i),Ae(t,r,i),Ae(t<120?t+240:t-120,r,i),this.opacity)},clamp(){return new G(yn(this.h),zt(this.s),zt(this.l),Qt(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=Qt(this.opacity);return`${t===1?"hsl(":"hsla("}${yn(this.h)}, ${zt(this.s)*100}%, ${zt(this.l)*100}%${t===1?")":`, ${t})`}`}}));function yn(t){return t=(t||0)%360,t<0?t+360:t}function zt(t){return Math.max(0,Math.min(1,t||0))}function Ae(t,e,n){return(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)*255}const qe=t=>()=>t;function Ho(t,e){return function(n){return t+n*e}}function Vo(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(i){return Math.pow(t+i*e,n)}}function Go(t){return(t=+t)==1?ni:function(e,n){return n-e?Vo(e,n,t):qe(isNaN(e)?n:e)}}function ni(t,e){var n=e-t;return n?Ho(t,n):qe(isNaN(t)?e:t)}const jt=function t(e){var n=Go(e);function i(r,o){var s=n((r=Le(r)).r,(o=Le(o)).r),a=n(r.g,o.g),u=n(r.b,o.b),l=ni(r.opacity,o.opacity);return function(c){return r.r=s(c),r.g=a(c),r.b=u(c),r.opacity=l(c),r+""}}return i.gamma=t,i}(1);function Yo(t,e){e||(e=[]);var n=t?Math.min(e.length,t.length):0,i=e.slice(),r;return function(o){for(r=0;r<n;++r)i[r]=t[r]*(1-o)+e[r]*o;return i}}function Xo(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function Wo(t,e){var n=e?e.length:0,i=t?Math.min(n,t.length):0,r=new Array(i),o=new Array(n),s;for(s=0;s<i;++s)r[s]=Ke(t[s],e[s]);for(;s<n;++s)o[s]=e[s];return function(a){for(s=0;s<i;++s)o[s]=r[s](a);return o}}function qo(t,e){var n=new Date;return t=+t,e=+e,function(i){return n.setTime(t*(1-i)+e*i),n}}function V(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n}}function Ko(t,e){var n={},i={},r;(t===null||typeof t!="object")&&(t={}),(e===null||typeof e!="object")&&(e={});for(r in e)r in t?n[r]=Ke(t[r],e[r]):i[r]=e[r];return function(o){for(r in n)i[r]=n[r](o);return i}}var Pe=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,be=new RegExp(Pe.source,"g");function Jo(t){return function(){return t}}function Zo(t){return function(e){return t(e)+""}}function ii(t,e){var n=Pe.lastIndex=be.lastIndex=0,i,r,o,s=-1,a=[],u=[];for(t=t+"",e=e+"";(i=Pe.exec(t))&&(r=be.exec(e));)(o=r.index)>n&&(o=e.slice(n,o),a[s]?a[s]+=o:a[++s]=o),(i=i[0])===(r=r[0])?a[s]?a[s]+=r:a[++s]=r:(a[++s]=null,u.push({i:s,x:V(i,r)})),n=be.lastIndex;return n<e.length&&(o=e.slice(n),a[s]?a[s]+=o:a[++s]=o),a.length<2?u[0]?Zo(u[0].x):Jo(e):(e=u.length,function(l){for(var c=0,f;c<e;++c)a[(f=u[c]).i]=f.x(l);return a.join("")})}function Ke(t,e){var n=typeof e,i;return e==null||n==="boolean"?qe(e):(n==="number"?V:n==="string"?(i=ht(e))?(e=i,jt):ii:e instanceof ht?jt:e instanceof Date?qo:Xo(e)?Yo:Array.isArray(e)?Wo:typeof e.valueOf!="function"&&typeof e.toString!="function"||isNaN(e)?Ko:V)(t,e)}function Qo(t,e){return t=+t,e=+e,function(n){return Math.round(t*(1-n)+e*n)}}var wn=180/Math.PI,Ie={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function ri(t,e,n,i,r,o){var s,a,u;return(s=Math.sqrt(t*t+e*e))&&(t/=s,e/=s),(u=t*n+e*i)&&(n-=t*u,i-=e*u),(a=Math.sqrt(n*n+i*i))&&(n/=a,i/=a,u/=a),t*i<e*n&&(t=-t,e=-e,u=-u,s=-s),{translateX:r,translateY:o,rotate:Math.atan2(e,t)*wn,skewX:Math.atan(u)*wn,scaleX:s,scaleY:a}}var Ht;function jo(t){const e=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(t+"");return e.isIdentity?Ie:ri(e.a,e.b,e.c,e.d,e.e,e.f)}function ts(t){return t==null||(Ht||(Ht=document.createElementNS("http://www.w3.org/2000/svg","g")),Ht.setAttribute("transform",t),!(t=Ht.transform.baseVal.consolidate()))?Ie:(t=t.matrix,ri(t.a,t.b,t.c,t.d,t.e,t.f))}function oi(t,e,n,i){function r(l){return l.length?l.pop()+" ":""}function o(l,c,f,h,d,g){if(l!==f||c!==h){var v=d.push("translate(",null,e,null,n);g.push({i:v-4,x:V(l,f)},{i:v-2,x:V(c,h)})}else(f||h)&&d.push("translate("+f+e+h+n)}function s(l,c,f,h){l!==c?(l-c>180?c+=360:c-l>180&&(l+=360),h.push({i:f.push(r(f)+"rotate(",null,i)-2,x:V(l,c)})):c&&f.push(r(f)+"rotate("+c+i)}function a(l,c,f,h){l!==c?h.push({i:f.push(r(f)+"skewX(",null,i)-2,x:V(l,c)}):c&&f.push(r(f)+"skewX("+c+i)}function u(l,c,f,h,d,g){if(l!==f||c!==h){var v=d.push(r(d)+"scale(",null,",",null,")");g.push({i:v-4,x:V(l,f)},{i:v-2,x:V(c,h)})}else(f!==1||h!==1)&&d.push(r(d)+"scale("+f+","+h+")")}return function(l,c){var f=[],h=[];return l=t(l),c=t(c),o(l.translateX,l.translateY,c.translateX,c.translateY,f,h),s(l.rotate,c.rotate,f,h),a(l.skewX,c.skewX,f,h),u(l.scaleX,l.scaleY,c.scaleX,c.scaleY,f,h),l=c=null,function(d){for(var g=-1,v=h.length,w;++g<v;)f[(w=h[g]).i]=w.x(d);return f.join("")}}}var es=oi(jo,"px, ","px)","deg)"),ns=oi(ts,", ",")",")"),xt=0,At=0,wt=0,si=1e3,te,bt,ee=0,ft=0,ce=0,Rt=typeof performance=="object"&&performance.now?performance:Date,ai=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function Je(){return ft||(ai(is),ft=Rt.now()+ce)}function is(){ft=0}function ne(){this._call=this._time=this._next=null}ne.prototype=li.prototype={constructor:ne,restart:function(t,e,n){if(typeof t!="function")throw new TypeError("callback is not a function");n=(n==null?Je():+n)+(e==null?0:+e),!this._next&&bt!==this&&(bt?bt._next=this:te=this,bt=this),this._call=t,this._time=n,Ne()},stop:function(){this._call&&(this._call=null,this._time=1/0,Ne())}};function li(t,e,n){var i=new ne;return i.restart(t,e,n),i}function rs(){Je(),++xt;for(var t=te,e;t;)(e=ft-t._time)>=0&&t._call.call(void 0,e),t=t._next;--xt}function _n(){ft=(ee=Rt.now())+ce,xt=At=0;try{rs()}finally{xt=0,ss(),ft=0}}function os(){var t=Rt.now(),e=t-ee;e>si&&(ce-=e,ee=t)}function ss(){for(var t,e=te,n,i=1/0;e;)e._call?(i>e._time&&(i=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:te=n);bt=t,Ne(i)}function Ne(t){if(!xt){At&&(At=clearTimeout(At));var e=t-ft;e>24?(t<1/0&&(At=setTimeout(_n,t-Rt.now()-ce)),wt&&(wt=clearInterval(wt))):(wt||(ee=Rt.now(),wt=setInterval(os,si)),xt=1,ai(_n))}}function An(t,e,n){var i=new ne;return e=e==null?0:+e,i.restart(r=>{i.stop(),t(r+e)},e,n),i}var as=zn("start","end","cancel","interrupt"),ls=[],ui=0,bn=1,De=2,Wt=3,En=4,Be=5,qt=6;function he(t,e,n,i,r,o){var s=t.__transition;if(!s)t.__transition={};else if(n in s)return;us(t,n,{name:e,index:i,group:r,on:as,tween:ls,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:ui})}function Ze(t,e){var n=Y(t,e);if(n.state>ui)throw new Error("too late; already scheduled");return n}function J(t,e){var n=Y(t,e);if(n.state>Wt)throw new Error("too late; already running");return n}function Y(t,e){var n=t.__transition;if(!n||!(n=n[e]))throw new Error("transition not found");return n}function us(t,e,n){var i=t.__transition,r;i[e]=n,n.timer=li(o,0,n.time);function o(l){n.state=bn,n.timer.restart(s,n.delay,n.time),n.delay<=l&&s(l-n.delay)}function s(l){var c,f,h,d;if(n.state!==bn)return u();for(c in i)if(d=i[c],d.name===n.name){if(d.state===Wt)return An(s);d.state===En?(d.state=qt,d.timer.stop(),d.on.call("interrupt",t,t.__data__,d.index,d.group),delete i[c]):+c<e&&(d.state=qt,d.timer.stop(),d.on.call("cancel",t,t.__data__,d.index,d.group),delete i[c])}if(An(function(){n.state===Wt&&(n.state=En,n.timer.restart(a,n.delay,n.time),a(l))}),n.state=De,n.on.call("start",t,t.__data__,n.index,n.group),n.state===De){for(n.state=Wt,r=new Array(h=n.tween.length),c=0,f=-1;c<h;++c)(d=n.tween[c].value.call(t,t.__data__,n.index,n.group))&&(r[++f]=d);r.length=f+1}}function a(l){for(var c=l<n.duration?n.ease.call(null,l/n.duration):(n.timer.restart(u),n.state=Be,1),f=-1,h=r.length;++f<h;)r[f].call(t,c);n.state===Be&&(n.on.call("end",t,t.__data__,n.index,n.group),u())}function u(){n.state=qt,n.timer.stop(),delete i[e];for(var l in i)return;delete t.__transition}}function cs(t,e){var n=t.__transition,i,r,o=!0,s;if(n){e=e==null?null:e+"";for(s in n){if((i=n[s]).name!==e){o=!1;continue}r=i.state>De&&i.state<Be,i.state=qt,i.timer.stop(),i.on.call(r?"interrupt":"cancel",t,t.__data__,i.index,i.group),delete n[s]}o&&delete t.__transition}}function hs(t){return this.each(function(){cs(this,t)})}function fs(t,e){var n,i;return function(){var r=J(this,t),o=r.tween;if(o!==n){i=n=o;for(var s=0,a=i.length;s<a;++s)if(i[s].name===e){i=i.slice(),i.splice(s,1);break}}r.tween=i}}function ds(t,e,n){var i,r;if(typeof n!="function")throw new Error;return function(){var o=J(this,t),s=o.tween;if(s!==i){r=(i=s).slice();for(var a={name:e,value:n},u=0,l=r.length;u<l;++u)if(r[u].name===e){r[u]=a;break}u===l&&r.push(a)}o.tween=r}}function ps(t,e){var n=this._id;if(t+="",arguments.length<2){for(var i=Y(this.node(),n).tween,r=0,o=i.length,s;r<o;++r)if((s=i[r]).name===t)return s.value;return null}return this.each((e==null?fs:ds)(n,t,e))}function Qe(t,e,n){var i=t._id;return t.each(function(){var r=J(this,i);(r.value||(r.value={}))[e]=n.apply(this,arguments)}),function(r){return Y(r,i).value[e]}}function ci(t,e){var n;return(typeof e=="number"?V:e instanceof ht?jt:(n=ht(e))?(e=n,jt):ii)(t,e)}function ms(t){return function(){this.removeAttribute(t)}}function gs(t){return function(){this.removeAttributeNS(t.space,t.local)}}function vs(t,e,n){var i,r=n+"",o;return function(){var s=this.getAttribute(t);return s===r?null:s===i?o:o=e(i=s,n)}}function xs(t,e,n){var i,r=n+"",o;return function(){var s=this.getAttributeNS(t.space,t.local);return s===r?null:s===i?o:o=e(i=s,n)}}function ys(t,e,n){var i,r,o;return function(){var s,a=n(this),u;return a==null?void this.removeAttribute(t):(s=this.getAttribute(t),u=a+"",s===u?null:s===i&&u===r?o:(r=u,o=e(i=s,a)))}}function ws(t,e,n){var i,r,o;return function(){var s,a=n(this),u;return a==null?void this.removeAttributeNS(t.space,t.local):(s=this.getAttributeNS(t.space,t.local),u=a+"",s===u?null:s===i&&u===r?o:(r=u,o=e(i=s,a)))}}function _s(t,e){var n=ue(t),i=n==="transform"?ns:ci;return this.attrTween(t,typeof e=="function"?(n.local?ws:ys)(n,i,Qe(this,"attr."+t,e)):e==null?(n.local?gs:ms)(n):(n.local?xs:vs)(n,i,e))}function As(t,e){return function(n){this.setAttribute(t,e.call(this,n))}}function bs(t,e){return function(n){this.setAttributeNS(t.space,t.local,e.call(this,n))}}function Es(t,e){var n,i;function r(){var o=e.apply(this,arguments);return o!==i&&(n=(i=o)&&bs(t,o)),n}return r._value=e,r}function Ms(t,e){var n,i;function r(){var o=e.apply(this,arguments);return o!==i&&(n=(i=o)&&As(t,o)),n}return r._value=e,r}function Ss(t,e){var n="attr."+t;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(e==null)return this.tween(n,null);if(typeof e!="function")throw new Error;var i=ue(t);return this.tween(n,(i.local?Es:Ms)(i,e))}function $s(t,e){return function(){Ze(this,t).delay=+e.apply(this,arguments)}}function Cs(t,e){return e=+e,function(){Ze(this,t).delay=e}}function Ts(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?$s:Cs)(e,t)):Y(this.node(),e).delay}function Rs(t,e){return function(){J(this,t).duration=+e.apply(this,arguments)}}function Fs(t,e){return e=+e,function(){J(this,t).duration=e}}function ks(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?Rs:Fs)(e,t)):Y(this.node(),e).duration}function Ls(t,e){if(typeof e!="function")throw new Error;return function(){J(this,t).ease=e}}function Ps(t){var e=this._id;return arguments.length?this.each(Ls(e,t)):Y(this.node(),e).ease}function Is(t,e){return function(){var n=e.apply(this,arguments);if(typeof n!="function")throw new Error;J(this,t).ease=n}}function Ns(t){if(typeof t!="function")throw new Error;return this.each(Is(this._id,t))}function Ds(t){typeof t!="function"&&(t=Gn(t));for(var e=this._groups,n=e.length,i=new Array(n),r=0;r<n;++r)for(var o=e[r],s=o.length,a=i[r]=[],u,l=0;l<s;++l)(u=o[l])&&t.call(u,u.__data__,l,o)&&a.push(u);return new it(i,this._parents,this._name,this._id)}function Bs(t){if(t._id!==this._id)throw new Error;for(var e=this._groups,n=t._groups,i=e.length,r=n.length,o=Math.min(i,r),s=new Array(i),a=0;a<o;++a)for(var u=e[a],l=n[a],c=u.length,f=s[a]=new Array(c),h,d=0;d<c;++d)(h=u[d]||l[d])&&(f[d]=h);for(;a<i;++a)s[a]=e[a];return new it(s,this._parents,this._name,this._id)}function Us(t){return(t+"").trim().split(/^|\s+/).every(function(e){var n=e.indexOf(".");return n>=0&&(e=e.slice(0,n)),!e||e==="start"})}function Os(t,e,n){var i,r,o=Us(e)?Ze:J;return function(){var s=o(this,t),a=s.on;a!==i&&(r=(i=a).copy()).on(e,n),s.on=r}}function zs(t,e){var n=this._id;return arguments.length<2?Y(this.node(),n).on.on(t):this.each(Os(n,t,e))}function Hs(t){return function(){var e=this.parentNode;for(var n in this.__transition)if(+n!==t)return;e&&e.removeChild(this)}}function Vs(){return this.on("end.remove",Hs(this._id))}function Gs(t){var e=this._name,n=this._id;typeof t!="function"&&(t=Ye(t));for(var i=this._groups,r=i.length,o=new Array(r),s=0;s<r;++s)for(var a=i[s],u=a.length,l=o[s]=new Array(u),c,f,h=0;h<u;++h)(c=a[h])&&(f=t.call(c,c.__data__,h,a))&&("__data__"in c&&(f.__data__=c.__data__),l[h]=f,he(l[h],e,n,h,l,Y(c,n)));return new it(o,this._parents,e,n)}function Ys(t){var e=this._name,n=this._id;typeof t!="function"&&(t=Vn(t));for(var i=this._groups,r=i.length,o=[],s=[],a=0;a<r;++a)for(var u=i[a],l=u.length,c,f=0;f<l;++f)if(c=u[f]){for(var h=t.call(c,c.__data__,f,u),d,g=Y(c,n),v=0,w=h.length;v<w;++v)(d=h[v])&&he(d,e,n,v,h,g);o.push(h),s.push(c)}return new it(o,s,e,n)}var Xs=Pt.prototype.constructor;function Ws(){return new Xs(this._groups,this._parents)}function qs(t,e){var n,i,r;return function(){var o=vt(this,t),s=(this.style.removeProperty(t),vt(this,t));return o===s?null:o===n&&s===i?r:r=e(n=o,i=s)}}function hi(t){return function(){this.style.removeProperty(t)}}function Ks(t,e,n){var i,r=n+"",o;return function(){var s=vt(this,t);return s===r?null:s===i?o:o=e(i=s,n)}}function Js(t,e,n){var i,r,o;return function(){var s=vt(this,t),a=n(this),u=a+"";return a==null&&(u=a=(this.style.removeProperty(t),vt(this,t))),s===u?null:s===i&&u===r?o:(r=u,o=e(i=s,a))}}function Zs(t,e){var n,i,r,o="style."+e,s="end."+o,a;return function(){var u=J(this,t),l=u.on,c=u.value[o]==null?a||(a=hi(e)):void 0;(l!==n||r!==c)&&(i=(n=l).copy()).on(s,r=c),u.on=i}}function Qs(t,e,n){var i=(t+="")=="transform"?es:ci;return e==null?this.styleTween(t,qs(t,i)).on("end.style."+t,hi(t)):typeof e=="function"?this.styleTween(t,Js(t,i,Qe(this,"style."+t,e))).each(Zs(this._id,t)):this.styleTween(t,Ks(t,i,e),n).on("end.style."+t,null)}function js(t,e,n){return function(i){this.style.setProperty(t,e.call(this,i),n)}}function ta(t,e,n){var i,r;function o(){var s=e.apply(this,arguments);return s!==r&&(i=(r=s)&&js(t,s,n)),i}return o._value=e,o}function ea(t,e,n){var i="style."+(t+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(e==null)return this.tween(i,null);if(typeof e!="function")throw new Error;return this.tween(i,ta(t,e,n??""))}function na(t){return function(){this.textContent=t}}function ia(t){return function(){var e=t(this);this.textContent=e??""}}function ra(t){return this.tween("text",typeof t=="function"?ia(Qe(this,"text",t)):na(t==null?"":t+""))}function oa(t){return function(e){this.textContent=t.call(this,e)}}function sa(t){var e,n;function i(){var r=t.apply(this,arguments);return r!==n&&(e=(n=r)&&oa(r)),e}return i._value=t,i}function aa(t){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;return this.tween(e,sa(t))}function la(){for(var t=this._name,e=this._id,n=fi(),i=this._groups,r=i.length,o=0;o<r;++o)for(var s=i[o],a=s.length,u,l=0;l<a;++l)if(u=s[l]){var c=Y(u,e);he(u,t,n,l,s,{time:c.time+c.delay+c.duration,delay:0,duration:c.duration,ease:c.ease})}return new it(i,this._parents,t,n)}function ua(){var t,e,n=this,i=n._id,r=n.size();return new Promise(function(o,s){var a={value:s},u={value:function(){--r===0&&o()}};n.each(function(){var l=J(this,i),c=l.on;c!==t&&(e=(t=c).copy(),e._.cancel.push(a),e._.interrupt.push(a),e._.end.push(u)),l.on=e}),r===0&&o()})}var ca=0;function it(t,e,n,i){this._groups=t,this._parents=e,this._name=n,this._id=i}function fi(){return++ca}var tt=Pt.prototype;it.prototype={constructor:it,select:Gs,selectAll:Ys,selectChild:tt.selectChild,selectChildren:tt.selectChildren,filter:Ds,merge:Bs,selection:Ws,transition:la,call:tt.call,nodes:tt.nodes,node:tt.node,size:tt.size,empty:tt.empty,each:tt.each,on:zs,attr:_s,attrTween:Ss,style:Qs,styleTween:ea,text:ra,textTween:aa,remove:Vs,tween:ps,delay:Ts,duration:ks,ease:Ps,easeVarying:Ns,end:ua,[Symbol.iterator]:tt[Symbol.iterator]};function ha(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}var fa={time:null,delay:0,duration:250,ease:ha};function da(t,e){for(var n;!(n=t.__transition)||!(n=n[e]);)if(!(t=t.parentNode))throw new Error(`transition ${e} not found`);return n}function pa(t){var e,n;t instanceof it?(e=t._id,t=t._name):(e=fi(),(n=fa).time=Je(),t=t==null?null:t+"");for(var i=this._groups,r=i.length,o=0;o<r;++o)for(var s=i[o],a=s.length,u,l=0;l<a;++l)(u=s[l])&&he(u,t,e,l,s,n||da(u,e));return new it(i,this._parents,t,e)}Pt.prototype.interrupt=hs;Pt.prototype.transition=pa;const Ue=Math.PI,Oe=2*Ue,lt=1e-6,ma=Oe-lt;function di(t){this._+=t[0];for(let e=1,n=t.length;e<n;++e)this._+=arguments[e]+t[e]}function ga(t){let e=Math.floor(t);if(!(e>=0))throw new Error(`invalid digits: ${t}`);if(e>15)return di;const n=10**e;return function(i){this._+=i[0];for(let r=1,o=i.length;r<o;++r)this._+=Math.round(arguments[r]*n)/n+i[r]}}class va{constructor(e){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=e==null?di:ga(e)}moveTo(e,n){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+n}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(e,n){this._append`L${this._x1=+e},${this._y1=+n}`}quadraticCurveTo(e,n,i,r){this._append`Q${+e},${+n},${this._x1=+i},${this._y1=+r}`}bezierCurveTo(e,n,i,r,o,s){this._append`C${+e},${+n},${+i},${+r},${this._x1=+o},${this._y1=+s}`}arcTo(e,n,i,r,o){if(e=+e,n=+n,i=+i,r=+r,o=+o,o<0)throw new Error(`negative radius: ${o}`);let s=this._x1,a=this._y1,u=i-e,l=r-n,c=s-e,f=a-n,h=c*c+f*f;if(this._x1===null)this._append`M${this._x1=e},${this._y1=n}`;else if(h>lt)if(!(Math.abs(f*u-l*c)>lt)||!o)this._append`L${this._x1=e},${this._y1=n}`;else{let d=i-s,g=r-a,v=u*u+l*l,w=d*d+g*g,m=Math.sqrt(v),p=Math.sqrt(h),x=o*Math.tan((Ue-Math.acos((v+h-w)/(2*m*p)))/2),A=x/p,b=x/m;Math.abs(A-1)>lt&&this._append`L${e+A*c},${n+A*f}`,this._append`A${o},${o},0,0,${+(f*d>c*g)},${this._x1=e+b*u},${this._y1=n+b*l}`}}arc(e,n,i,r,o,s){if(e=+e,n=+n,i=+i,s=!!s,i<0)throw new Error(`negative radius: ${i}`);let a=i*Math.cos(r),u=i*Math.sin(r),l=e+a,c=n+u,f=1^s,h=s?r-o:o-r;this._x1===null?this._append`M${l},${c}`:(Math.abs(this._x1-l)>lt||Math.abs(this._y1-c)>lt)&&this._append`L${l},${c}`,i&&(h<0&&(h=h%Oe+Oe),h>ma?this._append`A${i},${i},0,1,${f},${e-a},${n-u}A${i},${i},0,1,${f},${this._x1=l},${this._y1=c}`:h>lt&&this._append`A${i},${i},0,${+(h>=Ue)},${f},${this._x1=e+i*Math.cos(o)},${this._y1=n+i*Math.sin(o)}`)}rect(e,n,i,r){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+n}h${i=+i}v${+r}h${-i}Z`}toString(){return this._}}function xa(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)}function ie(t,e){if((n=(t=e?t.toExponential(e-1):t.toExponential()).indexOf("e"))<0)return null;var n,i=t.slice(0,n);return[i.length>1?i[0]+i.slice(2):i,+t.slice(n+1)]}function yt(t){return t=ie(Math.abs(t)),t?t[1]:NaN}function ya(t,e){return function(n,i){for(var r=n.length,o=[],s=0,a=t[0],u=0;r>0&&a>0&&(u+a+1>i&&(a=Math.max(1,i-u)),o.push(n.substring(r-=a,r+a)),!((u+=a+1)>i));)a=t[s=(s+1)%t.length];return o.reverse().join(e)}}function wa(t){return function(e){return e.replace(/[0-9]/g,function(n){return t[+n]})}}var _a=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function re(t){if(!(e=_a.exec(t)))throw new Error("invalid format: "+t);var e;return new je({fill:e[1],align:e[2],sign:e[3],symbol:e[4],zero:e[5],width:e[6],comma:e[7],precision:e[8]&&e[8].slice(1),trim:e[9],type:e[10]})}re.prototype=je.prototype;function je(t){this.fill=t.fill===void 0?" ":t.fill+"",this.align=t.align===void 0?">":t.align+"",this.sign=t.sign===void 0?"-":t.sign+"",this.symbol=t.symbol===void 0?"":t.symbol+"",this.zero=!!t.zero,this.width=t.width===void 0?void 0:+t.width,this.comma=!!t.comma,this.precision=t.precision===void 0?void 0:+t.precision,this.trim=!!t.trim,this.type=t.type===void 0?"":t.type+""}je.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function Aa(t){t:for(var e=t.length,n=1,i=-1,r;n<e;++n)switch(t[n]){case".":i=r=n;break;case"0":i===0&&(i=n),r=n;break;default:if(!+t[n])break t;i>0&&(i=0);break}return i>0?t.slice(0,i)+t.slice(r+1):t}var pi;function ba(t,e){var n=ie(t,e);if(!n)return t+"";var i=n[0],r=n[1],o=r-(pi=Math.max(-8,Math.min(8,Math.floor(r/3)))*3)+1,s=i.length;return o===s?i:o>s?i+new Array(o-s+1).join("0"):o>0?i.slice(0,o)+"."+i.slice(o):"0."+new Array(1-o).join("0")+ie(t,Math.max(0,e+o-1))[0]}function Mn(t,e){var n=ie(t,e);if(!n)return t+"";var i=n[0],r=n[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}const Sn={"%":(t,e)=>(t*100).toFixed(e),b:t=>Math.round(t).toString(2),c:t=>t+"",d:xa,e:(t,e)=>t.toExponential(e),f:(t,e)=>t.toFixed(e),g:(t,e)=>t.toPrecision(e),o:t=>Math.round(t).toString(8),p:(t,e)=>Mn(t*100,e),r:Mn,s:ba,X:t=>Math.round(t).toString(16).toUpperCase(),x:t=>Math.round(t).toString(16)};function $n(t){return t}var Cn=Array.prototype.map,Tn=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function Ea(t){var e=t.grouping===void 0||t.thousands===void 0?$n:ya(Cn.call(t.grouping,Number),t.thousands+""),n=t.currency===void 0?"":t.currency[0]+"",i=t.currency===void 0?"":t.currency[1]+"",r=t.decimal===void 0?".":t.decimal+"",o=t.numerals===void 0?$n:wa(Cn.call(t.numerals,String)),s=t.percent===void 0?"%":t.percent+"",a=t.minus===void 0?"−":t.minus+"",u=t.nan===void 0?"NaN":t.nan+"";function l(f){f=re(f);var h=f.fill,d=f.align,g=f.sign,v=f.symbol,w=f.zero,m=f.width,p=f.comma,x=f.precision,A=f.trim,b=f.type;b==="n"?(p=!0,b="g"):Sn[b]||(x===void 0&&(x=12),A=!0,b="g"),(w||h==="0"&&d==="=")&&(w=!0,h="0",d="=");var T=v==="$"?n:v==="#"&&/[boxX]/.test(b)?"0"+b.toLowerCase():"",C=v==="$"?i:/[%p]/.test(b)?s:"",L=Sn[b],P=/[defgprs%]/.test(b);x=x===void 0?6:/[gprs]/.test(b)?Math.max(1,Math.min(21,x)):Math.max(0,Math.min(20,x));function R(_){var M=T,y=C,E,X,Q;if(b==="c")y=L(_)+y,_="";else{_=+_;var U=_<0||1/_<0;if(_=isNaN(_)?u:L(Math.abs(_),x),A&&(_=Aa(_)),U&&+_==0&&g!=="+"&&(U=!1),M=(U?g==="("?g:a:g==="-"||g==="("?"":g)+M,y=(b==="s"?Tn[8+pi/3]:"")+y+(U&&g==="("?")":""),P){for(E=-1,X=_.length;++E<X;)if(Q=_.charCodeAt(E),48>Q||Q>57){y=(Q===46?r+_.slice(E+1):_.slice(E))+y,_=_.slice(0,E);break}}}p&&!w&&(_=e(_,1/0));var O=M.length+_.length+y.length,I=O<m?new Array(m-O+1).join(h):"";switch(p&&w&&(_=e(I+_,I.length?m-y.length:1/0),I=""),d){case"<":_=M+_+y+I;break;case"=":_=M+I+_+y;break;case"^":_=I.slice(0,O=I.length>>1)+M+_+y+I.slice(O);break;default:_=I+M+_+y;break}return o(_)}return R.toString=function(){return f+""},R}function c(f,h){var d=l((f=re(f),f.type="f",f)),g=Math.max(-8,Math.min(8,Math.floor(yt(h)/3)))*3,v=Math.pow(10,-g),w=Tn[8+g/3];return function(m){return d(v*m)+w}}return{format:l,formatPrefix:c}}var Vt,mi,gi;Ma({thousands:",",grouping:[3],currency:["$",""]});function Ma(t){return Vt=Ea(t),mi=Vt.format,gi=Vt.formatPrefix,Vt}function Sa(t){return Math.max(0,-yt(Math.abs(t)))}function $a(t,e){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(yt(e)/3)))*3-yt(Math.abs(t)))}function Ca(t,e){return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,yt(e)-yt(t))+1}function Ta(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t);break}return this}function Ra(t){return function(){return t}}function Fa(t){return+t}var Rn=[0,1];function pt(t){return t}function ze(t,e){return(e-=t=+t)?function(n){return(n-t)/e}:Ra(isNaN(e)?NaN:.5)}function ka(t,e){var n;return t>e&&(n=t,t=e,e=n),function(i){return Math.max(t,Math.min(e,i))}}function La(t,e,n){var i=t[0],r=t[1],o=e[0],s=e[1];return r<i?(i=ze(r,i),o=n(s,o)):(i=ze(i,r),o=n(o,s)),function(a){return o(i(a))}}function Pa(t,e,n){var i=Math.min(t.length,e.length)-1,r=new Array(i),o=new Array(i),s=-1;for(t[i]<t[0]&&(t=t.slice().reverse(),e=e.slice().reverse());++s<i;)r[s]=ze(t[s],t[s+1]),o[s]=n(e[s],e[s+1]);return function(a){var u=Pi(t,a,1,i)-1;return o[u](r[u](a))}}function Ia(t,e){return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function Na(){var t=Rn,e=Rn,n=Ke,i,r,o,s=pt,a,u,l;function c(){var h=Math.min(t.length,e.length);return s!==pt&&(s=ka(t[0],t[h-1])),a=h>2?Pa:La,u=l=null,f}function f(h){return h==null||isNaN(h=+h)?o:(u||(u=a(t.map(i),e,n)))(i(s(h)))}return f.invert=function(h){return s(r((l||(l=a(e,t.map(i),V)))(h)))},f.domain=function(h){return arguments.length?(t=Array.from(h,Fa),c()):t.slice()},f.range=function(h){return arguments.length?(e=Array.from(h),c()):e.slice()},f.rangeRound=function(h){return e=Array.from(h),n=Qo,c()},f.clamp=function(h){return arguments.length?(s=h?!0:pt,c()):s!==pt},f.interpolate=function(h){return arguments.length?(n=h,c()):n},f.unknown=function(h){return arguments.length?(o=h,f):o},function(h,d){return i=h,r=d,c()}}function Da(){return Na()(pt,pt)}function Ba(t,e,n,i){var r=Ui(t,e,n),o;switch(i=re(i??",f"),i.type){case"s":{var s=Math.max(Math.abs(t),Math.abs(e));return i.precision==null&&!isNaN(o=$a(r,s))&&(i.precision=o),gi(i,s)}case"":case"e":case"g":case"p":case"r":{i.precision==null&&!isNaN(o=Ca(r,Math.max(Math.abs(t),Math.abs(e))))&&(i.precision=o-(i.type==="e"));break}case"f":case"%":{i.precision==null&&!isNaN(o=Sa(r))&&(i.precision=o-(i.type==="%")*2);break}}return mi(i)}function Ua(t){var e=t.domain;return t.ticks=function(n){var i=e();return Bi(i[0],i[i.length-1],n??10)},t.tickFormat=function(n,i){var r=e();return Ba(r[0],r[r.length-1],n??10,i)},t.nice=function(n){n==null&&(n=10);var i=e(),r=0,o=i.length-1,s=i[r],a=i[o],u,l,c=10;for(a<s&&(l=s,s=a,a=l,l=r,r=o,o=l);c-- >0;){if(l=Re(s,a,n),l===u)return i[r]=s,i[o]=a,e(i);if(l>0)s=Math.floor(s/l)*l,a=Math.ceil(a/l)*l;else if(l<0)s=Math.ceil(s*l)/l,a=Math.floor(a*l)/l;else break;u=l}return t},t}function oe(){var t=Da();return t.copy=function(){return Ia(t,oe())},Ta.apply(t,arguments),Ua(t)}function rt(t){return function(){return t}}const Fn=Math.abs,F=Math.atan2,at=Math.cos,Oa=Math.max,Ee=Math.min,W=Math.sin,mt=Math.sqrt,N=1e-12,Ft=Math.PI,se=Ft/2,za=2*Ft;function Ha(t){return t>1?0:t<-1?Ft:Math.acos(t)}function kn(t){return t>=1?se:t<=-1?-se:Math.asin(t)}function Va(t){let e=3;return t.digits=function(n){if(!arguments.length)return e;if(n==null)e=null;else{const i=Math.floor(n);if(!(i>=0))throw new RangeError(`invalid digits: ${n}`);e=i}return t},()=>new va(e)}function Ga(t){return t.innerRadius}function Ya(t){return t.outerRadius}function Xa(t){return t.startAngle}function Wa(t){return t.endAngle}function qa(t){return t&&t.padAngle}function Ka(t,e,n,i,r,o,s,a){var u=n-t,l=i-e,c=s-r,f=a-o,h=f*u-c*l;if(!(h*h<N))return h=(c*(e-o)-f*(t-r))/h,[t+h*u,e+h*l]}function Gt(t,e,n,i,r,o,s){var a=t-n,u=e-i,l=(s?o:-o)/mt(a*a+u*u),c=l*u,f=-l*a,h=t+c,d=e+f,g=n+c,v=i+f,w=(h+g)/2,m=(d+v)/2,p=g-h,x=v-d,A=p*p+x*x,b=r-o,T=h*v-g*d,C=(x<0?-1:1)*mt(Oa(0,b*b*A-T*T)),L=(T*x-p*C)/A,P=(-T*p-x*C)/A,R=(T*x+p*C)/A,_=(-T*p+x*C)/A,M=L-w,y=P-m,E=R-w,X=_-m;return M*M+y*y>E*E+X*X&&(L=R,P=_),{cx:L,cy:P,x01:-c,y01:-f,x11:L*(r/b-1),y11:P*(r/b-1)}}function Ja(){var t=Ga,e=Ya,n=rt(0),i=null,r=Xa,o=Wa,s=qa,a=null,u=Va(l);function l(){var c,f,h=+t.apply(this,arguments),d=+e.apply(this,arguments),g=r.apply(this,arguments)-se,v=o.apply(this,arguments)-se,w=Fn(v-g),m=v>g;if(a||(a=c=u()),d<h&&(f=d,d=h,h=f),!(d>N))a.moveTo(0,0);else if(w>za-N)a.moveTo(d*at(g),d*W(g)),a.arc(0,0,d,g,v,!m),h>N&&(a.moveTo(h*at(v),h*W(v)),a.arc(0,0,h,v,g,m));else{var p=g,x=v,A=g,b=v,T=w,C=w,L=s.apply(this,arguments)/2,P=L>N&&(i?+i.apply(this,arguments):mt(h*h+d*d)),R=Ee(Fn(d-h)/2,+n.apply(this,arguments)),_=R,M=R,y,E;if(P>N){var X=kn(P/h*W(L)),Q=kn(P/d*W(L));(T-=X*2)>N?(X*=m?1:-1,A+=X,b-=X):(T=0,A=b=(g+v)/2),(C-=Q*2)>N?(Q*=m?1:-1,p+=Q,x-=Q):(C=0,p=x=(g+v)/2)}var U=d*at(p),O=d*W(p),I=h*at(b),Dt=h*W(b);if(R>N){var Bt=d*at(x),Ut=d*W(x),pe=h*at(A),me=h*W(A),j;if(w<Ft)if(j=Ka(U,O,pe,me,Bt,Ut,I,Dt)){var ge=U-j[0],ve=O-j[1],xe=Bt-j[0],ye=Ut-j[1],on=1/W(Ha((ge*xe+ve*ye)/(mt(ge*ge+ve*ve)*mt(xe*xe+ye*ye)))/2),sn=mt(j[0]*j[0]+j[1]*j[1]);_=Ee(R,(h-sn)/(on-1)),M=Ee(R,(d-sn)/(on+1))}else _=M=0}C>N?M>N?(y=Gt(pe,me,U,O,d,M,m),E=Gt(Bt,Ut,I,Dt,d,M,m),a.moveTo(y.cx+y.x01,y.cy+y.y01),M<R?a.arc(y.cx,y.cy,M,F(y.y01,y.x01),F(E.y01,E.x01),!m):(a.arc(y.cx,y.cy,M,F(y.y01,y.x01),F(y.y11,y.x11),!m),a.arc(0,0,d,F(y.cy+y.y11,y.cx+y.x11),F(E.cy+E.y11,E.cx+E.x11),!m),a.arc(E.cx,E.cy,M,F(E.y11,E.x11),F(E.y01,E.x01),!m))):(a.moveTo(U,O),a.arc(0,0,d,p,x,!m)):a.moveTo(U,O),!(h>N)||!(T>N)?a.lineTo(I,Dt):_>N?(y=Gt(I,Dt,Bt,Ut,h,-_,m),E=Gt(U,O,pe,me,h,-_,m),a.lineTo(y.cx+y.x01,y.cy+y.y01),_<R?a.arc(y.cx,y.cy,_,F(y.y01,y.x01),F(E.y01,E.x01),!m):(a.arc(y.cx,y.cy,_,F(y.y01,y.x01),F(y.y11,y.x11),!m),a.arc(0,0,h,F(y.cy+y.y11,y.cx+y.x11),F(E.cy+E.y11,E.cx+E.x11),m),a.arc(E.cx,E.cy,_,F(E.y11,E.x11),F(E.y01,E.x01),!m))):a.arc(0,0,h,b,A,m)}if(a.closePath(),c)return a=null,c+""||null}return l.centroid=function(){var c=(+t.apply(this,arguments)+ +e.apply(this,arguments))/2,f=(+r.apply(this,arguments)+ +o.apply(this,arguments))/2-Ft/2;return[at(f)*c,W(f)*c]},l.innerRadius=function(c){return arguments.length?(t=typeof c=="function"?c:rt(+c),l):t},l.outerRadius=function(c){return arguments.length?(e=typeof c=="function"?c:rt(+c),l):e},l.cornerRadius=function(c){return arguments.length?(n=typeof c=="function"?c:rt(+c),l):n},l.padRadius=function(c){return arguments.length?(i=c==null?null:typeof c=="function"?c:rt(+c),l):i},l.startAngle=function(c){return arguments.length?(r=typeof c=="function"?c:rt(+c),l):r},l.endAngle=function(c){return arguments.length?(o=typeof c=="function"?c:rt(+c),l):o},l.padAngle=function(c){return arguments.length?(s=typeof c=="function"?c:rt(+c),l):s},l.context=function(c){return arguments.length?(a=c??null,l):a},l}function Et(t,e,n){this.k=t,this.x=e,this.y=n}Et.prototype={constructor:Et,scale:function(t){return t===1?this:new Et(this.k*t,this.x,this.y)},translate:function(t,e){return t===0&e===0?this:new Et(this.k,this.x+this.k*t,this.y+this.k*e)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};Et.prototype;const nt=(t,e,n=!1)=>{ja(t),vi(t,e,n,6)},Za=(t,e,n=!1,i=.4)=>{const r=tl(t,i);vi(t,e,n,r)},vi=(t,e,n,i)=>{e==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)),n&&(t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT)),t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),Qa(t),t.drawElements(t.TRIANGLES,i,t.UNSIGNED_SHORT,0)},He=(t,e)=>{t.clearColor(0,0,0,0),e?(t.bindFramebuffer(t.FRAMEBUFFER,e.fbo),t.viewport(0,0,e.width,e.height)):(t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight)),t.clear(t.COLOR_BUFFER_BIT)},Qa=t=>{let e=t.checkFramebufferStatus(t.FRAMEBUFFER);e!=t.FRAMEBUFFER_COMPLETE&&console.trace("Framebuffer error: "+e)},ja=t=>{const e=t.createBuffer();if(!e)throw new Error("Failed to create quad vertex buffer.");t.bindBuffer(t.ARRAY_BUFFER,e),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW);const n=t.createBuffer();if(!n)throw new Error("Failed to create quad index buffer.");t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0)},tl=(t,e=.4)=>{const n=new Float32Array([-.05*e,.006*e,.08*e,.006*e,.08*e,-.006*e,-.05*e,-.006*e,.08*e,.03*e,.14*e,0*e,.08*e,-.03*e]),i=t.createBuffer();if(!i)throw new Error("Failed to create arrow vertex buffer");t.bindBuffer(t.ARRAY_BUFFER,i),t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW);const r=new Uint16Array([0,1,2,0,2,3,4,5,6]),o=t.createBuffer();if(!o)throw new Error("Failed to create arrow index buffer.");return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,o),t.bufferData(t.ELEMENT_ARRAY_BUFFER,r,t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),r.length},st=(t,e,n,i,r,o,s)=>{t.activeTexture(t.TEXTURE0);const a=t.createTexture();if(!a)throw new Error("Failed to create WebGL texture");t.bindTexture(t.TEXTURE_2D,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,s),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,i,e,n,0,r,o,null);const u=t.createFramebuffer();if(!u)throw new Error("Failed to create WebGL framebuffer");t.bindFramebuffer(t.FRAMEBUFFER,u),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,a,0),t.viewport(0,0,e,n),t.clear(t.COLOR_BUFFER_BIT);const l=1/e,c=1/n;return{texture:a,fbo:u,width:e,height:n,texelSizeX:l,texelSizeY:c,attach(f){return t.activeTexture(t.TEXTURE0+f),t.bindTexture(t.TEXTURE_2D,a),f}}},Me=(t,e,n,i,r,o,s)=>{const a=st(t,e,n,i,r,o,s),u=st(t,e,n,i,r,o,s);return{width:e,height:n,texelSizeX:a.texelSizeX,texelSizeY:a.texelSizeY,read:a,write:u,swap(){[this.read,this.write]=[this.write,this.read]}}},Ve=(t,e,n,i,r,o,s,a,u)=>{const l=st(t,n,i,r,o,s,a);return u.bind(),t.uniform1i(u.uniforms.uTexture,e.attach(0)),nt(t,l),l};function Se(t,e,n,i,r,o,s,a,u){return e.width===n&&e.height===i||(e.read=Ve(t,e.read,n,i,r,o,s,a,u),e.write=st(t,n,i,r,o,s,a),e.width=n,e.height=i,e.texelSizeX=1/n,e.texelSizeY=1/i),e}const $={oscillationState:null,oscillationDerivative:null,oscillationMagnitude:null,oscillationPoint:null,oscillationPointMovement:null,arrowField:null,gridLines:null};let k={SIM_RESOLUTION:128,GRAVITY:9.81,PENDULUM_LENGTH:3,AIR_RESISTANCE_COEF:.2,LINE_TRACKING:!0,VECTOR_FIELD_OPACITY:.7,PAUSED:!0};const xi=(t,e,n)=>{const i=ln(k.SIM_RESOLUTION,t),r=ln(1024,t),o=e.halfFloatTexType,s=e.formatRGBA,a=e.formatRG,u=e.formatR,l=e.supportLinearFiltering?t.LINEAR:t.NEAREST,{oscillationState:c,oscillationDerivative:f,oscillationMagnitude:h,oscillationPoint:d,arrowField:g}=$;s&&a&&u&&o&&(c===null?$.oscillationState=Me(t,i.width,i.height,s.internalFormat,s.format,o,l):$.oscillationState=Se(t,c,i.width,i.height,a.internalFormat,a.format,o,l,n),f===null?$.oscillationDerivative=Me(t,i.width,i.height,a.internalFormat,a.format,o,l):$.oscillationDerivative=Se(t,f,i.width,i.height,a.internalFormat,a.format,o,l,n),h===null?$.oscillationMagnitude=st(t,r.width,r.height,s.internalFormat,s.format,o,l):$.oscillationMagnitude=Ve(t,h,r.width,r.height,s.internalFormat,s.format,o,l,n),d===null?$.oscillationPoint=Me(t,r.width,r.height,s.internalFormat,s.format,o,l):$.oscillationPoint=Se(t,d,r.width,r.height,s.internalFormat,s.format,o,l,n),$.oscillationPointMovement=st(t,r.width,r.height,s.internalFormat,s.format,o,l),g?$.arrowField=Ve(t,g,r.width,r.height,s.internalFormat,s.format,o,l,n):$.arrowField=st(t,r.width,r.height,s.internalFormat,s.format,o,l),$.gridLines=st(t,r.width,r.height,s.internalFormat,s.format,o,t.NEAREST))};let Ln=Date.now();const el=()=>{const t=Date.now();let e=(t-Ln)/1e3;return e=Math.min(e,.016666),Ln=t,e},Z=t=>{let n=Math.floor(t.clientWidth/580);return n=n===0?1:n,n},nl=t=>t.clientWidth/t.clientHeight,S={parentCtr:null,ctr:null,svg:null,rodAndBallG:null,centerLine:null,rod:null,ball:null,arc:null,angleDegree:null,velocityArrowG:null,arrowShaft:null,arrowHead:null},yi=(t,e)=>{sl();const{ctr:n,svg:i,rodAndBallG:r,centerLine:o,rod:s,ball:a,arc:u,angleDegree:l,velocityArrowG:c,arrowHead:f,arrowShaft:h}=S;if(n&&i&&r&&o&&s&&a&&u&&l&&c&&h&&f){const{angle:d,velocity:g}=t.states,v=Z(e),w=e.clientWidth*.4/v,m=w,p={rodLength:w*.4,ballRadius:w*.03},x={x:p.rodLength*Math.sin(d),y:p.rodLength*Math.cos(d)};i.attr("viewBox",`0 0 ${w} ${m}`).style("width","100%").style("height","100%"),r.attr("transform",`translate(${w/2}, ${m/2})`),ol(p,x,o,s,a),rl(p,d,u,l),il(e,x,d,g,c,h,f)}},il=(t,e,n,i,r,o,s)=>{const a=dt(t),u=oe().domain([-a,a]).range([-20,20]),l={width:1.4*u(i),height:1.2*u(i),length:5*u(i),strokeWidth:.5*Math.abs(u(i))},c=(Math.PI/2+Math.PI-n)*180/Math.PI,f=`
        ${-l.width/2}, ${l.length} 
        ${l.width/2}, ${l.length} 
        0, ${l.length+l.height}
      `;r.attr("transform",`translate(${e.x}, ${e.y}) rotate(${c})`).attr("class","pendulum-velocity-arrow"),o.attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",l.length).attr("stroke-width",l.strokeWidth),s.attr("points",f)},rl=(t,e,n,i)=>{const r=$e(-e),o=`θ = ${(-r*180/Math.PI).toFixed(2)}°`,s=Math.PI,a=r>Math.PI?Math.PI*2:Math.PI+r,u=t.rodLength*.3,l=1,f=Ja().innerRadius(u-l).outerRadius(u).startAngle(s).endAngle(a)({startAngle:Math.PI,endAngle:$e(-e)>Math.PI?0:$e(-e)+Math.PI,innerRadius:u-l,outerRadius:u});i.innerText=o,n.attr("d",f).attr("class","pendulum-arc")},$e=t=>{const e=t>0;let n=Math.abs(t);if(n>Math.PI*3)n=n-Math.PI*3;else if(n>Math.PI)n=n-Math.PI*1;else return t;return n>Math.PI?e?-n%Math.PI*-1:-n%Math.PI:e?(Math.PI-n)*-1:Math.PI-n},ol=(t,e,n,i,r)=>{const o={x:t.rodLength*Math.sin(Math.PI*2),y:t.rodLength*Math.cos(Math.PI*2)};n.attr("x1",0).attr("y1",0).attr("x2",o.x).attr("y2",o.y).attr("class","line center-line").attr("stroke","white").attr("stroke-width",2).attr("stroke-dasharray","5,5"),i.attr("x1",0).attr("y1",0).attr("x2",e.x).attr("y2",e.y).attr("class","line pendulum-rod").attr("stroke","white").attr("stroke-width",2),r.attr("cx",e.x).attr("cy",e.y).attr("r",t.ballRadius).attr("fill","white").attr("class","ball")},sl=()=>{var h,d,g,v,w,m,p,x,A;const{parentCtr:t,ctr:e,svg:n,rodAndBallG:i,centerLine:r,rod:o,ball:s,arc:a,angleDegree:u,velocityArrowG:l,arrowHead:c,arrowShaft:f}=S;t||(S.parentCtr=$t("#visualization-container")),u||(S.angleDegree=document.getElementById("pendulum-angle-text")),e||(S.ctr=$t("#pendulum-svg-container")),n||(S.svg=((h=S.ctr)==null?void 0:h.append("svg"))||null),i||(S.rodAndBallG=((d=S.svg)==null?void 0:d.append("g"))||null),r||(S.centerLine=((g=S.rodAndBallG)==null?void 0:g.append("line"))||null),o||(S.rod=((v=S.rodAndBallG)==null?void 0:v.append("line"))||null),s||(S.ball=((w=S.rodAndBallG)==null?void 0:w.append("circle"))||null),a||(S.arc=((m=S.rodAndBallG)==null?void 0:m.append("path"))||null),l||(S.velocityArrowG=((p=S.rodAndBallG)==null?void 0:p.append("g"))||null),f||(S.arrowShaft=((x=S.velocityArrowG)==null?void 0:x.append("line"))||null),c||(S.arrowHead=((A=S.velocityArrowG)==null?void 0:A.append("polygon"))||null)},al=(t,e,n,i,r)=>{const{angle:o,velocity:s}=i.states,a=ll(n,o,s,r);i.updateStates(a.angle,a.velocity),ul(t,n,i,e)},ll=(t,e,n,i)=>{const r=Z(t),{AIR_RESISTANCE_COEF:o,GRAVITY:s,PENDULUM_LENGTH:a}=k,u=-o*n-s/a*Math.sin(e);let l=e+n*2*i;const c=n+u*i;return e>Math.PI*(2*r-1)&&(l=-(Math.PI-e%Math.PI)),e<-Math.PI&&(l=e+Math.PI*(2*r)),{angle:l,velocity:c}},ul=(t,e,n,i)=>{const{oscillationPointMovement:r}=$;if(r){const{x:o,y:s}=n.getTexCoord(),a=e.clientWidth/e.clientHeight;i.bind(),t.uniform1f(i.uniforms.aspectRatio,a),t.uniform2f(i.uniforms.pointTexelSize,r.texelSizeX,r.texelSizeY),t.uniform2f(i.uniforms.pCoord,o,s),t.uniform1f(i.uniforms.radiusPx,2),nt(t,r,!1),t.bindFramebuffer(t.FRAMEBUFFER,null)}};var kt=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});function Nt(){var t=new kt(9);return kt!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t}function cl(t,e,n){var i=e[0],r=e[1],o=e[2],s=e[3],a=e[4],u=e[5],l=e[6],c=e[7],f=e[8],h=n[0],d=n[1],g=n[2],v=n[3],w=n[4],m=n[5],p=n[6],x=n[7],A=n[8];return t[0]=h*i+d*s+g*l,t[1]=h*r+d*a+g*c,t[2]=h*o+d*u+g*f,t[3]=v*i+w*s+m*l,t[4]=v*r+w*a+m*c,t[5]=v*o+w*u+m*f,t[6]=p*i+x*s+A*l,t[7]=p*r+x*a+A*c,t[8]=p*o+x*u+A*f,t}function fe(t,e,n){var i=e[0],r=e[1],o=e[2],s=e[3],a=e[4],u=e[5],l=e[6],c=e[7],f=e[8],h=n[0],d=n[1];return t[0]=i,t[1]=r,t[2]=o,t[3]=s,t[4]=a,t[5]=u,t[6]=h*i+d*s+l,t[7]=h*r+d*a+c,t[8]=h*o+d*u+f,t}function hl(t,e,n){var i=e[0],r=e[1],o=e[2],s=e[3],a=e[4],u=e[5],l=e[6],c=e[7],f=e[8],h=Math.sin(n),d=Math.cos(n);return t[0]=d*i+h*s,t[1]=d*r+h*a,t[2]=d*o+h*u,t[3]=d*s-h*i,t[4]=d*a-h*r,t[5]=d*u-h*o,t[6]=l,t[7]=c,t[8]=f,t}function tn(t,e,n){var i=n[0],r=n[1];return t[0]=i*e[0],t[1]=i*e[1],t[2]=i*e[2],t[3]=r*e[3],t[4]=r*e[4],t[5]=r*e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function de(){var t=new kt(2);return kt!=Float32Array&&(t[0]=0,t[1]=0),t}function en(t,e){var n=new kt(2);return n[0]=t,n[1]=e,n}function nn(t,e,n){var i=e[0],r=e[1];return t[0]=n[0]*i+n[3]*r+n[6],t[1]=n[1]*i+n[4]*r+n[7],t}(function(){var t=de();return function(e,n,i,r,o,s){var a,u;for(n||(n=2),i||(i=0),r?u=Math.min(r*n+i,e.length):u=e.length,a=i;a<u;a+=n)t[0]=e[a],t[1]=e[a+1],o(t,t,s),e[a]=t[0],e[a+1]=t[1];return e}})();const St=(t,e,n)=>{const{arrowField:i,oscillationMagnitude:r}=$;if(i&&r){const{VECTOR_FIELD_OPACITY:o}=k;He(t,i);const s=Z(e),a=e.clientWidth/e.clientHeight,u=dt(e);n.bind(),t.uniform1f(n.uniforms.opacity,o),t.uniform1f(n.uniforms.aspectRatio,a),t.uniform1i(n.uniforms.mTexture,r.attach(0));const{columns:l,rows:c}=dl(e),f=.2-.02/a*(s*2-1);for(let h=0;h<c;h++)for(let d=0;d<l;d++){const g=d/(l-1)*2-1,v=h/(c-1)*2-1,w=Nt();fe(w,w,[g*a,v]);const{rotation:m,magnitude:p}=fl(e,u,g,v);hl(w,w,m),t.uniformMatrix3fv(n.uniforms.uTransformMatrix,!1,w),Za(t,i,!1,f+5e3*p)}}},fl=(t,e,n,i)=>{const r=Z(t),o=(n+1)/2,s=(i+1)/2,{GRAVITY:a,PENDULUM_LENGTH:u,AIR_RESISTANCE_COEF:l}=k;let c=Pn(-Math.PI,Math.PI*2*r-Math.PI,o);const f=Pn(-e,e,s),h=-l*f-a/u*Math.sin(c),d=1e-5,g=f*d,v=h*d;let w=Math.atan2(v,g);w<0&&(w+=2*Math.PI);const m=Math.sqrt(g*g+v*v);return{rotation:w,magnitude:m}};function Pn(t,e,n){return t+n*(e-t)}const dl=t=>{const e=nl(t),i=350*Z(t)+50*e;let r=Math.floor(Math.sqrt(i*e)),o=Math.floor(i/r);for(;o*r>i;)r>o?r--:o--;return{columns:r,rows:o,count:r*o}},wi=(t,e,n,i,r,o)=>{const s=el();k.PAUSED||al(t,r.pointMovementProgram,n,o,s),Bn(n)&&(bi(i,n),_i(t,r.pointProgram,r.pointMovementProgram,o),xi(t,e,r.copyProgram),Ai(t,n,r.stateProgram),le(t,r.derivativeProgram),ae(t,n,r.magnitudeProgram),St(t,n,r.arrowFieldProgram)),pl(t,o,n,r.pointProgram),ml(t,r.displayProgram),yi(o,n),requestAnimationFrame(()=>wi(t,e,n,i,r,o))},pl=(t,e,n,i)=>{const{oscillationPoint:r}=$;if(r){const{x:o,y:s}=e.getTexCoord(),a=n.clientWidth/n.clientHeight;i.bind(),t.uniform1f(i.uniforms.aspectRatio,a),t.uniform2f(i.uniforms.pointTexelSize,r.texelSizeX,r.texelSizeY),t.uniform2f(i.uniforms.pCoord,o,s),t.uniform1f(i.uniforms.radiusPx,5),nt(t,r.write,!0),r.swap()}},ml=(t,e)=>{const{oscillationPoint:n,oscillationPointMovement:i,arrowField:r}=$;if(n&&i&&r){const{LINE_TRACKING:o}=k;e.bind(),t.uniform1i(e.uniforms.pTexture,r.attach(0)),nt(t,null,!0),o&&(t.uniform1i(e.uniforms.pTexture,i.attach(0)),nt(t,null,!1)),t.uniform1i(e.uniforms.pTexture,n.read.attach(0)),nt(t,null,!1)}},_i=(t,e,n,i)=>{const{oscillationPoint:r,oscillationPointMovement:o}=$;r&&o&&(k.PAUSED=!0,e.bind(),He(t,r.write),r.swap(),n.bind(),He(t,o),i.resetStates())},ae=(t,e,n)=>{const{oscillationMagnitude:i,oscillationDerivative:r}=$;if(i&&r){const{GRAVITY:o,PENDULUM_LENGTH:s,AIR_RESISTANCE_COEF:a}=k,u=dt(e),l=a*u+o/s,c=1e-5,f=u*c,h=l*c,d=Math.sqrt(f*f+h*h);n.bind(),t.uniform1i(n.uniforms.vTexture,r.read.attach(0)),t.uniform1f(n.uniforms.max,d),nt(t,i,!1)}},le=(t,e)=>{const{oscillationDerivative:n,oscillationState:i}=$;n&&i&&(e.bind(),t.uniform1i(e.uniforms.stateTexture,i.read.attach(0)),t.uniform1f(e.uniforms.mu,k.AIR_RESISTANCE_COEF),t.uniform1f(e.uniforms.L,k.PENDULUM_LENGTH),t.uniform1f(e.uniforms.g,k.GRAVITY),nt(t,n.write),n.swap())},Ai=(t,e,n)=>{const{oscillationState:i}=$;if(i){const r=dt(e),o=Z(e);console.log(o);const s=e.clientWidth/e.clientHeight;n.bind(),t.uniform1f(n.uniforms.maxY,r),t.uniform1f(n.uniforms.aspectRatio,s),t.uniform1f(n.uniforms.loopCount,o),nt(t,i.write),i.swap()}},dt=t=>{const e=Z(t);return 3.2/(t.clientWidth/t.clientHeight)*e},bi=(t,e)=>{const n=Z(e),i=t.clientWidth,r=t.clientHeight,o=dt(e);let s=Math.floor(o/.2);const a=20*n,u=5;s%2!==0&&(s+=1);const l=r/s,c=i/a;vl(t,c,l,u),gl(n,t,{width:i,height:r},u,a,s)},gl=(t,e,n,i,r,o)=>{const s=$t(e).select("svg"),{width:a,height:u}=n,l=r/i,c=o/i,f=oe().domain([-r/2,r/2]).range([0,a]),h=Xi(f).ticks(l).tickSize(4).tickFormat((m,p)=>`${p/2-1}π`),d=oe().domain([-c/2,c/2]).range([u,0]),g=Wi(d).ticks(c).tickSize(0);s.append("g").attr("class","x-axis").attr("transform",`translate(0, ${n.height/2})`).call(h).selectAll(".tick text").style("fill","#fff").style("font-size","12px").style("font-weight","bold");const v=s.selectAll(".x-axis .tick text");v.filter((m,p)=>p===0).attr("dx","10px").style("text-anchor","start"),v.filter((m,p,x)=>p===x.length-1).attr("dx","-10px").style("text-anchor","end");const w=n.width/t;for(let m=0;m<t;m++){const p=w*m;s.append("g").attr("class","y-axis").attr("transform",`translate(${p+w/2}, 0)`).call(g).selectAll(".tick text").style("fill","#fff").style("font-size","12px").style("font-weight","bold")}s.selectAll(".domain").style("stroke","#fff")},vl=(t,e,n,i)=>{const r=t.clientWidth,o=t.clientHeight,s="#62aeba",a=Math.floor(r/2),u=Math.floor(o/2);$t(t).select("svg").remove();const l=$t(t).append("svg").attr("width",r).attr("height",o).style("position","absolute").style("top","0").style("left","0").style("z-index",0),c=Math.floor(r/e);for(let h=0;h<=c;h++){const d=h*e,g=Math.abs(d-a),v=Math.round(g/e)%i===0;l.append("line").attr("x1",d).attr("y1",0).attr("x2",d).attr("y2",o).attr("stroke",s).attr("stroke-width",v?1.2:.8).attr("stroke-opacity",v?.9:.5)}const f=Math.floor(o/n);for(let h=0;h<=f;h++){const d=h*n,g=Math.abs(d-u),v=Math.round(g/n)%i===0;l.append("line").attr("x1",0).attr("y1",d).attr("x2",r).attr("y2",d).attr("stroke",s).attr("stroke-width",v?1.2:.8).attr("stroke-opacity",v?.9:.5)}};/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.19.2
 * @author George Michael Brower
 * @license MIT
 */class K{constructor(e,n,i,r,o="div"){this.parent=e,this.object=n,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),K.nextNameID=K.nextNameID||0,this.$name.id=`lil-gui-name-${++K.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",s=>s.stopPropagation()),this.domElement.addEventListener("keyup",s=>s.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const n=this.parent.add(this.object,this.property,e);return n.name(this._name),this.destroy(),n}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class xl extends K{constructor(e,n,i){super(e,n,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ge(t){let e,n;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?n=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?n=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(n=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),n?"#"+n:!1}const yl={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:Ge,toHexString:Ge},Lt={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},wl={isPrimitive:!1,match:t=>Array.isArray(t),fromHexString(t,e,n=1){const i=Lt.fromHexString(t);e[0]=(i>>16&255)/255*n,e[1]=(i>>8&255)/255*n,e[2]=(i&255)/255*n},toHexString([t,e,n],i=1){i=255/i;const r=t*i<<16^e*i<<8^n*i<<0;return Lt.toHexString(r)}},_l={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,n=1){const i=Lt.fromHexString(t);e.r=(i>>16&255)/255*n,e.g=(i>>8&255)/255*n,e.b=(i&255)/255*n},toHexString({r:t,g:e,b:n},i=1){i=255/i;const r=t*i<<16^e*i<<8^n*i<<0;return Lt.toHexString(r)}},Al=[yl,Lt,wl,_l];function bl(t){return Al.find(e=>e.match(t))}class El extends K{constructor(e,n,i,r){super(e,n,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=bl(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=Ge(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const n=this._format.fromHexString(e);this.setValue(n)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Ce extends K{constructor(e,n,i){super(e,n,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Ml extends K{constructor(e,n,i,r,o,s){super(e,n,i,"number"),this._initInput(),this.min(r),this.max(o);const a=s!==void 0;this.step(a?s:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,n=!0){return this._step=e,this._stepExplicit=n,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let n=(e-this._min)/(this._max-this._min);n=Math.max(0,Math.min(n,1)),this.$fill.style.width=n*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const n=()=>{let p=parseFloat(this.$input.value);isNaN(p)||(this._stepExplicit&&(p=this._snap(p)),this.setValue(this._clamp(p)))},i=p=>{const x=parseFloat(this.$input.value);isNaN(x)||(this._snapClampSetValue(x+p),this.$input.value=this.getValue())},r=p=>{p.key==="Enter"&&this.$input.blur(),p.code==="ArrowUp"&&(p.preventDefault(),i(this._step*this._arrowKeyMultiplier(p))),p.code==="ArrowDown"&&(p.preventDefault(),i(this._step*this._arrowKeyMultiplier(p)*-1))},o=p=>{this._inputFocused&&(p.preventDefault(),i(this._step*this._normalizeMouseWheel(p)))};let s=!1,a,u,l,c,f;const h=5,d=p=>{a=p.clientX,u=l=p.clientY,s=!0,c=this.getValue(),f=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",v)},g=p=>{if(s){const x=p.clientX-a,A=p.clientY-u;Math.abs(A)>h?(p.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(x)>h&&v()}if(!s){const x=p.clientY-l;f-=x*this._step*this._arrowKeyMultiplier(p),c+f>this._max?f=this._max-c:c+f<this._min&&(f=this._min-c),this._snapClampSetValue(c+f)}l=p.clientY},v=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",v)},w=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",n),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",d),this.$input.addEventListener("focus",w),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(m,p,x,A,b)=>(m-p)/(x-p)*(b-A)+A,n=m=>{const p=this.$slider.getBoundingClientRect();let x=e(m,p.left,p.right,this._min,this._max);this._snapClampSetValue(x)},i=m=>{this._setDraggingStyle(!0),n(m.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",o)},r=m=>{n(m.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",o)};let s=!1,a,u;const l=m=>{m.preventDefault(),this._setDraggingStyle(!0),n(m.touches[0].clientX),s=!1},c=m=>{m.touches.length>1||(this._hasScrollBar?(a=m.touches[0].clientX,u=m.touches[0].clientY,s=!0):l(m),window.addEventListener("touchmove",f,{passive:!1}),window.addEventListener("touchend",h))},f=m=>{if(s){const p=m.touches[0].clientX-a,x=m.touches[0].clientY-u;Math.abs(p)>Math.abs(x)?l(m):(window.removeEventListener("touchmove",f),window.removeEventListener("touchend",h))}else m.preventDefault(),n(m.touches[0].clientX)},h=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",f),window.removeEventListener("touchend",h)},d=this._callOnFinishChange.bind(this),g=400;let v;const w=m=>{if(Math.abs(m.deltaX)<Math.abs(m.deltaY)&&this._hasScrollBar)return;m.preventDefault();const x=this._normalizeMouseWheel(m)*this._step;this._snapClampSetValue(this.getValue()+x),this.$input.value=this.getValue(),clearTimeout(v),v=setTimeout(d,g)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",c,{passive:!1}),this.$slider.addEventListener("wheel",w,{passive:!1})}_setDraggingStyle(e,n="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${n}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:n,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(n=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),n+-i}_arrowKeyMultiplier(e){let n=this._stepExplicit?1:10;return e.shiftKey?n*=10:e.altKey&&(n/=10),n}_snap(e){const n=Math.round(e/this._step)*this._step;return parseFloat(n.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Sl extends K{constructor(e,n,i,r){super(e,n,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(n=>{const i=document.createElement("option");i.textContent=n,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),n=this._values.indexOf(e);return this.$select.selectedIndex=n,this.$display.textContent=n===-1?e:this._names[n],this}}class $l extends K{constructor(e,n,i){super(e,n,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Cl=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: none;
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
  }
  .lil-gui button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Tl(t){const e=document.createElement("style");e.innerHTML=t;const n=document.querySelector("head link[rel=stylesheet], head style");n?document.head.insertBefore(e,n):document.head.appendChild(e)}let In=!1;class rn{constructor({parent:e,autoPlace:n=e===void 0,container:i,width:r,title:o="Controls",closeFolders:s=!1,injectStyles:a=!0,touchStyles:u=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",l=>{(l.code==="Enter"||l.code==="Space")&&(l.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),u&&this.domElement.classList.add("allow-touch-styles"),!In&&a&&(Tl(Cl),In=!0),i?i.appendChild(this.domElement):n&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=s}add(e,n,i,r,o){if(Object(i)===i)return new Sl(this,e,n,i);const s=e[n];switch(typeof s){case"number":return new Ml(this,e,n,i,r,o);case"boolean":return new xl(this,e,n);case"string":return new $l(this,e,n);case"function":return new Ce(this,e,n)}console.error(`gui.add failed
	property:`,n,`
	object:`,e,`
	value:`,s)}addColor(e,n,i=1){return new El(this,e,n,i)}addFolder(e){const n=new rn({parent:this,title:e});return this.root._closeFolders&&n.close(),n}load(e,n=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof Ce||i._name in e.controllers&&i.load(e.controllers[i._name])}),n&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const n={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof Ce)){if(i._name in n.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);n.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in n.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);n.folders[i._title]=i.save()}),n}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const n=this.$children.clientHeight;this.$children.style.height=n+"px",this.domElement.classList.add("transition");const i=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(n=>{e=e.concat(n.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(n=>{e=e.concat(n.foldersRecursive())}),e}}const Rl=(t,e,n,i)=>{const r=new rn({width:300});r.add(k,"PENDULUM_LENGTH",1,4).name("pendulum length").onChange(()=>{le(t,n.derivativeProgram),ae(t,e,n.magnitudeProgram),St(t,e,n.arrowFieldProgram)}),r.add(k,"AIR_RESISTANCE_COEF",.1,1).name("air resistance").onChange(()=>{le(t,n.derivativeProgram),ae(t,e,n.magnitudeProgram),St(t,e,n.arrowFieldProgram)}),r.add(k,"VECTOR_FIELD_OPACITY",0,.8).name("vector field opacity").onChange(()=>{St(t,e,n.arrowFieldProgram)}),r.add(k,"LINE_TRACKING").name("line tracking").listen(),r.add(k,"PAUSED").name("paused").listen().onChange(()=>{i.updateIsSimHasRun(!0)}),r.add({resetSimulation:()=>_i(t,n.pointProgram,n.pointMovementProgram,i)},"resetSimulation").name("reset")},Nn={angle:Math.PI*5/6,velocity:.5};class Fl{constructor(e){z(this,"canvas");z(this,"states");z(this,"down");z(this,"moved");z(this,"simHasRun");this.canvas=e,this.states=Nn,this.down=!1,this.moved=!1,this.simHasRun=!1,this.setupEventListeners()}getTexCoord(){const{angle:e,velocity:n}=this.states,i=dt(this.canvas),r=this.canvas.clientWidth/this.canvas.clientHeight,o=kl(this.canvas,[e,n],i,r);return{x:o[0],y:o[1]}}updateStates(e,n){this.states={angle:e,velocity:n}}resetStates(){this.states=Nn,this.updateIsSimHasRun(!1)}setupEventListeners(){this.canvas.addEventListener("mousedown",e=>this.onMouseDown(e)),this.canvas.addEventListener("mousemove",e=>this.onMouseMove(e)),window.addEventListener("mouseup",()=>this.onMouseUp())}onMouseDown(e){const n=e.offsetX/this.canvas.clientWidth,i=e.offsetY/this.canvas.clientHeight,r=this.canvas.clientWidth/this.canvas.clientHeight,o=this.getTexCoord(),s=Ll([n,i],r);this.down=!this.simHasRun&&Math.abs(o.x-s.x)<.02&&Math.abs(o.y-s.y)<.02}onMouseMove(e){if(!this.down)return;const n=e.offsetX/this.canvas.clientWidth,i=e.offsetY/this.canvas.clientHeight,r=dt(this.canvas),o=Il(this.canvas,[n,i],r);this.moved=this.states.angle!==o.x||this.states.velocity!==o.y,this.moved&&(this.states={angle:o.x,velocity:o.y})}onMouseUp(){this.down=!1}updateIsSimHasRun(e){this.simHasRun=e}}const kl=(t,e,n,i)=>{const o=Z(t)*2*Math.PI,s=Math.PI,a=Nt();tn(a,a,[1/(o/i),1/(2*n)]),fe(a,a,[s,n]);const u=de();return nn(u,en(e[0],e[1]),a),u},Ei=(t=1)=>{const e=Nt();return fe(e,e,[0,1]),tn(e,e,[1*t,-1]),e},Ll=(t,e)=>{const n=Ei(e),i=de();return nn(i,en(t[0],t[1]),n),{x:i[0],y:i[1]}},Pl=(t,e,n=1)=>{const i=Nt(),r=-Math.PI,o=t*2*Math.PI;return fe(i,i,[r,-e]),tn(i,i,[o*n,2*e]),i},Il=(t,e,n)=>{const i=Z(t),r=Nt(),o=Ei(),s=Pl(i,n);cl(r,s,o);const a=de();return nn(a,en(e[0],e[1]),r),{x:a[0],y:a[1]}};class et{constructor(e,n,i){z(this,"gl");z(this,"vertexShader");z(this,"fragmentShader");z(this,"program");z(this,"uniforms");this.gl=e,this.vertexShader=this.compileShader(e.VERTEX_SHADER,n),this.fragmentShader=this.compileShader(e.FRAGMENT_SHADER,i),this.program=this.createAndLinkProgram(),this.uniforms=this.getUniformLocations()}compileShader(e,n){const i=this.gl.createShader(e);if(!i)throw new Error("Unable to create shader.");if(this.gl.shaderSource(i,n),this.gl.compileShader(i),!this.gl.getShaderParameter(i,this.gl.COMPILE_STATUS)){const r=this.gl.getShaderInfoLog(i);throw this.gl.deleteShader(i),new Error("Shader compile error: "+r)}return i}createAndLinkProgram(){const e=this.gl.createProgram();if(!e)throw new Error("Unable to create WebGL program.");if(this.gl.attachShader(e,this.vertexShader),this.gl.attachShader(e,this.fragmentShader),this.gl.linkProgram(e),!this.gl.getProgramParameter(e,this.gl.LINK_STATUS)){const n=this.gl.getProgramInfoLog(e);throw this.gl.deleteProgram(e),new Error("Program link error: "+n)}return e}getUniformLocations(){this.bind();const e={},n=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_UNIFORMS);for(let i=0;i<n;i++){const r=this.gl.getActiveUniform(this.program,i);if(r){const o=this.gl.getUniformLocation(this.program,r.name);o!==null&&(e[r.name]=o)}}return e}bind(){this.gl.useProgram(this.program)}getUniform(e){return this.uniforms[e]||null}}const ot=`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`,Nl=`precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
uniform sampler2D uTexture;

void main () {
  gl_FragColor = texture2D(uTexture, vUv);
}`,Dl=`precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform float maxY;
uniform float loopCount;

void main () {
    const float PI = 3.1416;
    vec2 uv = vUv.xy;

    float xMin = -PI;
    float xMax =   PI * 2.0 * loopCount - PI;

    // Map vUv.x from [0, 1] to [xMin, xMax]
    float xMapped = mix(xMin, xMax, uv.x);

    // Map vUv.y from [0, 1] to [-maxY, maxY]
    float yMapped = mix(-maxY, maxY , uv.y);

    gl_FragColor = vec4(xMapped, yMapped, 0.0, 1.0); 
}
`,Bl=`precision highp float;

varying vec2 vUv;  // The UV coordinates passed from the vertex shader
uniform float xGridSpacing; // Precomputed spacing for grid lines along the x-axis
uniform float yGridSpacing; // Precomputed spacing for grid lines along the y-axis
uniform float xRest;
uniform float yRest;
uniform vec2 texelSize;     // The size of one texel in UV coordinates

void main() {
    // Calculate grid positions by using the precomputed spacing
    vec2 adjustedUv = vec2(vUv.x + xRest, vUv.y + yRest);
    vec2 grid = mod(adjustedUv, vec2(xGridSpacing, yGridSpacing));

    // Line thickness control: scale the thickness based on the texel size
    float lineThickness = 2.0 * max(texelSize.x, texelSize.y);
    float lineX = step(grid.x, lineThickness);
    float lineY = step(grid.y, lineThickness);
    
    // If either the X or Y coordinate is within the line thickness, we draw a line
    float gridLine = max(lineX, lineY);
    
    // Set the color of the grid lines to blue
    vec3 gridColor = vec3(0.0, 0.0, 1.0); // Blue lines for the grid
    vec3 backgroundColor = vec3(0.0, 0.0, 0.0); // Transparent background

    // Mix the grid color and background color based on the gridLine
    gl_FragColor = vec4(mix(backgroundColor, gridColor, gridLine), gridLine); // Transparency based on gridLine
}
`,Ul=`precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform sampler2D pTexture;
// uniform sampler2D mTexture;

void main () {
  vec3 c = texture2D(pTexture, vUv).rgb;
  float a = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c, a);

}
`,Ol=`precision highp float;
precision highp sampler2D;

varying vec2 vUv;  
uniform sampler2D stateTexture; 
uniform float g;
uniform float L;    
uniform float mu;

void main() {
    vec4 currentState = texture2D(stateTexture, vUv);

    float theta = currentState.r;
    float thetaDot = currentState.g;
    
    float dTheta_dt = thetaDot;
    float dThetaDot_dt = - mu * thetaDot - (g / L) * sin(theta);  

    gl_FragColor = vec4(dTheta_dt, dThetaDot_dt, 0.0, 1.0);
}
`,zl=`precision highp float;

uniform vec2 pointTexelSize;
uniform vec2 pCoord;
uniform float radiusPx;
uniform float aspectRatio;

void main() {
    // Convert fragment coordinates to normalized texel coordinates
    vec2 uv = gl_FragCoord.xy * pointTexelSize;

    uv.x *= aspectRatio;

    float circleSize = 0.002;
    float radius = radiusPx * circleSize ;
    float dist = distance(uv, pCoord);

    // Define a feathering range for smoothing the circle's edge
    float feather = 0.002;

    // Calculate the alpha value based on the distance to smooth the edge
    float alpha = smoothstep(radius, radius - feather, dist);

    // If inside the circle, output a color with the calculated alpha
    if (dist < radius + feather) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    } else {
        discard;
    }
}
`,Hl=`precision highp float;

uniform vec2 pointTexelSize;  
uniform vec2 pCoord;
uniform float radiusPx;
uniform float aspectRatio;

void main() {
    // Convert fragment coordinates to normalized texel coordinates
    vec2 uv = gl_FragCoord.xy * pointTexelSize;

    uv.x *= aspectRatio;

    float circleSize = 0.0015;
    float radius = radiusPx * circleSize ; 
    float dist = distance(uv, pCoord) ;

    if (dist < radius) {
        gl_FragColor = vec4(0.8, 0.8, 0.8, 0.7);
    } else {
        discard; 
    }
}

`,Vl=`precision highp float;

attribute vec2 aPosition;
uniform mat3 uTransformMatrix;
uniform float aspectRatio;  
varying vec2 vUv;

void main () {
  vec3 position = vec3(aPosition, 1.0);
  vec3 transformedPosition = uTransformMatrix * position;

  transformedPosition.x /= aspectRatio;
  vUv = transformedPosition.xy * 0.5 + 0.5;

  gl_Position = vec4(transformedPosition.xy, 0.0, 1.0);
}`,Gl=`precision highp float;

varying vec2 vUv;  
uniform sampler2D mTexture;
uniform float opacity;

void main () {
  vec3 color = texture2D(mTexture, vUv).xyz;
  gl_FragColor = vec4(color, opacity);
}`,Yl=`precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform sampler2D vTexture;
uniform float max;

void main () {
  vec2 slope = texture2D(vTexture, vUv).xy;
  float dt = 0.00001;
  vec2 d = slope * dt;

  float magnitude = length(d);
  float normalizedM = clamp(magnitude / max, 0.0, 1.0);

  vec3 color;

  // Use normalizedMagnitude to map it to colors: 
  // blue -> green -> yellow -> red
  if (normalizedM < 0.25) {
    color = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), normalizedM / 0.25);  // Blue to Cyan
  } else if (normalizedM < 0.5) {
    color = mix(vec3(0.0, 1.0, 1.0), vec3(0.0, 1.0, 0.0), (normalizedM - 0.25) / 0.25);  // Cyan to Green
  } else if (normalizedM < 0.75) {
    color = mix(vec3(0.0, 1.0, 0.0), vec3(1.0, 1.0, 0.0), (normalizedM - 0.5) / 0.25);  // Green to Yellow
  } else {
    color = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), (normalizedM - 0.75) / 0.25);  // Yellow to Red
  };

  gl_FragColor = vec4(color, 1.0);
}`,Xl=t=>{const e=new et(t,ot,Nl),n=new et(t,ot,Dl),i=new et(t,ot,Yl),r=new et(t,ot,Bl),o=new et(t,ot,Ol),s=new et(t,ot,zl),a=new et(t,ot,Hl),u=new et(t,Vl,Gl),l=new et(t,ot,Ul);return{programs:{copyProgram:e,stateProgram:n,derivativeProgram:o,magnitudeProgram:i,gridLinesProgram:r,displayProgram:l,pointProgram:s,pointMovementProgram:a,arrowFieldProgram:u}}},H=document.getElementsByTagName("canvas")[0];Bn(H);const Te=document.querySelector(".background-div"),Dn=$i(H);if(Dn&&Te){const{gl:t,ext:e}=Dn,{programs:n}=Xl(t),i=new Fl(H);Rl(t,H,n,i),bi(Te,H),yi(i,H),xi(t,e,n.copyProgram),Ai(t,H,n.stateProgram),le(t,n.derivativeProgram),ae(t,H,n.magnitudeProgram),St(t,H,n.arrowFieldProgram),wi(t,e,H,Te,n,i)}else Ti(H);
