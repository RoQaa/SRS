(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5169],{75858:function(e,r,t){Promise.resolve().then(t.bind(t,49696))},54994:function(e,r,t){"use strict";var n=t(2265),a=t(40718),o=t.n(a);function l(){return(l=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var s=(0,n.forwardRef)(function(e,r){var t=e.color,a=e.size,o=void 0===a?24:a,s=function(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}(e,["color","size"]);return n.createElement("svg",l({ref:r,xmlns:"http://www.w3.org/2000/svg",width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:void 0===t?"currentColor":t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},s),n.createElement("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),n.createElement("circle",{cx:"9",cy:"7",r:"4"}),n.createElement("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87"}),n.createElement("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"}))});s.propTypes={color:o().string,size:o().oneOfType([o().string,o().number])},s.displayName="Users",r.Z=s},80201:function(e,r,t){"use strict";t.d(r,{Z:function(){return m}});var n=t(2265),a=t(40718),o=t.n(a),l=t(36760),s=t.n(l),i=t(28137),c=["className","cssModule","variant","innerRef"];function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function u(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}var f={active:o().bool,"aria-label":o().string,onClick:o().func,variant:o().oneOf(["white"]),className:o().string,cssModule:o().object,innerRef:o().oneOfType([o().object,o().string,o().func])};function p(e){var r=e.className,t=(e.cssModule,e.variant),a=e.innerRef,o=function(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}(e,c),l=(0,i.mx)(s()(r,"btn-close",t&&"btn-close-".concat(t)));return n.createElement("button",d({ref:a,type:"button",className:l},function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?u(Object(t),!0).forEach(function(r){var n;n=t[r],r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}({"aria-label":"close"},o)))}p.propTypes=f;var h=["active","aria-label","block","className","close","cssModule","color","outline","size","tag","innerRef"];function b(){return(b=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var v={active:o().bool,"aria-label":o().string,block:o().bool,children:o().node,className:o().string,cssModule:o().object,close:o().bool,color:o().string,disabled:o().bool,innerRef:o().oneOfType([o().object,o().func,o().string]),onClick:o().func,outline:o().bool,size:o().string,tag:i.iC};function g(e){var r=(0,n.useCallback)(function(r){if(e.disabled){r.preventDefault();return}if(e.onClick)return e.onClick(r)},[e.onClick,e.disabled]),t=e.active,a=e["aria-label"],o=e.block,l=e.className,c=e.close,d=e.cssModule,u=e.color,f=e.outline,v=e.size,g=e.tag,m=void 0===g?"button":g,j=e.innerRef,y=function(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}(e,h);if(c)return n.createElement(p,y);var x="btn".concat(f?"-outline":"","-").concat(void 0===u?"secondary":u),O=(0,i.mx)(s()(l,"btn",x,!!v&&"btn-".concat(v),!!o&&"d-block w-100",{active:t,disabled:e.disabled}),d);return y.href&&"button"===m&&(m="a"),n.createElement(m,b({type:"button"===m&&y.onClick?"button":void 0},y,{className:O,ref:j,onClick:r,"aria-label":a}))}g.propTypes=v;var m=g},75722:function(e,r,t){"use strict";var n=t(2265),a=t(40718),o=t.n(a),l=t(36760),s=t.n(l),i=t(28137),c=["className","cssModule","tag"];function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var u={className:o().string,cssModule:o().object,tag:i.iC};function f(e){var r=e.className,t=e.cssModule,a=e.tag,o=function(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}(e,c),l=(0,i.mx)(s()(r,"card-header"),t);return n.createElement(void 0===a?"div":a,d({},o,{className:l}))}f.propTypes=u,r.Z=f},99914:function(e,r,t){"use strict";var n=t(2265),a=t(40718),o=t.n(a),l=t(36760),s=t.n(l),i=t(28137),c=["className","cssModule","fluid","tag"];function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var u={tag:i.iC,fluid:o().oneOfType([o().bool,o().string]),className:o().string,cssModule:o().object};function f(e){var r=e.className,t=e.cssModule,a=e.fluid,o=e.tag,l=function(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}(e,c),u="container";!0===a?u="container-fluid":a&&(u="container-".concat(a));var f=(0,i.mx)(s()(r,u),t);return n.createElement(void 0===o?"div":o,d({},l,{className:f}))}f.propTypes=u,r.Z=f},586:function(e,r,t){"use strict";var n=t(2265),a=t(40718),o=t.n(a),l=t(36760),s=t.n(l),i=t(28137),c=["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"];function d(){return(d=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var u={bordered:o().bool,borderless:o().bool,className:o().string,cssModule:o().object,dark:o().bool,hover:o().bool,innerRef:o().oneOfType([o().func,o().string,o().object]),responsive:o().oneOfType([o().bool,o().string]),responsiveTag:i.iC,size:o().string,striped:o().bool,tag:i.iC};function f(e){var r=e.className,t=e.cssModule,a=e.size,o=e.bordered,l=e.borderless,u=e.striped,f=e.dark,p=e.hover,h=e.responsive,b=e.tag,v=e.responsiveTag,g=e.innerRef,m=function(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}(e,c),j=(0,i.mx)(s()(r,"table",!!a&&"table-"+a,!!o&&"table-bordered",!!l&&"table-borderless",!!u&&"table-striped",!!f&&"table-dark",!!p&&"table-hover"),t),y=n.createElement(void 0===b?"table":b,d({},m,{ref:g,className:j}));if(h){var x=(0,i.mx)(!0===h?"table-responsive":"table-responsive-".concat(h),t);return n.createElement(void 0===v?"div":v,{className:x},y)}return y}f.propTypes=u,r.Z=f},13768:function(e,r,t){"use strict";var n=t(57437),a=t(2265),o=t(75722);r.Z=e=>{let{title:r,span:t,headClass:l,icon:s,tagClass:i}=e;return(0,n.jsxs)(o.Z,{className:l||"",children:[(0,n.jsxs)("h4",{className:i||"",children:[s&&s,r]}),t&&(0,n.jsx)("p",{className:"f-m-light mt-1",children:t.map((e,r)=>(0,n.jsxs)(a.Fragment,{children:[null==e?void 0:e.text," ",e.code&&(0,n.jsx)("code",{children:e.code})," ",e.mark&&(0,n.jsx)("mark",{children:e.mark})]},r))})]})}},49696:function(e,r,t){"use strict";t.d(r,{default:function(){return T}});var n=t(57437),a=t(2265),o=t(99914),l=t(50288),s=t(98723),i=t(65051),c=t(586),d=t(45394),u=t(84876),f=t(35292),p=t(41221),h=t(80201),b=t(5515),v=t.n(b),g=e=>{let{users:r}=e,t=(0,d.T)(),{loading:o,error:l}=(0,d.C)(e=>e.user),i=JSON.parse(window.localStorage.getItem("user"))||{},[c,b]=(0,a.useState)({});(0,a.useEffect)(()=>{t((0,u.AW)())},[t]);let g=(e,r)=>{("admin"===r||"editor"===r||"viewer"===r)&&b(t=>({...t,[e]:r}))},m=e=>{if((null==i?void 0:i.role)!=="admin"){v().fire({icon:"error",title:"Permission Denied",text:"Only admins can update user roles."});return}let r=c[e];r&&t((0,u.Nq)({id:e,userData:{role:r}})).unwrap().then(()=>{v().fire({icon:"success",text:"User role has been updated!",confirmButtonColor:"#3085d6"}),t((0,u.AW)())}).catch(e=>{v().fire({icon:"error",title:"Error!",text:e.message||"Failed to update user role."})})},j=e=>{v().fire({icon:"warning",title:"Are you sure?",text:"Once deleted, this user cannot be recovered!",showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#3085d6",confirmButtonText:"Delete"}).then(r=>{r.isConfirmed&&t((0,u.h8)(e)).unwrap().then(()=>{v().fire({icon:"success",text:"User has been deleted!",confirmButtonColor:"#3085d6"})}).catch(e=>{v().fire({icon:"error",title:"Error!",text:e.message||"Failed to delete the User."})})})};return l?(0,n.jsx)("tbody",{children:(0,n.jsx)("tr",{children:(0,n.jsx)("td",{colSpan:5,className:"text-center p-4",children:(0,n.jsx)("p",{className:"text-danger",children:l})})})}):(0,n.jsx)("tbody",{children:o?(0,n.jsx)("tr",{children:(0,n.jsx)("td",{colSpan:5,className:"text-center",children:(0,n.jsxs)(s.Z,{sm:"12",className:"text-center",children:[(0,n.jsx)(p.Z,{color:"primary"}),(0,n.jsx)("p",{children:"Loading Users data..."})]})})}):r&&r.length>0?r.map((e,r)=>{var t;return(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{className:"add-project",children:"".concat((0,f.x)(null==e?void 0:e.fName)," ").concat((0,f.x)(null==e?void 0:e.lName))}),(0,n.jsx)("td",{children:null==e?void 0:e.email}),(0,n.jsx)("td",{children:(0,n.jsxs)("select",{value:c[null!==(t=e._id)&&void 0!==t?t:""]||e.role,onChange:r=>{var t;return g(null!==(t=e._id)&&void 0!==t?t:"",r.target.value)},className:"form-select",children:[(0,n.jsx)("option",{value:"admin",children:"Admin"}),(0,n.jsx)("option",{value:"editor",children:"Editor"})]})}),(0,n.jsxs)("td",{className:"text-start",children:[(0,n.jsxs)(h.Z,{className:"me-3",color:"primary",size:"sm",onClick:()=>{var r;return m(null!==(r=e._id)&&void 0!==r?r:"")},disabled:(null==i?void 0:i.role)!=="admin",children:[(0,n.jsx)("i",{className:"fa fa-pencil"})," Update"]}),(0,n.jsxs)(h.Z,{color:"danger",size:"sm",onClick:()=>{var r;return j(null!==(r=null==e?void 0:e._id)&&void 0!==r?r:"")},children:[(0,n.jsx)("i",{className:"fa fa-trash"})," Delete"]})]})]},r)}):(0,n.jsx)("tr",{children:(0,n.jsx)("td",{colSpan:5,className:"text-center p-4",children:"No Users Found"})})})},m=t(13768),j=t(42586),y=t(27648),x=t(54994),O=t(97231),w=t(62383),N=t(42391),k=t(5551),C=t(53514),Z=t(12121),E=e=>{let{activeTab:r}=e,t=(0,d.T)(),a=(0,j.useLocale)();return(0,n.jsx)(i.Z,{children:(0,n.jsxs)(l.Z,{children:[(0,n.jsx)(s.Z,{md:"6",className:"p-0 d-flex",children:(0,n.jsxs)(k.Z,{tabs:!0,className:"border-tab",id:"top-tab",children:[(0,n.jsx)(C.Z,{children:(0,n.jsxs)(Z.Z,{href:"#",className:"1"===r?"active":"",onClick:()=>t((0,u.r7)("1")),children:[(0,n.jsx)(x.Z,{}),"All"]})}),(0,n.jsx)(C.Z,{children:(0,n.jsxs)(Z.Z,{href:"#",className:"2"===r?"active":"",onClick:()=>t((0,u.r7)("2")),children:[(0,n.jsx)(O.Z,{}),"Admins"]})}),(0,n.jsx)(C.Z,{children:(0,n.jsxs)(Z.Z,{href:"#",className:"3"===r?"active":"",onClick:()=>t((0,u.r7)("3")),children:[(0,n.jsx)(w.Z,{}),"Editors"]})})]})}),(0,n.jsx)(s.Z,{children:(0,n.jsx)(h.Z,{className:"float-end",color:"primary",children:(0,n.jsxs)(y.default,{href:"".concat("https://stagingsrv.gazala.net","/").concat(a,"/dashboard/users/add"),className:"text-white text-light",children:[(0,n.jsx)(N.Z,{className:"me-1"}),"Add User"]})})})]})})},P=()=>{let{activeTab:e,allUsers:r}=(0,d.C)(e=>e.user),t=(0,d.C)(e=>e.user.user),a=Array.isArray(r)?r.filter(e=>e._id!==(null==t?void 0:t._id)).filter(r=>"1"===e||("2"===e?"admin"===r.role:"3"===e?"editor"===r.role:"4"!==e||"viewer"===r.role)):[];return(0,n.jsxs)(l.Z,{children:[(0,n.jsx)(s.Z,{md:"12",className:"project-list",children:(0,n.jsx)(E,{activeTab:e})}),(0,n.jsx)(s.Z,{md:"12",children:(0,n.jsxs)(i.Z,{children:[(0,n.jsx)(m.Z,{title:"Users"}),(0,n.jsx)("div",{className:"table-responsive theme-scrollbar",children:(0,n.jsxs)(c.Z,{className:"card-table table-vcenter text-nowrap",children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"Name"}),(0,n.jsx)("th",{children:"Email"}),(0,n.jsx)("th",{children:"Role"}),(0,n.jsx)("th",{children:"Actions"})]})}),(0,n.jsx)(g,{users:a})]})})]})})]})},T=()=>(0,n.jsx)(o.Z,{fluid:!0,children:(0,n.jsx)("div",{className:"edit-profile",children:(0,n.jsx)(l.Z,{children:(0,n.jsx)(P,{})})})})},45394:function(e,r,t){"use strict";t.d(r,{C:function(){return o},T:function(){return a}});var n=t(68575);let a=n.I0,o=n.v9},84876:function(e,r,t){"use strict";t.d(r,{AW:function(){return c},Nq:function(){return f},av:function(){return v},h8:function(){return p},r7:function(){return b},x4:function(){return i}});var n=t(1455),a=t(83464),o=t(43577),l=t(64131);let s="".concat("https://stagingsrv.gazala.net/api","/users"),i=(0,n.hg)("user/login",async(e,r)=>{let{email:t,password:n}=e;try{let e=await fetch("".concat("https://stagingsrv.gazala.net/api","/auth/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:n})});if(!e.ok){let r=await e.json();throw Error(r.message||"Login failed.")}return await e.json()}catch(e){return r.rejectWithValue(e.message||"An unknown error occurred.")}}),c=(0,n.hg)("user/fetchAll",async(e,r)=>{let{rejectWithValue:t}=r;try{let e=await a.default.get("".concat(s),{headers:{Authorization:"Bearer ".concat(l.Z.get("auth_token"))}});return console.log(e.data),e.data.data}catch(e){if(e instanceof o.d7){var n;return t((null==e?void 0:null===(n=e.response)||void 0===n?void 0:n.data)||"Failed to fetch users")}throw Error("An unknown error occurred.")}}),d=(0,n.hg)("user/fetchById",async(e,r)=>{let{rejectWithValue:t}=r,n=l.Z.get("auth_token");if(!n)throw Error("No authorization token found");try{return(await a.default.get("".concat(s,"/").concat(e),{headers:{Authorization:"Bearer ".concat(n)}})).data.data}catch(e){if(e instanceof o.d7){var i;return t((null==e?void 0:null===(i=e.response)||void 0===i?void 0:i.data)||"Failed to fetch user")}}}),u=(0,n.hg)("user/addNewUser",async(e,r)=>{let{rejectWithValue:t}=r;try{let r=await a.default.post("".concat(s),e,{headers:{Authorization:"Bearer ".concat(l.Z.get("auth_token"))}});return null==r?void 0:r.data}catch(e){if(e instanceof o.d7){var n;return t((null==e?void 0:null===(n=e.response)||void 0===n?void 0:n.data)||"Failed to add new user")}}}),f=(0,n.hg)("user/update",async(e,r)=>{let{id:t,userData:n}=e,{rejectWithValue:i}=r;try{let e=await a.default.patch("".concat(s,"/").concat(t),n,{headers:{Authorization:"Bearer ".concat(l.Z.get("auth_token"))}});return null==e?void 0:e.data}catch(e){if(e instanceof o.d7){var c;return i((null==e?void 0:null===(c=e.response)||void 0===c?void 0:c.data)||"Failed to update user")}}}),p=(0,n.hg)("user/delete",async(e,r)=>{let{dispatch:t,rejectWithValue:n}=r;try{return await a.default.delete("".concat(s,"/").concat(e),{headers:{Authorization:"Bearer ".concat(l.Z.get("auth_token"))}}),t(g(e)),e}catch(e){if(e instanceof o.d7){var i;return n((null==e?void 0:null===(i=e.response)||void 0===i?void 0:i.data)||"Failed to delete user")}}}),h=(0,n.oM)({name:"user",initialState:{isAuthenticated:!1,token:null,user:null,loading:!1,error:null,allUsers:[],activeTab:"1"},reducers:{setActiveTab:(e,r)=>{e.activeTab=r.payload},logout(e){e.user=null,e.allUsers=[]},setUser(e,r){e.isAuthenticated=!0,e.user=r.payload},removeUser(e,r){e.allUsers=e.allUsers.filter(e=>e._id!==r.payload)}},extraReducers:e=>{e.addCase(i.pending,e=>{e.loading=!0,e.error=null}).addCase(i.fulfilled,(e,r)=>{e.loading=!1,e.token=r.payload.token,e.user={fName:r.payload.fname,lName:r.payload.lName,role:r.payload.role,email:r.payload.email},e.isAuthenticated=!0}).addCase(i.rejected,(e,r)=>{e.loading=!1,e.error=r.payload||"Failed to login. Please try again."}).addCase(d.pending,e=>{e.loading=!0,e.error=null}).addCase(d.fulfilled,(e,r)=>{e.loading=!1,e.user=r.payload}).addCase(d.rejected,(e,r)=>{e.loading=!1,e.error=r.error.message||"Failed to fetch user."}).addCase(c.pending,e=>{e.loading=!0,e.error=null}).addCase(c.fulfilled,(e,r)=>{e.loading=!1,e.allUsers=r.payload}).addCase(c.rejected,(e,r)=>{e.loading=!1,e.error=r.error.message||"Failed to fetch users."}).addCase(u.pending,e=>{e.loading=!0,e.error=null}).addCase(u.fulfilled,(e,r)=>{e.loading=!1,e.allUsers?e.allUsers=[...e.allUsers,r.payload]:e.allUsers=[r.payload]}).addCase(u.rejected,(e,r)=>{e.loading=!1,e.error=r.error.message||"Failed to add new user"}).addCase(f.pending,e=>{e.loading=!0,e.error=null}).addCase(f.fulfilled,(e,r)=>{e.loading=!1,e.allUsers&&(e.allUsers=e.allUsers.map(e=>e._id===r.payload._id?r.payload:e))}).addCase(f.rejected,(e,r)=>{e.loading=!1,e.error=r.error.message||"Failed to update user."})}}),{setActiveTab:b,setUser:v,removeUser:g}=h.actions;r.ZP=h.reducer},35292:function(e,r,t){"use strict";t.d(r,{x:function(){return n}});let n=e=>"string"==typeof e&&e?e.replace(/\w\S*/g,e=>e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()):""}},function(e){e.O(0,[9461,2292,2586,3464,7648,3537,897,2971,2117,1744],function(){return e(e.s=75858)}),_N_E=e.O()}]);