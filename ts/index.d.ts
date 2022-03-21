declare module "source/events" {
    import { Cursor } from "source/index";
    export namespace events {
        type CB = Array<() => void>;
        export function mousemove(event: MouseEvent, instance: Cursor, cb: CB): void;
        export function click(_event: MouseEvent, _instance: Cursor, cb: CB): void;
        export {};
    }
}
declare module "source/modules/dot" {
    import { Entity, IParams } from "source/entity";
    import type { Cursor } from "source/index";
    interface IDot extends IParams {
    }
    export class Dot extends Entity implements IDot {
        private static readonly className;
        constructor(instance: Cursor);
        activeAnimation(status: boolean): void;
    }
}
declare module "source/utils" {
    export function css(data: TemplateStringsArray): string;
    export const enum Status {
        idle = 0,
        active = 1,
        await = 2
    }
}
declare module "source/modules/tail" {
    import { Entity, IParams } from "source/entity";
    import { Cursor } from "source/index";
    import { Status } from "source/utils";
    interface ITail extends IParams {
    }
    export class Tail extends Entity implements ITail {
        static readonly className: string;
        constructor(instance: Cursor);
        set newScale(value: number);
        clickAnimation(): void;
        hideAnimation(): void;
        appearAnimation(status: Status): void;
    }
}
declare module "source/index" {
    import { Dot } from "source/modules/dot";
    import { Tail } from "source/modules/tail";
    import { Status } from "source/utils";
    export type ElementPosition = {
        x: number;
        y: number;
    };
    enum ComponentAttributes {
        dotSize = "dot-size",
        tailSize = "tail-size",
        rotate = "rotate",
        duration = "duration",
        action = "action"
    }
    export class Cursor extends HTMLElement {
        static readonly ITER_TIMEOUT = 750;
        root: ShadowRoot | HTMLElement;
        position: ElementPosition;
        dotInstance: Dot;
        tailInstance: Tail;
        status: Status;
        action: boolean;
        constructor();
        static get observedAttributes(): Array<ComponentAttributes>;
        set newStatus(value: Status);
        private notify;
        private idleChecker;
        private setAciton;
        connectedCallback(): void;
        attributeChangedCallback(key: ComponentAttributes, oldValue: string, newValue: string): void;
    }
}
declare module "source/entity" {
    import type { Cursor } from "source/index";
    export interface IParams {
    }
    interface EntityStruct {
        transforms: {
            size: number;
            scale: number;
            rotate: number;
        };
    }
    export abstract class Entity implements EntityStruct {
        protected instance: Cursor;
        element: HTMLElement;
        transforms: {
            size: number;
            scale: number;
            rotate: number;
            duration: number;
        };
        constructor(instance: Cursor);
        private get position();
        update(): void;
        private setStyles;
    }
}
