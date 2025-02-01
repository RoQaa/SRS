(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1440],{18818:function(e,t,i){Promise.resolve().then(i.bind(i,45700))},34760:function(e,t,i){"use strict";var a=i(57437),r=i(2265),n=i(75722);t.Z=e=>{let{title:t,span:i,headClass:d,icon:l,tagClass:c,children:o}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(n.Z,{className:d||"",children:[(0,a.jsxs)("div",{className:"d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center",children:[(0,a.jsxs)("h4",{className:c||"",children:[l&&l," ",t]}),o&&(0,a.jsx)("div",{children:o})]}),i&&(0,a.jsx)("p",{className:"f-m-light mt-1",children:i.map((e,t)=>(0,a.jsxs)(r.Fragment,{children:[null==e?void 0:e.text," ",e.code&&(0,a.jsx)("code",{children:e.code}),e.mark&&(0,a.jsx)("mark",{children:e.mark})]},t))})]})})}},45700:function(e,t,i){"use strict";i.d(t,{default:function(){return Z}});var a=i(57437),r=i(99914),n=i(50288),d=i(98723),l=i(65051),c=i(80201),o=i(73215),s=i(42391),u=i(99376),m=i(34760),h=i(27648),f=i(80029),p=i(2265),x=i(45394),g=i(5515),v=i.n(g),j=i(41221),y=i(45288),w=i(62157);let b=()=>{let e=(0,x.T)(),{loading:t}=(0,x.C)(e=>e.media);(0,p.useEffect)(()=>{e((0,y.D6)())},[e]);let i=(0,x.C)((0,y.iT)("Video")),r=async t=>{try{await e((0,y.hV)(t)).unwrap(),v().fire({icon:"success",text:"Item has been deleted!",confirmButtonColor:"#3085d6"})}catch(e){v().fire({icon:"error",title:"Error!",text:"Failed to delete the item."})}},n=e=>{v().fire({icon:"warning",title:"Are you sure?",text:"Once deleted, this item cannot be recovered!",showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#3085d6",confirmButtonText:"Delete"}).then(t=>{t.isConfirmed&&r(e)})},d={width:"450px",height:"500px",margin:"10px",overflow:"hidden",position:"relative"};return(0,a.jsx)(f.ri,{withCaption:!0,children:t?(0,a.jsx)(o.Z,{className:"text-center mt-2 mb-5 p-2",children:(0,a.jsx)(j.Z,{color:"primary"})}):(null==i?void 0:i.length)>0?i.map((e,t)=>(0,a.jsx)("figure",{className:"col-xl-3 col-md-4 col-sm-6 m-0",itemProp:"caption description",style:d,children:(0,a.jsx)(f.ck,{original:"".concat(null==e?void 0:e.video),width:"1500",height:"850",caption:e.title,children:()=>(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{children:(0,a.jsxs)(h.default,{href:"#",onClick:e=>e.preventDefault(),children:[(0,a.jsx)(p.Suspense,{fallback:(0,a.jsx)("p",{children:"Loading video..."}),children:(0,a.jsx)("iframe",{width:"100%",height:"315",src:(0,w.e)((null==e?void 0:e.video)||"")||"",title:null==e?void 0:e.title,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerPolicy:"strict-origin-when-cross-origin",allowFullScreen:!0})}),(0,a.jsxs)("div",{className:"caption border-top-0 p-2",children:[(0,a.jsx)("h4",{children:null==e?void 0:e.title}),(0,a.jsx)("ul",{className:"action simple-list d-flex flex-row",children:(0,a.jsx)("li",{className:"delete",style:{cursor:"pointer"},children:(0,a.jsx)("a",{onClick:()=>n(null==e?void 0:e._id),children:(0,a.jsx)(c.Z,{className:"btn btn-sm btn-danger",size:"sm",color:"danger",children:"Delete"})})})})]})]})})})})},t)):(0,a.jsx)(o.Z,{className:"text-center mt-2 mb-5 p-2",children:(0,a.jsx)("p",{children:"No video items available to display."})})})};var C=i(42586),Z=()=>{let e=(0,u.useRouter)(),t=(0,C.useLocale)();return(0,a.jsx)(r.Z,{fluid:!0,children:(0,a.jsx)(n.Z,{children:(0,a.jsx)(d.Z,{sm:"12",children:(0,a.jsxs)(l.Z,{children:[(0,a.jsx)(m.Z,{title:"Media Video",children:(0,a.jsxs)(c.Z,{color:"primary",onClick:()=>{e.push("/".concat(t,"/dashboard/media/videos/add"))},className:"d-flex align-items-center mt-sm-0 mt-2",children:[(0,a.jsx)(s.Z,{className:"me-2"}),"Add Video"]})}),(0,a.jsx)(o.Z,{className:"my-gallery gallery-with-description",children:(0,a.jsx)(n.Z,{className:"justify-content-center justify-content-md-start",children:(0,a.jsx)(b,{})})})]})})})})}},45394:function(e,t,i){"use strict";i.d(t,{C:function(){return n},T:function(){return r}});var a=i(68575);let r=a.I0,n=a.v9},45288:function(e,t,i){"use strict";i.d(t,{D6:function(){return c},hV:function(){return u},iT:function(){return h},ph:function(){return s}});var a=i(1455),r=i(83464),n=i(43577),d=i(64131);let l="".concat("https://stagingsrv.gazala.net/api","/edit-website/media"),c=(0,a.hg)("media/fetchMediaItems",async(e,t)=>{let{rejectWithValue:i}=t;try{return(await r.default.get(l,{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}})).data.data}catch(e){if(e instanceof n.d7){var a;return i((null==e?void 0:null===(a=e.response)||void 0===a?void 0:a.data)||"Failed to fetch media items")}}}),o=(0,a.hg)("media/fetchMediaItemById",async(e,t)=>{let{rejectWithValue:i}=t;try{return(await r.default.get("".concat(l,"/").concat(e),{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}})).data.data}catch(e){if(e instanceof n.d7){var a;return i((null==e?void 0:null===(a=e.response)||void 0===a?void 0:a.data)||"Failed to fetch media by ID")}}}),s=(0,a.hg)("media/addMediaItem",async(e,t)=>{let{rejectWithValue:i}=t;try{return(await r.default.post(l,e,{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}})).data}catch(e){if(e instanceof n.d7){var a;return i((null==e?void 0:null===(a=e.response)||void 0===a?void 0:a.data)||"Failed to add media item")}}}),u=(0,a.hg)("media/deleteMediaItem",async(e,t)=>{let{dispatch:i,rejectWithValue:a}=t;try{return await r.default.delete("".concat(l,"/").concat(e),{headers:{Authorization:"Bearer ".concat(d.Z.get("auth_token"))}}),i(x(e)),e}catch(e){if(e instanceof Error)return a(e.message||"Failed to delete media item")}}),m=(0,a.oM)({name:"media",initialState:{mediaItems:[],currentMediaItem:null,loading:!1,error:null},reducers:{resetError(e){e.error=null},clearCurrentMediaItem(e){e.currentMediaItem=null},removeMediaItem:(e,t)=>{e.mediaItems=e.mediaItems.filter(e=>e._id!==t.payload)}},extraReducers:e=>{e.addCase(c.pending,e=>{e.loading=!0,e.error=null}).addCase(c.fulfilled,(e,t)=>{e.loading=!1,e.mediaItems=t.payload}).addCase(c.rejected,(e,t)=>{e.loading=!1,e.error=t.payload}).addCase(o.pending,e=>{e.loading=!0,e.error=null}).addCase(o.fulfilled,(e,t)=>{e.loading=!1,e.currentMediaItem=t.payload}).addCase(o.rejected,(e,t)=>{e.loading=!1,e.error=t.payload}).addCase(s.pending,e=>{e.loading=!0,e.error=null}).addCase(s.fulfilled,(e,t)=>{e.mediaItems.push(t.payload)}).addCase(s.rejected,(e,t)=>{e.error=t.payload})}}),h=e=>t=>t.media.mediaItems.filter(t=>t.type===e),{resetError:f,clearCurrentMediaItem:p,removeMediaItem:x}=m.actions;t.ZP=m.reducer},62157:function(e,t,i){"use strict";function a(e){let t=null==e?void 0:e.match(/(?:https?:\/\/(?:www\.)?youtube\.com\/(?:v\/|e(?:mbed)?\/|(?:live|watch)\?v=|[^/]+\/\S+\/?)([a-zA-Z0-9_-]{11}))|(?:https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11}))/);if(t){let e=t[1]||t[2];return"https://www.youtube.com/embed/".concat(e)}return null}i.d(t,{e:function(){return a}})},43577:function(e,t,i){"use strict";i.d(t,{d7:function(){return r}});let{Axios:a,AxiosError:r,CanceledError:n,isCancel:d,CancelToken:l,VERSION:c,all:o,Cancel:s,isAxiosError:u,spread:m,toFormData:h,AxiosHeaders:f,HttpStatusCode:p,formToJSON:x,getAdapter:g,mergeConfig:v}=i(83464).default}},function(e){e.O(0,[9461,3740,2292,2586,3464,7648,3537,177,2971,2117,1744],function(){return e(e.s=18818)}),_N_E=e.O()}]);