import { Directive, ElementRef, Renderer2, Input, OnInit, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[appBackgroundIcon]',
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
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const base64Svg = `data:image/svg+xml;base64,${btoa(svgString)}`;

      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
      this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');

      const backgroundContainer = this.renderer.createElement('div');
      this.renderer.setStyle(backgroundContainer, 'position', 'absolute');
      this.renderer.setStyle(backgroundContainer, 'top', '-25%');
      this.renderer.setStyle(backgroundContainer, 'zIndex', '0');
      this.renderer.setStyle(backgroundContainer, 'pointerEvents', 'none');
      this.renderer.setStyle(backgroundContainer, 'height', '150%');
      this.renderer.setStyle(backgroundContainer, 'width', '150%');
      this.renderer.setStyle(backgroundContainer, 'backgroundImage', `url('${base64Svg}')`);
      this.renderer.setStyle(backgroundContainer, 'backgroundRepeat', 'no-repeat');
      this.renderer.setStyle(backgroundContainer, 'backgroundPosition', 'center');
      this.renderer.setStyle(backgroundContainer, 'opacity', '0.05');
      this.renderer.setStyle(backgroundContainer, 'transform', 'rotate(30deg)');

      this.renderer.appendChild(this.el.nativeElement, backgroundContainer);
    } catch (error) {
      console.error(`Error fetching icon "${this.iconName}":`, error);
    }
  }
}
