"use strict";var t,s,i=Object.defineProperty,e=(t,s,e)=>(((t,s,e)=>{s in t?i(t,s,{t:!0,s:!0,i:!0,e:e}):t[s]=e})(t,"symbol"!=typeof s?s+"":s,e),e);Object.defineProperties(exports,{a:{e:!0},[Symbol.toStringTag]:{e:"Module"}}),(s=t||(t={})).o=function(t,s,i){s.r={n:t.c,h:t.u},i.l((t=>t()))},s.d=function(t,s,i){i.l((t=>t()))};class a{m(t){e(this,"instance"),e(this,"element"),e(this,"transforms",{p:4,b:1,x:0,v:250}),this.z=t,this.g=document.createElement("span"),this.w()}get r(){return{n:this.z.r.n,h:this.z.r.h}}f(){this.w()}w(){const t=`translate(${this.r.n}px, ${this.r.h}px)`,s=`scale(${this.k.b})`,i=`rotate(${this.k.x}deg)`;this.g.y.A("transform",`${t} ${i} ${s}`),this.g.y.A("--size",`${this.k.p}px`),this.g.y.A("--duration",`${this.k.v}ms`)}}const o=class extends a{m(t){super(t),this.g.F=o.F}$(t){this.g.I().l((t=>t.S())),this.g.E([{T:"scale(1)"},{T:"scale(2)"}],{v:this.k.v,C:"accumulate",M:t?1/0:2,O:"alternate",N:"both"})}};let r=o;e(r,"className","eccheuma-cursor-dot");var n=(t=>(t[t._=0]="idle",t[t.j=1]="active",t[t.R=2]="await",t))(n||{});const c=class extends a{m(t){super(t),this.g.F=c.F}set H(t){this.k.b=t,this.f()}J(){this.g.y.L="1",this.H=2}U(){this.g.y.L=".25",this.H=.75}q(t){switch(this.g.y.L="1",t){case n.j:this.H=1;break;case n._:this.H=0}}};let h=c;e(h,"className","eccheuma-cursor-tail");const u=(function(t){return String(t)})`

  :host {
    pointer-events: none;
    position: absolute;
    height: 1px;
    width: 1px;
    top: 0;
    left: 0; 
    background: orange;  
    z-index: 9999; 
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

`,l=class extends HTMLElement{m(){super(),e(this,"root",this),e(this,"position",{n:window.innerWidth/2,h:window.innerHeight/2}),e(this,"dotInstance"),e(this,"tailInstance"),e(this,"status",n._),e(this,"action",!1),this.B=this.attachShadow({mode:"open"}),Array.from(this.D).l((t=>{this.B.G(t)}));const t=document.createElement("style");t.K=u.P(new RegExp("\\s{2,}","g"),String()),this.B.G(t),this.Q=new h(this),this.V=new r(this),this.B.G(this.V.g),this.B.G(this.Q.g)}static get W(){return["dot-size","tail-size","rotate","duration","action"]}set X(t){if(this.Y!==t)switch(this.Y=t,t){case n.j:this.Q.q(this.Y);break;case n._:this.Q.U()}}Z(){[this.V,this.Q].l((t=>{t.f()}))}tt(t){this.X=this.Y!==n.R&&t.n===this.r.n&&t.h===this.r.h?n._:this.Y,setTimeout((()=>{this.tt(this.r)}),l.st)}it(t,s){s&&(this.et="true"===t||"false"===t?JSON.parse(t):this.et,this.V.$(this.et))}connectedCallback(){document.body.y.cursor="none",document.body.addEventListener("mousemove",(s=>{this.X=n.j,t.o(s,this,Array(0)),this.Z()})),document.body.addEventListener("mousedown",(s=>{this.X=n.R,t.d(s,this,[()=>this.Q.J()])})),document.body.addEventListener("mouseup",(s=>{this.X=n.j,t.d(s,this,[()=>this.Q.q(this.Y)])})),this.tt(this.r)}attributeChangedCallback(t,s,i){const e=this.V.k,a=this.Q.k;switch(t){case"action":this.it(i,s);break;case"duration":e.v=a.v=parseInt(i);break;case"dot-size":e.p=parseInt(i);break;case"tail-size":a.p=parseInt(i);break;case"rotate":a.x=parseInt(i)}this.Z()}};let d=l;e(d,"ITER_TIMEOUT",750),customElements.define("eccheuma-crusoris",d),exports.Cursor=d;
//# sourceMappingURL=crusoris.cjs.js.map
