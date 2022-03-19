import styles from '~/css/main.module.css';
import { Entity } from '~/modules/entity'
import { Cursor } from '~/index';
import { cursorStatus } from '~/status';

export class Tail extends Entity {

  private border: number = 2;

  constructor(cursor: Cursor) { super(cursor)

    this.element.className = styles.tail;

    this.element.addEventListener('status', () => {

      switch (cursor.status) {
        case cursorStatus.click: 
          this.action(); break;
        case cursorStatus.idle: 
          this.hide(); break;
        case cursorStatus.move:
          this.revert(); break;
      }

    })

  }

  get anchor() {
    return (this._size / 2) + this.border
  }

  private revert() {
    this.scale = 1;
  }

  private hide() {
    this.scale = 0;
  }

  private action() {

    this.scale = 2;

    setTimeout(() => {
      this.revert(); this.cursor.newStatus = cursorStatus.await
    }, 250);

  }

}