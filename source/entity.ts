import type { ElementPosition, Cursor } from '~/cursor';
import { utils } from '~/utils';

export type AnimationFunction = () => void;

export interface Transforms {
  size: utils.measurements.px;
  scale: number;
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
    size    : utils.toNominal(10, utils.nominals.px),
    scale   : 1.0,
    rotate  : utils.toNominal(0, utils.nominals.deg),
    duration: utils.toNominal(250, utils.nominals.ms),
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

    const TRANSLATE: string = `translate(
      ${ utils.toNominal(this.position.x, utils.nominals.px) }, 
      ${ utils.toNominal(this.position.y, utils.nominals.px) }
    )`;

    const SCALE: string     = `scale(${ this.transforms.scale })`;
    const ROTATE: string    = `rotate(${ this.transforms.rotate })`;

    this.element.style.setProperty('transform', `${ TRANSLATE } ${ SCALE } ${ ROTATE }`);
    this.element.style.setProperty('--size', `${ this.transforms.size }`);
    this.element.style.setProperty('--duration', `${ this.transforms.duration }`);

  }

}