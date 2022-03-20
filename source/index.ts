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
    --color: #FFFFFF;
    --duration: 250ms;

    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: var(--size);
    width: var(--size);
    border-radius: 10px;
    border: 2px solid var(--color);
    z-index: 1;
    transition-duration: var(--duration);
    transition-timing-function: ease-out;
    margin: calc((var(--size) / 2) * -1) calc((var(--size) / 2) * -1);
    box-sizing: border-box;
  }

  .eccheuma-cursor-dot {

    --size: 10px;
    --color: #FFFFFF;
    --dur: 250ms;

    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: var(--size);
    width: var(--size);
    background: var(--color);
    border-radius: 100%;
    z-index: 2;
    margin: calc((var(--size) / 2) * -1) calc((var(--size) / 2) * -1);

  }

`

enum ComponentAttributes {
  dotSize = 'dot-size',
  tailSize = 'tail-size',
  rotate = 'rotate',
  duration = 'duration'
}

export class Cursor extends HTMLElement {

  public shadowRoot: ShadowRoot;
  public position: ElementPosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }

  public dotInstance: Dot;
  public tailInstance: Tail;

  public status: Status = Status.idle;

  constructor() { super();

    this.shadowRoot = this.attachShadow({ mode: 'closed' });

    const DOMStyle = document.createElement('style');
          DOMStyle.textContent = STYLES;

    this.shadowRoot.append(DOMStyle);

    this.tailInstance = new Tail(this);
    this.dotInstance  = new Dot(this);

    this.shadowRoot.append(this.dotInstance.element);
    this.shadowRoot.append(this.tailInstance.element);
    
  }

  static get observedAttributes(): Array<ComponentAttributes> { 
    return [
      ComponentAttributes.dotSize,
      ComponentAttributes.tailSize,
      ComponentAttributes.rotate,
      ComponentAttributes.duration,
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
    setTimeout(() => {

      this.newStatus = pos.x === this.position.x 
        && pos.y === this.position.y 
        && this.status !== Status.await
        ? Status.idle
        : Status.active

      this.idleChecker(this.position);

    }, 1000)
  }

  connectedCallback() {

    document.body.style.cursor = 'none';

    document.body.addEventListener('mousemove', (event) => {
      events.mousemove(event, this, Array(0)); this.notify()
    })

    document.body.addEventListener('mousedown', (event) => {
      events.click(event, this, [
        () => this.tailInstance.clickAnimation(),
      ])
    })

    document.body.addEventListener('mouseup', (event) => {
      events.click(event, this, [
        () => this.tailInstance.appearAnimation(this.status)
      ])
    })

    this.idleChecker(this.position);

  }

  attributeChangedCallback(key: ComponentAttributes, _oldValue: string, newValue: string) {

    const DT = this.dotInstance.transforms;
    const TT = this.tailInstance.transforms;
    
    switch (key) {
      case ComponentAttributes.dotSize:
        DT.size = parseInt(newValue);
        break;
      case ComponentAttributes.tailSize:
        TT.size = parseInt(newValue);
        break;
      case ComponentAttributes.rotate:
        TT.rotate = parseInt(newValue);
        break;
      case ComponentAttributes.duration: {
        DT.duration = TT.duration = parseInt(newValue);
      }; break;
    }

  }

}

customElements.define('eccheuma-crusoris', Cursor);