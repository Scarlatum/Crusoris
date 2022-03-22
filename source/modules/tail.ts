import { Entity, IParams } from '~/entity';
import { Cursor } from '~/cursor';

import { Status } from '~/utils';

interface ITail extends IParams {
}

export class Tail extends Entity implements ITail {

  static DEFAULT_SIZE = 30;

  public static readonly className: string = 'eccheuma-cursor-tail';

  constructor(instance: Cursor) { super(instance);

    this.element.className = Tail.className;

  }

  set newScale(value: number) {
    this.transforms.scale = value; this.update();
  }

  public clickAnimation() {

    this.element.style.opacity = '1';

    this.newScale = 2;

  }

  public hideAnimation() {

    this.element.style.opacity = '.25';

    this.newScale = .75;

  }

  public appearAnimation(status: Status) {

    this.element.style.opacity = '1';

    switch (status) {
      case Status.active: 
        this.newScale = 1; break;
      case Status.idle: 
        this.newScale = 0; break;
    }
  
  }

}