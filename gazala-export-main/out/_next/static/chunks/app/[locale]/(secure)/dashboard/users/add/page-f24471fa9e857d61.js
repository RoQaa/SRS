(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[207],{58483:function(e,r,t){Promise.resolve().then(t.bind(t,10120))},40257:function(e,r,t){"use strict";var n,o;e.exports=(null==(n=t.g.process)?void 0:n.env)&&"object"==typeof(null==(o=t.g.process)?void 0:o.env)?t.g.process:t(44227)},44227:function(e){!function(){var r={229:function(e){var r,t,n,o=e.exports={};function a(){throw Error("setTimeout has not been defined")}function s(){throw Error("clearTimeout has not been defined")}function i(e){if(r===setTimeout)return setTimeout(e,0);if((r===a||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:a}catch(e){r=a}try{t="function"==typeof clearTimeout?clearTimeout:s}catch(e){t=s}}();var c=[],l=!1,u=-1;function f(){l&&n&&(l=!1,n.length?c=n.concat(c):u=-1,c.length&&d())}function d(){if(!l){var e=i(f);l=!0;for(var r=c.length;r;){for(n=c,c=[];++u<r;)n&&n[u].run();u=-1,r=c.length}n=null,l=!1,function(e){if(t===clearTimeout)return clearTimeout(e);if((t===s||!t)&&clearTimeout)return t=clearTimeout,clearTimeout(e);try{t(e)}catch(r){try{return t.call(null,e)}catch(r){return t.call(this,e)}}}(e)}}function p(e,r){this.fun=e,this.array=r}function m(){}o.nextTick=function(e){var r=Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)r[t-1]=arguments[t];c.push(new p(e,r)),1!==c.length||l||i(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw Error("process.chdir is not supported")},o.umask=function(){return 0}}},t={};function n(e){var o=t[e];if(void 0!==o)return o.exports;var a=t[e]={exports:{}},s=!0;try{r[e](a,a.exports,n),s=!1}finally{s&&delete t[e]}return a.exports}n.ab="//";var o=n(229);e.exports=o}()},80201:function(e,r,t){"use strict";t.d(r,{Z:function(){return v}});var n=t(2265),o=t(40718),a=t.n(o),s=t(36760),i=t.n(s),c=t(28137),l=["className","cssModule","variant","innerRef"];function u(){return(u=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function f(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}var d={active:a().bool,"aria-label":a().string,onClick:a().func,variant:a().oneOf(["white"]),className:a().string,cssModule:a().object,innerRef:a().oneOfType([a().object,a().string,a().func])};function p(e){var r=e.className,t=(e.cssModule,e.variant),o=e.innerRef,a=function(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(e,l),s=(0,c.mx)(i()(r,"btn-close",t&&"btn-close-".concat(t)));return n.createElement("button",u({ref:o,type:"button",className:s},function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?f(Object(t),!0).forEach(function(r){var n;n=t[r],r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}({"aria-label":"close"},a)))}p.propTypes=d;var m=["active","aria-label","block","className","close","cssModule","color","outline","size","tag","innerRef"];function b(){return(b=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var h={active:a().bool,"aria-label":a().string,block:a().bool,children:a().node,className:a().string,cssModule:a().object,close:a().bool,color:a().string,disabled:a().bool,innerRef:a().oneOfType([a().object,a().func,a().string]),onClick:a().func,outline:a().bool,size:a().string,tag:c.iC};function y(e){var r=(0,n.useCallback)(function(r){if(e.disabled){r.preventDefault();return}if(e.onClick)return e.onClick(r)},[e.onClick,e.disabled]),t=e.active,o=e["aria-label"],a=e.block,s=e.className,l=e.close,u=e.cssModule,f=e.color,d=e.outline,h=e.size,y=e.tag,v=void 0===y?"button":y,g=e.innerRef,O=function(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(e,m);if(l)return n.createElement(p,O);var j="btn".concat(d?"-outline":"","-").concat(void 0===f?"secondary":f),w=(0,c.mx)(i()(s,"btn",j,!!h&&"btn-".concat(h),!!a&&"d-block w-100",{active:t,disabled:e.disabled}),u);return O.href&&"button"===v&&(v="a"),n.createElement(v,b({type:"button"===v&&O.onClick?"button":void 0},O,{className:w,ref:g,onClick:r,"aria-label":o}))}y.propTypes=h;var v=y},99914:function(e,r,t){"use strict";var n=t(2265),o=t(40718),a=t.n(o),s=t(36760),i=t.n(s),c=t(28137),l=["className","cssModule","fluid","tag"];function u(){return(u=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var f={tag:c.iC,fluid:a().oneOfType([a().bool,a().string]),className:a().string,cssModule:a().object};function d(e){var r=e.className,t=e.cssModule,o=e.fluid,a=e.tag,s=function(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(e,l),f="container";!0===o?f="container-fluid":o&&(f="container-".concat(o));var d=(0,c.mx)(i()(r,f),t);return n.createElement(void 0===a?"div":a,u({},s,{className:d}))}d.propTypes=f,r.Z=d},50720:function(e,r,t){"use strict";var n=t(2265),o=t(40718),a=t.n(o),s=t(28137);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var c=["className","cssModule","tag","innerRef"];function l(){return(l=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function u(e,r){return(u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,r){return e.__proto__=r,e})(e,r)}function f(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var p={children:a().node,tag:s.iC,innerRef:a().oneOfType([a().object,a().func,a().string]),className:a().string,cssModule:a().object},m=function(e){!function(e,r){if("function"!=typeof r&&null!==r)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),r&&u(e,r)}(a,e);var r,t,o=(r=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,t=d(a);return e=r?Reflect.construct(t,arguments,d(this).constructor):t.apply(this,arguments),function(e,r){if(r&&("object"===i(r)||"function"==typeof r))return r;if(void 0!==r)throw TypeError("Derived constructors may only return object or undefined");return f(e)}(this,e)});function a(e){var r;return!function(e,r){if(!(e instanceof r))throw TypeError("Cannot call a class as a function")}(this,a),(r=o.call(this,e)).getRef=r.getRef.bind(f(r)),r.submit=r.submit.bind(f(r)),r}return t=[{key:"getRef",value:function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e}},{key:"submit",value:function(){this.ref&&this.ref.submit()}},{key:"render",value:function(){var e=this.props,r=e.className,t=e.cssModule,o=e.tag,a=e.innerRef,i=function(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(e,c),u=(0,s.mx)(r,t);return n.createElement(void 0===o?"form":o,l({},i,{ref:a,className:u}))}}],function(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(a.prototype,t),Object.defineProperty(a,"prototype",{writable:!1}),a}(n.Component);m.propTypes=p,r.Z=m},82097:function(e,r,t){"use strict";var n=t(2265),o=t(40718),a=t.n(o),s=t(36760),i=t.n(s),c=t(28137),l=["className","cssModule","hidden","widths","tag","check","size","for"];function u(){return(u=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function f(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var d=["xs","sm","md","lg","xl","xxl"],p=a().oneOfType([a().number,a().string]),m=a().oneOfType([a().bool,a().string,a().number,a().shape({size:p,order:p,offset:p})]),b={children:a().node,hidden:a().bool,check:a().bool,size:a().string,for:a().string,tag:c.iC,className:a().string,cssModule:a().object,xs:m,sm:m,md:m,lg:m,xl:m,xxl:m,widths:a().array},h=function(e,r,t){return!0===t||""===t?e?"col":"col-".concat(r):"auto"===t?e?"col-auto":"col-".concat(r,"-auto"):e?"col-".concat(t):"col-".concat(r,"-").concat(t)};function y(e){var r=e.className,t=e.cssModule,o=e.hidden,a=e.widths,s=void 0===a?d:a,p=e.tag,m=e.check,b=e.size,y=e.for,v=function(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(e,l),g=[];s.forEach(function(r,n){var o=e[r];if(delete v[r],o||""===o){var a=!n;if((0,c.Kn)(o)){var s,l,u=a?"-":"-".concat(r,"-");s=h(a,r,o.size),g.push((0,c.mx)(i()((f(l={},s,o.size||""===o.size),f(l,"order".concat(u).concat(o.order),o.order||0===o.order),f(l,"offset".concat(u).concat(o.offset),o.offset||0===o.offset),l))),t)}else s=h(a,r,o),g.push(s)}});var O=b||g.length,j=(0,c.mx)(i()(r,!!o&&"visually-hidden",!!m&&"form-check-label",!!b&&"col-form-label-".concat(b),g,!!O&&"col-form-label",!(m||O)&&"form-label"),t);return n.createElement(void 0===p?"label":p,u({htmlFor:y},v,{className:j}))}y.propTypes=b,r.Z=y},10120:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return w}});var n=t(57437),o=t(77314),a=t(34422),s=t(99376),i=t(18206),c=t(50720),l=t(60729),u=t(43207),f=t(82097),d=t(95029),p=t(80201),m=t(2265),b=t(43577),h=t(42586),y=t(64131),v=()=>{let e=(0,s.useRouter)(),[r,t]=(0,m.useState)(""),v=(0,h.useLocale)(),g=a.Ry({fName:a.Z_().min(2,"First name must be at least 2 characters").required("First name is required"),lName:a.Z_().min(2,"Last name must be at least 2 characters").required("Last name is required"),email:a.Z_().email("Invalid email address").required("Email is required"),password:a.Z_().min(8,"Password must be at least 8 characters").matches(/[a-z]/,"Password must contain at least one lowercase letter").matches(/[A-Z]/,"Password must contain at least one uppercase letter").matches(/[0-9]/,"Password must contain at least one number").required("Password is required"),passwordConfirm:a.Z_().min(8,"Password must be at least 8 characters").matches(/[a-z]/,"Password must contain at least one lowercase letter").matches(/[A-Z]/,"Password must contain at least one uppercase letter").matches(/[0-9]/,"Password must contain at least one number").required("Password is required")}),O=(0,o.TA)({initialValues:{fName:"",lName:"",email:"",password:"",passwordConfirm:""},validationSchema:g,onSubmit:async(r,n)=>{let{setSubmitting:o}=n;try{let n=await fetch("".concat("https://stagingsrv.gazala.net/api","/users"),{headers:{Authorization:"Bearer ".concat(y.Z.get("auth_token")),"Content-Type":"application/json"},method:"POST",body:JSON.stringify(r)}),o=await n.json();if(!n.ok){if(o.message.includes("duplicate key error"))return t("User With This Email Already Exists");return t(o.message)}n.ok&&o&&(i.Am.success("User Added successfully"),e.push("/".concat(v,"/dashboard/users")))}catch(e){e instanceof Error||e instanceof b.d7?i.Am.error("Adding user failed. Please try again ".concat(e.message)):i.Am.error("Adding user failed. Please try again. An unknown error occurred.")}finally{o(!1)}}});return(0,n.jsx)("div",{children:(0,n.jsx)("div",{className:"login-main",children:(0,n.jsxs)(c.Z,{className:"theme-form",onSubmit:O.handleSubmit,children:[(0,n.jsx)("h4",{children:"Sign Up to Account"}),(0,n.jsx)("p",{children:"Enter the details to create an account"}),r&&(0,n.jsx)(l.Z,{fade:!0,color:"danger",children:r}),(0,n.jsxs)(u.Z,{children:[(0,n.jsx)(f.Z,{className:"col-form-label",children:"First Name"}),(0,n.jsx)(d.Z,{type:"text",name:"fName",placeholder:"Enter Your First Name",value:O.values.fName,onChange:O.handleChange,onBlur:O.handleBlur,invalid:O.touched.fName&&!!O.errors.fName}),O.touched.fName&&O.errors.fName&&(0,n.jsx)("div",{className:"text-danger",children:O.errors.fName})]}),(0,n.jsxs)(u.Z,{children:[(0,n.jsx)(f.Z,{className:"col-form-label",children:"Last Name"}),(0,n.jsx)(d.Z,{type:"text",name:"lName",placeholder:"Enter Your Last Name",value:O.values.lName,onChange:O.handleChange,onBlur:O.handleBlur,invalid:O.touched.lName&&!!O.errors.lName}),O.touched.lName&&O.errors.lName&&(0,n.jsx)("div",{className:"text-danger",children:O.errors.lName})]}),(0,n.jsxs)(u.Z,{children:[(0,n.jsx)(f.Z,{className:"col-form-label",children:"Email Address"}),(0,n.jsx)(d.Z,{type:"email",name:"email",placeholder:"Enter Your Email",value:O.values.email,onChange:O.handleChange,onBlur:O.handleBlur,invalid:O.touched.email&&!!O.errors.email}),O.touched.email&&O.errors.email&&(0,n.jsx)("div",{className:"text-danger",children:O.errors.email})]}),(0,n.jsxs)(u.Z,{children:[(0,n.jsx)(f.Z,{className:"col-form-label",children:"Password"}),(0,n.jsx)(d.Z,{type:"password",name:"password",placeholder:"Enter Your Password",value:O.values.password,onChange:O.handleChange,onBlur:O.handleBlur,invalid:O.touched.password&&!!O.errors.password}),O.touched.password&&O.errors.password&&(0,n.jsx)("div",{className:"text-danger",children:O.errors.password})]}),(0,n.jsxs)(u.Z,{children:[(0,n.jsx)(f.Z,{className:"col-form-label",children:"Confirm Password"}),(0,n.jsx)(d.Z,{type:"password",name:"passwordConfirm",placeholder:"Enter Your Password",value:O.values.passwordConfirm,onChange:O.handleChange,onBlur:O.handleBlur,invalid:O.touched.passwordConfirm&&!!O.errors.passwordConfirm}),O.touched.passwordConfirm&&O.errors.passwordConfirm&&(0,n.jsx)("div",{className:"text-danger",children:O.errors.passwordConfirm})]}),(0,n.jsx)(u.Z,{className:"mb-0",children:(0,n.jsx)("div",{className:"text-end mt-4",children:(0,n.jsx)(p.Z,{color:"primary",block:!0,className:"w-100",type:"submit",disabled:O.isSubmitting,children:"Sign Up"})})})]})})})},g=t(99914),O=t(50288),j=t(98723),w=()=>(0,n.jsx)(g.Z,{fluid:!0,className:"p-0",children:(0,n.jsx)(O.Z,{className:"m-0",children:(0,n.jsx)(j.Z,{xs:"12",className:"p-0",children:(0,n.jsx)("div",{className:"login-card login-dark",children:(0,n.jsx)(v,{})})})})})},43577:function(e,r,t){"use strict";t.d(r,{d7:function(){return o}});let{Axios:n,AxiosError:o,CanceledError:a,isCancel:s,CancelToken:i,VERSION:c,all:l,Cancel:u,isAxiosError:f,spread:d,toFormData:p,AxiosHeaders:m,HttpStatusCode:b,formToJSON:h,getAdapter:y,mergeConfig:v}=t(83464).default},64131:function(e,r,t){"use strict";function n(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)e[n]=t[n]}return e}t.d(r,{Z:function(){return o}});var o=function e(r,t){function o(e,o,a){if("undefined"!=typeof document){"number"==typeof(a=n({},t,a)).expires&&(a.expires=new Date(Date.now()+864e5*a.expires)),a.expires&&(a.expires=a.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var s="";for(var i in a)a[i]&&(s+="; "+i,!0!==a[i]&&(s+="="+a[i].split(";")[0]));return document.cookie=e+"="+r.write(o,e)+s}}return Object.create({set:o,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],n={},o=0;o<t.length;o++){var a=t[o].split("="),s=a.slice(1).join("=");try{var i=decodeURIComponent(a[0]);if(n[i]=r.read(s,i),e===i)break}catch(e){}}return e?n[e]:n}},remove:function(e,r){o(e,"",n({},r,{expires:-1}))},withAttributes:function(r){return e(this.converter,n({},this.attributes,r))},withConverter:function(r){return e(n({},this.converter,r),this.attributes)}},{attributes:{value:Object.freeze(t)},converter:{value:Object.freeze(r)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}},function(e){e.O(0,[2586,3464,3537,8206,4520,2897,2971,2117,1744],function(){return e(e.s=58483)}),_N_E=e.O()}]);