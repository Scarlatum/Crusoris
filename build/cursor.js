var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Cursor_instances, _Cursor_getSizes, _Cursor_start, _Cursor_shiftCursor, _Cursor_actionCursor, _Cursor_transformTicker;
export default class Cursor {
    constructor(target) {
        _Cursor_instances.add(this);
        this.customCursor = undefined;
        this.dot = undefined;
        this.cssProperties = {
            transDur: 0,
            cursorCenter: 0,
            dotHalf: 0,
            cursorBorder: 0,
            cursorSize: 0,
        };
        this.cursorTransform = {
            translate: '',
            scale: '',
        };
        this.dotTransform = {
            translate: '',
            scale: '',
        };
        this.domRoot = target;
    }
    init() {
        const customCursor = document.createElement('i');
        customCursor.classList.add('cursor');
        customCursor.id = 'CRUSOR';
        const dot = document.createElement('i');
        dot.classList.add('cursor-dot');
        dot.id = 'CRUSOR_DOT';
        const container = document.createElement('div');
        container.classList.add('cursor-container');
        container.prepend(customCursor);
        container.prepend(dot);
        this.domRoot.prepend(container);
        this.customCursor = customCursor;
        this.dot = dot;
        __classPrivateFieldGet(this, _Cursor_instances, "m", _Cursor_getSizes).call(this);
    }
}
_Cursor_instances = new WeakSet(), _Cursor_getSizes = function _Cursor_getSizes() {
    const { width, borderWidth, transitionDuration } = window.getComputedStyle(this.customCursor);
    this.cssProperties.transDur = parseFloat(transitionDuration) * 1000;
    this.cssProperties.cursorBorder = parseFloat(borderWidth);
    this.cssProperties.cursorSize = parseFloat(width);
    this.cssProperties.cursorCenter = this.cssProperties.cursorBorder + (this.cssProperties.cursorSize / 2);
    const dot_CSS = window.getComputedStyle(this.dot);
    this.cssProperties.dotHalf = parseFloat(dot_CSS.width) / 2;
    __classPrivateFieldGet(this, _Cursor_instances, "m", _Cursor_start).call(this);
}, _Cursor_start = function _Cursor_start() {
    __classPrivateFieldGet(this, _Cursor_instances, "m", _Cursor_transformTicker).call(this);
    window.addEventListener('mousemove', ({ clientY, clientX }) => __classPrivateFieldGet(this, _Cursor_instances, "m", _Cursor_shiftCursor).call(this, clientX, clientY));
    window.addEventListener('click', () => __classPrivateFieldGet(this, _Cursor_instances, "m", _Cursor_actionCursor).call(this));
}, _Cursor_shiftCursor = function _Cursor_shiftCursor(x, y) {
    this.cursorTransform.translate = `translate(${x - this.cssProperties.cursorCenter}px, ${y - this.cssProperties.cursorCenter}px)`;
    this.dotTransform.translate = `translate(${x - this.cssProperties.dotHalf}px, ${y - this.cssProperties.dotHalf}px)`;
}, _Cursor_actionCursor = function _Cursor_actionCursor() {
    this.cursorTransform.scale = 'scale(0)';
    setTimeout(() => {
        this.cursorTransform.scale = 'scale(1)';
    }, this.cssProperties.transDur);
}, _Cursor_transformTicker = function _Cursor_transformTicker() {
    this.customCursor
        .style.setProperty('transform', Object.keys(this.cursorTransform).reduce((prev, cur) => {
        return `${this.cursorTransform[prev]} ${this.cursorTransform[cur]}`;
    }));
    this.dot
        .style.setProperty('transform', Object.keys(this.dotTransform).reduce((prev, cur) => {
        return `${this.dotTransform[prev]} ${this.dotTransform[cur]}`;
    }));
    requestAnimationFrame(() => __classPrivateFieldGet(this, _Cursor_instances, "m", _Cursor_transformTicker).call(this));
};
