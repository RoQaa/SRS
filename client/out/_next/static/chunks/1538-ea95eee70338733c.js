"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1538],{31538:function(e,t,r){r.d(t,{vM:function(){return b}});var n,i=r(2265),o=r(40718);let a=Array(256).fill("").map((e,t)=>("0"+t.toString(16)).slice(-2));function s(e){return!!e&&/^\d+\.\d+\.\d+/.test(e)}function l(e){return!!e&&["nightly","alpha","internal"].some(t=>e.includes(t))}function c(e,t){switch(t||=function(){let e=function(){let{CKEDITOR_VERSION:e,CKEDITOR:t}=window;return s(e)||l(e)?{source:t?"cdn":"npm",version:e}:null}();return e?function(e){if(l(e))return 3;let{major:t}=function(e){if(!s(e))throw Error(`Invalid semantic version: ${e||"<blank>"}.`);let[t,r,n]=e.split(".");return{major:Number.parseInt(t,10),minor:Number.parseInt(r,10),patch:Number.parseInt(n,10)}}(e);switch(!0){case t>=44:return 3;case t>=38:return 2;default:return 1}}(e.version):null}()||void 0){case 1:case 2:return void 0===e;case 3:return"GPL"===e;default:return!1}}var u=Object.defineProperty,d=(e,t,r)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,h=(e,t,r)=>d(e,"symbol"!=typeof t?t+"":t,r);let p=class e{constructor(e,t){var r;let n;h(this,"_lifecycle"),h(this,"_element"),h(this,"_releaseLock",null),h(this,"_value",null),h(this,"_afterMountCallbacks",[]),h(this,"_state",{destroyedBeforeInitialization:!1,mountingInProgress:null}),h(this,"release",(r=()=>{let{_releaseLock:e,_state:t,_element:r,_lifecycle:n}=this;t.mountingInProgress?t.mountingInProgress.then(()=>n.unmount({element:r,mountResult:this.value})).catch(e=>{console.error("Semaphore unmounting error:",e)}).then(e.resolve).then(()=>{this._value=null}):(t.destroyedBeforeInitialization=!0,e.resolve())},n=null,(...e)=>(n||(n={current:r(...e)}),n.current))),this._element=e,this._lifecycle=t,this._lock()}get value(){return this._value}unsafeSetValue(e){this._value=e,this._afterMountCallbacks.forEach(t=>t(e)),this._afterMountCallbacks=[]}runAfterMount(e){let{_value:t,_afterMountCallbacks:r}=this;t?e(t):r.push(e)}_lock(){let{_semaphores:t}=e,{_state:r,_element:n,_lifecycle:i}=this,o=t.get(n)||Promise.resolve(null),a=function(){let e={resolve:null,promise:null};return e.promise=new Promise(t=>{e.resolve=t}),e}();this._releaseLock=a;let s=o.then(()=>r.destroyedBeforeInitialization?Promise.resolve(void 0):(r.mountingInProgress=i.mount().then(e=>(e&&this.unsafeSetValue(e),e)),r.mountingInProgress)).then(async e=>{e&&i.afterMount&&await i.afterMount({element:n,mountResult:e})}).then(()=>a.promise).catch(e=>{console.error("Semaphore mounting error:",e)}).then(()=>{t.get(n)===s&&t.delete(n)});t.set(n,s)}};h(p,"_semaphores",new Map);let f=i.createContext(null),m=e=>!!e&&"object"==typeof e&&"status"in e&&["initializing","initialized","error"].includes(e.status),g=e=>t=>m(t)&&t.status===e,_=g("initializing"),y=e=>g("initialized")(e)&&"ready"===e.watchdog.state,v=(n={version:"9.4.0",frameworkVersion:i.version},function(e){c(e.config.get("licenseKey"))||e.on("collectUsageData",(e,{setUsageData:t})=>{t("integration.react",n)})}),w="Lock from React integration (@ckeditor/ckeditor5-react)";class b extends i.Component{constructor(e){super(e),h(this,"domContainer",i.createRef()),h(this,"editorSemaphore",null),this._checkVersion()}_checkVersion(){let{CKEDITOR_VERSION:e}=window;if(!e)return console.warn('Cannot find the "CKEDITOR_VERSION" in the "window" scope.');let[t]=e.split(".").map(Number);t>=42||e.startsWith("0.0.0")||console.warn("The <CKEditor> component requires using CKEditor 5 in version 42+ or nightly build.")}get _semaphoreValue(){let{editorSemaphore:e}=this;return e?e.value:null}get watchdog(){let{_semaphoreValue:e}=this;return e?e.watchdog:null}get editor(){let{_semaphoreValue:e}=this;return e?e.instance:null}shouldComponentUpdate(e){let{props:t,editorSemaphore:r}=this;return e.id!==t.id||e.disableWatchdog!==t.disableWatchdog||(r&&(r.runAfterMount(({instance:r})=>{this._shouldUpdateEditorData(t,e,r)&&r.data.set(e.data)}),"disabled"in e&&r.runAfterMount(({instance:t})=>{e.disabled?t.enableReadOnlyMode(w):t.disableReadOnlyMode(w)})),!1)}componentDidMount(){_(this.context)||this._initLifeCycleSemaphore()}componentDidUpdate(){_(this.context)||this._initLifeCycleSemaphore()}componentWillUnmount(){this._unlockLifeCycleSemaphore()}_unlockLifeCycleSemaphore(){this.editorSemaphore&&(this.editorSemaphore.release(),this.editorSemaphore=null)}_initLifeCycleSemaphore(){this._unlockLifeCycleSemaphore(),this.editorSemaphore=new p(this.domContainer.current,{mount:async()=>this._initializeEditor(),afterMount:({mountResult:e})=>{let{onReady:t}=this.props;t&&null!==this.domContainer.current&&t(e.instance)},unmount:async({element:e,mountResult:t})=>{let{onAfterDestroy:r}=this.props;try{await this._destroyEditor(t),e.innerHTML=""}finally{r&&r(t.instance)}}})}render(){return i.createElement("div",{ref:this.domContainer})}async _initializeEditor(){if(this.props.disableWatchdog)return{instance:await this._createEditor(this.domContainer.current,this._getConfig()),watchdog:null};let e=y(this.context)?new E(this.context.watchdog):new this.props.editor.EditorWatchdog(this.props.editor,this.props.watchdogConfig),t={current:0};return e.setCreator(async(r,n)=>{var i;let{editorSemaphore:o}=this,{onAfterDestroy:a}=this.props;t.current>0&&a&&(null==(i=null==o?void 0:o.value)?void 0:i.instance)&&a(o.value.instance);let s=await this._createEditor(r,n);return o&&t.current>0&&(o.unsafeSetValue({instance:s,watchdog:e}),setTimeout(()=>{this.props.onReady&&this.props.onReady(e.editor)})),t.current++,s}),e.on("error",(e,{error:t,causesRestart:r})=>{(this.props.onError||console.error)(t,{phase:"runtime",willEditorRestart:r})}),await e.create(this.domContainer.current,this._getConfig()).catch(e=>{(this.props.onError||console.error)(e,{phase:"initialization",willEditorRestart:!1})}),{watchdog:e,instance:e.editor}}_createEditor(e,t){var r;let{contextItemMetadata:n}=this.props;return n&&(t={...t,$__CKEditorReactContextMetadata:n}),this.props.editor.create(e,c((r=t).licenseKey)?r:function(e,t){let r=e.extraPlugins||[];return{...e,extraPlugins:[...r,...t.filter(e=>!r.includes(e))]}}(r,[v])).then(e=>{"disabled"in this.props&&this.props.disabled&&e.enableReadOnlyMode(w);let t=e.model.document,r=e.editing.view.document;return t.on("change:data",t=>{this.props.onChange&&this.props.onChange(t,e)}),r.on("focus",t=>{this.props.onFocus&&this.props.onFocus(t,e)}),r.on("blur",t=>{this.props.onBlur&&this.props.onBlur(t,e)}),e})}async _destroyEditor(e){let{watchdog:t,instance:r}=e;return new Promise((e,n)=>{setTimeout(async()=>{try{if(t)return await t.destroy(),e();if(r)return await r.destroy(),e();e()}catch(e){console.error(e),n(e)}})})}_shouldUpdateEditorData(e,t,r){return e.data!==t.data&&r.data.get()!==t.data}_getConfig(){let e=this.props.config||{};return this.props.data&&e.initialData&&console.warn("Editor data should be provided either using `config.initialData` or `content` property. The config value takes precedence over `content` property and will be used when both are specified."),{...e,initialData:e.initialData||this.props.data||""}}}h(b,"contextType",f),h(b,"propTypes",{editor:o.func.isRequired,data:o.string,config:o.object,disableWatchdog:o.bool,watchdogConfig:o.object,onChange:o.func,onReady:o.func,onFocus:o.func,onBlur:o.func,onError:o.func,disabled:o.bool,id:o.any});class E{constructor(e){h(this,"_contextWatchdog"),h(this,"_id"),h(this,"_creator"),this._contextWatchdog=e,this._id=function(){let[e,t,r,n]=crypto.getRandomValues(new Uint32Array(4));return"e"+a[e>>0&255]+a[e>>8&255]+a[e>>16&255]+a[e>>24&255]+a[t>>0&255]+a[t>>8&255]+a[t>>16&255]+a[t>>24&255]+a[r>>0&255]+a[r>>8&255]+a[r>>16&255]+a[r>>24&255]+a[n>>0&255]+a[n>>8&255]+a[n>>16&255]+a[n>>24&255]}()}setCreator(e){this._creator=e}create(e,t){return this._contextWatchdog.add({sourceElementOrData:e,config:t,creator:this._creator,id:this._id,type:"editor"})}on(e,t){this._contextWatchdog.on("itemError",(e,{itemId:r,error:n})=>{r===this._id&&t(null,{error:n,causesRestart:void 0})})}destroy(){return"ready"===this._contextWatchdog.state?this._contextWatchdog.remove(this._id):Promise.resolve()}get editor(){return this._contextWatchdog.getItem(this._id)}}function C(...e){return t=>{e.forEach(e=>{"function"==typeof e?e(t):null!=e&&(e.current=t)})}}(0,i.memo)((0,i.forwardRef)(({id:e,semaphore:t,rootName:r},n)=>{let o=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let e,n;return t.runAfterMount(({instance:t})=>{if(!o.current)return;let{ui:i,model:a}=n=t,s=a.document.getRoot(r);s&&n.ui.getEditableElement(r)&&n.detachEditable(s),e=i.view.createEditable(r,o.current),i.addEditable(e),t.editing.view.forceRender()}),()=>{if(n&&"destroyed"!==n.state&&o.current){let e=n.model.document.getRoot(r);e&&n.detachEditable(e)}}},[t.revision]),i.createElement("div",{key:t.revision,id:e,ref:C(n,o)})})).displayName="EditorEditable",(0,i.forwardRef)(({editor:e},t)=>{let r=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t=r.current;if(!e||!t)return;let n=e.ui.view.toolbar.element;return t.appendChild(n),()=>{t.contains(n)&&t.removeChild(n)}},[e&&e.id]),i.createElement("div",{ref:C(r,t)})}).displayName="EditorToolbarWrapper"}}]);