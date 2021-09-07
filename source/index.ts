export default class Cursor {
  
  private rootDOM:      HTMLElement;
  private container:    HTMLElement;
  private tail:         HTMLElement;
  private dot:          HTMLElement;

  private cssProperties = {
    transDur: 0,
    cursorCenter: 0,
    dotHalf: 0,
    cursorBorder: 0,
    cursorSize: 0,
    opacity: 0,
  }

  private idle = {
    hash: 0,
    status: true,
    timeout: 3000,
  }
  
  private tailTransform: {[ index: string ]: string } = {
    translate: '',
    scale: '',
    var: 'var(--crusoris-tail-transform, rotate(45deg))',
  };

  private dotTransform: {[ index: string ]: string } = {
    translate: '',
    scale: '',
    var: 'var(--crusoris-dot-transform, rotate(0deg))',
  };

  constructor(target: HTMLElement) {
    
    const tail = document.createElement('i');
          tail.id = 'crusoris-tail'
          tail.style.setProperty('opacity', String(this.cssProperties.opacity))
        
    const dot = document.createElement('i')
          dot.id = 'crusoris-dot'

    const container = document.createElement('div');
          container.id = "crusoris"

    this.container    = container
    this.tail         = tail;
    this.dot          = dot;
    this.rootDOM      = target;

  }

  set dotTransformationHash(key: number) {

    this.idleReset()

    const styleValue = this.collectValues(this.dotTransform);

    requestAnimationFrame(() => {
      this.dot!.style.setProperty('transform', styleValue)
    })

  }

  set tailTransformationHash(key: number) {

    this.idleReset()

    const styleValue = this.collectValues(this.tailTransform);

    requestAnimationFrame(() => {
      this.tail!.style.setProperty('transform', styleValue)
    })

  }

  set idleStatus(value: boolean) {

    this.idle.status = value;

    this.tail.style.setProperty('opacity', String(Number(!value)))

  }

  init() {
    
    this.rootDOM.prepend(this.container);

    this.container.prepend(this.tail);
    this.container.prepend(this.dot);

    this.getSizes();

  }

  private getSizes() {

    const { width, borderWidth, transitionDuration } = window.getComputedStyle(this.tail!);
    
      this.cssProperties.transDur       = parseFloat(transitionDuration) * 1000;
      this.cssProperties.cursorBorder   = parseFloat(borderWidth);
      this.cssProperties.cursorSize     = parseFloat(width);
      this.cssProperties.cursorCenter   = parseFloat(width) / 2;
    
    const dot_CSS = window.getComputedStyle(this.dot!);

      this.cssProperties.dotHalf = parseFloat(dot_CSS.width) / 2;

    this.start();

  } 

  private start() {

    window.addEventListener('mousemove', ({ clientY, clientX }) => {
      this.shiftCursor(clientX, clientY)
    });

    window.addEventListener('mouseout', () => this.hideCursor(true));
    window.addEventListener('mouseover', () => this.hideCursor(false));

    window.addEventListener('mousedown', () => this.holdCursor(true));
    window.addEventListener('mouseup', () => this.holdCursor(false));
    window.addEventListener('click', () => this.clickCursor());

    window.addEventListener('mousemove', () => this.hideCursor(false), { once: true })

    setInterval(async () => {

      this.idleStatus = this.idle.hash === await this.idleChecker();

    }, this.idle.timeout / 2)

  }

  private shiftCursor(x: number ,y: number) {

    const changeHash = Math.random();
    
    this.tailTransform.translate  = `translate(${ x - this.cssProperties.cursorCenter }px, ${ y - this.cssProperties.cursorCenter }px)`;
    this.dotTransform.translate   = `translate(${ x - this.cssProperties.dotHalf }px, ${ y - this.cssProperties.dotHalf }px)`;

    this.tailTransformationHash   = changeHash;
    this.dotTransformationHash    = changeHash;

  }

  private clickCursor() {

    this.tailTransform.scale = 'scale(0)';

    this.tailTransformationHash = Math.random();

    setTimeout(() => {
      this.tailTransform.scale = 'scale(1)'; 
      this.tailTransformationHash = Math.random();
    }, this.cssProperties.transDur);

  }

  private holdCursor(hold: boolean) {

    this.tailTransform.scale     = `scale(${ hold ? 2 : 1 })`;
    this.tailTransformationHash  = Math.random();

  }

  private hideCursor(value: boolean) {
    this.container.style.setProperty('opacity', String(Number(!value)));
  }

  private async idleChecker(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.idle.hash)
      }, this.idle.timeout / 2)
    })
  }

  private idleReset() {

    this.idleStatus = false;
    this.idle.hash  = Math.random();

  }

  private collectValues(obj: {[ index: string ]: string }) {
    return Object.values(obj).reduce((prev, cur) => `${ prev } ${ cur }`)
  }

}