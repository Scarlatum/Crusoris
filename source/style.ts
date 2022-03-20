const css = (v: TemplateStringsArray) => v;

export const styles = css`
  :host {

    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    height: 0;
    width: 0;

    z-index: 9999;

  }

  .tail {

    --tail-rotate: var(--tr, 45deg);
    --tail-delay: var(--td, 120ms);
    --tail-size: var(--size, 40px);

    --tail-pos-x: var(--x, 0px);
    --tail-pos-y: var(--y, 0px);

    --tail-scale: var(--s, 1);

    width: var(--tail-size);
    height: var(--tail-size);
        
    position: absolute;
    border: 2px solid #57543e;
    border-radius: 100%;

    transform:
      translate(var(--tail-pos-x), var(--tail-pos-y)) 
      rotate(var(--tail-rotate)) 
      scale(var(--tail-scale));
    transition-duration: var(--tail-delay);
    transition-timing-function: ease-out;

    z-index: 1;

  }

  .dot {

    --dot-size: var(--size, 8px);
    --dot-pos-x: var(--x, 0px);
    --dot-pos-y: var(--y, 0px);
    --dot-scale: var(--s, 1);

    display: block;

    height: var(--dot-size);
    width: var(--dot-size);

    transform: 
      translate(var(--dot-pos-x), var(--dot-pos-y));

    border-radius: 100%;
    position: absolute;
    background-color: #bbbab1;

    z-index: 2;

  }
`