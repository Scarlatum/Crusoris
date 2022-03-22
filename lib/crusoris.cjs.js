"use strict";var c;(t=>{function e(i,o,r){o.position={x:i.clientX,y:i.clientY},r.forEach(d=>d())}t.mousemove=e;function s(i,o,r){r.forEach(d=>d())}t.click=s})(c||(c={}));class h{constructor(e){Object.defineProperty(this,"instance",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"element",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"transforms",{enumerable:!0,configurable:!0,writable:!0,value:{size:10,scale:1,rotate:0,duration:250}}),this.instance=e,this.element=document.createElement("span"),this.setStyles()}get position(){return{x:this.instance.position.x,y:this.instance.position.y}}update(){this.setStyles()}setStyles(){const e=`translate(${this.position.x}px, ${this.position.y}px)`,s=`scale(${this.transforms.scale})`,i=`rotate(${this.transforms.rotate}deg)`;this.element.style.setProperty("transform",`${e} ${i} ${s}`),this.element.style.setProperty("--size",`${this.transforms.size}px`),this.element.style.setProperty("--duration",`${this.transforms.duration}ms`)}}class a extends h{constructor(e){super(e);this.element.className=a.className}activeAnimation(e){this.element.getAnimations().forEach(s=>s.cancel()),this.element.animate([{transform:"scale(1)"},{transform:"scale(2)"}],{duration:this.transforms.duration,composite:"accumulate",iterations:e?1/0:2,direction:"alternate",fill:"both"})}}Object.defineProperty(a,"DEFAULT_SIZE",{enumerable:!0,configurable:!0,writable:!0,value:6});Object.defineProperty(a,"className",{enumerable:!0,configurable:!0,writable:!0,value:"eccheuma-cursor-dot"});class n extends h{constructor(e){super(e);this.element.className=n.className}set newScale(e){this.transforms.scale=e,this.update()}clickAnimation(){this.element.style.opacity="1",this.newScale=2}hideAnimation(){this.element.style.opacity=".25",this.newScale=.75}appearAnimation(e){switch(this.element.style.opacity="1",e){case 1:this.newScale=1;break;case 0:this.newScale=0;break}}}Object.defineProperty(n,"DEFAULT_SIZE",{enumerable:!0,configurable:!0,writable:!0,value:30});Object.defineProperty(n,"className",{enumerable:!0,configurable:!0,writable:!0,value:"eccheuma-cursor-tail"});function b(t){return String(t)}var p=(t=>(t[t.idle=0]="idle",t[t.active=1]="active",t[t.await=2]="await",t))(p||{});const f=b`

  :host {
    pointer-events: none;
    position: fixed;
    height: 0;
    width: 0;
    top: 0;
    left: 0; 
    z-index: 10000; 
  }

  .eccheuma-cursor-tail {

    --size: 40px;
    --duration: 250ms;

    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: var(--size);
    width: var(--size);
    border-radius: calc(var(--size) / 3);
    border: 2px solid var(--crusoris-color-tail, #FFFFFF);
    z-index: 1;
    transition-duration: var(--duration);
    transition-timing-function: ease-out;
    margin: calc((var(--size) / 2) * -1) calc((var(--size) / 2) * -1);
    box-sizing: border-box;
  }

  .eccheuma-cursor-dot {

    --size: 10px;
    --dur: 250ms;

    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: var(--size);
    width: var(--size);
    background: var(--crusoris-color-dot, #FFFFFF);
    border: 2px solid var(--crusoris-color-accent, #AAAAAA);
    border-radius: 100%;
    z-index: 2;
    margin: calc((var(--size) / 2) * -1) calc((var(--size) / 2) * -1);
    box-sizing: border-box;

  }

`;var y=(t=>(t.dotSize="dot-size",t.tailSize="tail-size",t.rotate="rotate",t.duration="duration",t.action="action",t))(y||{});class u extends HTMLElement{constructor(){super();Object.defineProperty(this,"position",{enumerable:!0,configurable:!0,writable:!0,value:{x:window.innerWidth/2,y:window.innerHeight/2}}),Object.defineProperty(this,"dotInstance",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"tailInstance",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"root",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"status",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"action",{enumerable:!0,configurable:!0,writable:!0,value:!1}),this.root=this.attachShadow({mode:"open"}),this.tailInstance=new n(this),this.dotInstance=new a(this),this.root.append(this.dotInstance.element),this.root.append(this.tailInstance.element);const e=document.createElement("style");e.textContent=f.replaceAll(new RegExp("\\s{2,}","g"),String()),this.root.append(e)}static get observedAttributes(){return["dot-size","tail-size","rotate","duration","action"]}set newStatus(e){if(this.status!==e)switch(this.status=e,e){case 1:this.tailInstance.appearAnimation(this.status);break;case 0:this.tailInstance.hideAnimation();break}}notify(){[this.dotInstance,this.tailInstance].forEach(e=>{e.update()})}idleChecker(e){this.newStatus=this.status!==2&&e.x===this.position.x&&e.y===this.position.y?0:this.status,setTimeout(()=>{this.idleChecker(this.position)},u.ITER_TIMEOUT)}setAciton(e,s){!s||(this.action=e==="true"||e==="false"?JSON.parse(e):this.action,this.dotInstance.activeAnimation(this.action))}connectedCallback(){document.body.addEventListener("mousemove",e=>{this.newStatus=1,c.mousemove(e,this,Array(0)),this.notify()}),document.body.addEventListener("mousedown",e=>{this.newStatus=2,c.click(e,this,[()=>this.tailInstance.clickAnimation()])}),document.body.addEventListener("mouseup",e=>{this.newStatus=1,c.click(e,this,[()=>this.tailInstance.appearAnimation(this.status)])}),this.idleChecker(this.position)}attributeChangedCallback(e,s,i){const o=this.dotInstance.transforms,r=this.tailInstance.transforms;switch(e){case"action":this.setAciton(i,s);break;case"duration":o.duration=r.duration=parseInt(i);break;case"dot-size":o.size=parseInt(i);break;case"tail-size":r.size=parseInt(i);break;case"rotate":r.rotate=parseInt(i);break}this.notify()}}Object.defineProperty(u,"ITER_TIMEOUT",{enumerable:!0,configurable:!0,writable:!0,value:750});const m="eccheuma-crusoris";var l;(t=>{function e(){const i=document.createElement("style");i.textContent="* { cursor: none !important }",document.head.append(i)}t.setStyles=e;function s(){const i=document.createElement(m);i.setAttribute("dot-size",String(a.DEFAULT_SIZE)),i.setAttribute("tail-size",String(n.DEFAULT_SIZE)),i.setAttribute("rotate",String(45)),i.setAttribute("duration",String(250)),document.body.append(i)}t.setElement=s})(l||(l={}));function v(t){customElements.define(m,u),t.styles&&l.setStyles(),t.dist&&l.setElement()}module.exports=v;
//# sourceMappingURL=crusoris.cjs.js.map
