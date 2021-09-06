var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Cursor {
    constructor(target) {
        this.cssProperties = {
            transDur: 0,
            cursorCenter: 0,
            dotHalf: 0,
            cursorBorder: 0,
            cursorSize: 0,
            opacity: 0,
        };
        this.idle = {
            hash: 0,
            status: true,
            timeout: 1000,
        };
        this.cursorTransform = {
            translate: '',
            scale: '',
        };
        this.dotTransform = {
            translate: '',
            scale: '',
        };
        const customCursor = document.createElement('i');
        customCursor.id = 'crusoris-circle';
        customCursor.style.setProperty('opacity', String(this.cssProperties.opacity));
        const dot = document.createElement('i');
        dot.id = 'crusoris-dot';
        const container = document.createElement('div');
        container.id = "crusoris";
        this.container = container;
        this.customCursor = customCursor;
        this.dot = dot;
        this.rootDOM = target;
    }
    set dotTransformationHash(key) {
        this.idleReset();
        this.dot
            .style.setProperty('transform', Object.keys(this.dotTransform).reduce((prev, cur) => {
            return `${this.dotTransform[prev]} ${this.dotTransform[cur]}`;
        }));
    }
    set circleTransformationHash(key) {
        this.idleReset();
        this.customCursor
            .style.setProperty('transform', Object.keys(this.cursorTransform).reduce((prev, cur) => {
            return `${this.cursorTransform[prev]} ${this.cursorTransform[cur]}`;
        }));
    }
    set idleStatus(value) {
        this.idle.status = value;
        this.customCursor.style.setProperty('opacity', String(Number(!value)));
    }
    init() {
        this.rootDOM.prepend(this.container);
        this.container.prepend(this.customCursor);
        this.container.prepend(this.dot);
        this.getSizes();
    }
    getSizes() {
        const { width, borderWidth, transitionDuration } = window.getComputedStyle(this.customCursor);
        this.cssProperties.transDur = parseFloat(transitionDuration) * 1000;
        this.cssProperties.cursorBorder = parseFloat(borderWidth);
        this.cssProperties.cursorSize = parseFloat(width);
        this.cssProperties.cursorCenter = parseFloat(width) / 2;
        const dot_CSS = window.getComputedStyle(this.dot);
        this.cssProperties.dotHalf = parseFloat(dot_CSS.width) / 2;
        this.start();
    }
    start() {
        window.addEventListener('mousemove', ({ clientY, clientX }) => {
            this.shiftCursor(clientX, clientY);
        });
        window.addEventListener('mousedown', () => this.holdCursor(true));
        window.addEventListener('mouseup', () => this.holdCursor(false));
        window.addEventListener('click', () => this.clickCursor());
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            this.idleStatus = this.idle.hash === (yield this.idleChecker());
            console.log(this.idle.status);
        }), this.idle.timeout / 2);
    }
    shiftCursor(x, y) {
        const changeHash = Math.random();
        this.cursorTransform.translate = `translate(${x - this.cssProperties.cursorCenter}px, ${y - this.cssProperties.cursorCenter}px)`;
        this.dotTransform.translate = `translate(${x - this.cssProperties.dotHalf}px, ${y - this.cssProperties.dotHalf}px)`;
        this.circleTransformationHash = changeHash;
        this.dotTransformationHash = changeHash;
    }
    clickCursor() {
        this.cursorTransform.scale = 'scale(0)';
        this.circleTransformationHash = Math.random();
        setTimeout(() => {
            this.cursorTransform.scale = 'scale(1)';
            this.circleTransformationHash = Math.random();
        }, this.cssProperties.transDur);
    }
    holdCursor(hold) {
        this.cursorTransform.scale = `scale(${hold ? 2 : 1})`;
        this.circleTransformationHash = Math.random();
    }
    idleChecker() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(this.idle.hash);
                }, this.idle.timeout / 2);
            });
        });
    }
    idleReset() {
        this.idleStatus = false;
        this.idle.hash = Math.random();
    }
}
