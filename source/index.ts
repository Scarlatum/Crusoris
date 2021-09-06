export default class Cursor {
  
  private domRoot: HTMLElement;
  private customCursor: HTMLElement | undefined = undefined;
  private dot: HTMLElement | undefined = undefined;

  private cssProperties = {
    transDur: 0,
    cursorCenter: 0,
    dotHalf: 0,
    cursorBorder: 0,
    cursorSize: 0,
  }

  private cursorTransform: {[ index: string ]: string } = {
    translate: '',
    scale: '',
  };

  private dotTransform: {[ index: string ]: string } = {
    translate: '',
    scale: '',
  };

  constructor(target: HTMLElement) {
    this.domRoot = target;
  }

  init() {

    const customCursor = document.createElement('i');
          customCursor.classList.add('cursor');
          customCursor.id = 'CRUSOR'

    const dot = document.createElement('i')
          dot.classList.add('cursor-dot');
          dot.id = 'CRUSOR_DOT'

    const container = document.createElement('div');
          container.classList.add('cursor-container')
          container.prepend(customCursor);
          container.prepend(dot);

    this.domRoot.prepend(container);

    this.customCursor = customCursor;
    this.dot          = dot;

    this.#getSizes();

  }

  #getSizes() {

    const { width, borderWidth, transitionDuration } = window.getComputedStyle(this.customCursor!);
    
      this.cssProperties.transDur       = parseFloat(transitionDuration) * 1000;
      this.cssProperties.cursorBorder   = parseFloat(borderWidth);
      this.cssProperties.cursorSize     = parseFloat(width);
      this.cssProperties.cursorCenter   = this.cssProperties.cursorBorder + (this.cssProperties.cursorSize  / 2);
    
    const dot_CSS = window.getComputedStyle(this.dot!);

      this.cssProperties.dotHalf = parseFloat(dot_CSS.width) / 2;

    this.#start();

  } 

  #start() {

    this.#transformTicker();

    window.addEventListener('mousemove', ({ clientY, clientX }) => this.#shiftCursor(clientX, clientY));
    window.addEventListener('mousedown', () => this.#holdCursor(true));
    window.addEventListener('mouseup', () => this.#holdCursor(false));
    window.addEventListener('click', () => this.#clickCursor())

  }

  #shiftCursor(x: number ,y: number) {
    
    this.cursorTransform.translate  = `translate(${ x - this.cssProperties.cursorCenter }px, ${ y - this.cssProperties.cursorCenter }px)`;
    this.dotTransform.translate     = `translate(${ x - this.cssProperties.dotHalf }px, ${ y - this.cssProperties.dotHalf }px)`

  }

  #clickCursor() {

    this.cursorTransform.scale = 'scale(0)'

    setTimeout(() => {
      this.cursorTransform.scale = 'scale(1)'
    }, this.cssProperties.transDur)

  }

  #holdCursor(hold: boolean) {

    this.cursorTransform.scale = `scale(${ hold ? 2 : 1 })`

  }

  #transformTicker() {

    this.customCursor!
      .style.setProperty('transform', Object.keys(this.cursorTransform).reduce((prev, cur) => {
        return `${ this.cursorTransform[prev] } ${ this.cursorTransform[cur] }`
      }));

    this.dot!
      .style.setProperty('transform', Object.keys(this.dotTransform).reduce((prev, cur) => {
        return `${ this.dotTransform[prev] } ${ this.dotTransform[cur] }`
      }));

    requestAnimationFrame(() => this.#transformTicker())

  }

}