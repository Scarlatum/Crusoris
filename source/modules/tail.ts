// import styles from '~/css/main.module.css';
import { Actions, Entity } from '~/modules/entity'
import { Cursor } from '~/index';


// ! SET GLOBAL TIMEOUT VARIABLE
const ANIMATION_TIME = 250;

export class Tail extends Entity {

  private border: number = 2;

  constructor(cursor: Cursor) { super(cursor)

    this.element.className = 'tail';

  }

  get anchor() {
    return (this._size / 2) + this.border
  }

  setAction(act: Actions) {

    const actions: Record<keyof typeof Actions, () => void> = {
      hide: () => {
        this.scale = 0;
      },
      revert: () => {
        this.scale = 1;
      },
      interaction: () => {

        this.scale = 2; 
        setTimeout(() => actions.revert(), 250);

      },
    }

    const key = Actions[act] as keyof typeof Actions;

    actions[key]()

  }

}