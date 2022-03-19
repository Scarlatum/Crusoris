var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var cursorStatus = /* @__PURE__ */ ((cursorStatus2) => {
  cursorStatus2[cursorStatus2["click"] = 0] = "click";
  cursorStatus2[cursorStatus2["idle"] = 1] = "idle";
  cursorStatus2[cursorStatus2["await"] = 2] = "await";
  cursorStatus2[cursorStatus2["move"] = 3] = "move";
  cursorStatus2[cursorStatus2["context"] = 4] = "context";
  return cursorStatus2;
})(cursorStatus || {});
var events;
((events2) => {
  let errorAlias;
  ((errorAlias2) => {
    errorAlias2[errorAlias2["define"] = 0] = "define";
  })(errorAlias || (errorAlias = {}));
  const errors = {
    define: new Error("Cursor is not defined")
  };
  function click(_ev, cursor) {
    if (!cursor)
      throw errors.define;
    cursor.newStatus = cursorStatus.click;
    cursor.newStatus = cursorStatus.await;
  }
  events2.click = click;
  function mousemove(event, cursor) {
    if (!cursor)
      throw errors.define;
    cursor.newStatus = cursorStatus.move;
    cursor.newPosition = {
      x: event.clientX,
      y: event.clientY
    };
    cursor.newStatus = cursorStatus.await;
  }
  events2.mousemove = mousemove;
})(events || (events = {}));
const tail = "_tail_1425a_27";
const dot = "_dot_1425a_91";
var styles = {
  tail,
  dot
};
class Entity {
  constructor(cursor) {
    __publicField(this, "element");
    __publicField(this, "cursor");
    __publicField(this, "position", {
      x: 0,
      y: 0
    });
    __publicField(this, "transforms", {
      rotate: 45,
      scale: 1
    });
    __publicField(this, "_size", 0);
    this.cursor = cursor;
    this.element = document.createElement("span");
    this.element.addEventListener("position", () => {
      this.pos = cursor.position;
    });
  }
  set size(value) {
    this.element.style.setProperty("--size", `${value}px`);
    this._size = value;
  }
  set pos(pos) {
    this.position = pos;
    this.updateProperty();
  }
  set scale(value) {
    this.transforms.scale = value;
    this.updateProperty();
  }
  get pos() {
    return {
      x: this.position.x - this.anchor,
      y: this.position.y - this.anchor
    };
  }
  updateProperty() {
    this.element.style.setProperty("--y", `${this.pos.y}px`);
    this.element.style.setProperty("--x", `${this.pos.x}px`);
    this.element.style.setProperty("--s", String(this.transforms.scale));
  }
}
class Dot extends Entity {
  constructor(cursor) {
    super(cursor);
    this.element.className = styles.dot;
  }
  get anchor() {
    return this._size / 2;
  }
}
class Tail extends Entity {
  constructor(cursor) {
    super(cursor);
    __publicField(this, "border", 2);
    this.element.className = styles.tail;
    this.element.addEventListener("status", () => {
      switch (cursor.status) {
        case cursorStatus.click:
          this.action();
          break;
        case cursorStatus.idle:
          this.hide();
          break;
        case cursorStatus.move:
          this.revert();
          break;
      }
    });
  }
  get anchor() {
    return this._size / 2 + this.border;
  }
  revert() {
    this.scale = 1;
  }
  hide() {
    this.scale = 0;
  }
  action() {
    this.scale = 2;
    setTimeout(() => {
      this.revert();
      this.cursor.newStatus = cursorStatus.await;
    }, 250);
  }
}
class Cursor extends HTMLElement {
  constructor() {
    super();
    __publicField(this, "dot");
    __publicField(this, "tail");
    __publicField(this, "listeners", Object());
    __publicField(this, "position", {
      x: 0,
      y: 0
    });
    __publicField(this, "customEvents", {
      position: new Event("position"),
      status: new Event("status")
    });
    __publicField(this, "status", cursorStatus.idle);
    this.dot = new Dot(this);
    this.tail = new Tail(this);
    this.append(this.dot.element);
    this.append(this.tail.element);
    this.listeners.click = (e) => events.click(e, this);
    this.listeners.mousemove = (e) => events.mousemove(e, this);
    this.idleChecker(this.position);
  }
  static get observedAttributes() {
    return [
      "dot-size",
      "tail-size"
    ];
  }
  set newStatus(value) {
    if (value === this.status)
      return;
    this.status = value;
    this.tail.element.dispatchEvent(this.customEvents.status);
    this.dot.element.dispatchEvent(this.customEvents.status);
  }
  set newPosition(pos) {
    this.position = pos;
    this.tail.element.dispatchEvent(this.customEvents.position);
    this.dot.element.dispatchEvent(this.customEvents.position);
  }
  idleChecker(pos) {
    setTimeout(() => {
      if (pos.x === this.position.x && pos.y === this.position.y && this.status === cursorStatus.await) {
        this.newStatus = cursorStatus.idle;
      }
      this.idleChecker(this.position);
    }, 1e3);
  }
  connectedCallback() {
    this.parentElement.style.cursor = "none";
    this.parentElement.addEventListener("mousemove", this.listeners.mousemove);
    this.parentElement.addEventListener("click", this.listeners.click);
  }
  disconnectedCallback() {
    this.parentElement.removeEventListener("mousemove", this.listeners.mousemove);
    this.parentElement.removeEventListener("click", this.listeners.click);
  }
  attributeChangedCallback(key, _oldValue, newValue) {
    switch (key) {
      case "dot-size":
        this.dot.size = parseInt(newValue);
        break;
      case "tail-size":
        this.tail.size = parseInt(newValue);
        break;
    }
  }
}
window.customElements.define("eccheuma-cursor", Cursor);
export { Cursor };
//# sourceMappingURL=crusoris.es.js.map
