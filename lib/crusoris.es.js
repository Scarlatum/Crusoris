var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function css(data) {
  return String(data);
}
var Status = /* @__PURE__ */ ((Status2) => {
  Status2[Status2["idle"] = 0] = "idle";
  Status2[Status2["active"] = 1] = "active";
  Status2[Status2["await"] = 2] = "await";
  return Status2;
})(Status || {});
var events;
((events2) => {
  function mousemove(event, instance, cb) {
    instance.position = {
      x: event.clientX,
      y: event.clientY
    };
    cb.forEach((f) => f());
  }
  events2.mousemove = mousemove;
  function click(_event, instance, cb) {
    instance.status = Status.active;
    cb.forEach((f) => f());
  }
  events2.click = click;
})(events || (events = {}));
class Entity {
  constructor(instance) {
    __publicField(this, "instance");
    __publicField(this, "element");
    __publicField(this, "transforms", {
      size: 4,
      scale: 1,
      rotate: 0,
      duration: 250
    });
    this.instance = instance;
    this.element = document.createElement("span");
    this.setStyles();
  }
  get position() {
    return {
      x: this.instance.position.x,
      y: this.instance.position.y
    };
  }
  update() {
    this.setStyles();
  }
  setStyles() {
    const TRANSLATE = `translate(${this.position.x}px, ${this.position.y}px)`;
    const SCALE = `scale(${this.transforms.scale})`;
    const ROTATE = `rotate(${this.transforms.rotate}deg)`;
    this.element.style.setProperty("transform", `${TRANSLATE} ${ROTATE} ${SCALE}`);
    this.element.style.setProperty("--size", `${this.transforms.size}px`);
    this.element.style.setProperty("--duration", `${this.transforms.duration}ms`);
  }
}
const _Dot = class extends Entity {
  constructor(instance) {
    super(instance);
    this.element.className = _Dot.className;
  }
};
let Dot = _Dot;
__publicField(Dot, "className", "eccheuma-cursor-dot");
const _Tail = class extends Entity {
  constructor(instance) {
    super(instance);
    this.element.className = _Tail.className;
  }
  set newScale(value) {
    this.transforms.scale = value;
    this.update();
  }
  AWAIT_ANIMATION() {
    this.instance.status = Status.await;
    setTimeout(() => {
      this.instance.status = Status.active;
    }, 250);
  }
  clickAnimation() {
    this.AWAIT_ANIMATION();
    this.element.style.opacity = "0";
    this.newScale = 2;
  }
  hideAnimation() {
    this.newScale = 0;
  }
  appearAnimation(status) {
    this.element.style.opacity = "1";
    switch (status) {
      case Status.active:
        this.newScale = 1;
        break;
      case Status.idle:
        this.newScale = 1;
        break;
    }
  }
};
let Tail = _Tail;
__publicField(Tail, "className", "eccheuma-cursor-tail");
const STYLES = css`

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
    --color: #FFFFFF;
    --duration: 250ms;

    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: var(--size);
    width: var(--size);
    border-radius: 10px;
    border: 2px solid var(--color);
    z-index: 1;
    transition-duration: var(--duration);
    transition-timing-function: ease-out;
    margin: calc((var(--size) / 2) * -1) calc((var(--size) / 2) * -1);
    box-sizing: border-box;
  }

  .eccheuma-cursor-dot {

    --size: 10px;
    --color: #FFFFFF;
    --dur: 250ms;

    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: var(--size);
    width: var(--size);
    background: var(--color);
    border-radius: 100%;
    z-index: 2;
    margin: calc((var(--size) / 2) * -1) calc((var(--size) / 2) * -1);

  }

`;
class Cursor extends HTMLElement {
  constructor() {
    super();
    __publicField(this, "shadowRoot");
    __publicField(this, "position", {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });
    __publicField(this, "dotInstance");
    __publicField(this, "tailInstance");
    __publicField(this, "status", Status.idle);
    this.shadowRoot = this.attachShadow({ mode: "closed" });
    const DOMStyle = document.createElement("style");
    DOMStyle.textContent = STYLES;
    this.shadowRoot.append(DOMStyle);
    this.tailInstance = new Tail(this);
    this.dotInstance = new Dot(this);
    this.shadowRoot.append(this.dotInstance.element);
    this.shadowRoot.append(this.tailInstance.element);
  }
  static get observedAttributes() {
    return [
      "dot-size",
      "tail-size",
      "rotate",
      "duration"
    ];
  }
  set newStatus(value) {
    if (this.status === value)
      return;
    this.status = value;
    switch (value) {
      case Status.active:
        this.tailInstance.appearAnimation(this.status);
        break;
      case Status.idle:
        this.tailInstance.hideAnimation();
        break;
    }
  }
  notify() {
    [this.dotInstance, this.tailInstance].forEach((instance) => {
      instance.update();
    });
  }
  idleChecker(pos) {
    setTimeout(() => {
      this.newStatus = pos.x === this.position.x && pos.y === this.position.y && this.status !== Status.await ? Status.idle : Status.active;
      this.idleChecker(this.position);
    }, 1e3);
  }
  connectedCallback() {
    document.body.style.cursor = "none";
    document.body.addEventListener("mousemove", (event) => {
      events.mousemove(event, this, Array(0));
      this.notify();
    });
    document.body.addEventListener("mousedown", (event) => {
      events.click(event, this, [
        () => this.tailInstance.clickAnimation()
      ]);
    });
    document.body.addEventListener("mouseup", (event) => {
      events.click(event, this, [
        () => this.tailInstance.appearAnimation(this.status)
      ]);
    });
    this.idleChecker(this.position);
  }
  attributeChangedCallback(key, _oldValue, newValue) {
    const DT = this.dotInstance.transforms;
    const TT = this.tailInstance.transforms;
    switch (key) {
      case "dot-size":
        DT.size = parseInt(newValue);
        break;
      case "tail-size":
        TT.size = parseInt(newValue);
        break;
      case "rotate":
        TT.rotate = parseInt(newValue);
        break;
      case "duration":
        {
          DT.duration = TT.duration = parseInt(newValue);
        }
        break;
    }
  }
}
customElements.define("eccheuma-crusoris", Cursor);
export { Cursor };
//# sourceMappingURL=crusoris.es.js.map
