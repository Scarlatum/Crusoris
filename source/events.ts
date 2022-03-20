import { Cursor } from '.';
import { Status } from './utils';

export namespace events {

  type CB = Array<() => void>;

  export function mousemove(event: MouseEvent, instance: Cursor, cb: CB) {

    instance.position = {
      x: event.clientX,
      y: event.clientY,
    }

    cb.forEach(f => f());

  }

  export function click(_event: MouseEvent, instance: Cursor, cb: CB) {

    // ...

    instance.status = Status.active;

    cb.forEach(f => f());

  }

}