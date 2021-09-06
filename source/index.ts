export default class Cursor {
  
  private rootDOM:      HTMLElement;
  private container:    HTMLElement;
  private customCursor: HTMLElement;
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
    timeout: 1000,
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
    
    const customCursor = document.createElement('i');
          customCursor.id = 'crusoris-circle'
          customCursor.style.setProperty('opacity', String(this.cssProperties.opacity))
        
    const dot = document.createElement('i')
          dot.id = 'crusoris-dot'

    const container = document.createElement('div');
          container.id = "crusoris"

    this.container    = container
    this.customCursor = customCursor;
    this.dot          = dot;
    this.rootDOM      = target;

  }

  set dotTransformationHash(key: number) {

    this.idleReset()

    this.dot!
      .style.setProperty('transform', Object.keys(this.dotTransform).reduce((prev, cur) => {
        return `${ this.dotTransform[prev] } ${ this.dotTransform[cur] }`
      }));

  }

  set circleTransformationHash(key: number) {

    this.idleReset()

    this.customCursor!
      .style.setProperty('transform', Object.keys(this.cursorTransform).reduce((prev, cur) => {
        return `${ this.cursorTransform[prev] } ${ this.cursorTransform[cur] }`
      }));

  }

  set idleStatus(value: boolean) {

    this.idle.status = value;

    this.customCursor.style.setProperty('opacity', String(Number(!value)))

  }

  init() {
    
    this.rootDOM.prepend(this.container);

    this.container.prepend(this.customCursor);
    this.container.prepend(this.dot);

    this.getSizes();

  }

  private getSizes() {

    const { width, borderWidth, transitionDuration } = window.getComputedStyle(this.customCursor!);
    
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
    window.addEventListener('mousedown', () => this.holdCursor(true));
    window.addEventListener('mouseup', () => this.holdCursor(false));
    window.addEventListener('click', () => this.clickCursor());

    setInterval(async () => {

      this.idleStatus = this.idle.hash === await this.idleChecker(); console.log(this.idle.status)

    }, this.idle.timeout / 2)

  }

  private shiftCursor(x: number ,y: number) {

    const changeHash = Math.random();
    
    this.cursorTransform.translate  = `translate(${ x - this.cssProperties.cursorCenter }px, ${ y - this.cssProperties.cursorCenter }px)`;
    this.dotTransform.translate     = `translate(${ x - this.cssProperties.dotHalf }px, ${ y - this.cssProperties.dotHalf }px)`;

    this.circleTransformationHash  = changeHash;
    this.dotTransformationHash     = changeHash;

  }

  private clickCursor() {

    this.cursorTransform.scale = 'scale(0)';

    this.circleTransformationHash = Math.random();

    setTimeout(() => {
      this.cursorTransform.scale = 'scale(1)'; 
      this.circleTransformationHash = Math.random();
    }, this.cssProperties.transDur);

  }

  private holdCursor(hold: boolean) {

    this.cursorTransform.scale    = `scale(${ hold ? 2 : 1 })`;
    this.circleTransformationHash  = Math.random();

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

}