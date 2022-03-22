import { Status } from "./utils";
export declare var ComponentAttributes: any;
export declare class Cursor extends HTMLElement {
    static ITER_TIMEOUT: number;
    position: {
        x: number;
        y: number;
    };
    dotInstance: any;
    tailInstance: any;
    root: any;
    status: typeof Status;
    action: boolean;
    constructor();
    static get observedAttributes(): string[];
    set newStatus(value: any);
    notify(): void;
    idleChecker(pos: any): void;
    setAciton(value: any, prev: any): void;
    connectedCallback(): void;
    attributeChangedCallback(key: any, oldValue: any, newValue: any): void;
}
