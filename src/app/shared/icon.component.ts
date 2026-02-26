import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS, IconName } from './icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<span class="icon" [innerHTML]="svg"></span>`,
  styles: [`
    .icon{ width:18px; height:18px; display:grid; place-items:center; }
    .icon :global(svg){ width:18px; height:18px; }
  `]
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  constructor(private sanitizer: DomSanitizer) {}
  get svg(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name] ?? '');
  }
}
