// import styles from '~/css/main.module.css';
import { Actions, Entity } from '~/modules/entity'
import { Cursor } from '~/index';

export class Dot extends Entity {

  constructor(cursor: Cursor) { super(cursor)
    this.element.className = 'dot';
  }

  get anchor() {
    return (this._size / 2);
  }

  setAction(act: Actions): void {

    // switch (act) {
    //   case Actions.hide:
    //     this.scale = 2;
    //     break;
    //   case Actions.revert:
    //     this.scale = 1;
    //     break;
    // }

  }

}