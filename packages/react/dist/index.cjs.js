"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var t=require("react"),re=require("@uiw/react-codemirror"),E=require("@codemirror/view"),L=require("@codemirror/state"),oe=require("@codemirror/lang-javascript"),l=require("@lezer/highlight"),ne=require("@uiw/codemirror-themes"),se=require("react-hook-inview"),ce=require("@strudel.cycles/eval"),ie=require("@strudel.cycles/core/util.mjs"),y=require("@strudel.cycles/tone"),O=require("@strudel.cycles/core"),M=require("@strudel.cycles/midi");function K(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var g=K(t),le=K(re),ue=ne.createTheme({theme:"dark",settings:{background:"#222",foreground:"#75baff",caret:"#ffcc00",selection:"rgba(128, 203, 196, 0.5)",selectionMatch:"#036dd626",lineHighlight:"#8a91991a",gutterBackground:"transparent",gutterForeground:"#676e95"},styles:[{tag:l.tags.keyword,color:"#c792ea"},{tag:l.tags.operator,color:"#89ddff"},{tag:l.tags.special(l.tags.variableName),color:"#eeffff"},{tag:l.tags.typeName,color:"#f07178"},{tag:l.tags.atom,color:"#f78c6c"},{tag:l.tags.number,color:"#ff5370"},{tag:l.tags.definition(l.tags.variableName),color:"#82aaff"},{tag:l.tags.string,color:"#c3e88d"},{tag:l.tags.special(l.tags.string),color:"#f07178"},{tag:l.tags.comment,color:"#7d8799"},{tag:l.tags.variableName,color:"#f07178"},{tag:l.tags.tagName,color:"#ff5370"},{tag:l.tags.bracket,color:"#a2a1a4"},{tag:l.tags.meta,color:"#ffcb6b"},{tag:l.tags.attributeName,color:"#c792ea"},{tag:l.tags.propertyName,color:"#c792ea"},{tag:l.tags.className,color:"#decb6b"},{tag:l.tags.invalid,color:"#ffffff"}]});const V=L.StateEffect.define(),de=L.StateField.define({create(){return E.Decoration.none},update(e,r){try{for(let n of r.effects)if(n.is(V))if(n.value){const u=E.Decoration.mark({attributes:{style:"background-color: #FFCA2880"}});e=E.Decoration.set([u.range(0,r.newDoc.length)])}else e=E.Decoration.set([]);return e}catch(n){return console.warn("flash error",n),e}},provide:e=>E.EditorView.decorations.from(e)}),Q=e=>{e.dispatch({effects:V.of(!0)}),setTimeout(()=>{e.dispatch({effects:V.of(!1)})},200)},A=L.StateEffect.define(),fe=L.StateField.define({create(){return E.Decoration.none},update(e,r){try{for(let n of r.effects)n.is(A)&&(e=E.Decoration.set(n.value.flatMap(u=>(u.context.locations||[]).map(({start:d,end:i})=>{const c=u.context.color||"#FFCA28";let m=r.newDoc.line(d.line).from+d.column,o=r.newDoc.line(i.line).from+i.column;const s=r.newDoc.length;return m>s||o>s?void 0:E.Decoration.mark({attributes:{style:`outline: 1.5px solid ${c};`}}).range(m,o)})).filter(Boolean),!0));return e}catch{return e}},provide:e=>E.EditorView.decorations.from(e)});function U({value:e,onChange:r,onViewChanged:n,onCursor:u,options:d,editorDidMount:i}){return g.default.createElement(g.default.Fragment,null,g.default.createElement(le.default,{value:e,onChange:c=>{r(c)},onCreateEditor:c=>{n(c)},extensions:[oe.javascript(),ue,fe,de]}))}function J(e){const{onEvent:r,onQuery:n,onSchedule:u,ready:d=!0,onDraw:i}=e,[c,m]=t.useState(!1),o=1,s=()=>Math.floor(y.Tone.getTransport().seconds/o),C=(p=s())=>{const S=new O.TimeSpan(p,p+1),N=n?.(new O.State(S))||[];u?.(N,p);const F=S.begin.valueOf();y.Tone.getTransport().cancel(F);const w=(p+1)*o-.5,R=Math.max(y.Tone.getTransport().seconds,w)+.1;y.Tone.getTransport().schedule(()=>{C(p+1)},R),N?.filter(b=>b.part.begin.equals(b.whole?.begin)).forEach(b=>{y.Tone.getTransport().schedule(v=>{r(v,b,y.Tone.getContext().currentTime),y.Tone.Draw.schedule(()=>{i?.(v,b)},v)},b.part.begin.valueOf())})};t.useEffect(()=>{d&&C()},[r,u,n,i,d]);const k=async()=>{m(!0),await y.Tone.start(),y.Tone.getTransport().start("+0.1")},_=()=>{y.Tone.getTransport().pause(),m(!1)};return{start:k,stop:_,onEvent:r,started:c,setStarted:m,toggle:()=>c?_():k(),query:C,activeCycle:s}}function G(e){return t.useEffect(()=>(window.addEventListener("message",e),()=>window.removeEventListener("message",e)),[e]),t.useCallback(r=>window.postMessage(r,"*"),[])}let ge=()=>Math.floor((1+Math.random())*65536).toString(16).substring(1);const me=e=>encodeURIComponent(btoa(e));function X({tune:e,defaultSynth:r,autolink:n=!0,onEvent:u,onDraw:d}){const i=t.useMemo(()=>ge(),[]),[c,m]=t.useState(e),[o,s]=t.useState(),[C,k]=t.useState(""),[_,T]=t.useState(),[p,S]=t.useState(!1),[N,F]=t.useState(""),[w,R]=t.useState(),b=t.useMemo(()=>c!==o||_,[c,o,_]),v=t.useCallback(f=>k(a=>a+`${a?`

