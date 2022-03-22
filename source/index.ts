import { Cursor } from '~/cursor';
import { Dot    } from '~/modules/dot';
import { Tail   } from '~/modules/tail';

const TAG = 'eccheuma-crusoris';

namespace innerFucntions {
	export function setStyles() {

		const GlobalStyle: HTMLStyleElement = document.createElement('style');
					GlobalStyle.textContent = '* { cursor: none !important }'
	
		document.head.append(GlobalStyle);

	}

	export function setElement() {

		const Element: HTMLElement = document.createElement(TAG)

		Element.setAttribute('dot-size', String(Dot.DEFAULT_SIZE));
		Element.setAttribute('tail-size', String(Tail.DEFAULT_SIZE));
		Element.setAttribute('rotate', String(45));
		Element.setAttribute('duration', String(250));
	
		document.body.append(Element);

	}

}

interface ICursoris {
	dist: boolean
	styles: boolean
}

export default function init(options: ICursoris) {

  customElements.define(TAG, Cursor);

	if ( options.styles ) innerFucntions.setStyles()
	if ( options.dist ) innerFucntions.setElement()

}