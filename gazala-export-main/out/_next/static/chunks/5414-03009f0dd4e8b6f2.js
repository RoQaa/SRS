"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5414],{33145:function(e,t,a){a.d(t,{default:function(){return n.a}});var r=a(48461),n=a.n(r)},48461:function(e,t,a){Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var a in t)Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}(t,{default:function(){return i},getImageProps:function(){return l}});let r=a(47043),n=a(55346),o=a(65878),d=r._(a(5084));function l(e){let{props:t}=(0,n.getImgProps)(e,{defaultLoader:d.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,a]of Object.entries(t))void 0===a&&delete t[e];return{props:t}}let i=o.Image},74287:function(e,t,a){a.d(t,{Z:function(){return d}});var r=a(57437),n=a(42586),o=e=>{let{id:t,name:a,label:n,type:o,placeholder:d}=e;return(0,r.jsxs)("div",{className:"col-md-6",children:[(0,r.jsx)("label",{htmlFor:t,className:"form-label",children:n}),(0,r.jsx)("input",{name:a,type:o,className:"form-control",id:t,placeholder:d})]})},d=e=>{let{inner:t=!1,title:a=""}=e,d=(0,n.useTranslations)("form");return(0,r.jsxs)("div",{className:t?"inner-form-box pt-3":"form-box pt-3",children:[a&&(0,r.jsx)("h2",{children:a}),(0,r.jsxs)("form",{className:"row g-3",children:[(0,r.jsx)(o,{id:"inputName",name:"name",label:d("name"),type:"text",placeholder:d("name_placeholder")}),(0,r.jsx)(o,{id:"inputEmail",name:"email",label:d("email"),type:"email",placeholder:d("email_placeholder")}),(0,r.jsx)(o,{id:"inputPhone",name:"phone",label:d("phone"),type:"text",placeholder:d("phone_placeholder")}),(0,r.jsx)(o,{id:"inputComp",name:"company",label:d("company"),type:"text",placeholder:d("company_placeholder")}),(0,r.jsx)(o,{id:"inputPos",name:"position",label:d("position"),type:"text",placeholder:d("position_placeholder")}),(0,r.jsx)("label",{htmlFor:"floatingTextarea2",children:d("message")}),(0,r.jsx)("div",{className:"form-floating",children:(0,r.jsx)("textarea",{className:"form-control",placeholder:d("message_placeholder"),id:"floatingTextarea2",style:{height:"100px"}})}),(0,r.jsx)("div",{className:"col-12",children:(0,r.jsx)("button",{type:"submit",className:"btn btn-primary",children:d("send")})})]})]})}},27966:function(e,t,a){var r=a(2265);t.default=e=>{let{locale:t,page:a}=e;return(0,r.useEffect)(()=>{(async()=>{try{let n=await fetch("".concat("https://stagingsrv.gazala.net/api","/seo/findByPage/").concat(a)),o=await n.json();if(o.data){document.title="en"===t?o.data.title_en:o.data.title_ar;let a=document.querySelector('meta[name="description"]');a&&a.setAttribute("content","en"===t?o.data.meta_description_en:o.data.meta_description_ar);let n=document.querySelector('meta[name="keywords"]');if(n){var e,r;let a="en"===t?null===(e=o.data.keywords_en)||void 0===e?void 0:e.join(", "):null===(r=o.data.keywords_ar)||void 0===r?void 0:r.join(", ");n.setAttribute("content",a||"")}["og:title","og:description","og:image"].forEach(e=>{let a=document.querySelector('meta[property="'.concat(e,'"]'));if(a){let r="og:image"===e?o.data.og_image:"en"===t?o.data["".concat(e.split(":")[1],"_en")]:o.data["".concat(e.split(":")[1],"_ar")];a.setAttribute("content",r)}})}}catch(e){console.error("Error updating SEO:",e)}})()},[t,a]),null}},63524:function(e,t,a){var r=a(57437);t.Z=e=>{let{item:t,locale:a}=e,n=a||"en",o=(null==t?void 0:t.project)?null==t?void 0:t.project:"",d=(null==t?void 0:t.product)?null==t?void 0:t.product:"",l=(null==t?void 0:t.scope)?null==t?void 0:t.scope:"",i=o?null==o?void 0:o.title:d?null==d?void 0:d.name:l?null==l?void 0:l.service:"",c=o?null==o?void 0:o.title_ar:d?null==d?void 0:d.name_ar:l?null==l?void 0:l.service_ar:"",s=o?null==o?void 0:o.description:d?null==d?void 0:d.description:l?null==l?void 0:l.details:"",u=o?null==o?void 0:o.description_ar:d?d.description_ar:l?null==l?void 0:l.details_ar:"";return(0,r.jsxs)("div",{className:"pr-steel-txt",children:[(0,r.jsx)("h2",{children:t&&"en"===n?i:c}),(0,r.jsx)("p",{children:t&&"en"===n?s:u})]})}},92390:function(e,t,a){var r=a(57437),n=a(35292),o=a(33145);t.Z=e=>{let{imgSrc:t,title:a="",mainPage:d=!0,slug:l="",locale:i}=e;return(0,r.jsxs)(r.Fragment,{children:[d&&(0,r.jsxs)("div",{className:"page-title-sec",children:[(0,r.jsx)("div",{className:"title-sec-overlay"}),(0,r.jsx)(o.default,{src:t,alt:"".concat(a," page image"),width:1920,height:600,quality:75,priority:!0}),(0,r.jsx)("div",{className:"pg-ttl-cont",children:(0,r.jsx)("h2",{children:(0,n.x)(a)})})]}),!d&&(0,r.jsxs)("div",{className:"project-bg-ttl",children:[(0,r.jsx)("div",{className:"proj-bg-overlay"}),(0,r.jsx)(o.default,{src:t,alt:l,width:1920,height:600,quality:75,priority:!0}),(0,r.jsxs)("div",{className:"en"===i?"project-pg-ttl-cont":"project-pg-ttl-cont ar",children:[(0,r.jsx)("h2",{children:a}),(0,r.jsx)("h1",{children:l})]})]})]})}},45394:function(e,t,a){a.d(t,{C:function(){return o},T:function(){return n}});var r=a(68575);let n=r.I0,o=r.v9},50984:function(e,t,a){a.d(t,{Ir:function(){return p},dQ:function(){return c},nM:function(){return u},r7:function(){return x},ry:function(){return s},t2:function(){return i}});var r=a(1455),n=a(83464),o=a(43577),d=a(64131);let l="".concat("https://stagingsrv.gazala.net/api","/edit-website/products"),i=(0,r.hg)("products/fetchProducts",async(e,t)=>{let{rejectWithValue:a}=t;try{let e=await n.default.get(l,{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}});if(200!==e.status)throw Error("Failed to fetch products. Status: ".concat(e.status));return e.data.data}catch(e){if(e instanceof o.d7){var r;return a((null==e?void 0:null===(r=e.response)||void 0===r?void 0:r.data)||"Failed to fetch products")}}}),c=(0,r.hg)("products/fetchProductBySlug",async(e,t)=>{let{rejectWithValue:a}=t;try{let t=await n.default.get("".concat(l,"/").concat(e),{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}});if(200!==t.status)return a(t.data.message||"Failed to fetch product.");return t.data.data}catch(e){if(e instanceof o.d7){var r;return a((null==e?void 0:null===(r=e.response)||void 0===r?void 0:r.data)||"An unexpected error occurred.")}}}),s=(0,r.hg)("products/createProduct",async(e,t)=>{let{dispatch:a,rejectWithValue:r}=t;try{let t=await n.default.post(l,e,{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}});if(201!==t.status)return r(t.data.message||"Failed to create product.");let o=t.data;return a(v(o)),o}catch(e){if(e instanceof o.d7){var i;return r((null==e?void 0:null===(i=e.response)||void 0===i?void 0:i.data)||"An unexpected error occurred.")}}}),u=(0,r.hg)("products/updateProduct",async(e,t)=>{let{formData:a,slug:r}=e,{rejectWithValue:i}=t;try{let e=await n.default.patch("".concat(l,"/").concat(r),a,{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}});if(200!==e.status)return i(e.data.message||"Failed to update product.");return e.data}catch(e){if(e instanceof o.d7){var c;return i((null==e?void 0:null===(c=e.response)||void 0===c?void 0:c.data)||"An unexpected error occurred.")}}}),p=(0,r.hg)("products/deleteProduct",async(e,t)=>{let{dispatch:a,rejectWithValue:r}=t;try{let t=await n.default.delete("".concat(l,"/").concat(e),{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}});if(200!==t.status)return r(t.data.message||"Failed to delete product.");return a(y(e)),e}catch(e){if(e instanceof o.d7){var i;return r((null==e?void 0:null===(i=e.response)||void 0===i?void 0:i.data)||"An unexpected error occurred.")}}}),m={productsData:[],currentProduct:null,loading:!1,error:null,activeTab:"1",formValues:{name:"",name_ar:"",description:"",description_ar:"",parentProductId:null,thumbnail:"",images:[],published:!1}},f=(0,r.oM)({name:"products",initialState:m,reducers:{setCurrentProduct:(e,t)=>{e.currentProduct=t.payload},clearCurrentProduct:e=>{e.currentProduct=null},addProduct:(e,t)=>{e.productsData.push(t.payload)},removeProduct:(e,t)=>{e.productsData=e.productsData.filter(e=>e._id!==t.payload)},setActiveTab:(e,t)=>{e.activeTab=t.payload},setFormValues:(e,t)=>{e.formValues=t.payload},clearFormValues:e=>{e.formValues=m.formValues}},extraReducers:e=>{e.addCase(i.pending,e=>{e.loading=!0,e.error=null}).addCase(i.fulfilled,(e,t)=>{e.loading=!1,e.productsData=t.payload}).addCase(i.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message||"Failed to load products data."}).addCase(c.pending,e=>{e.loading=!0,e.error=null}).addCase(c.fulfilled,(e,t)=>{e.loading=!1,e.currentProduct=t.payload,e.formValues={name:t.payload.name,name_ar:t.payload.name_ar,description:t.payload.description,description_ar:t.payload.description_ar,parentProductId:t.payload.parentProductId,thumbnail:t.payload.thumbnail,images:t.payload.images,published:t.payload.published}}).addCase(c.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message||"Failed to fetch product."}).addCase(u.pending,e=>{e.loading=!0,e.error=null}).addCase(u.fulfilled,(e,t)=>{e.loading=!1;let a=e.productsData.findIndex(e=>e._id===t.payload._id);-1!==a&&(e.productsData[a]=t.payload),e.currentProduct=t.payload}).addCase(u.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message||"Failed to update product."})}}),{setCurrentProduct:h,clearCurrentProduct:g,addProduct:v,removeProduct:y,setActiveTab:x,setFormValues:j,clearFormValues:_}=f.actions;t.ZP=f.reducer},35292:function(e,t,a){a.d(t,{x:function(){return r}});let r=e=>"string"==typeof e&&e?e.replace(/\w\S*/g,e=>e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()):""},43577:function(e,t,a){a.d(t,{d7:function(){return n}});let{Axios:r,AxiosError:n,CanceledError:o,isCancel:d,CancelToken:l,VERSION:i,all:c,Cancel:s,isAxiosError:u,spread:p,toFormData:m,AxiosHeaders:f,HttpStatusCode:h,formToJSON:g,getAdapter:v,mergeConfig:y}=a(83464).default}}]);