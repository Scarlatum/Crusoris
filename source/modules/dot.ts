import { Entity, IParams } from '~/entity';
import type { Cursor } from '~/cursor';

interface IDot extends IParams {
}

export class Dot extends Entity implements IDot {

  static DEFAULT_SIZE = 6;

  private static readonly className: string = 'eccheuma-cursor-dot';

  constructor(instance: Cursor) { super(instance);

    this.element.className = Dot.className;

  }

  public activeAnimation(status: boolean): void {

    this.element.getAnimations().forEach(anim => anim.cancel());

    this.element.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(2)' },
    ], {
      duration: this.transforms.duration,
      composite: 'accumulate',
      iterations: status ? Infinity : 2,
      direction: 'alternate',
      fill: 'both'
    })

  }

}