import { Directive, ElementRef, Renderer2, Input, OnInit, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';

@Directive({
    standalone: true,
    selector: '[appBackgroundIcon]'
})
export class BackgroundIconDirective implements OnInit {
    @Input('appBackgroundIcon') iconName = '';

    private el = inject(ElementRef);
    private renderer = inject(Renderer2);
    private iconRegistry = inject(MatIconRegistry);

    async ngOnInit(): Promise<void> {
        if (!this.iconName) return;

        try {
            const svgElement = await firstValueFrom(this.iconRegistry.getNamedSvgIcon(this.iconName));

            const svgClone = svgElement.cloneNode(true) as SVGElement;

            this.renderer.setStyle(svgClone, 'position', 'absolute');
            this.renderer.setStyle(svgClone, 'top', '-25%');
            this.renderer.setStyle(svgClone, 'left', '0');
            this.renderer.setStyle(svgClone, 'width', '150%');
            this.renderer.setStyle(svgClone, 'height', '150%');
            this.renderer.setStyle(svgClone, 'opacity', '0.1');
            this.renderer.setStyle(svgClone, 'transform', 'rotate(30deg)');
            this.renderer.setStyle(svgClone, 'pointerEvents', 'none');
            this.renderer.setStyle(svgClone, 'zIndex', '0');

            this.renderer.setStyle(svgClone, 'fill', 'currentColor');

            this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
            this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');

            this.renderer.appendChild(this.el.nativeElement, svgClone);
        } catch (error) {
            console.warn(`Error fetching icon "${this.iconName}":`, error);
        }
    }
}
