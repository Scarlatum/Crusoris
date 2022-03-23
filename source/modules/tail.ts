import { Entity, AnimationFunction } from '~/entity';
import { Cursor, Status } from '~/cursor';
import { utils } from '~/utils';

interface ITail {
  clickAnimation  : AnimationFunction;
  hideAnimation   : AnimationFunction;
  appearAnimation : AnimationFunction;
}

export class Tail extends Entity implements ITail {

  public static readonly DEFAULT_SIZE = utils.toNominal(30, utils.nominals.px);;
  public static readonly CLASS_NAME: string = 'eccheuma-cursor-tail';

  constructor(instance: Cursor) { 
    
    super(instance);

    this.element.className = Tail.CLASS_NAME;

  }

  set newScale(value: number) {
    this.transforms.scale = value; this.update();
  }


  public clickAnimation() {

    this.element.style.opacity = '1';

    this.newScale = 2.0;

  }

  public hideAnimation() {

    this.element.style.opacity = '.25';

    this.newScale = 0.75;

  }

  public appearAnimation() {

    this.element.style.opacity = '1';

    switch (this.instance.status) {
      case Status.active: 
        this.newScale = 1.0; break;
      case Status.idle: 
        this.newScale = 0.0; break;
    }
  
  }

}