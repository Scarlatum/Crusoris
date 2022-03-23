import { Entity, AnimationFunction } from '~/entity';
import type { Cursor } from '~/cursor';
import { utils } from '~/utils';

interface IDot {
  contextAnimation  : AnimationFunction;
}

export class Dot extends Entity implements IDot {

  public static readonly DEFAULT_SIZE = utils.toNominal(6, utils.nominals.px);
  public static readonly CLASS_NAME: string = 'eccheuma-cursor-dot';

  constructor(instance: Cursor) { 
    
    super(instance);

    this.element.className = Dot.CLASS_NAME;

  }

  public contextAnimation() {

    this.element.getAnimations().forEach(anim => anim.cancel());

    this.element.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(2)' },
    ], {
      duration: this.transforms.duration,
      composite: 'accumulate',
      iterations: this.instance.status ? Infinity : 2,
      direction: 'alternate',
      fill: 'both'
    })

  }
}