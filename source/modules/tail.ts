import { Entity, AnimationFunction } from '~/entity';
import { Cursor, Status } from '~/cursor';
import { utils } from '~/utils';

interface ITail {
  clickAnimation  : AnimationFunction;
  hideAnimation   : AnimationFunction;
  appearAnimation : AnimationFunction;
}

export class Tail extends Entity implements ITail {

  public static readonly DEFAULT_SIZE = 30 as utils.measurements.px;
  public static readonly CLASS_NAME: string = 'eccheuma-cursor-tail';

  constructor(instance: Cursor) { 
    
    super(instance);

    this.element.className = Tail.CLASS_NAME;

  }

  set newScale(value: utils.measurements.float) {
    this.transforms.scale = value; this.update();
  }


  public clickAnimation() {

    this.element.style.opacity = '1';

    this.newScale = 2.0 as utils.measurements.float;

  }

  public hideAnimation() {

    this.element.style.opacity = '.25';

    this.newScale = 0.75 as utils.measurements.float;

  }

  public appearAnimation() {

    this.element.style.opacity = '1';

    switch (this.instance.status) {
      case Status.active: 
        this.newScale = 1.0 as utils.measurements.float; break;
      case Status.idle: 
        this.newScale = 0.0 as utils.measurements.float; break;
    }
  
  }

}