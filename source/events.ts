import type { Cursor } from '~/index';
import { cursorStatus } from '~/status';

export namespace events {

  const enum errorAlias {
    define
  }

  const errors: {[A in keyof typeof errorAlias]: Error } = {
    define: new Error('Cursor is not defined')
  }

  export function click(_ev: MouseEvent, cursor?: Cursor) {

    if ( !cursor ) throw errors.define;

    cursor.newStatus = cursorStatus.click;

    // ...

    cursor.newStatus = cursorStatus.await;

    // setTimeout(() => {
    // }, 1000)

  }

  export function mousemove(event: MouseEvent, cursor?: Cursor) {

    if ( !cursor ) throw errors.define;

    cursor.newStatus = cursorStatus.move;

    cursor.newPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    cursor.newStatus = cursorStatus.await;

  }

}