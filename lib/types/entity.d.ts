export declare class Entity {
    instance: any;
    element: any;
    transforms: {
        size: number;
        scale: number;
        rotate: number;
        duration: number;
    };
    constructor(instance: any);
    get position(): {
        x: any;
        y: any;
    };
    update(): void;
    setStyles(): void;
}
