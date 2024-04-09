import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { AuthPayload, AuthResponse } from '@/app/services/auth/auth.service.types';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient) {}

    login(payload: AuthPayload): Observable<AuthResponse> {
        return this.httpClient.post<AuthResponse>(`${environment.backendURL}/auth`, payload);
    }
}
