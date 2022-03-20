import { Entity, IParams } from '~/entity';
import type { Cursor } from '~/index';

interface IDot extends IParams {
}

export class Dot extends Entity implements IDot {

  private static readonly className: string = 'eccheuma-cursor-dot';

  constructor(instance: Cursor) { super(instance);
    this.element.className = Dot.className;
  }

}