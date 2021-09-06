export default class Cursor {
    private rootDOM;
    private container;
    private customCursor;
    private dot;
    private cssProperties;
    private idle;
    private cursorTransform;
    private dotTransform;
    constructor(target: HTMLElement);
    set dotTransformationHash(key: number);
    set circleTransformationHash(key: number);
    set idleStatus(value: boolean);
    init(): void;
    private getSizes;
    private start;
    private shiftCursor;
    private clickCursor;
    private holdCursor;
    private idleChecker;
    private idleReset;
}
//# sourceMappingURL=index.d.ts.map