export default class Cursor {
    private rootDOM;
    private container;
    private tail;
    private dot;
    private cssProperties;
    private idle;
    private tailTransform;
    private dotTransform;
    constructor(target: HTMLElement);
    set dotTransformationHash(key: number);
    set tailTransformationHash(key: number);
    set idleStatus(value: boolean);
    init(): void;
    private getSizes;
    private start;
    private shiftCursor;
    private clickCursor;
    private holdCursor;
    private hideCursor;
    private idleChecker;
    private idleReset;
    private collectValues;
}
//# sourceMappingURL=index.d.ts.map