import { cursorStatus } from '~/status';
import { events } from '~/events';

import { Dot } from '~/modules/dot';
import { Tail } from './modules/tail';

// const enum DEFAULTS {
//   DOT_SIZE = 10,
//   TAIL_SIZE = 20,
//   TAIL_ROTATE = 45,
// }

enum ComponentAttributes {
  dotSize = 'dot-size',
  tailSize = 'tail-size',
  tailRotate = 'tail-rotate'
}

export type Position = {
  x: number,
  y: number,
}

export class Cursor extends HTMLElement {

  readonly dot: Dot;
  readonly tail: Tail;

  public listeners: Record<keyof typeof events, (e: MouseEvent) => void> = Object();

  public position: Position  = {
    x: 0,
    y: 0,
  }

  public customEvents = {
    position: new Event('position'),
    status: new Event('status'),
  }

  public status: cursorStatus = cursorStatus.idle;

  constructor() { super();

    this.dot  = new Dot(this);
    this.tail = new Tail(this);

    this.append(this.dot.element);
    this.append(this.tail.element);

    this.listeners.click = (e) => events.click(e, this);
    this.listeners.mousemove  = (e) => events.mousemove(e, this);

    this.idleChecker(this.position);

  }

  static get observedAttributes() { 
    return [
      ComponentAttributes.dotSize,
      ComponentAttributes.tailSize,
    ]
  }

  set newStatus(value: cursorStatus) {

    if ( value === this.status ) return;

    this.status = value;

    this.tail.element.dispatchEvent(this.customEvents.status);
    this.dot.element.dispatchEvent(this.customEvents.status);

  }

  set newPosition(pos: Position) {

    this.position = pos; 
    
    this.tail.element.dispatchEvent(this.customEvents.position);
    this.dot.element.dispatchEvent(this.customEvents.position);

  }

  idleChecker(pos: Position) {
    setTimeout(() => {

      if ( pos.x === this.position.x && pos.y === this.position.y && this.status === cursorStatus.await ) {
        this.newStatus = cursorStatus.idle;
      }

      this.idleChecker(this.position);

    }, 1000)
  }

  connectedCallback() {

    this.parentElement!.style.cursor = 'none';

    this.parentElement!.addEventListener('mousemove', this.listeners.mousemove);
    this.parentElement!.addEventListener('click', this.listeners.click);

  }

  disconnectedCallback() {
    this.parentElement!.removeEventListener('mousemove', this.listeners.mousemove);
    this.parentElement!.removeEventListener('click', this.listeners.click);
  }

  attributeChangedCallback(key: string, _oldValue: string, newValue: string) {

    switch (key) {
      case ComponentAttributes.dotSize:
        this.dot.size = parseInt(newValue); break;
      case ComponentAttributes.tailSize:
        this.tail.size = parseInt(newValue); break;
    }

  }

}

window.customElements.define('eccheuma-cursor', Cursor);
