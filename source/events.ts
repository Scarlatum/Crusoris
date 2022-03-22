import { Cursor } from '~/cursor';
// import { Status } from './utils';

export namespace events {

  type CB = Array<() => void>;

  export function mousemove(event: MouseEvent, instance: Cursor, cb: CB) {

    instance.position = {
      x: event.clientX,
      y: event.clientY,
    }

    cb.forEach(f => f());

  }

  export function click(_event: MouseEvent, _instance: Cursor, cb: CB) {

    // ...

    cb.forEach(f => f());

  }

}