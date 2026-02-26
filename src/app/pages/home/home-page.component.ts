import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ApiService, ContactRequest } from '../../core/api.service';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';


type ContactForm = FormGroup<{
  name: FormControl<string>;
  email: FormControl<string>;
  company: FormControl<string>;
  whats: FormControl<string>;
  message: FormControl<string>;
}>;

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent, RevealDirective],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  drawerOpen = signal(false);
  toTopVisible = signal(false);
  sending = signal(false);

  links = {
    linkedin: 'https://www.linkedin.com/in/eduardo-mendes-a2b1b9219/',
    github: 'https://github.com/EduardoMnds'
  };

  whatsapp = {
    number: '5511972225939',
    message: 'Olá! Vim pelo site da Germano Consultancy e gostaria de solicitar um orçamento. Meu projeto é relacionado a : '
  };

  form: ContactForm;


  constructor(private fb: NonNullableFormBuilder, private api: ApiService) {

    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.maxLength(120)]),
      email: this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(180)]),
      company: this.fb.control('', [Validators.maxLength(140)]),
      whats: this.fb.control('', [Validators.maxLength(40)]),
      message: this.fb.control('', [Validators.required, Validators.maxLength(2000)])
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.toTopVisible.set(window.scrollY > 650);
  }

  openDrawer() {
    this.drawerOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    this.drawerOpen.set(false);
    document.body.style.overflow = '';
  }

  toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  waLink(): string {
    const txt = encodeURIComponent(this.whatsapp.message);
    return `https://wa.me/${this.whatsapp.number}?text=${txt}`;
  }

submit() {
  this.form.markAllAsTouched();
  if (this.form.invalid) return;

  this.sending.set(true);

  const raw = this.form.getRawValue();

  const payload: ContactRequest = {
    name: raw.name ?? '',
    userEmail: raw.email ?? '',
    companyName: raw.company ?? '',
    telephone: raw.whats ?? '',
    message: raw.message ?? ''
  };

  this.api.sendContact(payload).subscribe({
    next: () => {
      alert('Mensagem enviada! ✅\n\nVou te responder em breve.');

      // reset com os NOMES DO FORM (email/company/whats), não os do DTO
      this.form.reset({
        name: '',
        email: '',
        company: '',
        whats: '',
        message: ''
      });

      this.sending.set(false);
    },
    error: (err) => {
      const msg = err?.error?.errors ? Object.values(err.error.errors)[0] : null;
      alert(String(msg ?? 'Não foi possível enviar. Tente novamente.'));
      this.sending.set(false);
    }
  });
}

  year(): number {
    return new Date().getFullYear();
  }
}