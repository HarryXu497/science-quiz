import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[subscripts-and-superscripts]'
})
export class SubscriptAndSuperscriptsDirective implements OnInit {
  	constructor(private elem: ElementRef<HTMLParagraphElement>, private renderer: Renderer2) { }

	ngOnInit() {
		const html = this.elem.nativeElement.innerHTML;
		for (let i = 0; i < html.length; i++) {
			const char = html.charAt(i);
			if (char === '_') {
				
			}
		}
		
	}

}
