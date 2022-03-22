export namespace utils {

  export function css(data: TemplateStringsArray): string {
    return String(data).replaceAll(new RegExp('\\s{2,}', 'g'), String());
  };

  export type nominal<T, N extends string> = T & {[ Symbol.species ]: N };

  export namespace measurements {

    export type px    = nominal<number, 'px'>
    export type deg   = nominal<number, 'deg'>
    export type float = nominal<number, 'f'>
    export type ms    = nominal<number, 'ms'>

  }
  
}
