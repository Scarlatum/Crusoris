import { events } from '~/events';

// ELEMENTS
import { Dot } from '~/modules/dot';
import { Tail } from '~/modules/tail';

import { css, Status } from '~/utils';

export type ElementPosition = {
  x: number,
  y: number,
}

// STYLES
const STYLES = css`

  :host {
    pointer-events: none;
    position: absolute;
    height: 1px;
    width: 1px;
    top: 0;
    left: 0; 
    background: orange;  
    z-index: 9999; 
  }

  .eccheuma-cursor-tail {

    --size: 40px;
    --duration: 250ms;

    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: var(--size);
    width: var(--size);
    border-radius: calc(var(--size) / 3);
    border: 2px solid var(--crusoris-color-tail, #FFFFFF);
    z-index: 1;
    transition-duration: var(--duration);
    transition-timing-function: ease-out;
    margin: calc((var(--size) / 2) * -1) calc((var(--size) / 2) * -1);
    box-sizing: border-box;
  }

  .eccheuma-cursor-dot {

    --size: 10px;
    --dur: 250ms;

    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: var(--size);
    width: var(--size);
    background: var(--crusoris-color-dot, #FFFFFF);
    border: 2px solid var(--crusoris-color-accent, #AAAAAA);
    border-radius: 100%;
    z-index: 2;
    margin: calc((var(--size) / 2) * -1) calc((var(--size) / 2) * -1);
    box-sizing: border-box;

  }

`

enum ComponentAttributes {
  dotSize = 'dot-size',
  tailSize = 'tail-size',
  rotate = 'rotate',
  duration = 'duration',
  action = 'action'
}

export class Cursor extends HTMLElement {

  public static readonly ITER_TIMEOUT = 750;

  public root: ShadowRoot | HTMLElement = this;
  public position: ElementPosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }

  public dotInstance: Dot;
  public tailInstance: Tail;

  public status: Status = Status.idle;
  public action: boolean = false;

  constructor() { super();

    this.root = this.attachShadow({ mode: 'open' });

    Array.from(this.children).forEach(elem => {
      this.root.append(elem)
    })

    const DOMStyle = document.createElement('style');
          DOMStyle.textContent = STYLES
            .replaceAll(new RegExp('\\s{2,}', 'g'), String());

    this.root.append(DOMStyle);

    this.tailInstance = new Tail(this);
    this.dotInstance  = new Dot(this);

    this.root.append(this.dotInstance.element);
    this.root.append(this.tailInstance.element);

    // setInterval(() => {
    //   this.setAttribute('action', this.action ? 'false' : 'true');
    // }, 3000)
    
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
      case Status.active: this.tailInstance.appearAnimation(this.status); break;
      case Status.idle: this.tailInstance.hideAnimation(); break;
    }

  }

  private notify() {

    [ this.dotInstance, this.tailInstance ].forEach((instance) => {
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

  private setAciton(value: string, prev: string) {

    if ( !prev ) return;

    this.action = value === 'true' || value === 'false'
      ? JSON.parse(value)
      : this.action;

    this.dotInstance.activeAnimation(this.action);

  }

  connectedCallback() {

    document.body.style.cursor = 'none';

    document.body.addEventListener('mousemove', (event) => {

      this.newStatus = Status.active

      events.mousemove(event, this, Array(0)); 
      
      this.notify();

    })

    document.body.addEventListener('mousedown', (event) => {

      this.newStatus = Status.await;

      events.click(event, this, [
        () => this.tailInstance.clickAnimation(),
      ])

    })

    document.body.addEventListener('mouseup', (event) => {

      this.newStatus = Status.active;

      events.click(event, this, [
        () => this.tailInstance.appearAnimation(this.status)
      ])

    })

    this.idleChecker(this.position);

  }

  attributeChangedCallback(key: ComponentAttributes, oldValue: string, newValue: string) {

    const DT = this.dotInstance.transforms;
    const TT = this.tailInstance.transforms;
    
    switch (key) {

      case ComponentAttributes.action: this.setAciton(newValue, oldValue); break

      case ComponentAttributes.duration: 
        DT.duration = TT.duration = parseInt(newValue);
        break;

      case ComponentAttributes.dotSize:
        DT.size = parseInt(newValue);
        break;

      case ComponentAttributes.tailSize:
        TT.size = parseInt(newValue);
        break;

      case ComponentAttributes.rotate:
        TT.rotate = parseInt(newValue);
        break;
      
    }

    this.notify();

  }

}

customElements.define('eccheuma-crusoris', Cursor);