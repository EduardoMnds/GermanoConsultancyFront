import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactRequest {
  name: string;
  userEmail: string;
  companyName?: string;
  telephone?: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  // BACKEND esperado (Spring Boot): POST /api/contact
  sendContact(payload: ContactRequest): Observable<any> {
    return this.http.post(`${this.base}/sending-email`, payload);
  }
}
