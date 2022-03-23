export namespace utils {

  export function css(data: TemplateStringsArray): string {
    return String(data).replaceAll(new RegExp('\\s{2,}', 'g'), String());
  };

  export enum nominals {
    px = 'px',
    deg = 'deg',
    ms = 'ms',
  } 

  export type nominal<Type, Key extends string> = Type & {[ Symbol.species ]: Key }

  export function toNominal<N extends nominals, T>(value: T, nominal: N) {

    return `${ value }${ nominals[nominal] }` as unknown as nominal<typeof value, N>

  }

  export namespace measurements {

    export type px    = nominal<number, nominals.px>
    export type deg   = nominal<number, nominals.deg>
    export type ms    = nominal<number, nominals.ms>

  }
  
}