`:""}${f}`),[]),W=t.useMemo(()=>{if(o&&!o.includes("strudel disable-highlighting"))return(f,a)=>d?.(f,a,o)},[o,d]),P=t.useMemo(()=>o&&o.includes("strudel hide-header"),[o]),H=t.useMemo(()=>o&&o.includes("strudel hide-console"),[o]),h=J({onDraw:W,onEvent:t.useCallback((f,a,ee)=>{try{u?.(a),a.context.logs?.length&&a.context.logs.forEach(v);const{onTrigger:q,velocity:te}=a.context;if(q)q(f,a,ee,1);else if(r){const ae=ie.getPlayableNoteValue(a);r.triggerAttackRelease(ae,a.duration.valueOf(),f,te)}else throw new Error("no defaultSynth passed to useRepl.")}catch(q){console.warn(q),q.message="unplayable event: "+q?.message,v(q.message)}},[u,v,r]),onQuery:t.useCallback(f=>{try{return w?.query(f)||[]}catch(a){return console.warn(a),a.message="query error: "+a.message,T(a),[]}},[w]),onSchedule:t.useCallback((f,a)=>Z(f,a),[]),ready:!!w&&!!o}),j=G(({data:{from:f,type:a}})=>{a==="start"&&f!==i&&(h.setStarted(!1),s(void 0))}),B=t.useCallback(async(f=c)=>{if(o&&!b){T(void 0),h.start();return}try{S(!0);const a=await ce.evaluate(f);h.start(),j({type:"start",from:i}),R(()=>a.pattern),n&&(window.location.hash="#"+encodeURIComponent(btoa(c))),F(me(c)),T(void 0),s(f),S(!1)}catch(a){a.message="evaluation error: "+a.message,console.warn(a),T(a)}},[o,b,c,h,n,i,j]),Z=(f,a)=>{f.length};return{hideHeader:P,hideConsole:H,pending:p,code:c,setCode:m,pattern:w,error:_,cycle:h,setPattern:R,dirty:b,log:C,togglePlay:()=>{h.started?h.stop():B()},setActiveCode:s,activateCode:B,activeCode:o,pushLog:v,hash:N}}function z(...e){return e.filter(Boolean).join(" ")}let x=[],I;function Y({view:e,pattern:r,active:n}){t.useEffect(()=>{if(e)if(r&&n){let d=function(){try{const i=y.Tone.getTransport().seconds,m=[Math.max(I||i,i-1/10),i+1/60];I=i+1/60,x=x.filter(s=>s.whole.end>i);const o=r.queryArc(...m).filter(s=>s.hasOnset());x=x.concat(o),e.dispatch({effects:A.of(x)})}catch{e.dispatch({effects:A.of([])})}u=requestAnimationFrame(d)},u=requestAnimationFrame(d);return()=>{cancelAnimationFrame(u)}}else x=[],e.dispatch({effects:A.of([])})},[r,n,e])}const he="_container_3i85k_1",pe="_header_3i85k_5",be="_buttons_3i85k_9",ve="_button_3i85k_9",ye="_buttonDisabled_3i85k_17",we="_error_3i85k_21",Me="_body_3i85k_25";var D={container:he,header:pe,buttons:be,button:ve,buttonDisabled:ye,error:we,body:Me};function $({type:e}){return g.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"sc-h-5 sc-w-5",viewBox:"0 0 20 20",fill:"currentColor"},{refresh:g.default.createElement("path",{fillRule:"evenodd",d:"M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",clipRule:"evenodd"}),play:g.default.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",clipRule:"evenodd"}),pause:g.default.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"})}[e])}function Ee({tune:e,defaultSynth:r,hideOutsideView:n=!1,theme:u,init:d,onEvent:i,enableKeyboard:c}){const{code:m,setCode:o,pattern:s,activeCode:C,activateCode:k,evaluateOnly:_,error:T,cycle:p,dirty:S,togglePlay:N,stop:F}=X({tune:e,defaultSynth:r,autolink:!1,onEvent:i});t.useEffect(()=>{d&&_()},[e,d]);const[w,R]=t.useState(),[b,v]=se.useInView({threshold:.01}),W=t.useRef(),P=t.useMemo(()=>((v||!n)&&(W.current=!0),v||W.current),[v,n]);return Y({view:w,pattern:s,active:p.started&&!C?.includes("strudel disable-highlighting")}),t.useLayoutEffect(()=>{if(c){const H=async h=>{(h.ctrlKey||h.altKey)&&(h.code==="Enter"?(h.preventDefault(),Q(w),await k()):h.code==="Period"&&(p.stop(),h.preventDefault()))};return window.addEventListener("keydown",H,!0),()=>window.removeEventListener("keydown",H,!0)}},[c,s,m,k,p,w]),g.default.createElement("div",{className:D.container,ref:b},g.default.createElement("div",{className:D.header},g.default.createElement("div",{className:D.buttons},g.default.createElement("button",{className:z(D.button,p.started?"sc-animate-pulse":""),onClick:()=>N()},g.default.createElement($,{type:p.started?"pause":"play"})),g.default.createElement("button",{className:z(S?D.button:D.buttonDisabled),onClick:()=>k()},g.default.createElement($,{type:"refresh"}))),T&&g.default.createElement("div",{className:D.error},T.message)),g.default.createElement("div",{className:D.body},P&&g.default.createElement(U,{value:m,onChange:o,onViewChanged:R})))}function Ce(e){const{ready:r,connected:n,disconnected:u}=e,[d,i]=t.useState(!0),[c,m]=t.useState(M.WebMidi?.outputs||[]);return t.useEffect(()=>{M.enableWebMidi().then(()=>{M.WebMidi.addListener("connected",s=>{m([...M.WebMidi.outputs]),n?.(M.WebMidi,s)}),M.WebMidi.addListener("disconnected",s=>{m([...M.WebMidi.outputs]),u?.(M.WebMidi,s)}),r?.(M.WebMidi),i(!1)}).catch(s=>{if(s){console.error(s),console.warn("Web Midi could not be enabled..");return}})},[r,n,u,c]),{loading:d,outputs:c,outputByName:s=>M.WebMidi.getOutputByName(s)}}exports.CodeMirror=U;exports.MiniRepl=Ee;exports.cx=z;exports.flash=Q;exports.useCycle=J;exports.useHighlighting=Y;exports.usePostMessage=G;exports.useRepl=X;exports.useWebMidi=Ce;
