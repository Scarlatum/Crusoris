import type { ElementPosition, Cursor } from '~/cursor';
import { utils } from '~/utils';

export type AnimationFunction = () => void;

export interface Transforms {
  size: utils.measurements.px;
  scale: utils.measurements.float;
  rotate: utils.measurements.deg;
  duration: utils.measurements.ms;
}

interface IEntity {
  transforms: Transforms
  element: HTMLElement
}

export abstract class Entity implements IEntity {

  protected instance: Cursor;

  public element: HTMLElement;

  public transforms: Transforms = {
    size    : 10  as utils.measurements.px,
    scale   : 1.0 as utils.measurements.float,
    rotate  : 0   as utils.measurements.deg,
    duration: 250 as utils.measurements.ms,
  }

  constructor(instance: Cursor) {

    this.instance = instance;

    this.element = document.createElement('span');

    this.setStyles();

  }

  private get position(): ElementPosition {
    return {
      x: this.instance.position.x,
      y: this.instance.position.y,
    }
  }

  public update() {
    this.setStyles();
  }

  private setStyles() {

    const TRANSLATE: string = `translate(${ this.position.x }px, ${ this.position.y }px)`;
    const SCALE: string     = `scale(${ this.transforms.scale })`
    const ROTATE: string    = `rotate(${ this.transforms.rotate }deg)`;

    this.element.style.setProperty('transform', `${ TRANSLATE } ${ ROTATE } ${ SCALE }`);
    this.element.style.setProperty('--size', `${ this.transforms.size }px`);
    this.element.style.setProperty('--duration', `${ this.transforms.duration }ms`);

  }

}