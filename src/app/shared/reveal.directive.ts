import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements AfterViewInit {
  constructor(private el: ElementRef<HTMLElement>) {}
  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    node.classList.add('reveal');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          node.classList.add('is-visible');
          io.disconnect();
        }
      }
    }, { threshold: 0.12 });
    io.observe(node);
  }
}
