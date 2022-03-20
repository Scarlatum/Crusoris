import type { ElementPosition, Cursor } from '~/index';

export interface IParams {
  // className: string;
}

interface EntityStruct {

  transforms: {
    size: number;
    scale: number;
    rotate: number;
  }

}

export abstract class Entity implements EntityStruct {

  protected instance: Cursor;

  public element: HTMLElement;


  public transforms = {
    size: 4,
    scale: 1,
    rotate: 0,
    duration: 250,
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