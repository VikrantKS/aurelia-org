Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@aurelia/kernel"),t=require("@aurelia/runtime-html"),r=require("rxjs"),o=require("rxjs/operators/index.js");function s(e,t){if(!n(e))throw Error("Provided state is not of type StateHistory");return t>0?function(e,t){if(t<0||t>=e.future.length)return e;const{past:r,future:o,present:s}=e,i=[...r,s,...o.slice(0,t)],n=o[t],a=o.slice(t+1);return{past:i,present:n,future:a}}(e,t-1):t<0?function(e,t){if(t<0||t>=e.past.length)return e;const{past:r,future:o,present:s}=e,i=r.slice(0,t),n=[...r.slice(t+1),s,...o];return{past:i,present:r[t],future:n}}(e,e.past.length+t):e}function i(e,t){return n(e)&&(e.past.length>t&&(e.past=e.past.slice(e.past.length-t)),e.future.length>t&&(e.future=e.future.slice(0,t))),e}function n(e){return void 0!==e.present&&void 0!==e.future&&void 0!==e.past&&Array.isArray(e.future)&&Array.isArray(e.past)}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function a(e,t){return function(r,o){t(r,o,e)}}var c,p,l;function d(e,t,r){var o;return(null===(o=e.logDefinitions)||void 0===o?void 0:o.hasOwnProperty(t))&&e.logDefinitions[t]&&Object.values(exports.LogLevel).includes(e.logDefinitions[t])?e.logDefinitions[t]:r}exports.MiddlewarePlacement=void 0,(c=exports.MiddlewarePlacement||(exports.MiddlewarePlacement={})).Before="before",c.After="after",exports.LogLevel=void 0,(p=exports.LogLevel||(exports.LogLevel={})).trace="trace",p.debug="debug",p.info="info",p.warn="warn",p.error="error",exports.PerformanceMeasurement=void 0,(l=exports.PerformanceMeasurement||(exports.PerformanceMeasurement={})).StartEnd="startEnd",l.All="all";const u={container:null};class h extends Error{constructor(e){super(`Tried to dispatch an unregistered action ${void 0!==e&&("string"==typeof e?e:e.name)}`)}}class f extends Error{}class g extends Error{}class m extends Error{}exports.Store=class{constructor(e,t,o,s){var i,n,a,c;this.initialState=e,this.logger=t,this.window=o,this.devToolsAvailable=!1,this.actions=new Map,this.middlewares=new Map,this.dispatchQueue=[],this.options=null!=s?s:{};const p=!0===(null===(n=null===(i=this.options)||void 0===i?void 0:i.history)||void 0===n?void 0:n.undoable);this._state=new r.BehaviorSubject(e),this.state=this._state.asObservable(),!0!==(null===(c=null===(a=this.options)||void 0===a?void 0:a.devToolsOptions)||void 0===c?void 0:c.disable)&&this.setupDevTools(),p&&this.registerHistoryMethods()}registerMiddleware(e,t,r){this.middlewares.set(e,{placement:t,settings:r})}unregisterMiddleware(e){this.middlewares.has(e)&&this.middlewares.delete(e)}isMiddlewareRegistered(e){return this.middlewares.has(e)}registerAction(e,t){if(0===t.length)throw new g("The reducer is expected to have one or more parameters, where the first will be the present state");this.actions.set(t,{type:e})}unregisterAction(e){this.actions.has(e)&&this.actions.delete(e)}isActionRegistered(e){return"string"==typeof e?void 0!==Array.from(this.actions).find((t=>t[1].type===e)):this.actions.has(e)}resetToState(e){this._state.next(e)}async dispatch(e,...t){const r=this.lookupAction(e);return r?this.queueDispatch([{reducer:r,params:t}]):Promise.reject(new h(e))}pipe(e,...t){const r=[],o={dispatch:async()=>this.queueDispatch(r),pipe:(t,...s)=>{const i=this.lookupAction(t);if(!i)throw new h(e);return r.push({reducer:i,params:s}),o}};return o.pipe(e,...t)}lookupAction(e){if("string"==typeof e){const t=Array.from(this.actions).find((([t,r])=>r.type===e));if(t)return t[0]}else if(this.actions.has(e))return e}async queueDispatch(e){return new Promise(((t,r)=>{this.dispatchQueue.push({actions:e,resolve:t,reject:r}),1===this.dispatchQueue.length&&this.handleQueue()}))}async handleQueue(){if(this.dispatchQueue.length>0){const e=this.dispatchQueue[0];try{await this.internalDispatch(e.actions),e.resolve()}catch(t){e.reject(t)}this.dispatchQueue.shift(),this.handleQueue()}}async internalDispatch(e){var r;const o=e.find((e=>!this.actions.has(e.reducer)));if(o)throw new h(o.reducer);u.container.get(t.IWindow).performance.mark("dispatch-start");const s=e.map((e=>({type:this.actions.get(e.reducer).type,params:e.params,reducer:e.reducer}))),a={name:s.map((e=>e.type)).join("->"),params:s.reduce(((e,t)=>e.concat(t.params)),[]),pipedActions:s.map((e=>({name:e.type,params:e.params})))};this.options.logDispatchedActions&&this.logger[d(this.options,"dispatchedActions",exports.LogLevel.info)](`Dispatching: ${a.name}`);const c=await this.executeMiddlewares(this._state.getValue(),exports.MiddlewarePlacement.Before,a);if(!1===c)return u.container.get(t.IWindow).performance.clearMarks(),void u.container.get(t.IWindow).performance.clearMeasures();let p=c;for(const e of s){if(p=await e.reducer(p,...e.params),!1===p)return u.container.get(t.IWindow).performance.clearMarks(),void u.container.get(t.IWindow).performance.clearMeasures();if(u.container.get(t.IWindow).performance.mark(`dispatch-after-reducer-${e.type}`),!p&&"object"!=typeof p)throw new m("The reducer has to return a new state")}let l=await this.executeMiddlewares(p,exports.MiddlewarePlacement.After,a);if(!1===l)return u.container.get(t.IWindow).performance.clearMarks(),void u.container.get(t.IWindow).performance.clearMeasures();if(n(l)&&(null===(r=this.options.history)||void 0===r?void 0:r.limit)&&(l=i(l,this.options.history.limit)),this._state.next(l),u.container.get(t.IWindow).performance.mark("dispatch-end"),this.options.measurePerformance===exports.PerformanceMeasurement.StartEnd){u.container.get(t.IWindow).performance.measure("startEndDispatchDuration","dispatch-start","dispatch-end");const e=u.container.get(t.IWindow).performance.getEntriesByName("startEndDispatchDuration");this.logger[d(this.options,"performanceLog",exports.LogLevel.info)](`Total duration ${e[0].duration} of dispatched action ${a.name}:`,e)}else if(this.options.measurePerformance===exports.PerformanceMeasurement.All){const e=u.container.get(t.IWindow).performance.getEntriesByType("mark"),r=e[e.length-1].startTime-e[0].startTime;this.logger[d(this.options,"performanceLog",exports.LogLevel.info)](`Total duration ${r} of dispatched action ${a.name}:`,e)}u.container.get(t.IWindow).performance.clearMarks(),u.container.get(t.IWindow).performance.clearMeasures(),this.updateDevToolsState({type:a.name,params:a.params},l)}executeMiddlewares(e,r,o){return Array.from(this.middlewares).filter((e=>e[1].placement===r)).reduce((async(e,s,i)=>{try{const i=await s[0](await e,this._state.getValue(),s[1].settings,o);return!1!==i&&(i||await e)}catch(t){if(this.options.propagateError)throw t;return await e}finally{u.container.get(t.IWindow).performance.mark(`dispatch-${r}-${s[0].name}`)}}),e)}setupDevTools(){this.window.__REDUX_DEVTOOLS_EXTENSION__&&(this.logger[d(this.options,"devToolsStatus",exports.LogLevel.debug)]("DevTools are available"),this.devToolsAvailable=!0,this.devTools=this.window.__REDUX_DEVTOOLS_EXTENSION__.connect(this.options.devToolsOptions),this.devTools.init(this.initialState),this.devTools.subscribe((e=>{var t,r;if(this.logger[d(this.options,"devToolsStatus",exports.LogLevel.debug)](`DevTools sent change ${e.type}`),"ACTION"!==e.type||void 0===e.payload){if("DISPATCH"===e.type&&e.payload)switch(e.payload.type){case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return void this._state.next(JSON.parse(e.state));case"COMMIT":return void this.devTools.init(this._state.getValue());case"RESET":return this.devTools.init(this.initialState),void this.resetToState(this.initialState);case"ROLLBACK":{const t=JSON.parse(e.state);return this.resetToState(t),void this.devTools.init(t)}}}else{const o=Array.from(this.actions).find((function([t]){var r;return t.name===(null===(r=e.payload)||void 0===r?void 0:r.name)})),s=null!==(r=this.lookupAction(null===(t=e.payload)||void 0===t?void 0:t.name))&&void 0!==r?r:null==o?void 0:o[0];if(!s)throw new f("Tried to remotely dispatch an unregistered action");if(!e.payload.args||e.payload.args.length<1)throw new f("No action arguments provided");this.dispatch(s,...e.payload.args.slice(1).map((e=>JSON.parse(e)))).catch((()=>{throw new f("Issue when trying to dispatch an action through devtools")}))}})))}updateDevToolsState(e,t){this.devToolsAvailable&&this.devTools&&this.devTools.send(e,t)}registerHistoryMethods(){this.registerAction("jump",s)}},exports.Store=function(e,t,r,o){var s,i=arguments.length,n=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(i<3?s(n):i>3?s(t,r,n):s(t,r))||n);return i>3&&n&&Object.defineProperty(t,r,n),n}([a(1,e.ILogger),a(2,t.IWindow)],exports.Store);const v=o.skip,y=o.take,w=o.delay;const x=e=>e.state;const S={withInitialState(e){return Reflect.set(this,"state",e),this},withOptions(e){return Reflect.set(this,"options",e),this},register(r){var o;u.container=r;const s=Reflect.get(this,"state"),i=Reflect.get(this,"options"),a=r.get(e.ILogger),c=r.get(t.IWindow);if(!s)throw new Error("initialState must be provided via withInitialState builder method");let p=s;return(null===(o=null==i?void 0:i.history)||void 0===o?void 0:o.undoable)&&!n(s)&&(p={past:[],present:s,future:[]}),e.Registration.instance(exports.Store,new exports.Store(p,a,c,i)).register(r),r}};exports.ActionRegistrationError=g,exports.DEFAULT_LOCAL_STORAGE_KEY="aurelia-store-state",exports.DevToolsRemoteDispatchError=f,exports.ReducerNoStateError=m,exports.STORE=u,exports.StoreConfiguration=S,exports.UnregisteredActionError=h,exports.applyLimits=i,exports.connectTo=function(e){const o={selector:"function"==typeof e?e:x,...e};function s(e,t){const o=t(e);return o instanceof r.Observable?o:e.state}function i(){const e="object"==typeof o.selector;return Object.entries({...e?o.selector:{[o.target||"state"]:o.selector||x}}).map((([t,r])=>({targets:o.target&&e?[o.target,t]:[t],selector:r,changeHandlers:{[o.onChanged||""]:1,[`${o.target||t}Changed`]:o.target?0:1,propertyChanged:0}})))}return function(o){const n="object"==typeof e&&e.setup?o.prototype[e.setup]:o.prototype.binding,a="object"==typeof e&&e.teardown?o.prototype[e.teardown]:o.prototype.bound;o.prototype["object"==typeof e&&void 0!==e.setup?e.setup:"binding"]=function(){if("object"==typeof e&&"string"==typeof e.onChanged&&!(e.onChanged in this))throw new Error("Provided onChanged handler does not exist on target VM");const r=t.Controller.getCached(this)?t.Controller.getCached(this).container.get(exports.Store):u.container.get(exports.Store);if(this._stateSubscriptions=i().map((e=>s(r,e.selector).subscribe((t=>{const r=e.targets.length-1,o=e.targets.reduce(((e={},t)=>e[t]),this);Object.entries(e.changeHandlers).forEach((([s,i])=>{s in this&&this[s](...[e.targets[r],t,o].slice(i,3))})),e.targets.reduce(((e,o,s)=>(e[o]=s===r?t:e[o]||{},e[o])),this)})))),n)return n.apply(this,arguments)},o.prototype["object"==typeof e&&e.teardown?e.teardown:"bound"]=function(){if(this._stateSubscriptions&&Array.isArray(this._stateSubscriptions)&&this._stateSubscriptions.forEach((e=>{e instanceof r.Subscription&&!1===e.closed&&e.unsubscribe()})),a)return a.apply(this,arguments)}}},exports.dispatchify=function(e){const t=u.container.get(exports.Store);return async function(...r){return t.dispatch(e,...r)}},exports.executeSteps=async function(e,t,...r){const o=(e,r)=>o=>{t&&(console.group(`Step ${r}`),console.log(o),console.groupEnd()),e(o)},s=(e,t)=>r=>{try{e(r)}catch(e){t(e)}};return new Promise(((t,i)=>{let n=0;r.slice(0,-1).forEach((t=>{e.state.pipe(v(n),y(1),w(0)).subscribe(s(o(t,n),i)),n++})),e.state.pipe(v(n),y(1)).subscribe(((e,t)=>r=>{e(r),t()})(s(o(r[r.length-1],n),i),t))}))},exports.getLogType=d,exports.isStateHistory=n,exports.jump=s,exports.localStorageMiddleware=function(e,r,o){const s=u.container.get(t.IWindow).localStorage;if(void 0!==s){s.setItem(void 0!==(null==o?void 0:o.key)?o.key:"aurelia-store-state",JSON.stringify(e))}},exports.logMiddleware=function(t,r,o){const s=u.container.get(e.IPlatform).console;s[void 0!==(null==o?void 0:o.logType)&&void 0!==s[o.logType]?o.logType:"log"]("New state: ",t)},exports.nextStateHistory=function(e,t){return{...e,past:[...e.past,e.present],present:t,future:[]}},exports.rehydrateFromLocalStorage=function(e,r){const o=u.container.get(t.IWindow).localStorage;if(void 0===o)return e;const s=o.getItem(void 0===r?"aurelia-store-state":r);if(null===s||""===s)return e;try{return JSON.parse(s)}catch(e){}return e};