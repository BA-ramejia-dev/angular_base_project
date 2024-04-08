import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { FindUserResponse } from '@/services/users/users.service.types';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient) {}

    findUserByName(name: string): Observable<FindUserResponse[]> {
        return this.httpClient.get<FindUserResponse[]>(`${environment.backendURL}/users/find`, {
            params: {
                name
            }
        });
    }
}
