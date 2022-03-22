import { Entity } from "../entity";
export declare class Tail extends Entity {
    static DEFAULT_SIZE: number;
    static className: string;
    constructor(instance: any);
    set newScale(value: any);
    clickAnimation(): void;
    hideAnimation(): void;
    appearAnimation(status: any): void;
}
