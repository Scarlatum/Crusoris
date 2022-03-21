var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
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
  function click(_event, _instance, cb) {
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
  activeAnimation(status) {
    this.element.getAnimations().forEach((anim) => anim.cancel());
    this.element.animate([
      { transform: "scale(1)" },
      { transform: "scale(2)" }
    ], {
      duration: this.transforms.duration,
      composite: "accumulate",
      iterations: status ? Infinity : 2,
      direction: "alternate",
      fill: "both"
    });
  }
};
let Dot = _Dot;
__publicField(Dot, "className", "eccheuma-cursor-dot");
function css(data) {
  return String(data);
}
var Status = /* @__PURE__ */ ((Status2) => {
  Status2[Status2["idle"] = 0] = "idle";
  Status2[Status2["active"] = 1] = "active";
  Status2[Status2["await"] = 2] = "await";
  return Status2;
})(Status || {});
const _Tail = class extends Entity {
  constructor(instance) {
    super(instance);
    this.element.className = _Tail.className;
  }
  set newScale(value) {
    this.transforms.scale = value;
    this.update();
  }
  clickAnimation() {
    this.element.style.opacity = "1";
    this.newScale = 2;
  }
  hideAnimation() {
    this.element.style.opacity = ".25";
    this.newScale = 0.75;
  }
  appearAnimation(status) {
    this.element.style.opacity = "1";
    switch (status) {
      case Status.active:
        this.newScale = 1;
        break;
      case Status.idle:
        this.newScale = 0;
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

`;
const _Cursor = class extends HTMLElement {
  constructor() {
    super();
    __publicField(this, "root", this);
    __publicField(this, "position", {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });
    __publicField(this, "dotInstance");
    __publicField(this, "tailInstance");
    __publicField(this, "status", Status.idle);
    __publicField(this, "action", false);
    this.root = this.attachShadow({ mode: "open" });
    Array.from(this.children).forEach((elem) => {
      this.root.append(elem);
    });
    const DOMStyle = document.createElement("style");
    DOMStyle.textContent = STYLES.replaceAll(new RegExp("\\s{2,}", "g"), String());
    this.root.append(DOMStyle);
    this.tailInstance = new Tail(this);
    this.dotInstance = new Dot(this);
    this.root.append(this.dotInstance.element);
    this.root.append(this.tailInstance.element);
  }
  static get observedAttributes() {
    return [
      "dot-size",
      "tail-size",
      "rotate",
      "duration",
      "action"
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
    this.newStatus = this.status !== Status.await && pos.x === this.position.x && pos.y === this.position.y ? Status.idle : this.status;
    setTimeout(() => {
      this.idleChecker(this.position);
    }, _Cursor.ITER_TIMEOUT);
  }
  setAciton(value, prev) {
    if (!prev)
      return;
    this.action = value === "true" || value === "false" ? JSON.parse(value) : this.action;
    this.dotInstance.activeAnimation(this.action);
  }
  connectedCallback() {
    document.body.style.cursor = "none";
    document.body.addEventListener("mousemove", (event) => {
      this.newStatus = Status.active;
      events.mousemove(event, this, Array(0));
      this.notify();
    });
    document.body.addEventListener("mousedown", (event) => {
      this.newStatus = Status.await;
      events.click(event, this, [
        () => this.tailInstance.clickAnimation()
      ]);
    });
    document.body.addEventListener("mouseup", (event) => {
      this.newStatus = Status.active;
      events.click(event, this, [
        () => this.tailInstance.appearAnimation(this.status)
      ]);
    });
    this.idleChecker(this.position);
  }
  attributeChangedCallback(key, oldValue, newValue) {
    const DT = this.dotInstance.transforms;
    const TT = this.tailInstance.transforms;
    switch (key) {
      case "action":
        this.setAciton(newValue, oldValue);
        break;
      case "duration":
        DT.duration = TT.duration = parseInt(newValue);
        break;
      case "dot-size":
        DT.size = parseInt(newValue);
        break;
      case "tail-size":
        TT.size = parseInt(newValue);
        break;
      case "rotate":
        TT.rotate = parseInt(newValue);
        break;
    }
    this.notify();
  }
};
let Cursor = _Cursor;
__publicField(Cursor, "ITER_TIMEOUT", 750);
customElements.define("eccheuma-crusoris", Cursor);
export { Cursor };
//# sourceMappingURL=crusoris.es.js.map
