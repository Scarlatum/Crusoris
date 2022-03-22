import { events } from '~/events';

// UTILS
import { utils } from '~/utils';

// STYLES
import styles from '~/styles'

// ELEMENTS
import { Transforms } from '~/entity'
import { Dot  } from '~/modules/dot';
import { Tail } from '~/modules/tail';

type Instances = {
  dot: Dot,
  tail: Tail,
}

export type ElementPosition = {
  x: number,
  y: number,
}

export const enum Status {
  idle,
  active,
  await
}


export enum ComponentAttributes {
  dotSize = 'dot-size',
  tailSize = 'tail-size',
  rotate = 'rotate',
  duration = 'duration',
  action = 'action'
}

export class Cursor extends HTMLElement {

  public static readonly ITER_TIMEOUT = 750;

  public position: ElementPosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }

  public instances: Instances = Object();

  public root: ShadowRoot;

  public status: Status = Status.idle;
  public action: boolean = false;

  constructor() { super();

    this.root = this.attachShadow({ mode: 'open' });

    this.instances.dot  = new Dot(this);
    this.instances.tail = new Tail(this);

    this.root.append(this.instances.dot.element);
    this.root.append(this.instances.tail.element);

    const ElementStyle = document.createElement('style');
          ElementStyle.textContent = styles

    this.root.append(ElementStyle);
    
  }

  static get observedAttributes(): Array<ComponentAttributes> { 
    return [
      ComponentAttributes.dotSize,
      ComponentAttributes.tailSize,
      ComponentAttributes.rotate,
      ComponentAttributes.duration,
      ComponentAttributes.action,
    ]
  }

  set newStatus(value: Status) {

    if ( this.status === value ) return;

    this.status = value;

    // ? TAIL REACTIONS
    switch (value) {
      case Status.active: this.instances.tail.appearAnimation(); break;
      case Status.idle: this.instances.tail.hideAnimation(); break;
    }

  }

  private notify() {

    Object.values(this.instances).forEach(instance => {
      instance.update();
    })

  }

  private idleChecker(pos: ElementPosition) {

    this.newStatus = this.status !== Status.await
      && pos.x === this.position.x 
      && pos.y === this.position.y
      ? Status.idle
      : this.status

    setTimeout(() => {
      this.idleChecker(this.position);
    }, Cursor.ITER_TIMEOUT);

  }

  private setContext(value: string, prev: string) {

    if ( !prev ) return;

    this.action = value === 'true' || value === 'false'
      ? JSON.parse(value)
      : this.action;

    this.instances.dot.contextAnimation();

  }

  connectedCallback() {

    document.body.addEventListener('mousemove', (event) => {

      this.newStatus = Status.active

      events.mousemove(event, this, Array(0)); 
      
      this.notify();

    })

    document.body.addEventListener('mousedown', (event) => {

      this.newStatus = Status.await;

      events.click(event, this, [
        () => this.instances.tail.clickAnimation(),
      ])

    })

    document.body.addEventListener('mouseup', (event) => {

      this.newStatus = Status.active;

      events.click(event, this, [
        () => this.instances.tail.appearAnimation()
      ])

    })

    this.idleChecker(this.position);

  }

  attributeChangedCallback(key: ComponentAttributes, oldValue: string, newValue: string) {

    const DT: Transforms = this.instances.dot.transforms;
    const TT: Transforms = this.instances.tail.transforms;
    
    switch (key) {

      case ComponentAttributes.action: this.setContext(newValue, oldValue); break

      case ComponentAttributes.duration: 
        DT.duration = TT.duration = parseInt(newValue) as utils.measurements.ms;
        break;

      case ComponentAttributes.dotSize:
        DT.size = parseInt(newValue) as utils.measurements.px;
        break;

      case ComponentAttributes.tailSize:
        TT.size = parseInt(newValue) as utils.measurements.px;
        break;

      case ComponentAttributes.rotate:
        TT.rotate = parseInt(newValue) as utils.measurements.deg;
        break;
      
    }

    this.notify();

  }

}

