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
    Object.defineProperty(this, "instance", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "element", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "transforms", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {
        size: 10,
        scale: 1,
        rotate: 0,
        duration: 250
      }
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
class Dot extends Entity {
  constructor(instance) {
    super(instance);
    this.element.className = Dot.className;
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
}
Object.defineProperty(Dot, "DEFAULT_SIZE", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 6
});
Object.defineProperty(Dot, "className", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "eccheuma-cursor-dot"
});
class Tail extends Entity {
  constructor(instance) {
    super(instance);
    this.element.className = Tail.className;
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
      case 1:
        this.newScale = 1;
        break;
      case 0:
        this.newScale = 0;
        break;
    }
  }
}
Object.defineProperty(Tail, "DEFAULT_SIZE", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 30
});
Object.defineProperty(Tail, "className", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: "eccheuma-cursor-tail"
});
function css(data) {
  return String(data);
}
var Status = ((Status2) => {
  Status2[Status2["idle"] = 0] = "idle";
  Status2[Status2["active"] = 1] = "active";
  Status2[Status2["await"] = 2] = "await";
  return Status2;
})(Status || {});
const STYLES = css`

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

`;
var ComponentAttributes = ((ComponentAttributes2) => {
  ComponentAttributes2["dotSize"] = "dot-size";
  ComponentAttributes2["tailSize"] = "tail-size";
  ComponentAttributes2["rotate"] = "rotate";
  ComponentAttributes2["duration"] = "duration";
  ComponentAttributes2["action"] = "action";
  return ComponentAttributes2;
})(ComponentAttributes || {});
class Cursor extends HTMLElement {
  constructor() {
    super();
    Object.defineProperty(this, "position", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    });
    Object.defineProperty(this, "dotInstance", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "tailInstance", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "root", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "status", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "action", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    this.root = this.attachShadow({ mode: "open" });
    this.tailInstance = new Tail(this);
    this.dotInstance = new Dot(this);
    this.root.append(this.dotInstance.element);
    this.root.append(this.tailInstance.element);
    const ElementStyle = document.createElement("style");
    ElementStyle.textContent = STYLES.replaceAll(new RegExp("\\s{2,}", "g"), String());
    this.root.append(ElementStyle);
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
      case 1:
        this.tailInstance.appearAnimation(this.status);
        break;
      case 0:
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
    this.newStatus = this.status !== 2 && pos.x === this.position.x && pos.y === this.position.y ? 0 : this.status;
    setTimeout(() => {
      this.idleChecker(this.position);
    }, Cursor.ITER_TIMEOUT);
  }
  setAciton(value, prev) {
    if (!prev)
      return;
    this.action = value === "true" || value === "false" ? JSON.parse(value) : this.action;
    this.dotInstance.activeAnimation(this.action);
  }
  connectedCallback() {
    document.body.addEventListener("mousemove", (event) => {
      this.newStatus = 1;
      events.mousemove(event, this, Array(0));
      this.notify();
    });
    document.body.addEventListener("mousedown", (event) => {
      this.newStatus = 2;
      events.click(event, this, [
        () => this.tailInstance.clickAnimation()
      ]);
    });
    document.body.addEventListener("mouseup", (event) => {
      this.newStatus = 1;
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
}
Object.defineProperty(Cursor, "ITER_TIMEOUT", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 750
});
const TAG = "eccheuma-crusoris";
var innerFucntions;
((innerFucntions2) => {
  function setStyles() {
    const GlobalStyle = document.createElement("style");
    GlobalStyle.textContent = "* { cursor: none !important }";
    document.head.append(GlobalStyle);
  }
  innerFucntions2.setStyles = setStyles;
  function setElement() {
    const Element = document.createElement(TAG);
    Element.setAttribute("dot-size", String(Dot.DEFAULT_SIZE));
    Element.setAttribute("tail-size", String(Tail.DEFAULT_SIZE));
    Element.setAttribute("rotate", String(45));
    Element.setAttribute("duration", String(250));
    document.body.append(Element);
  }
  innerFucntions2.setElement = setElement;
})(innerFucntions || (innerFucntions = {}));
function init(options) {
  customElements.define(TAG, Cursor);
  if (options.styles)
    innerFucntions.setStyles();
  if (options.dist)
    innerFucntions.setElement();
}
export { init as default };
//# sourceMappingURL=crusoris.es.js.map
