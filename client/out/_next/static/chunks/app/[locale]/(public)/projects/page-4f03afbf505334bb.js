(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6332],{10597:function(e,t,r){Promise.resolve().then(r.bind(r,4027))},33145:function(e,t,r){"use strict";r.d(t,{default:function(){return n.a}});var a=r(48461),n=r.n(a)},48461:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return l},getImageProps:function(){return c}});let a=r(47043),n=r(55346),o=r(65878),d=a._(r(5084));function c(e){let{props:t}=(0,n.getImgProps)(e,{defaultLoader:d.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let l=o.Image},25523:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return a}});let a=r(47043)._(r(2265)).default.createContext(null)},4027:function(e,t,r){"use strict";r.d(t,{default:function(){return f}});var a=r(57437),n=r(92390),o=r(2265),d=e=>{let{label:t,filter:r,isActive:n,onClick:o}=e;return(0,a.jsx)("li",{className:n?"active":"",onClick:()=>o(r),style:{cursor:"pointer"},children:t})},c=r(33145),l=e=>{let{image:t,title:r,description:n,link:o}=e;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"or-img",children:(0,a.jsx)(c.default,{src:"".concat("https://stagingsrv.gazala.net/api","/").concat(t),alt:r,layout:"responsive",width:512,height:512})}),(0,a.jsx)("div",{className:"overlay",children:(0,a.jsxs)("a",{href:o,className:"content",children:[(0,a.jsx)("h3",{children:r}),(0,a.jsx)("p",{children:n})]})})]})},i=r(42586),s=r(45394),u=r(50023),p=r(50984),f=()=>{let[e,t]=(0,o.useState)(""),c=(0,o.useRef)(null),f=(0,o.useRef)(null),g=(0,i.useLocale)(),h=(0,i.useTranslations)("projects"),{projectsData:v}=(0,s.C)(e=>e.project),{productsData:j}=(0,s.C)(e=>e.products),m=(0,s.T)();(0,o.useEffect)(()=>{v.length<1&&m((0,u.bl)()).unwrap(),j.length<1&&m((0,p.t2)()).unwrap()},[m,v.length,j.length]);let y=v.filter(e=>e.published),x=j.filter(e=>e.published);(0,o.useEffect)(()=>(c.current&&r.e(4110).then(r.t.bind(r,53133,23)).then(e=>{f.current=e.default(c.current,{selectors:{target:".mix"},animation:{duration:300}})}).catch(e=>console.error("MixItUp failed to load:",e)),()=>{f.current&&f.current.destroy()}),[y]);let C=e=>{t(e),f.current&&f.current.filter(e)},P=x.length>0&&x.map(e=>({label:"en"===g?e.name.toUpperCase():e.name_ar,filter:".".concat(e.name.toLowerCase().replace(/\s+/g,"-"))}));return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.Z,{title:h("title"),imgSrc:"/imgs/page-head/banner-projects.jpg"}),(0,a.jsx)("div",{className:"project-sect p-5",children:(0,a.jsxs)("div",{id:"project-glry",className:"proj-gallery",children:[(0,a.jsx)("ul",{children:P&&P.map((t,r)=>(0,a.jsx)(d,{label:t.label,filter:t.filter,isActive:e===t.filter,onClick:()=>C(t.filter)},r))}),(0,a.jsx)("div",{className:"img-glry",ref:c,children:y.length>0&&y.map(e=>{let t=x.find(t=>{var r;return t._id===(null===(r=e.category)||void 0===r?void 0:r._id)});return(0,a.jsx)("div",{className:"col mix ".concat(null==t?void 0:t.name.toLowerCase().replace(/\s+/g,"-")),children:(0,a.jsx)(l,{image:e.images[0],title:"en"===g?(null==t?void 0:t.name.toUpperCase())||"Unknown Product":(null==t?void 0:t.name_ar)||"منتج غير معروف",description:"en"===g?e.title.toUpperCase():e.title_ar,link:"".concat("https://stagingsrv.gazala.net","/").concat(g,"/projects/").concat("en"===g?e.slug:e.slug_ar,"?id=").concat(e._id)})},e._id)})})]})})]})}},92390:function(e,t,r){"use strict";var a=r(57437),n=r(35292),o=r(33145);t.Z=e=>{let{imgSrc:t,title:r="",mainPage:d=!0,slug:c="",locale:l}=e;return(0,a.jsxs)(a.Fragment,{children:[d&&(0,a.jsxs)("div",{className:"page-title-sec",children:[(0,a.jsx)("div",{className:"title-sec-overlay"}),(0,a.jsx)(o.default,{src:t,alt:"".concat(r," page image"),width:1920,height:600,quality:75,priority:!0}),(0,a.jsx)("div",{className:"pg-ttl-cont",children:(0,a.jsx)("h2",{children:(0,n.x)(r)})})]}),!d&&(0,a.jsxs)("div",{className:"project-bg-ttl",children:[(0,a.jsx)("div",{className:"proj-bg-overlay"}),(0,a.jsx)(o.default,{src:t,alt:c,width:1920,height:600,quality:75,priority:!0}),(0,a.jsxs)("div",{className:"en"===l?"project-pg-ttl-cont":"project-pg-ttl-cont ar",children:[(0,a.jsx)("h2",{children:r}),(0,a.jsx)("h1",{children:c})]})]})]})}},45394:function(e,t,r){"use strict";r.d(t,{C:function(){return o},T:function(){return n}});var a=r(68575);let n=a.I0,o=a.v9},50984:function(e,t,r){"use strict";r.d(t,{Ir:function(){return p},dQ:function(){return i},nM:function(){return u},r7:function(){return y},ry:function(){return s},t2:function(){return l}});var a=r(1455),n=r(83464),o=r(43577),d=r(64131);let c="".concat("https://stagingsrv.gazala.net/api","/edit-website/products"),l=(0,a.hg)("products/fetchProducts",async(e,t)=>{let{rejectWithValue:r}=t;try{let e=await n.default.get(c,{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}});if(200!==e.status)throw Error("Failed to fetch products. Status: ".concat(e.status));return e.data.data}catch(e){if(e instanceof o.d7){var a;return r((null==e?void 0:null===(a=e.response)||void 0===a?void 0:a.data)||"Failed to fetch products")}}}),i=(0,a.hg)("products/fetchProductBySlug",async(e,t)=>{let{rejectWithValue:r}=t;try{let t=await n.default.get("".concat(c,"/").concat(e),{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}});if(200!==t.status)return r(t.data.message||"Failed to fetch product.");return t.data.data}catch(e){if(e instanceof o.d7){var a;return r((null==e?void 0:null===(a=e.response)||void 0===a?void 0:a.data)||"An unexpected error occurred.")}}}),s=(0,a.hg)("products/createProduct",async(e,t)=>{let{dispatch:r,rejectWithValue:a}=t;try{let t=await n.default.post(c,e,{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}});if(201!==t.status)return a(t.data.message||"Failed to create product.");let o=t.data;return r(j(o)),o}catch(e){if(e instanceof o.d7){var l;return a((null==e?void 0:null===(l=e.response)||void 0===l?void 0:l.data)||"An unexpected error occurred.")}}}),u=(0,a.hg)("products/updateProduct",async(e,t)=>{let{formData:r,slug:a}=e,{rejectWithValue:l}=t;try{let e=await n.default.patch("".concat(c,"/").concat(a),r,{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}});if(200!==e.status)return l(e.data.message||"Failed to update product.");return e.data}catch(e){if(e instanceof o.d7){var i;return l((null==e?void 0:null===(i=e.response)||void 0===i?void 0:i.data)||"An unexpected error occurred.")}}}),p=(0,a.hg)("products/deleteProduct",async(e,t)=>{let{dispatch:r,rejectWithValue:a}=t;try{let t=await n.default.delete("".concat(c,"/").concat(e),{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}});if(200!==t.status)return a(t.data.message||"Failed to delete product.");return r(m(e)),e}catch(e){if(e instanceof o.d7){var l;return a((null==e?void 0:null===(l=e.response)||void 0===l?void 0:l.data)||"An unexpected error occurred.")}}}),f={productsData:[],currentProduct:null,loading:!1,error:null,activeTab:"1",formValues:{name:"",name_ar:"",description:"",description_ar:"",parentProductId:null,thumbnail:"",images:[],published:!1}},g=(0,a.oM)({name:"products",initialState:f,reducers:{setCurrentProduct:(e,t)=>{e.currentProduct=t.payload},clearCurrentProduct:e=>{e.currentProduct=null},addProduct:(e,t)=>{e.productsData.push(t.payload)},removeProduct:(e,t)=>{e.productsData=e.productsData.filter(e=>e._id!==t.payload)},setActiveTab:(e,t)=>{e.activeTab=t.payload},setFormValues:(e,t)=>{e.formValues=t.payload},clearFormValues:e=>{e.formValues=f.formValues}},extraReducers:e=>{e.addCase(l.pending,e=>{e.loading=!0,e.error=null}).addCase(l.fulfilled,(e,t)=>{e.loading=!1,e.productsData=t.payload}).addCase(l.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message||"Failed to load products data."}).addCase(i.pending,e=>{e.loading=!0,e.error=null}).addCase(i.fulfilled,(e,t)=>{e.loading=!1,e.currentProduct=t.payload,e.formValues={name:t.payload.name,name_ar:t.payload.name_ar,description:t.payload.description,description_ar:t.payload.description_ar,parentProductId:t.payload.parentProductId,thumbnail:t.payload.thumbnail,images:t.payload.images,published:t.payload.published}}).addCase(i.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message||"Failed to fetch product."}).addCase(u.pending,e=>{e.loading=!0,e.error=null}).addCase(u.fulfilled,(e,t)=>{e.loading=!1;let r=e.productsData.findIndex(e=>e._id===t.payload._id);-1!==r&&(e.productsData[r]=t.payload),e.currentProduct=t.payload}).addCase(u.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message||"Failed to update product."})}}),{setCurrentProduct:h,clearCurrentProduct:v,addProduct:j,removeProduct:m,setActiveTab:y,setFormValues:x,clearFormValues:C}=g.actions;t.ZP=g.reducer},50023:function(e,t,r){"use strict";r.d(t,{$B:function(){return v},$L:function(){return u},Bu:function(){return h},C2:function(){return c},bl:function(){return i},r7:function(){return j},th:function(){return p},tr:function(){return s},ty:function(){return f}});var a=r(1455),n=r(83464),o=r(43577),d=r(64131);let c=e=>[...e.project.projectsData].sort((e,t)=>new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime()),l="".concat("https://stagingsrv.gazala.net/api","/edit-website/projects"),i=(0,a.hg)("projects/fetchProjects",async(e,t)=>{let{rejectWithValue:r}=t;try{return(await n.default.get(l,{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}})).data.data}catch(e){var a;return r(e instanceof o.d7?null===(a=e.response)||void 0===a?void 0:a.data:"An unexpected error occurred.")}}),s=(0,a.hg)("projects/fetchProjectById",async(e,t)=>{let{rejectWithValue:r}=t;try{return(await n.default.get("".concat(l,"/").concat(e),{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}})).data.data}catch(e){var a;return r(e instanceof o.d7?null===(a=e.response)||void 0===a?void 0:a.data:"An unexpected error occurred.")}}),u=(0,a.hg)("projects/createProject",async(e,t)=>{let{rejectWithValue:r}=t;try{return(await n.default.post(l,e,{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}})).data}catch(e){var a;return r(e instanceof o.d7?null==e?void 0:null===(a=e.response)||void 0===a?void 0:a.data:"Error Creating Project.")}}),p=(0,a.hg)("projects/deleteProject",async(e,t)=>{let{dispatch:r,rejectWithValue:a}=t;try{return await n.default.delete("".concat(l,"/").concat(e),{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}}),r(m(e)),e}catch(e){var c;return a(e instanceof o.d7?null==e?void 0:null===(c=e.response)||void 0===c?void 0:c.data:"An unexpected error occurred.")}}),f=(0,a.hg)("projects/updateProject",async(e,t)=>{let{updatedProject:r,slug:a}=e,{dispatch:c,rejectWithValue:i}=t;try{let e=await n.default.patch("".concat(l,"/").concat(a),r,{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}});return c(y(e.data.doc)),e.data}catch(e){var s;return i(e instanceof o.d7?null==e?void 0:null===(s=e.response)||void 0===s?void 0:s.data:"An unexpected error occurred.")}}),g=(0,a.oM)({name:"projects",initialState:{projectsData:[],activeTab:"1",currentProject:null,loading:!1,dataLoaded:!1,error:null},reducers:{setActiveTab:(e,t)=>{e.activeTab=t.payload},removeProject:(e,t)=>{e.projectsData=e.projectsData.filter(e=>e._id!==t.payload)},setCurrentProject:(e,t)=>{e.currentProject=t.payload},clearCurrentProject:e=>{e.currentProject=null}},extraReducers:e=>{e.addCase(i.pending,e=>{e.loading=!0,e.error=null}).addCase(i.fulfilled,(e,t)=>{e.loading=!1,e.projectsData=t.payload}).addCase(i.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message||"Failed to load projects data."}).addCase(s.pending,e=>{e.loading=!0,e.dataLoaded=!1,e.error=null}).addCase(s.fulfilled,(e,t)=>{e.loading=!1,e.dataLoaded=!0,e.currentProject=t.payload}).addCase(s.rejected,(e,t)=>{e.loading=!1,e.dataLoaded=!0,e.error=t.error.message||"Unknown error"}).addCase(u.pending,e=>{e.loading=!0,e.error=null}).addCase(u.fulfilled,(e,t)=>{e.loading=!1,e.projectsData.push(t.payload)}).addCase(u.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message}).addCase(f.pending,e=>{e.loading=!0,e.error=null}).addCase(f.fulfilled,(e,t)=>{e.loading=!1;let r=e.projectsData.findIndex(e=>e._id===t.payload._id);-1!==r&&(e.projectsData[r]=t.payload),e.currentProject=t.payload}).addCase(f.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message||"Failed to update project."})}}),h=e=>{var t;let r={pending:0,inProgress:0,completed:0};return(null===(t=e.project)||void 0===t?void 0:t.projectsData)&&e.project.projectsData.forEach(e=>{"pending"===e.status?r.pending+=1:"in progress"===e.status?r.inProgress+=1:"completed"===e.status&&(r.completed+=1)}),r},v=e=>{var t,r;return(null===(r=e.project)||void 0===r?void 0:null===(t=r.projectsData)||void 0===t?void 0:t.length)||0},{setActiveTab:j,removeProject:m,setCurrentProject:y,clearCurrentProject:x}=g.actions;t.ZP=g.reducer},35292:function(e,t,r){"use strict";r.d(t,{x:function(){return a}});let a=e=>"string"==typeof e&&e?e.replace(/\w\S*/g,e=>e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()):""},43577:function(e,t,r){"use strict";r.d(t,{d7:function(){return n}});let{Axios:a,AxiosError:n,CanceledError:o,isCancel:d,CancelToken:c,VERSION:l,all:i,Cancel:s,isAxiosError:u,spread:p,toFormData:f,AxiosHeaders:g,HttpStatusCode:h,formToJSON:v,getAdapter:j,mergeConfig:m}=r(83464).default}},function(e){e.O(0,[2292,2586,3464,5878,2971,2117,1744],function(){return e(e.s=10597)}),_N_E=e.O()}]);