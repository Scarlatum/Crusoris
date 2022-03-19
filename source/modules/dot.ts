import styles from '~/css/main.module.css';
import { Entity } from '~/modules/entity'
import { Cursor } from '..';

export class Dot extends Entity {

  constructor(cursor: Cursor) { super(cursor)
    this.element.className = styles.dot;
  }

  get anchor() {
    return (this._size / 2);
  }

}