import { Entity, IParams } from '~/entity';
import { Cursor } from '~/index';

import { Status } from '~/utils';

interface ITail extends IParams {
}

export class Tail extends Entity implements ITail {

  public static readonly className: string = 'eccheuma-cursor-tail';

  constructor(instance: Cursor) { super(instance);
    this.element.className = Tail.className;
  }

  set newScale(value: number) {
    this.transforms.scale = value; this.update();
  }

  private AWAIT_ANIMATION() {

    this.instance.status = Status.await

    setTimeout(() => {
      this.instance.status = Status.active;
    }, 250)

  }

  public clickAnimation() { this.AWAIT_ANIMATION();

    this.element.style.opacity = '0';
    this.newScale = 2;

  }

  public hideAnimation() {
    this.newScale = 0;
  }

  public appearAnimation(status: Status) {

    this.element.style.opacity = '1';

    switch (status) {
      case Status.active: this.newScale = 1; break;
      case Status.idle: this.newScale = 1; break;
    }
  
  }

}