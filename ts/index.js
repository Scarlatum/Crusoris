define("source/events", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.events = void 0;
    var events;
    (function (events) {
        function mousemove(event, instance, cb) {
            instance.position = {
                x: event.clientX,
                y: event.clientY,
            };
            cb.forEach(f => f());
        }
        events.mousemove = mousemove;
        function click(_event, _instance, cb) {
            cb.forEach(f => f());
        }
        events.click = click;
    })(events = exports.events || (exports.events = {}));
});
define("source/modules/dot", ["require", "exports", "source/entity"], function (require, exports, entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dot = void 0;
    class Dot extends entity_1.Entity {
        constructor(instance) {
            super(instance);
            this.element.className = Dot.className;
        }
        activeAnimation(status) {
            this.element.getAnimations().forEach(anim => anim.cancel());
            this.element.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(2)' },
            ], {
                duration: this.transforms.duration,
                composite: 'accumulate',
                iterations: status ? Infinity : 2,
                direction: 'alternate',
                fill: 'both'
            });
        }
    }
    exports.Dot = Dot;
    Object.defineProperty(Dot, "className", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 'eccheuma-cursor-dot'
    });
});
define("source/utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Status = exports.css = void 0;
    function css(data) {
        return String(data);
    }
    exports.css = css;
    ;
    var Status;
    (function (Status) {
        Status[Status["idle"] = 0] = "idle";
        Status[Status["active"] = 1] = "active";
        Status[Status["await"] = 2] = "await";
    })(Status = exports.Status || (exports.Status = {}));
});
define("source/modules/tail", ["require", "exports", "source/entity"], function (require, exports, entity_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tail = void 0;
    class Tail extends entity_2.Entity {
        constructor(instance) {
            super(instance);
            this.element.className = Tail.className;
        }
        set newScale(value) {
            this.transforms.scale = value;
            this.update();
        }
        clickAnimation() {
            this.element.style.opacity = '1';
            this.newScale = 2;
        }
        hideAnimation() {
            this.element.style.opacity = '.25';
            this.newScale = .75;
        }
        appearAnimation(status) {
            this.element.style.opacity = '1';
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
    exports.Tail = Tail;
    Object.defineProperty(Tail, "className", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 'eccheuma-cursor-tail'
    });
});
define("source/index", ["require", "exports", "source/events", "source/modules/dot", "source/modules/tail", "source/utils"], function (require, exports, events_1, dot_1, tail_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cursor = void 0;
    const STYLES = (0, utils_1.css) `

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
    var ComponentAttributes;
    (function (ComponentAttributes) {
        ComponentAttributes["dotSize"] = "dot-size";
        ComponentAttributes["tailSize"] = "tail-size";
        ComponentAttributes["rotate"] = "rotate";
        ComponentAttributes["duration"] = "duration";
        ComponentAttributes["action"] = "action";
    })(ComponentAttributes || (ComponentAttributes = {}));
    class Cursor extends HTMLElement {
        constructor() {
            super();
            Object.defineProperty(this, "root", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: this
            });
            Object.defineProperty(this, "position", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
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
            this.root = this.attachShadow({ mode: 'open' });
            Array.from(this.children).forEach(elem => {
                this.root.append(elem);
            });
            const DOMStyle = document.createElement('style');
            DOMStyle.textContent = STYLES
                .replaceAll(new RegExp('\\s{2,}', 'g'), String());
            this.root.append(DOMStyle);
            this.tailInstance = new tail_1.Tail(this);
            this.dotInstance = new dot_1.Dot(this);
            this.root.append(this.dotInstance.element);
            this.root.append(this.tailInstance.element);
        }
        static get observedAttributes() {
            return [
                ComponentAttributes.dotSize,
                ComponentAttributes.tailSize,
                ComponentAttributes.rotate,
                ComponentAttributes.duration,
                ComponentAttributes.action,
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
            this.newStatus = this.status !== 2
                && pos.x === this.position.x
                && pos.y === this.position.y
                ? 0
                : this.status;
            setTimeout(() => {
                this.idleChecker(this.position);
            }, Cursor.ITER_TIMEOUT);
        }
        setAciton(value, prev) {
            if (!prev)
                return;
            this.action = value === 'true' || value === 'false'
                ? JSON.parse(value)
                : this.action;
            this.dotInstance.activeAnimation(this.action);
        }
        connectedCallback() {
            document.body.style.cursor = 'none';
            document.body.addEventListener('mousemove', (event) => {
                this.newStatus = 1;
                events_1.events.mousemove(event, this, Array(0));
                this.notify();
            });
            document.body.addEventListener('mousedown', (event) => {
                this.newStatus = 2;
                events_1.events.click(event, this, [
                    () => this.tailInstance.clickAnimation(),
                ]);
            });
            document.body.addEventListener('mouseup', (event) => {
                this.newStatus = 1;
                events_1.events.click(event, this, [
                    () => this.tailInstance.appearAnimation(this.status)
                ]);
            });
            this.idleChecker(this.position);
        }
        attributeChangedCallback(key, oldValue, newValue) {
            const DT = this.dotInstance.transforms;
            const TT = this.tailInstance.transforms;
            switch (key) {
                case ComponentAttributes.action:
                    this.setAciton(newValue, oldValue);
                    break;
                case ComponentAttributes.duration:
                    DT.duration = TT.duration = parseInt(newValue);
                    break;
                case ComponentAttributes.dotSize:
                    DT.size = parseInt(newValue);
                    break;
                case ComponentAttributes.tailSize:
                    TT.size = parseInt(newValue);
                    break;
                case ComponentAttributes.rotate:
                    TT.rotate = parseInt(newValue);
                    break;
            }
            this.notify();
        }
    }
    exports.Cursor = Cursor;
    Object.defineProperty(Cursor, "ITER_TIMEOUT", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 750
    });
    customElements.define('eccheuma-crusoris', Cursor);
});
define("source/entity", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Entity = void 0;
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
                    size: 4,
                    scale: 1,
                    rotate: 0,
                    duration: 250,
                }
            });
            this.instance = instance;
            this.element = document.createElement('span');
            this.setStyles();
        }
        get position() {
            return {
                x: this.instance.position.x,
                y: this.instance.position.y,
            };
        }
        update() {
            this.setStyles();
        }
        setStyles() {
            const TRANSLATE = `translate(${this.position.x}px, ${this.position.y}px)`;
            const SCALE = `scale(${this.transforms.scale})`;
            const ROTATE = `rotate(${this.transforms.rotate}deg)`;
            this.element.style.setProperty('transform', `${TRANSLATE} ${ROTATE} ${SCALE}`);
            this.element.style.setProperty('--size', `${this.transforms.size}px`);
            this.element.style.setProperty('--duration', `${this.transforms.duration}ms`);
        }
    }
    exports.Entity = Entity;
});
//# sourceMappingURL=index.js.map